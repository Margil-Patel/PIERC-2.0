export const ecosystemMetrics = [
  {
    category: "Ventures",
    value: "500+",
    suffix: "",
    title: "Startups Incubated & Supported",
    description: "Across deep-tech, healthcare, IoT, SaaS, clean-tech, and social enterprise sectors."
  },
  {
    category: "Disbursed",
    value: "₹25+",
    suffix: "Cr",
    title: "Funding & Seed Grants Facilitated",
    description: "DST, BIRAC, SSIP, Startup India Seed Fund, and private institutional angel syndicates."
  },
  {
    category: "Reach",
    value: "10k+",
    suffix: "",
    title: "Students & Innovators Reached",
    description: "Participating across hackathons, bootcamps, and structured validation sprints."
  },
  {
    category: "Economy",
    value: "1.2k+",
    suffix: "",
    title: "High-Value Jobs Generated",
    description: "Direct employment created in high-technology engineering and operational domains."
  },
  {
    category: "Commercial",
    value: "₹45+",
    suffix: "Cr",
    title: "Cumulative Startup Revenues",
    description: "Audited commercial revenues achieved by resident and graduated portfolio ventures."
  },
  {
    category: "Engagement",
    value: "100+",
    suffix: "",
    title: "Annual Ecosystem Networking Events",
    description: "Demo days, investor roundtables, founder mixers, and international roadshows."
  }
];

export const fourPillars = [
  {
    number: "01",
    name: "IDEATION",
    icon: "lightbulb",
    tagline: "Validation Sprints",
    description: "Rapid opportunity validation, entrepreneurial mindset workshops, hackathons, and structured idea sprints across all collegiate disciplines.",
    details: [
      "Customer Discovery Workshops",
      "Problem-Solution Fit Matrix",
      "Interdisciplinary Ideation Sprints",
      "Zero-to-One Venture Mentorship"
    ]
  },
  {
    number: "02",
    name: "INNOVATION",
    icon: "biotech",
    tagline: "Tech Transfer & Patents",
    description: "Lab-to-market IP tech transfer, pre-seed prototyping grants, full patent prosecution support, and access to state-of-the-art research instrumentation.",
    details: [
      "100% University IP Assistance",
      "Patent Prior-Art & Drafting",
      "Non-dilutive Prototyping Grants",
      "35+ Advanced Specialized Labs"
    ]
  },
  {
    number: "03",
    name: "INCUBATION",
    icon: "domain",
    tagline: "Resident Desks & Operations",
    description: "Physical co-working spaces, company registration, institutional accounting, compliance guardrails, and intensive founder advisory handholding.",
    details: [
      "24/7 Dedicated Venture Desks",
      "Corporate & Legal Structuring",
      "Cloud Credits ($100k+ Value)",
      "Dedicated Incubation Manager"
    ]
  },
  {
    number: "04",
    name: "GROWTH",
    icon: "trending_up",
    tagline: "Investor Demo Day",
    description: "Direct syndication to angel networks, VC Demo Days, market expansion pilots, cross-border roadshows, and follow-on capital structuring.",
    details: [
      "50+ Tier-1 VC & Angel Access",
      "Startup Nivesh Capital Pitch",
      "Corporate Sandbox Pilots",
      "Cross-Border Market Access"
    ]
  }
];

