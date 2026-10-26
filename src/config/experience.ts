export type ExperienceItem = {
  company: string;
  logo?: string;
  role: string;
  employmentType: "Full-time" | "Internship";
  periodShort: string;
  periodLong: string;
  locationShort: string;
  locationLong: string;
  details?: string[];
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Royal Class Travel & Tourism",
    logo: "/assets/royal.jpg",
    role: "Full Stack Developer & IT Manager",
    employmentType: "Full-time",
    periodShort: "Dec 2024 – Aug 2026 · 1 yr 9 mos",
    periodLong: "December 2024 – August 2026 · 1 year 9 months",
    locationShort: "Abu Dhabi Emirate, United Arab Emirates · On-site",
    locationLong: "Abu Dhabi Emirate, United Arab Emirates · On-site",
    details: [
      "Led full-stack development and IT operations, supporting digital platforms and technical infrastructure across multiple business branches.",
      "Supported business systems, internal tools, and technical operations while managing upgrades, vendor coordination, and day-to-day technology needs.",
      "Improved operational workflows and digital service delivery for a hospitality and travel business environment.",
    ],
    tech: ["Full-Stack Development", "IT Operations", "Infrastructure", "System Support", "Business Systems"],
  },
  {
    company: "ICT Center - Abu Dhabi Police",
    logo: "/assets/ad.jpg",
    role: "Full Stack Developer",
    employmentType: "Full-time",
    periodShort: "Jan 2024 – Dec 2024 · 1 yr",
    periodLong: "January 2024 – December 2024 · 1 year",
    locationShort: "Abu Dhabi Emirate, United Arab Emirates",
    locationLong: "Abu Dhabi Emirate, United Arab Emirates",
    details: [
      "Contributed to the development and optimization of enterprise web applications at the ICT Center - Abu Dhabi Police, focusing on full-stack development, system integration, and application performance.",
      "Built and maintained internal systems with React, PHP, and MySQL to support police operations and administrative workflows.",
      "Integrated REST APIs and optimized application logic to improve reliability and operational efficiency.",
    ],
    tech: ["React", "PHP", "MySQL", "REST APIs", "JavaScript", "Enterprise Applications"],
  },
  {
    company: "QuickWorks MRP",
    logo: "/assets/quickworks.jpg",
    role: "Software Developer",
    employmentType: "Full-time",
    periodShort: "Feb 2022 – Jan 2024 · 2 yrs",
    periodLong: "February 2022 – January 2024 · 2 years",
    locationShort: "Hybrid",
    locationLong: "Hybrid",
    details: [
      "Developed and delivered full-stack software applications across e-commerce, delivery, transportation, and service-based platforms.",
      "Contributed to end-to-end application development and system integration, supporting business workflows from concept to deployment.",
      "Built user-facing features and backend systems for multiple client needs across varied digital products.",
    ],
    tech: ["React", "Node.js", "Full-Stack Development", "REST APIs", "System Integration"],
  },
  {
    company: "LOGIX",
    role: "Software Engineer Intern",
    employmentType: "Internship",
    periodShort: "Jan 2023 – Jul 2023 · 7 mos",
    periodLong: "January 2023 – July 2023 · 7 months",
    locationShort: "On-site",
    locationLong: "On-site",
    details: [
      "Completed a 7-month Software Engineering Internship at LOGIX, gaining practical experience in software development, application design, and problem-solving.",
      "Strengthened my understanding of programming, debugging, software testing, and development workflows while working on real-world technical challenges.",
      "Applied engineering principles to build reliable, user-focused software solutions in a professional environment.",
    ],
    tech: ["Software Engineering", "Debugging", "Testing", "Application Development", "Problem Solving"],
  },
  {
    company: "NVIDIA Deep Learning Institute",
    logo: "/assets/nvidia.jpg",
    role: "AI Full Stack Engineer Intern",
    employmentType: "Internship",
    periodShort: "Sep 2021 – Dec 2021 · 4 mos",
    periodLong: "September 2021 – December 2021 · 4 months",
    locationShort: "Remote",
    locationLong: "Remote",
    details: [
      "Completed a 3-month Deep Learning Internship with the NVIDIA Deep Learning Institute, gaining foundational knowledge of deep learning and AI systems.",
      "Explored practical AI applications, neural networks, and machine learning workflows, while strengthening my understanding of AI integration into software applications.",
      "Built foundational experience in data-driven problem solving and intelligent application development for real-world technical tasks.",
    ],
    tech: ["AI", "Deep Learning", "Machine Learning", "Neural Networks", "Full-Stack Development"],
  },
];
