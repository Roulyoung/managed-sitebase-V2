export type CalcBoxData = {
  title?: string;
  items?: string[];
  leftTitle?: string;
  leftItems?: string[];
  rightTitle?: string;
  rightItems?: string[];
  summary?: string;
};

export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "h2"; value: string }
  | { type: "calc_box"; data: CalcBoxData }
  | { type: "cta_box"; data?: { title?: string; body?: string } };

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  readingTime?: string;
  content: ContentBlock[];
};

const postsNl: Post[] = [
  {
    id: "template-voorbereiden-voor-lancering",
    title: "Checklist om deze template klaar te maken voor een nieuwe lancering",
    excerpt: "Welke onderdelen je direct moet vervangen voordat je met een nieuwe merkidentiteit live gaat.",
    date: "2026-03-01",
    tags: ["Template", "Launch"],
    readingTime: "4 min",
    content: [
      {
        type: "text",
        value: "Deze template is opgeschoond tot een neutrale basis. Voor livegang vervang je nog je merknaam, logo, kleuren, metadata, contactgegevens en juridische pagina's.",
      },
      { type: "h2", value: "Begin met de merkbasis" },
      {
        type: "text",
        value: "Zet eerst je merknaam, domein, logo en contactkanalen goed in de centrale configuratie. Daarna kun je de rest van de pagina's veel sneller invullen.",
      },
      {
        type: "calc_box",
        data: {
          title: "Aanbevolen eerste stappen",
          items: [
            "Werk site-url, merknaam en logo bij.",
            "Vervang contactgegevens en bedrijfsinformatie.",
            "Controleer SEO-titels, descriptions en social previews.",
          ],
        },
      },
      {
        type: "cta_box",
        data: {
          title: "Maak de template van jezelf",
          body: "Gebruik deze blogruimte voor je eigen artikelen, cases of documentatie zodra de branding en propositie zijn ingevuld.",
        },
      },
    ],
  },
  {
    id: "wat-je-moet-vervangen-in-template-copy",
    title: "Wat je moet vervangen in template-copy voordat je live gaat",
    excerpt: "Een praktische lijst met de copyblokken die teams vaak vergeten tijdens rebranding.",
    date: "2026-03-02",
    tags: ["Content", "Branding"],
    readingTime: "5 min",
    content: [
      {
        type: "text",
        value: "Ook na technische cleanup blijven vaak subtiele placeholders staan. Denk aan footer-teksten, FAQ-antwoorden, PWA-teksten en juridische links.",
      },
      { type: "h2", value: "Controleer alle conversion-punten" },
      {
        type: "text",
        value: "Loop alle CTA's, formulieren, WhatsApp-links en e-mailadressen na. Dat zijn precies de plekken waar oude branding het meeste opvalt.",
      },
      {
        type: "calc_box",
        data: {
          leftTitle: "Mag tijdelijk placeholder blijven",
          leftItems: ["Voorbeeldteksten", "Concept FAQ-antwoorden", "Template blogposts"],
          rightTitle: "Moet direct definitief zijn",
          rightItems: ["Merknaam", "Domein", "Contactgegevens", "Juridische informatie"],
          summary: "Vervang eerst alles wat zichtbaar, klikbaar of indexeerbaar is.",
        },
      },
    ],
  },
];

const postsEn: Post[] = [
  {
    id: "prepare-your-template-for-launch",
    title: "Checklist to prepare this template for a new launch",
    excerpt: "The key elements to replace before you go live with a new brand identity.",
    date: "2026-03-01",
    tags: ["Template", "Launch"],
    readingTime: "4 min",
    content: [
      {
        type: "text",
        value: "This template has been cleaned into a neutral base. Before launch, replace your brand name, logo, colors, metadata, contact details, and legal pages.",
      },
      { type: "h2", value: "Start with the brand basics" },
      {
        type: "text",
        value: "Update your brand name, domain, logo, and contact channels in the central configuration first. After that, the rest of the site becomes much easier to adapt.",
      },
      {
        type: "calc_box",
        data: {
          title: "Recommended first steps",
          items: [
            "Update site URL, brand name, and logo.",
            "Replace contact details and company information.",
            "Review SEO titles, descriptions, and social previews.",
          ],
        },
      },
      {
        type: "cta_box",
        data: {
          title: "Make the template your own",
          body: "Use this blog area for your own articles, cases, or documentation once the branding and offer are defined.",
        },
      },
    ],
  },
  {
    id: "what-to-replace-in-template-copy",
    title: "What to replace in template copy before launch",
    excerpt: "A practical list of the copy blocks teams often forget during rebranding.",
    date: "2026-03-02",
    tags: ["Content", "Branding"],
    readingTime: "5 min",
    content: [
      {
        type: "text",
        value: "Even after a technical cleanup, subtle placeholders usually remain. Think of footer copy, FAQ answers, PWA text, and unfinished legal links.",
      },
      { type: "h2", value: "Review every conversion touchpoint" },
      {
        type: "text",
        value: "Check every CTA, form, WhatsApp link, and email address. Those are exactly the places where leftover branding causes the most damage.",
      },
      {
        type: "calc_box",
        data: {
          leftTitle: "Can stay temporary",
          leftItems: ["Placeholder copy", "Draft FAQ answers", "Template blog posts"],
          rightTitle: "Must be final",
          rightItems: ["Brand name", "Domain", "Contact details", "Legal information"],
          summary: "Replace everything that is visible, clickable, or indexable first.",
        },
      },
    ],
  },
];

export const posts = postsNl;
export const getPostsForLocale = (locale: string): Post[] => (locale === "en" ? postsEn : postsNl);
export const PAGE_SIZE = 6;

export const paginate = <T,>(items: T[], page: number, perPage: number): T[] => {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};