export const journeyStages = [
  {
    stage: "01",
    name: "IDEA",
    timeframe: "Weeks 1-4",
    offering: "Startup Counselling",
    summary: "Problem-solution mapping, customer discovery sprints, and early feasibility analysis.",
    deliverables: ["Lean Canvas", "Problem Statement Validation", "Target Persona Analysis"]
  },
  {
    stage: "02",
    name: "VALIDATE",
    timeframe: "Weeks 5-8",
    offering: "Pre-seed Research Grants",
    summary: "Market sizing, regulatory roadmap, competitive moats, and IP patent search.",
    deliverables: ["Prior Art Report", "TAM / SAM / SOM Sizing", "Regulatory Checklist"]
  },
  {
    stage: "03",
    name: "BUILD",
    timeframe: "Months 3-5",
    offering: "FabLab & Electronics Bay",
    summary: "Physical prototyping, MVP release, software architecture, and user feedback cycles.",
    deliverables: ["Working Functional MVP", "Hardware Prototyping", "Beta User Testbed"]
  },
  {
    stage: "04",
    name: "INCUBATE",
    timeframe: "Months 6-12",
    offering: "Incubation Workspace",
    summary: "Corporate formation, dedicated venture desks, team hiring, and beta customer contracts.",
    deliverables: ["Company Incorporation", "First 10 Paying Customers", "Governance Setup"]
  },
  {
    stage: "05",
    name: "FUND",
    timeframe: "Months 12-18",
    offering: "Startup Nivesh Pitch",
    summary: "Valuation mechanics, cap table modeling, institutional pitch days, and syndication.",
    deliverables: ["Institutional Pitch Deck", "Financial Model & Cap Table", "Term Sheet Review"]
  },
  {
    stage: "06",
    name: "SCALE",
    timeframe: "Ongoing",
    offering: "Growthpad Accelerator",
    summary: "Pan-India distribution, international partnerships, Series A prep, and venture debt.",
    deliverables: ["National Distribution", "Series A Syndicate", "Enterprise Channel Expansion"]
  }
];

export const flagshipPrograms = [
  {
    id: "nivesh",
    featured: true,
    badge: "Featured Cohort",
    status: "Applications Open",
    statusColor: "error",
    title: "STARTUP NIVESH 3.0",
    subtitle: "Investor Readiness & Capital Syndication Accelerator",
    description: "The premier institutional program connecting seed-to-scale startups with over 50+ Angel Investors, Venture Funds, and Family Offices across India.",
    metrics: [
      { label: "Fund Access", value: "₹10L - ₹2Cr", subtext: "Ticket size per startup" },
      { label: "Investor Network", value: "50+ VCs", subtext: "Direct Demo Day Pitch" },
      { label: "Curriculum", value: "12 Weeks", subtext: "Sprint to term sheet" }
    ],
    timeline: "Cohort Starts: Q2 2026",
    cta: "Apply for Startup Nivesh 3.0"
  },
  {
    id: "healthtech",
    featured: false,
    badge: "Specialized Track",
    status: "Active Sandbox",
    statusColor: "secondary",
    title: "HealthTech Accelerator",
    subtitle: "Clinical Sandbox & Bio-Incubation",
    icon: "medical_services",
    description: "Deep clinical validation powered by the 1,000+ bed Parul Sevashram Hospital. Direct access to hospital sandbox trials, medical device certification, and BIRAC bio-grants.",
    features: [
      "1,000+ Bed Hospital pilot deployments",
      "BioNEST incubator & analytical lab integration",
      "CDSCO / FDA regulatory & ethics committee guidance",
      "Biomedical engineer dedicated support"
    ],
    cta: "Explore HealthTech Cohort"
  },
  {
    id: "growthpad",
    featured: false,
    badge: "Post-Revenue Scale",
    status: "Cohort 4",
    title: "Startup Growthpad Program",
    subtitle: "Scaling from Seed to Series A",
    description: "Tailored for companies with existing traction. Concentrated on international expansion, unit economics optimization, enterprise sales pipelines, and venture debt access.",
    features: [
      "B2B enterprise pipeline acceleration",
      "Unit economics & CAC-LTV optimization",
      "Cross-border venture scaling support"
    ],
    cta: "Learn about Growthpad"
  },
  {
    id: "mba-eis",
    featured: false,
    badge: "Distinctive Degree",
    status: "Academic Track",
    title: "MBA in Innovation & Acceleration",
    subtitle: "Academic Venture Building Curriculum",
    description: "Parul University’s specialized graduate program blending theoretical venture building, venture capital finance, live company incubation, and practical IP filing.",
    features: [
      "Incubate your startup as the master's thesis",
      "Direct mentorship from visiting VC partners",
      "Live seed fund investment simulations"
    ],
    cta: "Curriculum Details"
  },
  {
    id: "bootcamp",
    featured: false,
    badge: "Sprint Foundation",
    status: "7-Day Sprint",
    title: "Startup Bootcamp",
    subtitle: "Zero to One Ideation Intensive",
    description: "An immersive 7-day intensive workshop designed for collegiate students and early researchers to de-risk market assumptions, structure pitch decks, and build first MVPs.",
    features: [
      "Rapid prototype construction",
      "Customer validation interviews",
      "Pitch presentation to angel panel"
    ],
    cta: "Register for Bootcamp"
  }
];

