import { Helmet } from "react-helmet-async";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { getAlternateHrefLangs, getLandingSectionId, getLocaleFromPath, stripLocaleFromPath } from "@/lib/i18n";
import { SITE_CONFIG } from "@/lib/siteConfig";

const Webshop = () => {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const isEn = locale === "en";
  const pathWithoutLocale = stripLocaleFromPath(location.pathname);
  const alternateLinks = getAlternateHrefLangs(pathWithoutLocale);
  const contactId = getLandingSectionId(locale, "contact");
  const title = isEn ? `E-commerce Template | ${SITE_CONFIG.siteName}` : `Webshop-template | ${SITE_CONFIG.siteName}`;
  const description = isEn
    ? "A clean storefront template for a new brand. Replace the proposition, pricing, and supporting copy with your own."
    : "Een schone webshop-template voor een nieuw merk. Vervang de propositie, prijzen en ondersteunende copy met je eigen inhoud.";
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${location.pathname}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        {alternateLinks.map((alt) => (
          <link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.href} />
        ))}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_CONFIG.siteName} />
      </Helmet>
      <Header />
      <main className="pt-24 pb-20 space-y-24">
        <section className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                {isEn ? "Neutral template" : "Neutrale template"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                {isEn ? "This webshop page is now ready for a new brand." : "Deze webshop-pagina is nu klaar voor een nieuw merk."}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {isEn
                  ? "The old branding has been removed. Use this page as a clean starting point for your own offer, visuals, proof points, and conversion flow."
                  : "De oude branding is verwijderd. Gebruik deze pagina als schone basis voor je eigen aanbod, visuals, bewijskracht en conversieflow."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="lg" className="group">
                  <a href={`#${contactId}`}>
                    {isEn ? "Edit this offer" : "Pas dit aanbod aan"}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
                  <a href={SITE_CONFIG.whatsappHref} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4" />
                    {isEn ? "Open WhatsApp" : "Open WhatsApp"}
                  </a>
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {isEn ? "Replace these first" : "Vervang deze onderdelen eerst"}
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <CheckCircle2 className="text-success mt-1" size={18} />
                  <span>{isEn ? "Brand name, domain, logo, and contact details" : "Merknaam, domein, logo en contactgegevens"}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-success mt-1" size={18} />
                  <span>{isEn ? "Hero copy, pricing, and offer positioning" : "Hero-copy, prijzen en positionering van het aanbod"}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="text-success mt-1" size={18} />
                  <span>{isEn ? "Case studies, testimonials, and trust signals" : "Cases, testimonials en trust-signals"}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: isEn ? "Offer block" : "Aanbodblok",
                body: isEn ? "Use this space for your own package or product proposition." : "Gebruik deze ruimte voor je eigen pakket of productpropositie.",
              },
              {
                title: isEn ? "Proof block" : "Bewijsblok",
                body: isEn ? "Add customer results, screenshots, or industry-specific proof." : "Voeg klantresultaten, screenshots of sectorspecifiek bewijs toe.",
              },
              {
                title: isEn ? "Process block" : "Procesblok",
                body: isEn ? "Explain your delivery process in clear steps." : "Leg je werkwijze uit in duidelijke stappen.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id={contactId} className="container mx-auto">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isEn ? "Final step before launch" : "Laatste stap voor livegang"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              {isEn
                ? "Review every placeholder in this template before publishing. This page is intentionally neutral so you can layer your own visual identity and messaging on top."
                : "Loop elke placeholder in deze template na voordat je publiceert. Deze pagina is bewust neutraal gemaakt zodat je er je eigen visuele identiteit en boodschap op kunt bouwen."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="lg">
                <a href={`mailto:${SITE_CONFIG.supportEmail}`}>{isEn ? "Update contact details" : "Werk contactgegevens bij"}</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={SITE_CONFIG.whatsappHref} target="_blank" rel="noreferrer">
                  {isEn ? "Replace WhatsApp link" : "Vervang WhatsApp-link"}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Webshop;
