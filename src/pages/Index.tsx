import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PainPoints from "@/components/PainPoints";
import Comparison from "@/components/Comparison";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getAlternateHrefLangs, getLocaleFromPath, stripLocaleFromPath } from "@/lib/i18n";
import { SITE_CONFIG } from "@/lib/siteConfig";

const Index = () => {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const isEn = locale === "en";
  const pathWithoutLocale = stripLocaleFromPath(location.pathname);
  const canonical = `${SITE_CONFIG.siteUrl}${location.pathname}`;
  const alternateLinks = getAlternateHrefLangs(pathWithoutLocale);
  const title = isEn ? `Managed Website Template | ${SITE_CONFIG.siteName}` : `Website template voor jouw merk | ${SITE_CONFIG.siteName}`;
  const description = isEn
    ? "A neutral managed-website template. Replace the copy, visual identity, and contact details with your own brand."
    : "Een neutrale website-template. Vervang de copy, visuele identiteit en contactgegevens met die van je eigen merk.";

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {alternateLinks.map((alt) => (
          <link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.href} />
        ))}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <PainPoints />
        <Comparison />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