export const fabLabBays = [
  {
    id: "bay-a",
    name: "Prototyping Bay A",
    title: "Advanced 3D Fabrication Suite",
    description: "Continuous carbon fiber composite manufacturing with 20-micron surface resolution.",
    category: "Additive Manufacturing",
    icon: "print",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALAEdFCkUD0-Dtst1X253CwqbBNEqP8_MWIX_I4nY-2rPxlRZkilAK-ws8Fs31nivMgO4uRC4KUcdN7iXYUMel49BrUGQby46VeIjPdru7EUJsiBf_Vd0ZM9COXR2FULNf4mkv8sPhm36mQJCiY8ccAZf3lRVwxZNdlML_USs43igMwYSXnvNxIlmyeQHDdeNpEfQQpCJKahEMB8lxTVpF3QTjzkHGj9_EY7N2_GU9znvoszN2sCbY",
    specs: [
      "Industrial SLA, SLS & High-Temp FDM Printers",
      "Aerospace PEEK & Ultem Resin Capabilities",
      "Large-Format Build Volume (up to 600x600x600mm)",
      "Surface Finishing & Post-Curing Chambers"
    ]
  },
  {
    id: "bay-b",
    name: "Prototyping Bay B",
    title: "Micro-Electronics Workstation",
    description: "Rapid embedded firmware debugging, IoT sensor calibration, and antenna tuning.",
    category: "Electronics & PCB",
    icon: "memory",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUumR1I7DmL54mI0euqnXftKVIjiCGMGWCMsFRbSuQJs67gsW_JG6JkH_cvqr0RqZfClw7W2oVX7upsJS_AN2F7djRMChood0GDw1YppxRQ2_Vbvf82TPYc2e3SjLn1PwZeAk5njYdpMpp9Uxa9oknE1tKyJlERRtRnpMJ-E7njQAlpg0nrvMfy5Y7MHjCnClSjjkeGagANQwO-I-SowMTqAaOe2V1dICKQqTXR4Wv71WNt_uasjKa",
    specs: [
      "4-Channel 1GHz Digital Storage Oscilloscopes",
      "Multi-Zone SMD Reflow Ovens & BGA Rework Station",
      "Spectrum Analyzers & RF Signal Generators",
      "Precision Micro-Soldering with ESD Safe Workbenches"
    ]
  },
  {
    id: "bay-c",
    name: "Prototyping Bay C",
    title: "5-Axis CNC & Laser Bay",
    description: "Rapid metal chassis production, sheet metal bending, and composite finishing.",
    category: "Subtractive & Laser",
    icon: "carpenter",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqGpYeIMd1yLMkxFny-dDf5bKCyd1Bz3H6iNK1H4LrdiXDfJfKyfx-GEMx44uYZqK0wOSTVJ8_kT8XqBY5RD78rJEgaIJDl5WOv8XNL-MYVB38jIezJS1XnNaPvqWQ70xHlmP1kZY1_VKffMGMt4lCNAA1gE9VsRlYhjn07fEGBvhKwb-Wj7b66-_H8zrChApjvSn1glM4Z_KopYYYbM1hew1UWQ25eU__mK_ukuBeVx-C3M_e-DI9",
    specs: [
      "High-Precision 5-Axis CNC Milling Center",
      "150W CO2 Laser Cutters & Fiber Laser Engravers",
      "Hydraulic Sheet Metal Press Brake",
      "Sub-Millimeter Aerospace Tolerances"
    ]
  },
  {
    id: "bay-d",
    name: "Prototyping Bay D",
    title: "BioNEST Analytical Lab",
    description: "Spectrophotometry, autoclave sterility suites, and live cell culture incubators.",
    category: "Biomedical & Life Sciences",
    icon: "biotech",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDphTaEIrwBCsnmNlaX9cII1kRj4EVXU2B_okaos4zpWOQVG-YW1imvGZXhylRxDWBT0L6pE2VZe52zEBCjCzpo8chOAsypZzAE0b5YjF5ZSNlin0BIxxMtMLEQN1jB5IA_cnQJRk1txOOHCqpSNd82bLAQmdH74sMtyfvcRLxnt1Rhch4tkxeXI94Ux_WVOuIsjWgPjiRmLjmeHyjr7GhIILKzNTA5h6bg6UqOuma91khE_c5i0xrf",
    specs: [
      "Class II Biosafety Cabinets & CO2 Incubators",
      "UV-Vis Spectrophotometers & Thermal Cyclers",
      "Automated Cell Counters & High-Speed Centrifuges",
      "Clinical Sample Prep & Cold Chain Storage (-80°C)"
    ]
  }
];

