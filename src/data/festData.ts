export interface DetailedEvent {
  num: string;
  id: string;
  name: string;
  category: string;
  filterTag: "ROBOTICS" | "SOFTWARE" | "HARDWARE" | "GAMING" | "ELECTRICAL" | "MECHANICAL";
  tagline: string;
  description: string;
  objectType: "character" | "plexus" | "karyarachna" | "kermis" | "electrica" | "mechanica";
  eventCount: number;
  date: string;
  venue: string;
  teamSize: string;
  prizeSummary: string;
  rules: string[];
  featuredEvents: string[];
  registrationUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  sub: string;
  year: string;
  category: string;
}

export interface SponsorItem {
  name: string;
  tier: "title" | "partner";
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  role: string;
  designation?: string;
  phone?: string;
}

export interface WorkshopItem {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  date: string;
  venue: string;
  description: string;
  registrationUrl: string;
}

export interface ProniteItem {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  description: string;
}

export const FEST_DATA = {
  title: "TechFEST'26 — SLIET",
  shortTitle: "TECHFEST'26",
  subTitle: "SLIET's National Level Annual Technical Fest",
  institution: "Sant Longowal Institute of Engineering & Technology (SLIET)",
  location: "Longowal, Sangrur, Punjab - 148106, India",
  campusArea: "451 Acres",
  established: "1989",
  accreditation: "NAAC Grade 'A' | Deemed-to-be-University (MHRD/AICTE)",
  dates: "09—10 OCT 2026",
  datesFull: "09—10 OCTOBER 2026",
  theme: "Technology and Sciences for Sustainable Earth",
  tagline: "Where Ideas Become Reality",
  links: {
    register: "https://www.techfest26.com/auth/register",
    brochure: "https://drive.google.com/file/d/10lxQUn9Mk2E3J0Cdxu3oHr0tt9_ubfRb/view?usp=sharing",
    schedule: "https://drive.google.com/file/d/1k0_-8Mu3UcCOSsbGSMjX6FbSqlxYSRkO/view?usp=sharing",
    officialWeb: "https://www.techfest26.com",
    slietWeb: "https://sliet.ac.in",
  },
  contacts: [
    { name: "Naman Kumar Sinha", role: "Overall Coordinator", phone: "+91 78568-93952" },
    { name: "Shubham Kumar Singh", role: "Overall Coordinator", phone: "+91 97711-74465" },
  ],
  email: "techfest@sliet.ac.in",
  transit: [
    { type: "Train", detail: "Sangrur Station (18 km) / Sunam Station (16 km) / Dhuri Junction (32 km)" },
    { type: "Bus", detail: "Direct regular shuttle buses connecting Sangrur & Sunam bus stands to SLIET Gate" },
    { type: "Airport", detail: "Chandigarh International Airport (IXC) / Ludhiana Airport" },
  ],
  socials: [
    { name: "Instagram", url: "https://www.instagram.com" },
    { name: "LinkedIn", url: "https://www.linkedin.com" },
    { name: "YouTube", url: "https://www.youtube.com" },
    { name: "GitHub", url: "https://github.com" },
  ],
};

export const EVENT_FILTER_CATEGORIES = [
  "ALL",
  "ROBOTICS",
  "SOFTWARE",
  "HARDWARE",
  "GAMING",
  "ELECTRICAL",
  "MECHANICAL",
] as const;

