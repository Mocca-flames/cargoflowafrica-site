export type IndustryBadgeIcon =
  | "shield"
  | "satellite"
  | "weight"
  | "cold"
  | "clock"
  | "container"
  | "escort";

export type IndustryBadge = {
  icon: IndustryBadgeIcon;
  label: string;
};

export type Industry = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  narrative: string;
  image: string;
  imageAlt: string;
  focal: string;
  stats: string[];
  badges: IndustryBadge[];
  cta: { label: string; href: string };
};

export const INDUSTRIES: Industry[] = [
  {
    id: "mining-minerals",
    title: "Mining & Minerals",
    description:
      "Coordination of minerals, coal, metals, mining commodities, and related bulk materials safely and compliantly.",
    icon: "gem",
    category: "Bulk & Extractives",
    narrative:
      "Heavy haulage for minerals, coal and metals across Southern and Central Africa's most demanding corridors. Every bulk movement is planned around payload security, compliance and measured turnaround times, from open-pit to processing plant or port.",
    image: "/images/sectors/mining-minerals.webp",
    imageAlt:
      "Placeholder illustration of a haul truck loaded with ore at an open-pit mine, marked as a temporary staging asset",
    focal: "58% 62%",
    stats: [
      "Fleet payload up to 34t",
      "End-to-end GPS telemetry",
      "Cross-border customs clearance",
    ],
    badges: [
      { icon: "shield", label: "SADC Border Pre-Cleared" },
      { icon: "weight", label: "Heavy Haulage 34-Ton Rated" },
    ],
    cta: { label: "Explore Mining Fleet", href: "#contact" },
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description:
      "Transportation for agricultural products, grains, cereals, fertilisers, and essential agricultural inputs.",
    icon: "sprout",
    category: "Agri & Perishables",
    narrative:
      "Grain, cereals, fertiliser and refrigerated cargo moved in step with seasonal harvests. Hoppers and temp-controlled reefers protect product quality from farm gate to silo, mill or export point along established cross-border agro-corridors.",
    image: "/images/sectors/agriculture.webp",
    imageAlt:
      "Placeholder illustration of a grain hopper truck beside field rows and silos, marked as a temporary staging asset",
    focal: "50% 58%",
    stats: [
      "Reefer & hopper capacity",
      "Seasonal surge fleet access",
      "Cross-border agro corridors",
    ],
    badges: [
      { icon: "cold", label: "Temp Monitored: 4°C" },
      { icon: "clock", label: "Harvest Surge Fleet Ready" },
    ],
    cta: { label: "Request Corridor Rates", href: "#contact" },
  },
  {
    id: "construction",
    title: "Construction & Infrastructure",
    description:
      "Moving cement, building materials, construction supplies, and related structural products to site.",
    icon: "hard-hat",
    category: "Projects & Site Logistics",
    narrative:
      "Cement, structural materials and building supplies delivered to urban sites and remote mega-projects alike. Flatbeds, cement tankers and site-ready vehicles keep programme schedules moving from first delivery to final pour.",
    image: "/images/sectors/construction.webp",
    imageAlt:
      "Placeholder illustration of a tower crane and cement tanker at a construction site, marked as a temporary staging asset",
    focal: "62% 60%",
    stats: [
      "Cement tanker capability",
      "Remote site delivery",
      "Mega-project supply lines",
    ],
    badges: [
      { icon: "weight", label: "Load Rated to 34 Tons" },
      { icon: "clock", label: "Site Delivery Windows" },
    ],
    cta: { label: "Book Route Assessment", href: "#contact" },
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Industry",
    description:
      "Handling industrial raw materials, manufactured products, and commercial supplies for factories and plants.",
    icon: "factory",
    category: "Industrial & Commercial",
    narrative:
      "Raw materials in, finished products out — manufacturing supply lines run on Just-in-Time discipline. Enclosed tautliners and curtainsiders protect plant-bound cargo on dedicated warehouse-to-factory routes, on schedule in all weather.",
    image: "/images/sectors/manufacturing.webp",
    imageAlt:
      "Placeholder illustration of enclosed tautliner trucks at a factory with stacks and warehouses, marked as a temporary staging asset",
    focal: "55% 60%",
    stats: [
      "JIT line-feed scheduling",
      "Enclosed tautliner fleet",
      "Warehouse-to-plant lanes",
    ],
    badges: [
      { icon: "clock", label: "JIT Window: ±15 min" },
      { icon: "shield", label: "Enclosed All-Weather Loading" },
    ],
    cta: { label: "Plan a JIT Line-Feed", href: "#contact" },
  },
  {
    id: "trade-distribution",
    title: "Trade & Distribution",
    description:
      "General commercial cargo, containerised goods, and distribution-related shipments across regional borders.",
    icon: "package",
    category: "Trade & Intermodal",
    narrative:
      "Containerised goods and general commercial cargo moving through bonded corridors and regional borders. Intermodal handling and distribution fleets keep trade lanes, wholesalers and retail shelves stocked across the region.",
    image: "/images/sectors/trade-distribution.webp",
    imageAlt:
      "Placeholder illustration of stacked shipping containers under a gantry crane with a container truck, marked as a temporary staging asset",
    focal: "60% 55%",
    stats: [
      "Intermodal container handling",
      "Bonded warehousing access",
      "Regional retail distribution",
    ],
    badges: [
      { icon: "shield", label: "SADC Border Pre-Cleared" },
      { icon: "container", label: "Bonded Warehouse Linked" },
    ],
    cta: { label: "Request Distribution Rates", href: "#contact" },
  },
  {
    id: "project-cargo",
    title: "Project & Specialised Cargo",
    description:
      "Cargo requiring particular vehicle configurations, unique handling arrangements, or specific transportation requirements.",
    icon: "train-front",
    category: "Specialised Freight",
    narrative:
      "Out-of-gauge freight and abnormal loads engineered move-by-move. Route surveys, escort vehicles and bespoke vehicle configurations get impossible dimensions to site — safely, legally and on programme.",
    image: "/images/sectors/project-cargo.webp",
    imageAlt:
      "Placeholder illustration of a low-loader carrying an out-of-gauge beam with escort vehicles, marked as a temporary staging asset",
    focal: "64% 64%",
    stats: [
      "OOG & abnormal-load routing",
      "Escort vehicle coordination",
      "Bespoke vehicle configurations",
    ],
    badges: [
      { icon: "shield", label: "Route Survey Approved" },
      { icon: "escort", label: "Escort Convoy Equipped" },
    ],
    cta: { label: "Request Engineering Review", href: "#contact" },
  },
];