export const flagshipPlatforms = [
  {
    id: "fest",
    category: "Annual Flagship",
    icon: "festival",
    title: "Vadodara Start-up Festival",
    tagline: "Western India’s Premier Founder Convention",
    description: "Western India’s premier founder convention. 10,000+ delegates, 200+ startup demo booths, and national keynote stages with prominent ecosystem unicorn founders.",
    highlights: ["10,000+ Attendees", "200+ Demo Booths", "2-Day Global Summit"],
    badgeText: "Annual Edition →"
  },
  {
    id: "hackathon",
    category: "Build Challenge",
    icon: "code",
    title: "Vadodara Hackathon",
    tagline: "48-Hour Continuous Code & Hardware Sprint",
    description: "A 48-hour continuous software and hardware sprint tackling real-world problem statements provided by government bodies and Fortune 500 corporate sponsors.",
    highlights: ["₹15L+ Cash Prizes", "1,500+ Hackers", "Corporate Grand Challenges"],
    badgeText: "Register Team →"
  },
  {
    id: "women-meet",
    category: "Diversity & Scale",
    icon: "woman",
    title: "Women's Startup Meet",
    tagline: "Empowering Next-Gen Women Founders",
    description: "Dedicated summit connecting aspiring female founders with leading women venture capitalists, angel syndicates, and grant opportunities across healthcare and commerce.",
    highlights: ["500+ Female Founders", "Dedicated Angel Syndicate", "Grant Awards"],
    badgeText: "View Network →"
  },
  {
    id: "toycathon",
    category: "Hardware Innovation",
    icon: "smart_toy",
    title: "Vadodara Toycathon",
    tagline: "National Indigenous Toy & EdTech Challenge",
    description: "National indigenous toy design and educational technology challenge fostering design thinking and child developmental psychology innovations.",
    highlights: ["National Participation", "Prototyping Grants", "IP Protection Support"],
    badgeText: "View Winners →"
  },
  {
    id: "health-fest",
    category: "Bio & MedTech",
    icon: "ecg_heart",
    title: "Healthcare Innovation Festival",
    tagline: "Translational Clinical & MedTech Expo",
    description: "Clinical expo uniting biomedical engineers, clinicians, pharmaceutical heads, and hospital administrators to vet high-impact patient care tech.",
    highlights: ["Clinical Sandbox", "Hospital Pilot Signups", "Live Doctor Reviews"],
    badgeText: "Explore Showcase →"
  },
  {
    id: "kidovation",
    category: "Next Gen",
    icon: "school",
    title: "Kidovation & Youth Summit",
    tagline: "Early-Stage STEM & Inventive Pedagogy",
    description: "Early-stage inventive pedagogy inspiring school and collegiate junior innovators through hands-on STEM challenges and introductory entrepreneurship.",
    highlights: ["K-12 & Collegiate", "STEM Maker Sprints", "Young Innovator Awards"],
    badgeText: "Learn More →"
  }
];

