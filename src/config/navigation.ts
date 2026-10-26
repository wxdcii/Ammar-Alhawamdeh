export const headerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
] as const;

export const moreNav = [
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Publications", href: "/achievements" },
  { label: "Books", href: "/books" },
  { label: "Favourites", href: "/favourites" },
] as const;

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Publications", href: "/achievements" },
  { label: "Books", href: "/books" },
  { label: "Favourites", href: "/favourites" },
] as const;

export const commandItems = [
  ...footerNav.map((item) => ({ label: item.label, href: item.href })),
  { label: "GitHub", href: "https://github.com/ammaralhawamdeh", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ammaralhawamdeh/", external: true },
  { label: "Email", href: "mailto:ammarralhawamdeh@gmail.com", external: true },
];
