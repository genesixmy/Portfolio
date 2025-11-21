/**
 * Portfolio Projects Data
 */

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  gradient: string;
  imageUrl: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Rarebits",
    category: "Web App",
    description: "Sistem pengurusan jualan mainan terpakai. Mudahkan proses inventori, tracking jualan, dan pengurusan pelanggan.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    imageUrl: "/projects/rarebits.svg",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "DraftlyCV",
    category: "Tool",
    description: "Resume builder ringkas yang ATS-friendly dengan live viewing dan realtime preview. Bina CV profesional dalam minit.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    imageUrl: "/projects/draftlycv.svg",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Genesix Blog",
    category: "Platform",
    description: "Blog gaming & esports untuk komuniti gamers Malaysia. Berita terkini, tips & tricks, dan review games.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    imageUrl: "/projects/genesix-blog.svg",
    tags: ["Next.js", "MDX", "Vercel"],
    link: "#",
    featured: true,
  },
  {
    id: 4,
    title: "ArenaHub",
    category: "Platform",
    description: "Platform info acara esukan untuk sekolah. Cari tournament, daftar pasukan, dan track keputusan pertandingan.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    imageUrl: "/projects/arenahub.svg",
    tags: ["Next.js", "Supabase", "Real-time"],
    link: "#",
  },
];

export const projectCategories = ["All", "Web App", "Platform", "Tool"];
