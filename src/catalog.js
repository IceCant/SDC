const catalogGroups = [
  {
    slug: "home-product",
    name: "Home Product",
    description: "Hotel-grade comfort and practical essentials for the home.",
    image: "/assets/home-products.jpg",
    products: [
      "Bedding Set", "Kettle Set 0.8L with Welcome Tray", "Towels (Retails)", "Pillow Bag Set",
      "Set Bathrobe & Slipper", "Steam Iron and Iron Board", "Mattress Legacy Code L1",
      "Comfort Mattress C1", "Down Feather", "Hair Dryer Model F22", "Resin Bottle",
      "Mattress Legacy Code L2", "Kettle 1.2L with Welcome Tray", "Waterproof Mattress Protector",
      "Hybrid Mattress", "Topper Microfiber", "Mattress Protector", "Mattress Topper",
      "Lady Americana Mattress Royal Elite",
    ],
  },
  {
    slug: "luxury-pillow",
    name: "Luxury Pillow",
    description: "Supportive hotel pillows across memory foam, latex and down-feather constructions.",
    image: "/assets/hotel-products.jpg",
    products: ["Moulded Memory Foam Pillows", "Latex Foam", "Down Feather Pillow"],
  },
  {
    slug: "sdc-signature",
    name: "7 SDC Items",
    description: "A concise introduction to SDC's core hospitality product range.",
    image: "/assets/hotel-products.jpg",
    products: ["SDC Products"],
  },
  {
    slug: "mattresses",
    name: "Mattresses",
    description: "Guest-room mattress options for comfort, support and long-term hotel use.",
    image: "/assets/mattress-promotion.jpg",
    products: ["Legacy Mattress L2", "Legacy L1", "Hybrid Spring Mattress", "Mattress Comfort C1", "Lady Americana USA Mattress"],
  },
  {
    slug: "bathroom-amenities",
    name: "Bathroom Amenities & Dispensers",
    description: "Refillable dispensers and guest amenity collections for modern bathrooms.",
    image: "/assets/hotel-products.jpg",
    products: ["Wheat Straw Amenities", "Wall Dispenser (Pre-Order)", "Shampoo Dispenser (Available in Stock)", "Premium Collection (Stone Packaging)", "Eco Orchid Collection", "Liquid Refill"],
  },
  {
    slug: "bedding-linen",
    name: "Bedding Linen",
    description: "White hotel linen, guest robes, slippers and pillow protection.",
    image: "/assets/home-products.jpg",
    products: ["Linen White Plain", "Linen White Stripe", "Hotel Slipper (Stock)", "Bathrobe", "Hotel Slipper (Customize)", "Pillow Protector White Plain"],
  },
  {
    slug: "towels",
    name: "Towels",
    description: "Hotel towels and bath mats in classic white and colour options.",
    image: "/assets/home-products.jpg",
    products: ["Towel 100% Cotton", "Towel Color", "Bath Mat (Brown)", "Towel Hem (Single Loop & Double Loops)", "Bath Mat Jacquard Border (White)"],
  },
  {
    slug: "bed-divan",
    name: "Bed & Divan",
    description: "Beds, divans, floating-bed styles and practical extra beds.",
    image: "/assets/hotel-products.jpg",
    products: ["Bed", "Bed (Flying Bed, Floating Bed)", "Divan", "Extra Bed Code X1"],
  },
  {
    slug: "room-accessories",
    name: "Room Accessories",
    description: "In-room presentation pieces spanning dining, tabletop and guest storage.",
    image: "/assets/kettle-promotion.png",
    products: ["F&B Ware", "Table Cloth", "Ashtray & Lighter", "Glasses", "PU Leather Room Set", "Room Hanger"],
  },
  {
    slug: "filling-insert",
    name: "Filling & Insert",
    description: "Protectors, pillows, duvets and toppers that complete the hotel bed.",
    image: "/assets/home-products.jpg",
    products: ["Mattress Protector (Waterproof)", "Pillow Insert", "Microfiber Topper", "Mattress Protector (Dirt Protection)", "Duvet Insert", "Hybrid Latex Topper", "Topper (Mattress)"],
  },
  {
    slug: "hotel-appliances",
    name: "Hotel Appliances",
    description: "Guest-room appliances and equipment selected for daily hospitality use.",
    image: "/assets/kettle-promotion.png",
    products: [
      "Safety Box", "Iron Holder", "Hair Dryer Wall-Mounted", "Stand Mirror (Pre-Order)",
      "Wall-Mounted Mirror LED (Pre-Order)", "Speaker Alarm Clock", "Electronic Kettle",
      "Electronic Kettle Tray Set", "Digital Glass Scale", "Mini Bar (Solid Door)",
      "Mini Bar (Glass Door)", "Safety Box (Top Open)", "Wall-Mounted Mirror", "Hair Dryer F22",
      "Room Bin Round Double", "Steam Iron", "Dry Iron", "Ironing Board", "Dustbin (Stainless Steel)",
      "Dry Iron (Black)", "Hair Dryer (Hammer)", "Matte Black Wall-Mounted Mirror LED (Pre-Order)",
      "Kettle 1.2L with Tray Set",
    ],
  },
  {
    slug: "bed-decoration",
    name: "Bed Decoration",
    description: "Finishing details that give guest-room beds a polished visual identity.",
    image: "/assets/custom-logo.jpg",
    products: ["Cushion Case & Cushion Insert", "Bed Runner", "Bed Remover"],
  },
  {
    slug: "housekeeping-cart",
    name: "Housekeeping Carts",
    description: "Operational carts for laundry, luggage and efficient room service.",
    image: "/assets/event-training.jpg",
    products: ["Housekeeping Trolley Laundry", "Stainless Steel Luggage Cart", "Housekeeping Service Carts"],
  },
];

