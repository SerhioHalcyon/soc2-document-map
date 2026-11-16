/*
  SOC 2 Document Map - content.
  Edit this file to add, change or remove documents. No build step.

  PUBLIC SITE RULE: GitHub Pages is readable by anyone on the internet.
  Keep entries general: purpose, audience, criteria. Do NOT add time limits (SLAs),
  system or vendor names, people's names, known weaknesses or exceptions.
*/
window.SOC2_MAP = {
  title: "SOC 2 Document Map",
  subtitle: "Where each security document lives in the picture, what it is for, and when to use it.",
  asOf: "2026-11",

  groups: [
    { id: "security", title: "Security & Compliance Program",
      desc: "The baseline: how risk, vulnerabilities and access are governed. Every other policy points back here." },
    { id: "vendor", title: "Vendor & AI Access Governance",
      desc: "Who and what may touch company data, and how that access is granted." },
    { id: "incident", title: "Incident & Crisis Response",
      desc: "What to do when something goes wrong: reporting, response, ownership and the after-action record." },
    { id: "resilience", title: "Business Resilience",
      desc: "Keeping operations running through a major disruption." },
    { id: "engineering", title: "Engineering & IT Operations",
      desc: "How software is built and changed, and how company devices are issued and retired." },
    { id: "people", title: "People & Conduct",
      desc: "Standards every employee is bound by, and who is responsible for what." },
    { id: "trust", title: "Customer Trust",
      desc: "What customers and prospects are told about how we protect their data." }
  ],

  roles: [
    { id: "sce", label: "Security / Compliance Engineer" },
    { id: "lead", label: "VP / CEO / Tech Lead" },
    { id: "eng", label: "Engineer" }
  ],

  roleGuides: {
    sce: {
      title: "Security / Compliance Engineer",
      intro: "You run the program day to day: keep the documents true to practice, keep the registers alive, and make sure controls are actually operating, not just configured.",
      tips: [
        "Keep every document current and reviewed on a regular cadence; update the document when the practice changes, not the other way around.",
        "Review the Risk Register and Vendor Register regularly and chase anything overdue.",
        "Check that scanners and monitoring are really running. A tool that silently disconnects is a gap nobody notices.",
        "Track every finding and incident to closure and keep the evidence (ticket, review, approval).",
        "Run periodic access reviews, and handle audit requests and customer security questionnaires."
      ],
      start: ["isp", "rat", "rr", "vmp", "vreg", "irp"]
    },
    lead: {
      title: "VP / CEO / Tech Lead",
      intro: "You make the decisions that policies cannot make for you: accept or fix a risk, approve an exception, approve a vendor, fund the fix.",
      tips: [
        "Make and record risk decisions (accept or mitigate) and approve exceptions in writing.",
        "Approve vendors, connectors and AI tools that handle sensitive data.",
        "Be reachable in an incident and know your role in the contact tree.",
        "Give teams the time to fix findings within the required timelines.",
        "Review security status at your regular leadership meetings and record the outcome."
      ],
      start: ["rat", "rr", "irroles", "vmp", "vmgmt", "bcp"]
    },
    eng: {
      title: "Engineer",
      intro: "Most controls show up in your normal workflow. Following the process is the control.",
      tips: [
        "Every change has a tracked work item, a reviewed pull request and passing automated checks.",
        "Request access through a ticket, never share credentials, and report a lost or stolen device immediately.",
        "Fix vulnerabilities within the required timeline; ask for an exception rather than bypassing a check.",
        "Report anything suspicious straight away. Report first, investigate later.",
        "Before adding a new dependency, tool or service, make sure it is justified and approved."
      ],
      start: ["sdlc", "sacp", "irpol", "vmp", "isp", "vmgmt"]
    }
  },

  situations: [
    { q: "Something looks wrong: suspicious activity, data exposure, an outage or a lost device", docs: ["irpol", "irroles", "irp"] },
    { q: "I need access to a system, or someone's access should change", docs: ["sacp"] },
    { q: "A scanner or a person reported a vulnerability", docs: ["vmp", "rr"] },
    { q: "We want to adopt a new tool, vendor or AI assistant", docs: ["vmgmt", "vreg", "cpp"] },
    { q: "An urgent fix cannot wait for the normal release", docs: ["sdlc", "vmp"] },
    { q: "A weakness cannot be fixed on time", docs: ["rat", "rr"] },
    { q: "A customer asks about our security", docs: ["csc"] },
    { q: "Joining or leaving the company, or handling a computer", docs: ["isp", "coc", "sacp", "endpoint"] },
    { q: "An incident has just been closed", docs: ["pir"] },
    { q: "Planning around an outage or recovery", docs: ["bia", "bcp", "dr"] }
  ],

  docs: [
    /* ---------- Security & Compliance Program ---------- */
    { id: "isp", group: "security", title: "Information Security Policy", updated: "2026-08-18",
      what: "The umbrella security policy: acceptable use, security awareness and training, remote-work expectations, and enforcement.",
      when: "When you join, at each annual refresh, and whenever you are unsure what is expected of you day to day.",
      criteria: ["CC1.4", "CC2.2", "CC5.3"],
      related: ["coc", "sacp", "rat"],
      roles: {
        sce: "Owns the document and its review; keeps training and acknowledgment records.",
        lead: "Approves the policy and sets the expectation that teams follow it.",
        eng: "Your everyday rules for devices, passwords, remote work and raising concerns."
      } },

    { id: "rat", group: "security", title: "Risk Assessment and Treatment Policy", updated: "2026-08-24",
      what: "How risks are scored (impact and likelihood), who owns them, and how each one is treated: mitigate, transfer, avoid or accept.",
      when: "When you find a weakness that cannot be fixed immediately, or need to decide whether to accept a risk.",
      criteria: ["CC3.1", "CC3.2", "CC3.4", "CC9.1"],
      related: ["rr", "vmp", "vmgmt"],
      roles: {
        sce: "Runs the method: scores risks, keeps the register current, tracks target dates.",
        lead: "Makes and records accept-or-mitigate decisions; the escalation path for serious items.",
        eng: "Raise a risk when you find something that cannot be fixed within normal timelines."
      } },

    { id: "rr", group: "security", title: "Risk Register", updated: "",
      what: "The running log of known security deficiencies, each with a score, an owner, a treatment decision and a target date.",
      when: "Before taking on work that touches a known weakness, and when a finding cannot be closed on time.",
      criteria: ["CC3.2", "CC3.4", "CC9.1"],
      related: ["rat", "vmp"],
      roles: {
        sce: "Maintains it and reviews it on a regular cadence.",
        lead: "Signs off treatment decisions and the residual risk you are accepting.",
        eng: "Read-only reference. Tell the Security / Compliance Engineer when you find something new."
      } },

    { id: "vmp", group: "security", title: "Vulnerability Management Policy", updated: "2026-09-02",
      what: "How vulnerabilities are found (scanning and testing), rated by severity and fixed within set time limits, and when an exception is allowed.",
      when: "When a scanner or a person reports a vulnerability, or before releasing with a known finding.",
      criteria: ["CC3.2", "CC7.1"],
      related: ["rat", "rr", "sdlc", "irpol"],
      roles: {
        sce: "Watches scan results, reviews open findings and tracks them to closure.",
        lead: "Approves exceptions and decides when a finding blocks a release.",
        eng: "Fix findings in the required timeline; request an exception instead of bypassing a check."
      } },

    { id: "sacp", group: "security", title: "System Access Control Policy", updated: "2026-09-03",
      what: "Least-privilege access: how access is requested, approved, changed and removed, and how access is reviewed.",
      when: "When you need access, change role or leave, and when reviewing who can reach sensitive systems.",
      criteria: ["CC6.1", "CC6.2", "CC6.3"],
      related: ["isp", "cpp", "endpoint"],
      roles: {
        sce: "Runs periodic access reviews and checks that removals happen on time.",
        lead: "Approves access for your team and confirms it is still needed.",
        eng: "Request access through a ticket and never share credentials."
      } },

    /* ---------- Vendor & AI Access Governance ---------- */
    { id: "vmgmt", group: "vendor", title: "Vendor Management Policy", updated: "2026-09-03",
      what: "Requirements for third parties that handle company or customer data: assessment before onboarding, contract terms and ongoing review.",
      when: "Before adopting any new vendor, SaaS tool or integration partner, and at each renewal.",
      criteria: ["CC2.3", "CC9.2"],
      related: ["vreg", "cpp", "csc"],
      roles: {
        sce: "Assesses vendors, collects assurance evidence and agreements, keeps the register current.",
        lead: "Approves vendors that handle sensitive data.",
        eng: "Do not connect a new service to company data until it is approved and registered."
      } },

    { id: "vreg", group: "vendor", title: "Vendor Register", updated: "",
      what: "The list of every third-party vendor with the kind of data shared, how critical it is, and the status of its contract and security evidence.",
      when: "To check whether a tool is already approved, or to see what a vendor can reach.",
      criteria: ["CC9.2"],
      related: ["vmgmt", "cpp"],
      roles: {
        sce: "Maintains it and reviews it on a regular cadence.",
        lead: "Uses it to judge dependency and concentration risk before approving a new vendor.",
        eng: "Check it before adding a service; ask for the vendor to be added if it is missing."
      } },

    { id: "cpp", group: "vendor", title: "Connector Permission Policy", updated: "2026-09-02",
      what: "Governs access for integrations, connectors and AI agents: least privilege, approved roles, and what an agent may or may not do.",
      when: "Before connecting an AI assistant, integration or automation to company systems.",
      criteria: ["CC6.1", "CC6.3", "CC9.2"],
      related: ["cpm", "vmgmt", "sacp"],
      roles: {
        sce: "Reviews connector requests and keeps the matrix aligned with the policy.",
        lead: "Approves connectors and agent permissions for your area.",
        eng: "Ask for the narrowest permission that does the job."
      } },

    { id: "cpm", group: "vendor", title: "Connector Permission Matrix", updated: "2026-09-02",
      what: "Puts the policy into practice: an inventory of connectors, which roles may use them, and the extra limits that apply to AI agents.",
      when: "To check whether a role may use a given connector.",
      criteria: ["CC6.1", "CC6.3"],
      related: ["cpp", "vreg"],
      roles: {
        sce: "Keeps it accurate whenever a connector or a role changes.",
        eng: "Look here first to see whether you are allowed to use a connector."
      } },

    /* ---------- Incident & Crisis Response ---------- */
    { id: "irpol", group: "incident", title: "Incident Response Policy", updated: "2026-09-08",
      what: "The short policy: what counts as an incident and what counts as a vulnerability, and the duty of every person to report quickly.",
      when: "Whenever something looks wrong. Report first, investigate later.",
      criteria: ["CC7.3", "CC7.4"],
      related: ["irp", "irroles", "vmp"],
      roles: {
        sce: "Keeps it consistent with the detailed plan and checks that reporting channels work.",
        lead: "Sponsors the policy and expects problems to be reported early.",
        eng: "If in doubt, report it promptly through the channel the policy names."
      } },

    { id: "irp", group: "incident", title: "Incident Response Plan (Policy & Playbook)", updated: "2026-09-16",
      what: "The detailed playbook: detection and analysis, containment, recovery, communication and closure.",
      when: "When an incident is declared and you need the step-by-step response.",
      criteria: ["CC7.3", "CC7.4", "CC7.5"],
      related: ["irpol", "irroles", "pir", "dr"],
      roles: {
        sce: "Coordinates the response, keeps the record and makes sure the review happens.",
        lead: "Makes the escalation and communication decisions the plan reserves for leadership.",
        eng: "Follow the instructions of whoever is leading the response; preserve evidence."
      } },

    { id: "irroles", group: "incident", title: "Incident Response Roles & 24/7 Contact Tree", updated: "2026-09-08",
      what: "Who does what during an incident and how to reach them at any hour.",
      when: "To find the right person to escalate to.",
      criteria: ["CC2.2", "CC7.4"],
      related: ["irp", "irpol", "org"],
      roles: {
        sce: "Keeps the contact details current and checks them on a regular cadence.",
        lead: "Know your role and make sure you can be reached.",
        eng: "Use it to escalate when the first responder is unavailable."
      } },

    { id: "pir", group: "incident", title: "Post-Incident Review Template", updated: "",
      what: "A fillable template for the review after an incident: timeline, impact, response actions, communication and lessons learned.",
      when: "After every significant incident, within the timeframe set in the response plan.",
      criteria: ["CC7.4", "CC7.5"],
      related: ["irp"],
      roles: {
        sce: "Completes it with the responders and turns lessons into tracked actions.",
        lead: "Reads the outcome and approves follow-up work.",
        eng: "Contribute the facts and the timeline."
      } },

    /* ---------- Business Resilience ---------- */
    { id: "bcp", group: "resilience", title: "Business Continuity Plan", updated: "2026-09-09",
      what: "How critical operations continue after a major disruption. It is exercised on a regular cadence.",
      when: "When normal operations are disrupted, and when planning a continuity exercise.",
      criteria: ["CC7.5", "CC9.1"],
      related: ["dr", "bia", "irp"],
      roles: {
        sce: "Schedules and records the exercises and follows up on what they reveal.",
        lead: "Owns the decisions the plan reserves for leadership during a disruption."
      } },

    { id: "dr", group: "resilience", title: "Disaster Recovery Plan", updated: "2026-09-09",
      what: "Recovery in three phases (activation, recovery, return to normal) and which systems are recovered first.",
      when: "When a system or site is lost and technical recovery has to start.",
      criteria: ["CC7.5", "CC9.1"],
      related: ["bcp", "bia", "irp"],
      roles: {
        sce: "Keeps the plan tested and aligned with the recovery targets.",
        eng: "Know which systems are in your recovery scope and who runs each step."
      } },

    { id: "bia", group: "resilience", title: "Business Impact Analysis & Recovery Targets", updated: "2026-10-16",
      what: "Ranks business functions and systems by how critical they are and sets recovery time and data-loss targets.",
      when: "To understand what matters most in an outage, or when planning changes that affect recovery.",
      criteria: ["CC3.2", "CC9.1"],
      related: ["bcp", "dr"],
      roles: {
        sce: "Keeps it current as systems and priorities change.",
        lead: "Confirms the priorities and the targets are acceptable to the business."
      } },

    /* ---------- Engineering & IT Operations ---------- */
    { id: "sdlc", group: "engineering", title: "Software Development Life Cycle (SDLC) Policy", updated: "2026-09-03",
      what: "How software is built and changed: requirements, design, build, test, review, release, and how urgent fixes are handled.",
      when: "Before starting a change, when preparing a release, or when an urgent fix cannot wait.",
      criteria: ["CC6.8", "CC8.1"],
      related: ["vmp", "isp"],
      roles: {
        sce: "Checks that the policy matches what the pipeline and reviews really enforce.",
        lead: "Owns the release process and who may deploy.",
        eng: "Every change has a tracked item, a reviewed pull request and passing checks."
      } },

    { id: "endpoint", group: "engineering", title: "Endpoint Reimaging and Device Data Destruction Policy", updated: "2026-09-07",
      what: "Computers are reimaged when issued, reassigned and on a regular cycle, and their data is destroyed when they are retired.",
      when: "When receiving, handing back or retiring a computer.",
      criteria: ["C1.2", "CC6.5"],
      related: ["isp", "sacp"],
      roles: {
        sce: "Keeps the records of reimaging and destruction.",
        eng: "Return devices through the process; never keep company data on a retired device."
      } },

    /* ---------- People & Conduct ---------- */
    { id: "coc", group: "people", title: "Code of Conduct", updated: "2026-08-26",
      what: "The company-wide ethics and conduct standard, including confidentiality expectations and how violations are handled.",
      when: "At onboarding, at the annual acknowledgment, and any time an ethical question comes up.",
      criteria: ["CC1.1", "CC1.5"],
      related: ["isp"],
      roles: {
        sce: "Tracks acknowledgments and training completion.",
        lead: "Sets the tone and applies the standard consistently.",
        eng: "Read it, acknowledge it, and speak up if something looks wrong."
      } },

    { id: "org", group: "people", title: "Organization Chart", updated: "",
      what: "Roles and reporting lines, used to see who owns what and who to escalate to.",
      when: "To find the owner of an area or the right person to escalate to.",
      criteria: ["CC1.2", "CC1.3"],
      related: ["irroles"],
      roles: {
        sce: "Keeps it current when roles change.",
        lead: "Confirms that reporting lines and responsibilities are still accurate."
      } },

    /* ---------- Customer Trust ---------- */
    { id: "csc", group: "trust", title: "Customer Security Commitments", updated: "2026-08-23",
      what: "The external summary for customers and prospects of how we protect their data and respond to issues.",
      when: "When answering a customer's security questions or completing a security questionnaire.",
      criteria: ["C1.1", "CC2.3"],
      related: ["isp", "irp", "vmgmt"],
      roles: {
        sce: "Keeps the statement accurate and in line with real practice.",
        lead: "Approves what is promised to customers.",
        eng: "Do not promise beyond this statement. Route security questions to the Security / Compliance Engineer."
      } }
  ]
};
