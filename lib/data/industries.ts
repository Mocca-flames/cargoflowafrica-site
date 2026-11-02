export type Industry = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "mining-minerals",
    title: "Mining & Minerals",
    description:
      "Coordination of minerals, coal, metals, mining commodities, and related bulk materials safely and compliantly.",
    icon: "gem",
  },
  {
    id: "agriculture",
    title: "Agriculture",
    description:
      "Transportation for agricultural products, grains, cereals, fertilisers, and essential agricultural inputs.",
    icon: "sprout",
  },
  {
    id: "construction",
    title: "Construction & Infrastructure",
    description:
      "Moving cement, building materials, construction supplies, and related structural products to site.",
    icon: "hard-hat",
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Industry",
    description:
      "Handling industrial raw materials, manufactured products, and commercial supplies for factories and plants.",
    icon: "factory",
  },
  {
    id: "trade-distribution",
    title: "Trade & Distribution",
    description:
      "General commercial cargo, containerised goods, and distribution-related shipments across regional borders.",
    icon: "package",
  },
  {
    id: "project-cargo",
    title: "Project & Specialised Cargo",
    description:
      "Cargo requiring particular vehicle configurations, unique handling arrangements, or specific transportation requirements.",
    icon: "train-front",
  },
];
