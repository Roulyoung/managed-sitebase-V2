import { Check, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getLocaleFromPath } from "@/lib/i18n";

const comparisonData = [
  {
    feature: { nl: "Branding", en: "Branding" },
    previous: { nl: "Nog niet aangepast", en: "Not updated yet" },
    current: { nl: "Direct vervangbaar", en: "Ready to replace" },
  },
  {
    feature: { nl: "Kleuren en typografie", en: "Colors and typography" },
    previous: { nl: "Nog merkgebonden", en: "Still brand-bound" },
    current: { nl: "Neutraal template", en: "Neutral template" },
  },
  {
    feature: { nl: "Logo en assets", en: "Logo and assets" },
    previous: { nl: "Oude branding zichtbaar", en: "Old branding visible" },
    current: { nl: "Placeholder assets", en: "Placeholder assets" },
  },
  {
    feature: { nl: "Metadata en contactinfo", en: "Metadata and contact info" },
    previous: { nl: "Hardcoded", en: "Hardcoded" },
    current: { nl: "In centrale config", en: "In central config" },
  },
];

const Comparison = () => {
  const location = useLocation();
  const locale = getLocaleFromPath(location.pathname);
  const isEn = locale === "en";

  return (
    <section className="py-20 md:py-32 gradient-subtle">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            {isEn ? "Compare" : "Vergelijk"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {isEn ? "What has been cleaned up in this template" : "Wat in deze template is opgeschoond"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isEn ? "Use this section later to explain your own differentiation." : "Gebruik deze sectie later om je eigen onderscheidend vermogen uit te leggen."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
            <div className="grid grid-cols-3 bg-secondary/50">
              <div className="p-4 md:p-6 font-semibold text-foreground">{isEn ? "Element" : "Onderdeel"}</div>
              <div className="p-4 md:p-6 text-center font-semibold text-muted-foreground border-x border-border">
                {isEn ? "Before cleanup" : "Voor opschoning"}
              </div>
              <div className="p-4 md:p-6 text-center">
                <span className="font-bold text-accent">{isEn ? "Current template" : "Huidige template"}</span>
              </div>
            </div>

            {comparisonData.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${index !== comparisonData.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="p-4 md:p-6 text-sm md:text-base text-foreground font-medium">
                  {isEn ? row.feature.en : row.feature.nl}
                </div>
                <div className="p-4 md:p-6 text-center text-sm md:text-base text-muted-foreground border-x border-border flex items-center justify-center gap-2">
                  <X size={16} className="text-destructive flex-shrink-0 hidden sm:block" />
                  <span>{isEn ? row.previous.en : row.previous.nl}</span>
                </div>
                <div className="p-4 md:p-6 text-center text-sm md:text-base font-medium flex items-center justify-center gap-2 bg-success/5">
                  <Check size={16} className="text-success flex-shrink-0" />
                  <span className="text-foreground">{isEn ? row.current.en : row.current.nl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
