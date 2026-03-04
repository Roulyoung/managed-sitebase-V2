import { MapPin } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getLandingSectionHash, getLocaleFromPath, withLocalePath } from "@/lib/i18n";
import { t } from "@/lib/messages";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { SITE_CONFIG } from "@/lib/siteConfig";

const Footer = () => {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const isEn = locale === "en";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-16">
        <h2 className="sr-only">{isEn ? "Footer navigation" : "Footer navigatie"}</h2>
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={SITE_CONFIG.logoPath}
                alt={`${SITE_CONFIG.siteName} logo`}
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 p-1.5"
              />
              <span className="font-bold text-xl">{SITE_CONFIG.siteName}</span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm mb-6">
              {isEn
                ? "Replace this copy with your own positioning, offer, and brand story."
                : "Vervang deze tekst door je eigen positionering, aanbod en merkverhaal."}
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <div>
                  <div>{SITE_CONFIG.legalName}</div>
                  <div>{SITE_CONFIG.addressLine}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t(locale, "footer.solutions")}</h3>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>
                <a href={withLocalePath("/", locale)} className="hover:text-primary-foreground transition-colors">
                  {t(locale, "footer.webshops")}
                </a>
              </li>
              <li>
                <a href={withLocalePath("/zakelijke-websites", locale)} className="hover:text-primary-foreground transition-colors">
                  {t(locale, "footer.businessSites")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t(locale, "footer.navigation")}</h3>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>
                <a href={`${withLocalePath("/", locale)}${getLandingSectionHash(locale, "contact")}`} className="hover:text-primary-foreground transition-colors">
                  {t(locale, "footer.planCall")}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-primary-foreground transition-colors">
                  {t(locale, "footer.whatsapp")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t(locale, "footer.legal")}</h3>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  {isEn ? "Terms and Conditions" : "Algemene Voorwaarden"}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p suppressHydrationWarning>
            Copyright {new Date().getFullYear()} {SITE_CONFIG.siteName}. {isEn ? "All rights reserved." : "Alle rechten voorbehouden."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