export const regionalStudios = [
  {
    id: "vadodara",
    name: "Vadodara Studio",
    tag: "Flagship Central HQ",
    icon: "corporate_fare",
    location: "BBA Building, Parul University Campus, Limda, Vadodara",
    description: "Comprehensive seed lab, 150+ co-working desks, FabLab prototyping bays, and clinical nexus with Parul Sevashram Hospital.",
    lead: "Soor Solanki",
    role: "Facility & Operations Manager",
    contact: "pierc@paruluniversity.ac.in",
    stats: "150+ Desks • 35+ Labs"
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad Studio",
    tag: "Urban FinTech & SaaS Hub",
    icon: "location_city",
    location: "Strategic Business District, SG Highway, Ahmedabad",
    description: "Positioned in Gujarat’s financial core, connecting collegiate tech startups with venture funds, angel networks, and commercial enterprise clients.",
    lead: "Juned Shaikh",
    role: "Centre Head — Ahmedabad Hub",
    contact: "ahmedabad.pierc@paruluniversity.ac.in",
    stats: "FinTech & Enterprise Focus"
  },
  {
    id: "surat",
    name: "Surat Studio",
    tag: "Hardware & Supply Chain",
    icon: "precision_manufacturing",
    location: "Textile & Diamond Technology Corridor, Surat",
    description: "Strategically embedded within South Gujarat's manufacturing corridor, focusing on industrial automation, smart materials, and logistics IoT.",
    lead: "Pancham Baraiya",
    role: "Centre Head — Surat Hub",
    contact: "surat.pierc@paruluniversity.ac.in",
    stats: "Industrial IoT & Automation"
  },
  {
    id: "rajkot",
    name: "Rajkot Studio",
    tag: "Engineering & Heavy Tech",
    icon: "engineering",
    location: "Saurashtra Industrial Zone, Rajkot",
    description: "Saurashtra’s powerhouse for mechanical engineering ventures, automotive component innovation, casting tech, and agricultural machinery.",
    lead: "Regional Coordination Team",
    role: "Saurashtra Operations Lead",
    contact: "rajkot.pierc@paruluniversity.ac.in",
    stats: "AgriTech & Heavy Engineering"
  }
];

export const boardOfGovernors = [
  {
    initials: "DP",
    name: "Dr. Devanshu J Patel",
    role: "President, Parul University",
    bio: "Dynamic visionary who has spearheaded Parul University's massive expansion and committed focus on innovation, translational research, and entrepreneurship."
  },
  {
    initials: "PP",
    name: "Dr. Parul Patel",
    role: "Vice President, Parul University",
    bio: "Managing Trustee championing student affairs, incubation governance, and creating empathetic founder-friendly campus ecosystems."
  },
  {
    initials: "GP",
    name: "Dr. Geetika M. Patel",
    role: "VP (Quality, Research) & Medical Director",
    bio: "Gold medalist physician and researcher overseeing clinical validation pipelines for biotech, medical device, and life sciences startups."
  },
  {
    initials: "MP",
    name: "Prof. Manish Pandya",
    role: "Registrar, Parul University",
    bio: "Over 19 years in higher education leadership, driving institutional compliance, IP policy frameworks, and regulatory acceleration."
  }
];

export const operatingLeadership = [
  {
    name: "Jay Sudani",
    role: "Chief Executive Officer",
    domain: "Venture Execution & Strategy"
  },
  {
    name: "Ajay Barot",
    role: "Strategic Lead",
    domain: "Ecosystem Alliances & Partnerships"
  },
  {
    name: "Hardik Kharva",
    role: "Deputy Director",
    domain: "Incubation Policy & Grants"
  },
  {
    name: "Hutesh Baviskar",
    role: "Incubation Manager",
    domain: "Cohort Operations & Portfolio"
  },
  {
    name: "Sonal Sudani",
    role: "Incubation Manager",
    domain: "Founder Onboarding & Screening"
  },
  {
    name: "Divyansh Thakur",
    role: "FabLab Engineer",
    domain: "Hardware Prototyping & R&D"
  }
];
