import { heroConfig } from "@/config/hero";

export const aboutConfig = {
  headline: ["I build software.", "And explore what technology can become."],
  intro:
    "I'm **Ammar Al-Hawamdeh**, a **Software Engineer** with over four years of experience across full-stack development, artificial intelligence, and IT leadership. I've worked on everything from customer-facing applications and enterprise systems to managing technology operations across multiple business branches. Along the way, I've developed a particular interest in **AI, intelligent automation, and building products that solve real problems**. I'm driven by curiosity, the challenge of figuring things out, and the satisfaction of turning an idea into something that actually works.",
  quote: "I believe the most interesting things happen when curiosity meets the courage to create.",
  traits: ["Curious", "Creative", "Builder", "Always Learning"] as const,
  traitStyles: {
    Curious:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/80 dark:bg-amber-950/40 dark:text-amber-300",
    Creative:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/80 dark:bg-sky-950/40 dark:text-sky-300",
    Builder:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/80 dark:bg-emerald-950/40 dark:text-emerald-300",
    "Always Learning":
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/80 dark:bg-violet-950/40 dark:text-violet-300",
  },
  meta: [
    { label: "Location", value: heroConfig.location },
    { label: "Background", value: "Software Engineering · IT Leadership" },
    { label: "Focus", value: "Full-Stack Development · AI · Intelligent Automation" },
  ],
  story: {
    title: "My journey",
    paragraphs: [
      "My journey into technology started with a simple curiosity about how things work and what I could build with them. Over time, that curiosity developed into a career that has taken me through software development, enterprise engineering, IT management, and artificial intelligence.",
      "My first experience with AI came through the **NVIDIA Deep Learning Institute**, where I explored neural networks, machine learning fundamentals, and AI development workflows. It introduced me to a field that would later become one of my biggest interests.",
      "I continued developing my engineering skills during my internship at **LOGIX**, gaining hands-on experience in application development, debugging, and software engineering practices.",
      "At **Quickworks**, I worked as a **Software Developer**, building full-stack applications for e-commerce, delivery, transportation, and service platforms. Working across different products helped me develop a practical approach to engineering, from understanding requirements to delivering working applications.",
      "I later joined the **ICT Center at Abu Dhabi Police** as a **Full Stack Developer**, contributing to enterprise web applications, integrating REST APIs, and improving system performance. Working in that environment gave me a deeper appreciation for software reliability, maintainability, and the responsibility that comes with building systems people depend on.",
      "My next chapter was at **Royal Class Travel & Tourism**, where I worked as an **IT Manager**, leading technology operations across multiple branches while remaining actively involved in full-stack development. The experience broadened my perspective beyond writing code, helping me understand how software, infrastructure, people, and business operations fit together.",
      "Throughout these experiences, I continued exploring **artificial intelligence and automation**, developing AI-powered applications, experimenting with intelligent agents, and building workflows that connect AI with real-world tools and systems.",
      "I've also had opportunities to share what I've learned through technical workshops and hands-on sessions, particularly around AI agents and intelligent automation.",
      "Today, I'm interested in bringing all these experiences together: **software engineering, AI, and creative problem-solving**. I enjoy working on ideas that push me to learn, experiment, and build something meaningful.",
    ],
  },
  principles: {
    title: "How I work",
    items: [
      {
        title: "Stay curious",
        description:
          "I like understanding how things work, questioning assumptions, and exploring ideas outside my comfort zone. Curiosity has shaped most of what I've learned and built.",
      },
      {
        title: "Build with purpose",
        description:
          "I believe good software should solve meaningful problems. I focus on creating solutions that are thoughtful, reliable, and genuinely useful.",
      },
      {
        title: "Think beyond the code",
        description:
          "Engineering is about more than programming. It's about understanding people, connecting ideas, making decisions, and seeing the bigger picture.",
      },
      {
        title: "Never stop evolving",
        description:
          "There's always a new technology to explore, a different perspective to consider, or a better way to approach something. I enjoy learning as much as building.",
      },
    ],
  },
  beyond: {
    title: "Beyond work",
    paragraphs: [
      "Life isn't just about what we do professionally. Outside of technology, I enjoy **traveling, gaming, meeting new people, and experiencing different cultures**. I like discovering unfamiliar places, having meaningful conversations, and learning from people with different perspectives.",
      "I'm interested in philosophy, new ideas, and understanding the world beyond what's familiar to me. I believe life becomes more interesting when you remain curious, embrace new experiences, and stay open to the unexpected.",
      "There's always somewhere new to go, something new to learn, and another story worth hearing.",
    ],
  },
  connectLinks: [
    {
      name: "Email",
      href: "mailto:ammarralhawamdeh@gmail.com",
      icon: "mail" as const,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ammaralhawamdeh/",
      icon: "linkedin" as const,
    },
    {
      name: "GitHub",
      href: "https://github.com/ammaralhawamdeh",
      icon: "github" as const,
    },
  ],
  connectDescription:
    "I'm always open to interesting conversations, collaborations, and new opportunities. Whether you want to talk about software, AI, an idea you're working on, or simply say hello, I'd be happy to connect.",
};
