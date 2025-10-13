
export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  hours?: string;
  travel?: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferred?: string[];
  benefits?: string[];
  applyEmail?: string;
  tags?: string[];
};

export const jobs: Job[] = [
  {
    slug: "industrial-electrician",
    title: "Industrial Electrician – Heavy-Duty Machinery",
    location: "United States (Nationwide travel may be required)",
    type: "Full-Time",
    hours: "50 hours/week",
    travel: "Regional/National",
    summary:
      "Electrical diagnostics, installation/commissioning, and preventive maintenance on heavy-duty industrial machinery across recycling, biomass, and manufacturing.",
    responsibilities: [
      "Perform electrical diagnostics, repairs, and maintenance on industrial machinery",
      "Install and commission electrical systems, wiring, and control panels",
      "Troubleshoot sensors, motors, PLCs, and circuit protection",
      "Read wiring diagrams/schematics and technical documents",
      "Collaborate with mechanical teams for complete servicing",
      "Ensure compliance with electrical codes, safety standards, and site protocols",
      "Document work and materials using digital tools",
    ],
    qualifications: [
      "Apprenticeship/vocational training in electrical or industrial electrics (or equivalent experience)",
      "3+ years with industrial electrical systems",
      "Strong motor control, power distribution, and automation components knowledge",
      "Familiarity with PLC programming & troubleshooting",
      "Able to work independently and travel to sites",
      "Basic computer/tablet skills for digital documentation",
    ],
    preferred: [
      "Experience with VFDs, sensors, and safety relays",
      "Knowledge of NFPA 70E, NEC, or similar",
      "Familiarity with automated/production machinery",
      "Excellent troubleshooting and communication",
      "Willingness to travel regionally/nationally",
      "Conversational English & German is a plus",
    ],
    benefits: [
      "Competitive compensation",
      "Service vehicle, tools, PPE, workwear",
      "Paid travel time + per diem",
      "Health insurance & paid time off",
      "Training and development",
      "Supportive team with growth path",
    ],
    applyEmail: "info@hbc-group.eu",
    tags: ["Electrical", "Field Service", "PLC", "Safety"],
  },
  {
    slug: "industrial-mechanic",
    title: "Industrial Mechanic – Heavy-Duty Machinery",
    location: "United States (Nationwide travel may be required)",
    type: "Full-Time",
    hours: "50 hours/week",
    travel: "Regional/National",
    summary:
      "Field service, diagnostics, repairs, and preventive maintenance on heavy-duty industrial machinery (mobile and stationary).",
    responsibilities: [
      "Service, maintenance, and repairs on heavy machinery & mechanical systems",
      "Troubleshoot mechanical, hydraulic, and pneumatic failures",
      "Conduct inspections, calibrations, and part replacements",
      "Interpret schematics, manuals, and technical documentation",
      "Use hand/power tools, diagnostic equipment, measuring instruments",
      "Coordinate priorities with service schedulers",
      "Document work performed, parts used, equipment condition",
      "Follow safety guidelines and site/company standards",
    ],
    qualifications: [
      "Apprenticeship/vocational training in mechanical/industrial/plant maintenance (or equivalent experience)",
      "3+ years hands-on with heavy-duty machinery",
      "Strong mechanical, hydraulic, and pneumatic knowledge",
      "Work independently and travel to job sites",
      "Physically able to lift heavy parts in industrial settings",
      "Basic computer/tablet skills for reporting",
    ],
    preferred: [
      "Welding and fabrication (MIG/TIG/Stick)",
      "Familiarity with automated/production machinery",
      "Excellent problem-solving & communication",
      "Willingness to travel regionally/nationally",
      "Conversational English & German is a plus",
    ],
    benefits: [
      "Competitive compensation",
      "Service vehicle, tools, PPE, workwear",
      "Paid travel time + per diem",
      "Health insurance & paid time off",
      "Training and development",
      "Supportive team with growth path",
    ],
    applyEmail: "info@hbc-group.eu",
    tags: ["Mechanical", "Hydraulics", "Pneumatics", "Field Service"],
  },
  {
    slug: "industrial-programmer",
    title: "Industrial Programmer – Heavy-Duty Machinery",
    location: "United States (Nationwide travel may be required)",
    type: "Full-Time",
    hours: "50 hours/week",
    travel: "National",
    summary:
      "Program, optimize, and commission PLC-based control systems for complex heavy-duty machinery; troubleshoot software/communications; deliver on-site support.",
    responsibilities: [
      "Program & configure PLC systems (e.g., Siemens, Beckhoff, Allen-Bradley)",
      "Commission & optimize automation and machine controls",
      "Diagnose software/communication issues",
      "Customize HMI/SCADA visualizations",
      "Create/read control diagrams, function descriptions, technical docs",
      "Collaborate with mechanical/electrical teams for full integration",
      "Follow safety regulations & site requirements",
      "Document program changes and system status",
    ],
    qualifications: [
      "Technical training/degree in Automation, Electrical Engineering, Mechatronics, or related",
      "3+ years in industrial programming & automation",
      "Proficiency with TIA Portal, Codesys, TwinCAT, etc.",
      "Familiarity with Profinet, EtherCAT, Modbus",
      "Strong problem-solving; independent field work",
      "Solid computer & network troubleshooting",
    ],
    preferred: [
      "Integrating sensors, actuators, drives, and safety systems",
      "Software versioning & standardization practices",
      "Basic Python/C# is a plus",
      "Remote access/diagnostics",
      "Conversational English & German is a plus",
    ],
    benefits: [
      "Competitive compensation",
      "Company vehicle, tools, PPE, workwear",
      "Paid travel time + per diem",
      "Health insurance & paid time off",
      "Training & professional development",
      "Supportive team with growth path",
    ],
    applyEmail: "info@hbc-group.eu",
    tags: ["PLC", "Commissioning", "HMI/SCADA", "Automation"],
  },
];
