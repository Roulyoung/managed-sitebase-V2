export const SITE_CONFIG = {
  siteName: "Your Brand",
  siteSuffix: "",
  siteUrl: "https://example.com",
  logoPath: "/placeholder.svg",
  supportEmail: "hello@example.com",
  fallbackLeadEmail: "lead@example.com",
  phoneDisplay: "+31 6 1234 5678",
  phoneHref: "tel:+31612345678",
  whatsappHref: "https://wa.me/31612345678",
  legalName: "Your Company B.V.",
  addressLine: "Street 1, 1000 AA Amsterdam, Netherlands",
  authorName: "Founding Team",
  authorRoleNl: "Digitale partner",
  authorRoleEn: "Digital partner",
} as const;

export const getAbsoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
};