export function slugify(value) {
  if (typeof value !== "string" || !value.trim()) throw new Error("A product name is required to create a slug.");
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const catalog = catalogGroups.flatMap((group) => group.products.map((name, index) => ({
  id: `${group.slug}-${slugify(name)}`,
  slug: slugify(name),
  name,
  group: group.name,
  groupSlug: group.slug,
  description: group.description,
  image: `/assets/products/${group.slug}-${slugify(name)}.jpg`,
  status: /pre-order/i.test(name) ? "Pre-order" : /stock/i.test(name) ? "In stock" : "Quote required",
  featured: index === 0 || /hybrid|kettle|linen white|towel 100/i.test(name),
})));

export const catalogCategories = catalogGroups.map(({ products, ...group }) => ({ ...group, count: products.length }));

export const customLogoProjects = [
  "CFM", "Qube Resort", "Kep West", "Twin Hotel", "Grand JM Hotel", "Bassac Signature Hotel and Residence",
  "Dynasty Casino and Hotel", "Anusa Hospital", "The Scenic Hotel", "Two Seasons Siem Reap Hotel",
  "Golden Galaxy Hotel & Casino", "AFB 88", "Won Majestic Hotel", "Prince Time Hotel", "Blue Horizon",
  "Green Palm Resort", "T Steam Sauna Massage", "Wisney Hotel", "Ha Tien Vegas Entertainment Resort",
  "R&B", "Montagne Boutique", "La Vogue Hotel", "Grandferte Phnom Penh", "KN&N Hotel", "Hotel Logo Tag",
  "Kep Smile Resort", "Golden Kep Beach Resort", "Rikitavi", "Chhun On Golf Resort", "Try Palace Resort",
  "Veranda Natural Resort", "Peam Snea", "Rainforest Resort", "Lucky Ruby Casino & Hotel", "Legend Hotel", "Silver Town",
];

export const destinations = [
  "Pursat Province", "Sihanoukville", "Phnom Penh", "Kratie", "Siem Reap Province", "Koh Rong Island",
  "Ratanakiri Province", "Preah Vihear", "Stung Treng Province", "Koh Kong & Koh Sdach", "Kep",
  "Kampong Speu Province", "Kampong Chhnang Province", "Kampong Cham Province", "Poipet", "Pailin Province",
  "Svay Rieng (Bavet)", "Takeo Province", "Kampot Province", "Battambang Province", "Mondulkiri",
];

export const eventArchive = [
  ["Cambodia Second International Trade Exhibition", "Trade exhibition"],
  ["Charity Mission and Hygiene", "Community"],
  ["Housekeeping Training (2022)", "Training"],
  ["SDC Exhibition Products Show 2022", "Exhibition"],
  ["Housekeeping Training (2023)", "Training"],
  ["M.O.U Between SDC and CHA 2024", "Partnership"],
  ["SDC Launching Hybrid Mattress Event 2024", "Product launch"],
  ["Cambodian Young Architect Award 2023", "Industry"],
  ["Cambodia National Hospitality Competition 2024", "Competition"],
  ["SDC Exhibition", "Exhibition"],
].map(([title, type], index) => ({
  title,
  type,
  image: `/assets/events/event-${String(index + 1).padStart(2, "0")}.jpg`,
}));

export const educationLibrary = [
  ["Towel Folding Swan — Housekeeping Towel Art", "LiXTFv__NRw", "Housekeeping"],
  ["Hybrid Spring Mattress", "7M41kqTmCZk", "Products"],
  ["5-Star Hotel Bed-Making Skill", "qJ73U40e_Eo", "Housekeeping"],
  ["Hybrid Mattress Production Process", "nOGICDAiOX8", "Factory"],
  ["The Fastest Way to Fold Bedding", "tgC29980xYQ", "Housekeeping"],
  ["Hospitality Seminar", "wyWe6c7HFoA", "Business"],
  ["How to Choose a Hotel Mattress", "xBQN_5gXzR8", "Products"],
  ["Preparation Before and After a Wedding", "kzlA0HnHdP0", "Housekeeping"],
  ["Revenue in High and Low Seasons", "GIz5Ei5a-Uo", "Business"],
  ["Keys to the Hotel Business", "3nB-mB4X3Vg", "Business"],
  ["Insert a Duvet into a Duvet Cover with Ties", "KV58k9wRY_U", "Housekeeping"],
  ["Factory Tour with SDC", "NwOB5nASTB4", "Factory"],
  ["Bedding Set for a Single Bed", "Dke4TtsyXAM", "Housekeeping"],
  ["Insert a Pillowcase onto a Pillow", "Nr1AcpObrtY", "Housekeeping"],
  ["CHA Member Business Meeting", "2hs0uqUa3-Q", "Business"],
  ["How Often Are Hotel Pillows Washed?", "8ermKifzTuI", "Housekeeping"],
  ["Tie a Duvet Insert with a Duvet Cover", "7Lhq-hybuYM", "Housekeeping"],
  ["SDC Launching Hybrid Mattress Event", "xesJ9ZyUNt4", "Events"],
  ["Does SDC Produce Linen and Towels in Thailand?", "8N9cY1rhL-8", "Factory"],
].map(([title, videoId, category], index) => ({
  title,
  category,
  url: `https://www.youtube.com/watch?v=${videoId}`,
  image: `/assets/education-${String(index + 1).padStart(2, "0")}.jpg`,
}));

export const careers = [
  {
    title: "Senior Sales & Marketing Communication", salary: "$400–$700", type: "Full time", location: "Phnom Penh",
    posted: "3 September 2025", expired: "30 November 2025",
    duties: ["Deliver samples to customers", "Prepare quotations and email follow-ups", "Meet and present products to customers", "Plan appointments and prepare daily reports"],
    requirements: ["Two years of sales and marketing experience preferred", "Khmer and English communication", "Chinese language ability requested", "Microsoft Word and Excel", "Independent, outgoing and confident in negotiation"],
  },
  {
    title: "Stock Counter & Delivery", salary: "$300–$400", type: "Full time", location: "Phnom Penh",
    posted: "7 October 2025", expired: "30 November 2025",
    duties: ["Report stock movement", "Control warehouse inventory against purchase invoices", "Perform weekly stock counts", "Prepare ordered goods for delivery", "Report and sign off shortages or surpluses"],
    requirements: ["Two years of relevant experience", "Microsoft Word and Excel", "Bachelor's degree", "Daily reporting and email", "Able to read English"],
  },
];

export function findProductBySlug(slug) {
  if (!slug) return null;
  return catalog.find((product) => product.slug === slug) ?? null;
}
