export type Project = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tech: string[];
  website?: string;
  featured?: boolean;
  /** Optional cover image for project cards */
  cover?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "doors",
    title: "Doors",
    date: "10.2026",
    description:
      "An immersive web experience turning ideas into polished, memorable interactive 3D worlds.",
    tech: ["TypeScript", "React"],
    website: "https://doors-io.vercel.app/",
    featured: true,
    cover: "/assets/doors.jpg",
    gradient: "from-cyan-500/20 via-sky-500/15 to-blue-500/20",
  },
  {
    slug: "ragkno",
    title: "RAGKNO",
    date: "05.2026",
    description:
      "A production-grade RAG system with semantic reranking, hybrid retrieval, multi-source ingestion, and source-cited answers.",
    tech: ["React", "FastAPI", "ChromaDB", "PostgreSQL", "Python"],
    website: "https://ragkno.com/",
    featured: true,
    cover: "/assets/projects/Ragkno.png",
    gradient: "from-blue-500/25 via-indigo-500/15 to-violet-500/25",
  },
 
  {
    slug: "smart-plant-doctor",
    title: "Smart Plant Doctor",
    date: "06.2026",
    description:
      "AI + IoT plant health platform with real-time ESP32 sensor data and MobileNetV2 disease detection.",
    tech: ["Python", "Streamlit", "ESP32", "MobileNetV2"],
    website: "https://smart-plant-dr.vercel.app/",
    featured: true,
    cover: "/assets/projects/smart-plant-doctor.png",
    gradient: "from-emerald-500/25 via-green-500/15 to-lime-500/25",
  },
  {
    slug: "buildlog",
    title: "BuildLog",
    date: "05.2026",
    description: "Your builder journey in one card — commits, projects, streak, and build-in-public posts.",
    tech: ["TypeScript", "Next.js", "GitHub API"],
    website: "https://rural-caftan175.runable.site/",
    cover: "/assets/projects/build-log.png",
    gradient: "from-orange-500/20 via-amber-500/15 to-yellow-500/20",
  },
  {
    slug: "Scrum",
    title: "Scrum",
    date: "05.2026",
    description:
      "A task and Kanban app with timeline views to plan, track, and manage your daily work.",
    tech: ["TypeScript", "React"],
    website: "https://scrum-daily.vercel.app/",
    cover: "/assets/projects/scrum.png",
    gradient: "from-sky-500/20 via-cyan-500/15 to-blue-500/20",
  },
  {
    slug: "frame-drop",
    title: "FrameDrop",
    date: "04.2026",
    description:
      "A screenshot beautifier for polishing screen captures and recordings with custom frames, backgrounds, and glass effects.",
    tech: ["JavaScript", "CSS", "HTML"],
    website: "https://frame-drop-23.vercel.app/",
    cover: "/assets/projects/frame-drop.png",
    gradient: "from-lime-500/20 via-green-500/15 to-emerald-500/20",
  },
  
];
