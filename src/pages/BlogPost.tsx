import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, CalendarDays, Share2, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { Button } from "@/components/ui/button";
import { getPostsForLocale, PAGE_SIZE, paginate, type ContentBlock } from "@/lib/blogData";
import { getAlternateHrefLangs, getLandingSectionHash, getLocaleFromPath, stripLocaleFromPath, withLocalePath } from "@/lib/i18n";
import { SITE_CONFIG } from "@/lib/siteConfig";

const formatDate = (value: string, isEn: boolean) =>
  new Intl.DateTimeFormat(isEn ? "en-GB" : "nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const BlogPost = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const locale = getLocaleFromPath(location.pathname);
  const isEn = locale === "en";
  const posts = useMemo(() => getPostsForLocale(locale), [locale]);
  const pathWithoutLocale = stripLocaleFromPath(location.pathname);
  const alternateLinks = getAlternateHrefLangs(pathWithoutLocale);
  const searchParams = new URLSearchParams(location.search);
  const initialPage = Number(searchParams.get("page")) || 1;
  const current = posts.find((p) => p.id === slug) ?? posts[0];
  const otherPosts = posts.filter((p) => p.id !== current.id);
  const [page, setPage] = useState(initialPage);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(otherPosts.length / PAGE_SIZE) || 1), [otherPosts.length]);
  const listing = useMemo(() => paginate(otherPosts, page, PAGE_SIZE), [page, otherPosts]);
  const title = current.title;
  const description = current.excerpt;
  const publishedDate = formatDate(current.date, isEn);
  const canonical = `${SITE_CONFIG.siteUrl}${location.pathname}`;

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    datePublished: current.date,
    dateModified: current.date,
    author: { "@type": "Organization", name: SITE_CONFIG.siteName },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.siteName,
      logo: { "@type": "ImageObject", url: `${SITE_CONFIG.siteUrl}${SITE_CONFIG.logoPath}` },
    },
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case "h2":
        return (
          <h2 key={idx} className="font-extrabold text-3xl mt-16 mb-6">
            {block.value}
          </h2>
        );
      case "text":
        return (
          <p key={idx} className="text-lg leading-relaxed mb-6">
            {block.value}
          </p>
        );
      case "calc_box":
        return (
          <div key={idx} className="bg-gray-50 p-8 rounded-xl my-10">
            {block.data.title && <h3 className="font-semibold text-2xl mb-5">{block.data.title}</h3>}
            {block.data.items && (
              <ul className="space-y-2">
                {block.data.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {(block.data.leftItems || block.data.rightItems) && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {block.data.leftTitle && <h3 className="font-semibold text-xl mb-4">{block.data.leftTitle}</h3>}
                  <ul className="space-y-2">
                    {(block.data.leftItems || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  {block.data.rightTitle && <h3 className="font-semibold text-xl mb-4">{block.data.rightTitle}</h3>}
                  <ul className="space-y-2">
                    {(block.data.rightItems || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {block.data.summary && <p className="text-lg leading-relaxed mt-6 font-semibold">{block.data.summary}</p>}
          </div>
        );
      case "cta_box":
        return (
          <section key={idx} className="bg-black text-white p-10 rounded-2xl my-16 text-center">
            <h2 className="font-extrabold text-3xl">{block.data?.title ?? (isEn ? "Update this CTA" : "Werk deze CTA bij")}</h2>
            <p className="text-lg leading-relaxed mt-4">
              {block.data?.body ?? (isEn ? "Replace this block with your own offer or next step." : "Vervang dit blok door je eigen aanbod of vervolgstap.")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <Button asChild variant="hero" size="lg">
                <a href={`${withLocalePath("/", locale)}${getLandingSectionHash(locale, "contact")}`}>{isEn ? "Contact us" : "Neem contact op"}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <a href={SITE_CONFIG.whatsappHref} target="_blank" rel="noreferrer">
                  {isEn ? "Open WhatsApp" : "Open WhatsApp"}
                </a>
              </Button>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${title} | ${SITE_CONFIG.siteName} Blog`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {alternateLinks.map((alt) => (
          <link key={alt.locale} rel="alternate" hrefLang={alt.locale} href={alt.href} />
        ))}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      </Helmet>
      <Header />
      <main className="pt-24">
        <article className="container mx-auto max-w-5xl pb-20">
          <div className="mb-6 flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => navigate(`${withLocalePath("/blog", locale)}?page=${page}`)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {isEn ? "Back to blog overview" : "Terug naar blogoverzicht"}
            </Button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {isEn ? "Template article" : "Template artikel"}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <div className="relative p-8 md:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                <Tag className="w-4 h-4" />
                Blog
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">{title}</h1>
              <p className="text-xl text-muted-foreground max-w-4xl">{description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span suppressHydrationWarning>{publishedDate}</span>
                </span>
                {current.tags && (
                  <span className="inline-flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {current.tags.join(", ")}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  {current.readingTime ?? "5 min"}
                </span>
              </div>
            </div>
          </div>

          <section className="article-body max-w-[720px] mx-auto text-lg leading-relaxed text-foreground mt-10">
            {current.content.map((block, idx) => renderBlock(block, idx))}
          </section>

          <section className="mt-16 space-y-6">
            <div className="rounded-2xl border border-border bg-card/80 p-6">
              <h3 className="text-lg font-semibold text-foreground">{isEn ? "Written by" : "Geschreven door"}</h3>
              <p className="text-foreground font-bold">{SITE_CONFIG.authorName}</p>
              <p className="text-muted-foreground text-sm">{isEn ? SITE_CONFIG.authorRoleEn : SITE_CONFIG.authorRoleNl}</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{isEn ? "More articles" : "Meer artikelen"}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {listing.map((post) => (
                  <article key={post.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <CalendarDays className="w-4 h-4" />
                      <span suppressHydrationWarning>{formatDate(post.date, isEn)}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      <a href={`${withLocalePath(`/blog/${post.id}`, locale)}?page=${page}`} className="hover:text-accent transition-colors">
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </article>
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 my-8">
                  <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(Math.max(1, page - 1))}>
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    {isEn ? "Previous" : "Vorige"}
                  </Button>
                  <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(Math.min(totalPages, page + 1))}>
                    {isEn ? "Next" : "Volgende"}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default BlogPost;
