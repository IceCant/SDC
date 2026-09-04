import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Briefcase, CheckCircle, EnvelopeSimple, List, MagnifyingGlass,
  MapPin, Package, Phone, Play, SealCheck, X,
} from "@phosphor-icons/react";
import {
  careers, catalog, catalogCategories, customLogoProjects, destinations, educationLibrary,
  eventArchive, findProductBySlug,
} from "./catalog";
import { getInitialLanguage, translations } from "./i18n";

const LanguageContext = createContext(null);

function useLanguage() {
  const languageContext = useContext(LanguageContext);
  if (!languageContext) throw new Error("Language controls must be used inside LanguageContext.");
  return languageContext;
}

const promotions = [
  { name: "Kettle Set 1.2L", description: "The set includes one 1.2-litre kettle, one welcome tray, two black cups and two coffee spoons.", image: "/assets/kettle-promotion.png" },
  { name: "Lady Americana Mattress", description: "The Royal Elite is a premium Euro-top mattress combining Serene Gel Foam and individually encased coils for balanced comfort and support.", image: "/assets/mattress-promotion.jpg" },
];
const clients = [1, 2, 3, 4, 5, 6].map((number) => `/assets/client-${number}.${number === 6 ? "png" : "jpg"}`);

function parseHashRoute() {
  const route = window.location.hash.replace(/^#\/?/, "").split("?")[0].replace(/\/$/, "");
  if (!route || route === "home") return { page: "home", slug: null };
  const [page, slug] = route.split("/");
  const supportedPages = new Set(["products", "product", "custom", "coverage", "promotions", "events", "education", "careers", "contact", "terms"]);
  if (!supportedPages.has(page)) return { page: "not-found", slug: null };
  return { page, slug: slug || null };
}

function useHashRoute() {
  const [route, setRoute] = useState(parseHashRoute);
  useEffect(() => {
    const handleHashChange = () => { setRoute(parseHashRoute()); window.scrollTo({ top: 0, behavior: "instant" }); };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  return route;
}

function goTo(route) { window.location.hash = route === "home" ? "#/" : `#/${route}`; }

function LanguageSwitch() {
  const { copy, language, setLanguage } = useLanguage();
  return <div className="language-switch" role="group" aria-label={copy.language.label}><button className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button><button className={language === "km" ? "selected" : ""} onClick={() => setLanguage("km")} aria-pressed={language === "km"}>ខ្មែរ</button><button className={language === "zh" ? "selected" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button></div>;
}

function Header({ activePage, onQuote }) {
  const { copy } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [["home", copy.nav.home], ["products", copy.nav.products], ["events", copy.nav.events], ["promotions", copy.nav.promotions], ["education", copy.nav.education], ["contact", copy.nav.contact]];
  const navigate = (route) => { setIsMenuOpen(false); goTo(route); };
  return <header className="site-header">
    <button className="brand" onClick={() => navigate("home")} aria-label="SDC Hotel Supply home"><img src="/assets/sdc-logo.png" alt="SDC Hotel Supply" /><span><strong>SDC</strong>HOTEL SUPPLY</span></button>
    <nav className={isMenuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">{links.map(([route, label]) => <button className={activePage === route ? "active" : ""} key={route} onClick={() => navigate(route)}>{label}</button>)}</nav>
    <div className="header-actions"><LanguageSwitch /><button className="header-cta" onClick={onQuote}>{copy.action.requestQuote}</button></div>
    <button className="menu-button" onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={isMenuOpen}>{isMenuOpen ? <X size={24} /> : <List size={26} />}</button>
  </header>;
}

function QuoteModal({ isOpen, onClose, interest = "" }) {
  const [isSent, setIsSent] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    if (!isOpen) {
      setIsSent(false);
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => modalRef.current?.querySelector("input, button")?.focus());
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section ref={modalRef} className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title" onMouseDown={(event) => event.stopPropagation()}>
    <button className="modal-close" onClick={onClose} aria-label="Close quote form"><X size={23} /></button>
    {isSent ? <div className="success-state"><CheckCircle size={56} weight="fill" /><p className="eyebrow">Message ready</p><h2 id="quote-title">Thank you.</h2><p>This prototype has validated your request. The production site can connect this form to email, WhatsApp or a CRM.</p><button className="button button-dark" onClick={onClose}>Back to the website</button></div> : <><p className="eyebrow">Start a conversation</p><h2 id="quote-title">Request a quote</h2><p>Tell us what your property needs. The SDC team will help match products, quantities and branding.</p><form className="quote-form" onSubmit={(event) => { event.preventDefault(); setIsSent(true); }}><label>Name<input name="name" required placeholder="Your name" /></label><label>Hotel or company<input name="company" required placeholder="Property name" /></label><div className="form-row"><label>Email<input name="email" required type="email" placeholder="you@hotel.com" /></label><label>Phone<input name="phone" required type="tel" placeholder="+855" /></label></div><label>What do you need?<textarea name="message" required rows="4" defaultValue={interest ? `I'm interested in ${interest}.` : ""} placeholder="Products, quantity, branding, delivery timeline…" /></label><button className="button button-red" type="submit">Send request <ArrowRight size={18} /></button></form></>}
  </section></div>;
}

function PageHero({ eyebrow, title, summary, count }) {
  return <section className="page-hero"><div><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{summary}</p></div>{count && <span className="page-count">{count}</span>}</section>;
}

function ProductCard({ product }) {
  const { copy } = useLanguage();
  return <button className="product-card" onClick={() => goTo(`product/${product.slug}`)} aria-label={`${copy.action.viewProduct}: ${product.name}`}><span className="product-image"><img src={product.thumbnail} srcSet={`${product.thumbnail} 640w, ${product.image} 1280w`} sizes="(max-width: 460px) 100vw, (max-width: 780px) 50vw, 25vw" alt={product.name} loading="lazy" decoding="async" /><span className={`availability ${product.status === "In stock" ? "in-stock" : ""}`}>{copy.status[product.status]}</span></span><span className="product-meta"><small>{product.group}</small><strong>{product.name}</strong><span>{copy.action.viewProduct} <i><ArrowRight size={16} /></i></span></span></button>;
}

function ProductsPage() {
  const { copy } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filteredProducts = useMemo(() => catalog.filter((product) => {
    const matchesCategory = category === "all" || product.groupSlug === category;
    return matchesCategory && product.name.toLowerCase().includes(query.trim().toLowerCase());
  }), [category, query]);
  const hasActiveFilters = category !== "all" || query.trim();
  const clearFilters = () => { setCategory("all"); setQuery(""); };
  return <><PageHero eyebrow={copy.products.eyebrow} title={copy.products.title} summary={copy.products.summary} count={`${catalog.length} products`} /><section className="catalog-section"><div className="catalog-toolbar"><label className="search-box"><MagnifyingGlass size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.products.search} aria-label={copy.products.search} />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={17} /></button>}</label><select aria-label="Filter by collection" value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">{copy.products.allCollections}</option>{catalogCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name} ({item.count})</option>)}</select></div><div className="category-directory" aria-label="Product collections"><button className={category === "all" ? "selected" : ""} onClick={() => setCategory("all")}><span>{copy.products.allProducts}</span><small>{catalog.length}</small></button>{catalogCategories.map((item) => <button className={category === item.slug ? "selected" : ""} onClick={() => setCategory(item.slug)} key={item.slug}><span>{item.name}</span><small>{item.count}</small></button>)}</div><div className="results-line"><div><strong>{filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}</strong>{category !== "all" && <span> in {catalogCategories.find((item) => item.slug === category)?.name}</span>}</div>{hasActiveFilters ? <button onClick={clearFilters}>{copy.action.clearFilters} <X size={14} /></button> : <span>{copy.products.photography}</span>}</div>{filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><Package size={38} /><h3>{copy.products.noResults}</h3><p>{copy.products.noResultsText}</p><button className="button button-dark" onClick={clearFilters}>{copy.action.showAllProducts}</button></div>}</section><SpecialCollections /></>;
}

function ProductPage({ slug, onQuote }) {
  const { copy } = useLanguage();
  const product = findProductBySlug(slug);
  if (!product) return <NotFoundPage />;
  const exactKettle = product.name === "Kettle 1.2L with Tray Set";
  const related = catalog.filter((item) => item.groupSlug === product.groupSlug && item.id !== product.id).slice(0, 4);
  return <><section className="product-detail"><button className="back-link" onClick={() => goTo("products")}><ArrowLeft size={17} />{copy.action.backToProducts}</button><div className="product-detail-grid"><div className="detail-media"><img src={product.image} alt={product.name} /><span>{copy.products.photography}</span></div><div className="detail-copy"><p className="eyebrow">{product.group}</p><h1>{product.name}</h1><p className="detail-lead">{product.description}</p><div className="detail-facts"><p><small>Availability</small><strong>{copy.status[product.status]}</strong></p><p><small>Pricing</small><strong>{copy.action.requestQuote}</strong></p><p><small>Support</small><strong>Phnom Penh team</strong></p></div>{exactKettle ? <div className="spec-box"><h3>Original specifications</h3><ul><li>Strong polished melamine welcome tray</li><li>Black finish</li><li>Tray: 42 × 30 × 3 cm</li><li>Integrated kettle space</li></ul></div> : <div className="spec-box"><h3>Specifications on request</h3><p>The original website lists this product without reliable dimensions or material details. Contact SDC for current sizes, finishes, minimum quantities and lead time.</p></div>}<button className="button button-red" onClick={() => onQuote(product.name)}>{copy.action.requestQuote} <ArrowRight size={18} /></button></div></div></section>{related.length > 0 && <section className="related-section"><p className="eyebrow">Same collection</p><h2>You may also need.</h2><div className="product-grid compact">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}</>;
}

function SpecialCollections() {
  return <section className="special-collections"><button onClick={() => goTo("custom")}><img src="/assets/custom-logo.jpg" alt="" /><span><small>36 examples</small><strong>Custom Hotel Logos</strong><em>See branded project references <ArrowRight size={17} /></em></span></button><button onClick={() => goTo("coverage")}><img src="/assets/cambodia-destination.jpg" alt="" /><span><small>21 destinations</small><strong>Coverage Across Cambodia</strong><em>Explore service destinations <ArrowRight size={17} /></em></span></button></section>;
}

function ListPage({ type }) {
  const { copy } = useLanguage();
  const isCustom = type === "custom";
  const items = isCustom ? customLogoProjects : destinations;
  const imageDirectory = isCustom ? "custom-projects/custom" : "destinations/destination";
  const pageCopy = isCustom ? copy.custom : copy.coverage;
  return <><PageHero eyebrow={pageCopy.eyebrow} title={pageCopy.title} summary={pageCopy.summary} count={`${items.length} entries`} /><section className={`visual-directory ${isCustom ? "custom-directory" : "destination-directory"}`}>{items.map((item, index) => { const itemNumber = String(index + 1).padStart(2, "0"); const imagePath = `/assets/${imageDirectory}-${itemNumber}.jpg`; const thumbnailPath = `/assets/${imageDirectory}-${itemNumber}-640.jpg`; return <article key={item}><span className="directory-image"><img src={thumbnailPath} srcSet={`${thumbnailPath} 640w, ${imagePath} 1280w`} sizes="(max-width: 460px) 100vw, (max-width: 780px) 50vw, (max-width: 1050px) 33vw, 25vw" alt={isCustom ? `${item} custom-logo project` : `${item} destination`} loading="lazy" decoding="async" /></span><div><span>{itemNumber}</span><h3>{item}</h3>{isCustom ? <SealCheck size={20} /> : <MapPin size={20} />}</div></article>; })}</section><section className="wide-cta"><div><p className="eyebrow light">Made for your property</p><h2>{pageCopy.cta}</h2></div><button className="button button-light" onClick={() => goTo("contact")}>{copy.action.talkToSdc} <ArrowRight size={18} /></button></section></>;
}

function EventsPage() {
  const { copy } = useLanguage();
  const [featuredEvent, ...otherEvents] = eventArchive;
  return <><PageHero eyebrow={copy.events.eyebrow} title={copy.events.title} summary={copy.events.summary} count={`${eventArchive.length} events`} /><section className="event-archive"><article className="featured-event"><img src={featuredEvent.image} alt={featuredEvent.title} /><div><span>01</span><p className="eyebrow light">{copy.events.featured} · {featuredEvent.type}</p><h2>{featuredEvent.title}</h2><p>{copy.events.supporting}</p></div></article><div className="archive-grid">{otherEvents.map((event, index) => <article key={event.title}><span className="archive-image"><img src={event.thumbnail} srcSet={`${event.thumbnail} 640w, ${event.image} 1280w`} sizes="(max-width: 780px) 100vw, (max-width: 1050px) 50vw, 33vw" alt={event.title} loading="lazy" decoding="async" /><b>{String(index + 2).padStart(2, "0")}</b></span><div><small>{event.type}</small><h3>{event.title}</h3></div></article>)}</div></section></>;
}

function PromotionsPage({ onQuote }) {
  return <><PageHero eyebrow="Current source offers" title="Offers worth checking." summary="The original website advertises 10% off and lists these two promotional products. Confirm availability and final terms directly with SDC." count="2 offers" /><section className="promotion-list">{promotions.map((item, index) => <article key={item.name}><div className="promotion-number">0{index + 1}</div><img src={item.image} alt={item.name} /><div><p className="eyebrow">Promotion</p><h2>{item.name}</h2><p>{item.description}</p><button className="button button-red" onClick={() => onQuote(item.name)}>Check this offer <ArrowRight size={18} /></button></div></article>)}</section></>;
}

function EducationPage() {
  const { copy } = useLanguage();
  const [activeTopic, setActiveTopic] = useState("All");
  const topics = ["All", "Housekeeping", "Products", "Factory", "Business", "Events"];
  const featuredLesson = educationLibrary[0];
  const filteredLessons = activeTopic === "All"
    ? educationLibrary.slice(1)
    : educationLibrary.filter((lesson) => lesson.category === activeTopic);

  return <>
    <PageHero eyebrow={copy.education.eyebrow} title={copy.education.title} summary={copy.education.summary} count={`${educationLibrary.length} lessons`} />
    <section className="education-feature">
      <a href={featuredLesson.url} target="_blank" rel="noreferrer" className="featured-lesson">
        <img src={featuredLesson.image} alt="Towel folding swan video thumbnail" />
        <span className="featured-play"><Play size={25} weight="fill" /></span>
        <span className="featured-caption"><small>{copy.education.featured} · {copy.education.topics.Housekeeping}</small><strong>{featuredLesson.title}</strong><em>{copy.action.watchLesson} <ArrowRight size={17} /></em></span>
      </a>
      <div className="education-intro"><span className="education-index">01</span><p className="eyebrow">{copy.education.learn}</p><h2>Small details make a five-star difference.</h2><p>Use these demonstrations for team refreshers, onboarding and practical housekeeping inspiration.</p><div className="education-stats"><span><strong>19</strong>Video lessons</span><span><strong>6</strong>Useful topics</span></div></div>
    </section>
    <section className="learning-library">
      <div className="library-heading"><div><p className="eyebrow">{copy.education.library}</p><h2>{copy.education.chooseTopic}</h2></div><div className="topic-filters" aria-label="Education topics">{topics.map((topic) => <button className={activeTopic === topic ? "selected" : ""} onClick={() => setActiveTopic(topic)} key={topic}>{copy.education.topics[topic]}</button>)}</div></div>
      <div className="learning-grid">{filteredLessons.map((lesson) => {
        const lessonNumber = educationLibrary.indexOf(lesson) + 1;
        return <a href={lesson.url} target="_blank" rel="noreferrer" key={`${activeTopic}-${lesson.title}`} style={{ "--item-index": lessonNumber % 8 }}><span className="learning-image"><img src={lesson.image} alt={`${lesson.title} video thumbnail`} loading="lazy" decoding="async" /><i><Play size={18} weight="fill" /></i><b>{copy.education.topics[lesson.category]}</b></span><span className="lesson-number">{String(lessonNumber).padStart(2, "0")}</span><h3>{lesson.title}</h3><em>{copy.action.watchLesson} <ArrowRight size={15} /></em></a>;
      })}</div>
    </section>
  </>;
}

function CareersPage() {
  return <><PageHero eyebrow="Work with SDC" title="Career archive." summary="These are the two roles currently shown on the original website. Both list an expiry date of 30 November 2025, so applicants should confirm whether they are still available." count="2 archived roles" /><section className="career-list">{careers.map((job) => <article key={job.title}><div className="career-title"><Briefcase size={28} /><div><span>Expired listing · verify availability</span><h2>{job.title}</h2></div></div><div className="job-facts"><p><small>Salary</small>{job.salary}</p><p><small>Type</small>{job.type}</p><p><small>Location</small>{job.location}</p><p><small>Expired</small>{job.expired}</p></div><div className="job-columns"><div><h3>Responsibilities</h3><ul>{job.duties.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3>Requirements</h3><ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul></div></div><a className="button button-dark" href="mailto:sdc-sell@sdchotelsupply.com?subject=Career enquiry">Confirm with SDC <ArrowRight size={18} /></a></article>)}</section></>;
}

function ContactPage({ onQuote }) {
  return <><PageHero eyebrow="Phnom Penh showroom" title="Let’s build a better guest experience." summary="Send your product list, room count, branding needs or delivery destination. SDC can confirm current specifications, lead time and quotation." /><section className="contact-page"><div className="contact-panel"><p className="eyebrow light">Contact SDC</p><h2>Visit, call or email.</h2><a href="https://maps.google.com/?q=32+St+Hun+Neang+Phnom+Penh" target="_blank" rel="noreferrer"><MapPin size={24} /><span><small>Showroom</small>#32 St Hun Neang, Sangkat Chhak Angrae Kraom, Khan Mean Chhey, Phnom Penh</span></a><a href="tel:+85512866648"><Phone size={24} /><span><small>Phone</small>+855 12 866 648</span></a><a href="mailto:sdc-sell@sdchotelsupply.com"><EnvelopeSimple size={24} /><span><small>Email</small>sdc-sell@sdchotelsupply.com</span></a></div><div className="contact-form-card"><p className="eyebrow">Quotations & enquiries</p><h2>Tell us what you need.</h2><p>For this design prototype, the button opens a prepared enquiry experience. The production version can send directly to your aunt’s preferred inbox.</p><button className="button button-red" onClick={() => onQuote("")}>Start your request <ArrowRight size={18} /></button><div className="response-note"><CheckCircle size={20} weight="fill" /><span><strong>Helpful information to include</strong>Product names, quantities, property location, logo needs and delivery timing.</span></div></div></section></>;
}

function TermsPage() {
  return <><PageHero eyebrow="Website information" title="Terms & conditions." summary="A clearer placeholder for the legal page currently shown on the original SDC website." /><section className="terms-copy"><h2>Before publishing</h2><p>The old website contains generic template language rather than SDC-specific legal terms. It should not be copied into a production website without review.</p><h3>Recommended coverage</h3><p>A final policy should accurately explain quotations, order confirmation, deposits, custom products, delivery, returns, warranties, website content and privacy. A Cambodian legal professional should review the final wording before launch.</p><h3>Prototype status</h3><p>This page intentionally avoids inventing binding commercial terms on SDC’s behalf.</p></section></>;
}

function NotFoundPage() {
  return <section className="not-found"><span>404</span><h1>That page isn’t in the catalog.</h1><p>The link may be old or the product may have moved.</p><button className="button button-red" onClick={() => goTo("products")}>Browse products <ArrowRight size={18} /></button></section>;
}

function HeroMedia() {
  const [canLoadVideo, setCanLoadVideo] = useState(false);
  useEffect(() => {
    const connection = navigator.connection;
    const saveData = connection?.saveData || connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setTimeout(() => setCanLoadVideo(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!canLoadVideo) return <div className="hero-media"><img src="/assets/hotel-products.jpg" alt="Hotel room products supplied by SDC" fetchPriority="high" /></div>;
  return <div className="hero-media"><video autoPlay muted loop playsInline preload="metadata" poster="/assets/hotel-products.jpg"><source src="/assets/hero-hospitality.mp4" type="video/mp4" /></video></div>;
}

function HomePage({ onQuote }) {
  const { copy } = useLanguage();
  const [promotionIndex, setPromotionIndex] = useState(0);
  const promotion = promotions[promotionIndex];
  const featuredProducts = catalog.filter((product) => product.featured).slice(0, 8);
  return <><section className="hero"><div className="hero-copy"><p className="eyebrow light">{copy.home.eyebrow}</p><h1>Think Of Hotel<br />Business, Think Of SDC</h1><div className="since"><span />Since 2008</div><p className="hero-summary">{copy.home.summary}</p><div className="hero-actions"><button className="button button-light" onClick={() => onQuote("")}>{copy.action.requestQuote} <ArrowRight size={19} /></button><button className="button button-outline-light" onClick={() => goTo("products")}>{copy.action.exploreProducts} <ArrowRight size={19} /></button></div><p className="hero-signoff">Supplying quality. Elevating hospitality.</p></div><HeroMedia /></section><section className="home-catalog section"><div className="section-heading"><div><p className="eyebrow">{copy.home.catalogEyebrow}</p><h2>{copy.home.catalogTitle}</h2></div><p>{copy.home.catalogText}</p></div><div className="product-grid home-products">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div><button className="text-link" onClick={() => goTo("products")}>{copy.action.exploreProducts} <ArrowRight size={18} /></button></section><SpecialCollections /><section className="promotion section"><div className="promotion-visual"><img src={promotion.image} alt={promotion.name} /></div><div className="promotion-copy"><p className="eyebrow light">Current promotion · 0{promotionIndex + 1}</p><h2>{promotion.name}</h2><p>{promotion.description}</p><button className="button button-light" onClick={() => onQuote(promotion.name)}>{copy.action.requestQuote} <ArrowRight size={18} /></button><div className="slider-controls"><button onClick={() => setPromotionIndex((promotionIndex + promotions.length - 1) % promotions.length)} aria-label="Previous promotion"><ArrowLeft size={20} /></button><span>{promotionIndex + 1} / {promotions.length}</span><button onClick={() => setPromotionIndex((promotionIndex + 1) % promotions.length)} aria-label="Next promotion"><ArrowRight size={20} /></button></div></div></section><section className="promise-strip"><p><strong>16+ years</strong><span>Hospitality expertise</span></p><p><strong>Custom branding</strong><span>Your identity, every detail</span></p><p><strong>Local support</strong><span>Responsive service in Cambodia</span></p><p><strong>One supplier</strong><span>From room to restaurant</span></p></section><section className="education section"><div className="education-copy"><p className="eyebrow">{copy.education.eyebrow}</p><h2>Better service begins with better skills.</h2><p>Practical hospitality learning for housekeeping teams and property leaders—from factory tours and seminars to step-by-step training.</p><button className="text-link" onClick={() => goTo("education")}>{copy.action.exploreLessons} <ArrowRight size={18} /></button></div><div className="video-lessons">{educationLibrary.slice(0, 2).map((lesson, index) => <a href={lesson.url} target="_blank" rel="noreferrer" className={index === 0 ? "lesson lesson-large" : "lesson"} key={lesson.title}><img src={lesson.image} alt={`${lesson.title} video thumbnail`} loading="lazy" decoding="async" /><span className="play-button"><Play size={20} weight="fill" /></span><strong>{lesson.title}</strong></a>)}</div></section><section className="events section"><div className="section-heading"><div><p className="eyebrow">{copy.events.eyebrow}</p><h2>{copy.events.title}</h2></div><p>{copy.events.supporting}</p></div><div className="events-grid">{eventArchive.slice(0, 4).map((event) => <article className="event-card" key={event.title}><img src={event.image} alt={event.title} loading="lazy" decoding="async" /><div><small>{event.type}</small><h3>{event.title}</h3></div></article>)}</div><button className="text-link" onClick={() => goTo("events")}>{copy.action.viewArchive} <ArrowRight size={18} /></button></section><section className="clients section"><p className="eyebrow">Trusted across Cambodia</p><h2>Supporting memorable stays.</h2><p className="clients-intro">Customers rely on consistent quality, dependable sourcing and responsive delivery.</p><div className="client-row">{clients.map((src) => <img key={src} src={src} alt="SDC customer logo" loading="lazy" decoding="async" />)}</div></section><section className="contact"><div className="contact-copy"><p className="eyebrow light">Let’s work together</p><h2>Ready to elevate your guest experience?</h2><p>Visit the Phnom Penh showroom or tell the team what your property needs.</p><button className="button button-light" onClick={() => onQuote("")}>{copy.action.requestQuote} <ArrowRight size={18} /></button></div><div className="contact-details"><a href="https://maps.google.com/?q=32+St+Hun+Neang+Phnom+Penh" target="_blank" rel="noreferrer"><MapPin size={22} /><span><small>Showroom</small>#32 St Hun Neang, Sangkat Chhak Angrae Kraom, Khan Mean Chhey, Phnom Penh</span></a><a href="tel:+85512866648"><Phone size={22} /><span><small>Call us</small>+855 12 866 648</span></a><a href="mailto:sdc-sell@sdchotelsupply.com"><EnvelopeSimple size={22} /><span><small>Email</small>sdc-sell@sdchotelsupply.com</span></a></div><div className="qr-card"><img src="/assets/showroom-qr.jpg" alt="SDC showroom QR code" /><span>Scan to connect</span></div></section></>;
}

function Footer() {
  return <footer><div className="footer-brand"><img src="/assets/sdc-logo.png" alt="SDC Hotel Supply" /><p>Think Of Hotel Business,<br />Think Of SDC.</p></div><div><strong>Explore</strong><button onClick={() => goTo("products")}>Products</button><button onClick={() => goTo("promotions")}>Promotions</button><button onClick={() => goTo("events")}>Events</button><button onClick={() => goTo("education")}>Education</button></div><div><strong>Company</strong><button onClick={() => goTo("custom")}>Custom Branding</button><button onClick={() => goTo("coverage")}>Coverage</button><button onClick={() => goTo("careers")}>Careers</button><button onClick={() => goTo("contact")}>Contact</button><button onClick={() => goTo("terms")}>Terms</button></div><p className="copyright">© 2026 SDC Hotel Supply. Redesign prototype reconstructed from the company’s existing public website.</p></footer>;
}

export function App() {
  const route = useHashRoute();
  const [language, setLanguage] = useState(getInitialLanguage);
  const [quote, setQuote] = useState({ open: false, interest: "" });
  const openQuote = (interest = "") => setQuote({ open: true, interest });
  useEffect(() => {
    try {
      window.localStorage.setItem("sdc-language", language);
    } catch {}
  }, [language]);
  useEffect(() => {
    const product = route.page === "product" ? findProductBySlug(route.slug) : null;
    const pageTitles = { home: "Hospitality, Elevated", products: "Products", custom: "Custom Hotel Logos", coverage: "Coverage Across Cambodia", promotions: "Promotions", events: "Events", education: "Education", careers: "Careers", contact: "Contact", terms: "Terms & Conditions" };
    document.title = `${product?.name ?? pageTitles[route.page] ?? "Page not found"} | SDC Hotel Supply`;
  }, [route]);
  const pages = { home: <HomePage onQuote={openQuote} />, products: <ProductsPage />, product: <ProductPage slug={route.slug} onQuote={openQuote} />, custom: <ListPage type="custom" />, coverage: <ListPage type="coverage" />, promotions: <PromotionsPage onQuote={openQuote} />, events: <EventsPage />, education: <EducationPage />, careers: <CareersPage />, contact: <ContactPage onQuote={openQuote} />, terms: <TermsPage />, "not-found": <NotFoundPage /> };
  const activeNavigationPage = route.page === "product" ? "products" : route.page;
  const languageValue = { language, setLanguage, copy: translations[language] };
  return <LanguageContext.Provider value={languageValue}><div className="site-shell"><Header activePage={activeNavigationPage} onQuote={() => openQuote("")} /><main>{pages[route.page] ?? pages["not-found"]}</main><Footer /><QuoteModal isOpen={quote.open} interest={quote.interest} onClose={() => setQuote({ open: false, interest: "" })} /></div></LanguageContext.Provider>;
}

export default App;