export const EDITORIAL_EVENTS: DetailedEvent[] = [
  {
    num: "01",
    id: "robozar",
    name: "ROBOZAR",
    category: "Robotics & Autonomous Systems",
    filterTag: "ROBOTICS",
    tagline: "High-torque combat robotics, autonomous rovers, and precision aerial drones.",
    description:
      "The flagship robotics arena of TechFEST'26. Witness custom-engineered combat machines clash in the electrified RoboWars pit, alongside autonomous SLAM rovers navigating intricate obstacle mazes and precision drone racing.",
    objectType: "character",
    eventCount: 8,
    date: "09—10 October 2026",
    venue: "Main Robotics Arena & Gymnasium Hall, SLIET",
    teamSize: "1 to 5 Members per Team",
    prizeSummary: "Official SLIET Trophies, Certificates & Cash Prize Pool",
    rules: [
      "Combat bots must strictly adhere to the designated weight categories (e.g. 15kg, 30kg, 60kg).",
      "Autonomous rovers must complete navigation without any manual RF intervention.",
      "Drone batteries must comply with standard LiPo safety protocol in the pit area.",
      "Cross-college teams are permitted across all sub-competitions.",
    ],
    featuredEvents: [
      "RoboWars (Heavyweight Combat Arena)",
      "Autonomous Line Following Championship",
      "Maze Solver SLAM Rover Challenge",
      "Precision Drone Obstacle Rush",
      "RoboSoccer Championship",
    ],
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    num: "02",
    id: "plexus",
    name: "PLEXUS",
    category: "Software & Computation",
    filterTag: "SOFTWARE",
    tagline: "Algorithmic speed, AI multi-agent architectures, and cyber security.",
    description:
      "A 24-hour non-stop hackathon, algorithmic speed battles, spatial WebGL frontend sprints, and high-intensity cyber security capture-the-flag arenas designed for top software engineers and architects.",
    objectType: "plexus",
    eventCount: 6,
    date: "09—10 October 2026",
    venue: "Computer Center & Software Labs, SLIET",
    teamSize: "1 to 4 Members (Hackathon: 2–4)",
    prizeSummary: "Cash Awards, Sponsor Cloud Credits & Merit Certificates",
    rules: [
      "All code for the Genesis 24H Hackathon must be committed to public GitHub repositories created at start.",
      "Use of open-source libraries is permitted with proper licensing attribution.",
      "CTF challenges are scored dynamically with automated anti-cheat monitoring.",
      "Decisions of the technical evaluation jury are final and binding.",
    ],
    featuredEvents: [
      "Genesis 24-Hour Hackathon",
      "CodeSprint Algorithmic Battle",
      "Spatial & WebGL UI Sprint",
      "Cyber CTF Security Arena",
      "AI/ML Agent Benchmark",
    ],
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    num: "03",
    id: "karyarachna",
    name: "KARYARACHNA",
    category: "Working Models & Hardware",
    filterTag: "HARDWARE",
    tagline: "Translating theoretical engineering into functional sustainable prototypes.",
    description:
      "National working model exhibition showcasing physical hardware prototypes, IoT systems, renewable energy converters, and automated mechatronics engineered for real-world environmental sustainability.",
    objectType: "karyarachna",
    eventCount: 3,
    date: "09—10 October 2026",
    venue: "Central Workshop & Exhibition Hall, SLIET",
    teamSize: "1 to 4 Members per Project",
    prizeSummary: "Innovation Grants, Patent Guidance & SLIET Trophy",
    rules: [
      "Models must be working hardware prototypes capable of live demonstration.",
      "A poster explaining the circuit diagram, BOM, and sustainability impact must accompany the project.",
      "Standard 230V AC power supply points will be provided at the stalls.",
    ],
    featuredEvents: [
      "National Working Model Exhibition",
      "Sustainable Hardware Showcase",
      "Embedded IoT & Automation Expo",
    ],
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    num: "04",
    id: "kermis",
    name: "KERMIS",
    category: "Esports, Strategy & Brainiacs",
    filterTag: "GAMING",
    tagline: "High-stakes gaming tournaments and rapid-fire strategic tech quizzing.",
    description:
      "The competitive battleground for nationwide esports tournaments, tactical problem-solving sprints, tech trivia championships, and speed game prototyping jams on the main festival stage.",
    objectType: "kermis",
    eventCount: 3,
    date: "09—10 October 2026",
    venue: "Main Auditorium & LAN Gaming Arena, SLIET",
    teamSize: "1 to 5 Members depending on game title",
    prizeSummary: "Esports Trophies, Gaming Peripherals & Cash Prizes",
    rules: [
      "Standard competitive tournament rules apply for tactical esports titles.",
      "Players must bring their own peripherals (mouse, keyboard, headset) for PC tournaments.",
      "Zero tolerance policy for unauthorized third-party scripts or cheating.",
    ],
    featuredEvents: [
      "Esports Championship Arena",
      "Ultimate Tech Brainiac Quiz",
      "Game Jam & Speed Prototyping",
    ],
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    num: "05",
    id: "electrica",
    name: "ELECTRICA",
    category: "Electrical & Smart Grid Systems",
    filterTag: "ELECTRICAL",
    tagline: "Powering the green transition through intelligent energy grids.",
    description:
      "Challenges centered on microgrid load optimization, renewable energy converters, high-voltage power simulation, and smart embedded power monitoring circuits for a sustainable global grid.",
    objectType: "electrica",
    eventCount: 4,
    date: "09—10 October 2026",
    venue: "Electrical Engineering Department Labs, SLIET",
    teamSize: "1 to 3 Members",
    prizeSummary: "Cash Prizes, Industrial Toolkits & Certificates",
    rules: [
      "Simulations must be executed in approved tools (MATLAB/Simulink, PSCAD, Multisim).",
      "Hardware circuit design rounds require live debugging on provided bench instruments.",
      "Teams are evaluated on efficiency, power factor optimization, and fault resilience.",
    ],
    featuredEvents: [
      "Smart Grid Optimization Challenge",
      "Circuit Simulation & Debug",
      "Renewable Energy Systems Design",
      "Power Distribution Architecture",
    ],
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    num: "06",
    id: "mechanica",
    name: "MECHANICA",
    category: "CAD, Dynamics & Fabrication",
    filterTag: "MECHANICAL",
    tagline: "Precision design, structural testing, and aerodynamic optimization.",
    description:
      "High-precision 3D CAD modeling sprints, finite element structural stress testing, wind-tunnel aerodynamic vehicle simulations, and rapid fabrication challenges.",
    objectType: "mechanica",
    eventCount: 4,
    date: "09—10 October 2026",
    venue: "Mechanical Engineering CAD Center & Machine Shop, SLIET",
    teamSize: "1 to 3 Members",
    prizeSummary: "CAD Software Licenses, Cash Awards & Trophies",
    rules: [
      "Parametric 3D modeling tasks will specify strict geometric constraints and tolerances.",
      "Structural load tests will be conducted to destruction on universal testing apparatus.",
      "Safety goggles and closed-toe footwear are mandatory in the fabrication workshop.",
    ],
    featuredEvents: [
      "CAD-O-Mania 3D Parametric Design",
      "Structural Bridge Load Testing",
      "Aerodynamic Form Simulation",
      "Rapid Metal Fabrication Sprint",
    ],
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
];

export const WORKSHOPS_DATA: WorkshopItem[] = [
  {
    id: "ws-1",
    title: "Autonomous Drone Robotics & Spatial LiDAR",
    instructor: "Industry Aerospace Experts & SLIET UAV Lab",
    duration: "6 Hours Hands-on Session",
    date: "09 October 2026",
    venue: "Aero Design Labs, SLIET",
    description:
      "Master drone flight avionics, brushless motor ESC calibration, PX4 autopilot configurations, and real-time point-cloud LiDAR reconstruction.",
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    id: "ws-2",
    title: "AI Multi-Agent Systems & LLM Architectures",
    instructor: "Leading AI Research Practitioners",
    duration: "5 Hours Deep Dive",
    date: "09 October 2026",
    venue: "Central Computing Center, SLIET",
    description:
      "Build production-grade autonomous agent loops, vector memory retrieval augmented generation (RAG), and deterministic function-calling pipelines.",
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    id: "ws-3",
    title: "Industrial Cyber Security & CTF Exploitation",
    instructor: "Certified Ethical Hackers & Red Teamers",
    duration: "6 Hours Live Lab",
    date: "10 October 2026",
    venue: "Network Security & Cyber Forensics Lab, SLIET",
    description:
      "Hands-on binary exploitation, Web vulnerability discovery, privilege escalation, and zero-day patch analysis.",
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
  {
    id: "ws-4",
    title: "Smart Grid Micro-Inverters & IoT Mechatronics",
    instructor: "Renewable Energy & Automation Specialists",
    duration: "5 Hours Practical Workshop",
    date: "10 October 2026",
    venue: "Power Electronics Department, SLIET",
    description:
      "Hardware prototyping of solar MPPT controllers, power factor monitoring, and real-time MQTT telemetry pipelines.",
    registrationUrl: "https://www.techfest26.com/auth/register",
  },
];

export const PRONITES_DATA: ProniteItem[] = [
  {
    id: "pro-1",
    title: "EDM & DJ NIGHT",
    type: "Electronic Dance Music Spectacle",
    date: "09 October 2026",
    time: "07:00 PM Onwards",
    venue: "Main Festival Ground, SLIET",
    description: "High-octane electronic music celebration featuring renowned DJs, laser mapping, and immersive soundscapes.",
  },
  {
    id: "pro-2",
    title: "STAR NIGHT CONCERT",
    type: "Celebrity Live Music Concert",
    date: "10 October 2026",
    time: "07:30 PM Onwards",
    venue: "Open Air Theatre, SLIET",
    description: "The grand festival finale concert featuring celebrated national playback artists and live band performances.",
  },
  {
    id: "pro-3",
    title: "ILLUSION & COMEDY GALA",
    type: "Standup Comedy & Stage Illusions",
    date: "10 October 2026",
    time: "04:30 PM",
    venue: "Main Auditorium, SLIET",
    description: "An evening of sharp humor, mentalism, and stage magic hosted by leading national stand-up artists.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "ROBOWARS ARENA",
    sub: "60kg Heavyweight Combat // Electrified Pit",
    year: "2026",
    category: "ROBOTICS",
  },
  {
    id: "gal-2",
    title: "GENESIS HACKATHON",
    sub: "24-Hour Code Sprint // 1,000+ Developers",
    year: "2026",
    category: "SOFTWARE",
  },
  {
    id: "gal-3",
    title: "AUTONOMOUS DRONE RUSH",
    sub: "LiDAR Spatial Flight Obstacle Course",
    year: "2026",
    category: "AEROSPACE",
  },
  {
    id: "gal-4",
    title: "SLIET CAMPUS EXPO",
    sub: "451-Acre Innovation Showcase",
    year: "2026",
    category: "HERITAGE",
  },
  {
    id: "gal-5",
    title: "ESPORTS CHAMPIONSHIP",
    sub: "Main Stage Tournament Finals",
    year: "2026",
    category: "GAMING",
  },
];

export const ABOUT_STATS = [
  { label: "FOUNDED", value: "1989", detail: "By Govt. of India (MHRD)" },
  { label: "CAMPUS AREA", value: "451 ACRES", detail: "Longowal, Sangrur, Punjab" },
  { label: "NAAC ACCREDITATION", value: "GRADE 'A'", detail: "Deemed-to-be-University" },
  { label: "PARTICIPATION", value: "10,000+", detail: "Pan-India engineering talent" },
];

export const SPONSORS_DATA: SponsorItem[] = [
  { name: "OPPO", tier: "title" },
  { name: "UNSTOP", tier: "title" },
  { name: "RRP ELECTRONICS", tier: "title" },
  { name: "AMY SOUL", tier: "title" },
  { name: "TECH CADD", tier: "title" },
  { name: "IOTA WATER", tier: "title" },
  { name: "BURRAH", tier: "title" },
  { name: "MICROSOFT", tier: "partner" },
  { name: "COCA COLA", tier: "partner" },
  { name: "UNACADEMY", tier: "partner" },
  { name: "BONN", tier: "partner" },
  { name: "PROTON", tier: "partner" },
  { name: "BEYOND SNACK", tier: "partner" },
  { name: "HERO ELECTRIC", tier: "partner" },
  { name: "93.5 RED FM", tier: "partner" },
];

export const FAQ_DATA: FAQItem[] = [
  {
    q: "Who is eligible to participate in TechFEST'26?",
    a: "TechFEST'26 is open to all enrolled undergraduate, postgraduate, diploma, and school students from recognized institutions across India.",
  },
  {
    q: "How can I register for competitions and tracks?",
    a: "Registration is online via the official portal at techfest26.com/auth/register or through Unstop. On-spot registrations will also be available at the registration desk.",
  },
  {
    q: "Is accommodation provided for outstation participants?",
    a: "Yes, hostel accommodation on the SLIET Longowal campus is provided for outstation participants along with campus food packages.",
  },
  {
    q: "Are cross-college teams allowed in hackathons & robotics?",
    a: "Yes, cross-college and multidisciplinary teams are fully permitted in RoboWars, Hackathons, and Project Exhibitions.",
  },
  {
    q: "Will participants receive certificates and prize money?",
    a: "All verified participants receive official SLIET participation certificates. Track winners receive cash prizes, trophies, and merit certificates.",
  },
  {
    q: "How do we reach the SLIET campus?",
    a: "SLIET is in Longowal, Sangrur (Punjab). Nearest rail heads are Sangrur (18 km) and Sunam (16 km). Regular bus and shuttle connections run directly to the campus gate.",
  },
];

export const FACULTY_LEADERSHIP: TeamMember[] = [
  { name: "Dr. Mani Kant Paswan", role: "Patron-in-Chief", designation: "Director, SLIET Longowal" },
  { name: "Dr. Vijay Kumar Kukreja", role: "Patron", designation: "Professor, SLIET Longowal" },
  { name: "Dr. Sunil Kumar", role: "Chairman", designation: "Associate Professor, SLIET" },
  { name: "Dr. Barasha Mali", role: "Vice-Chairman", designation: "Assistant Professor, SLIET" },
  { name: "Dr. Tajinder Singh", role: "Vice-Chairman", designation: "Assistant Professor, SLIET" },
];

export const CORE_STUDENT_TEAM: TeamMember[] = [
  { name: "Shubham Kumar Singh", role: "Overall Coordinator", phone: "+91 97711-74465" },
  { name: "Naman Kumar Sinha", role: "Overall Coordinator", phone: "+91 78568-93952" },
  { name: "Kandi Rishitha", role: "Core Coordinator" },
  { name: "Sagar Kumar", role: "Core Coordinator" },
  { name: "Gaurav Kumar", role: "Core Coordinator" },
  { name: "Vishal Kumar", role: "Core Coordinator" },
  { name: "Adarsh Kumar", role: "Core Coordinator" },
  { name: "Sahil Sinha", role: "Core Coordinator" },
  { name: "Balpreet Kaur", role: "Core Coordinator" },
  { name: "Raju Kumar", role: "Core Coordinator" },
];
