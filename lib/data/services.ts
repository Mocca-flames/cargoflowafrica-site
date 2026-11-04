export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  body: string;
  icon?: string;
};

export const SERVICES: Service[] = [
  {
    id: "transport-brokerage",
    number: "01",
    title: "Transport Brokerage & Truck Sourcing",
    description:
      "Identifying available transport operators and suitable vehicles based on cargo type, volume, route, and operational requirements.",
    body:
      "Identifying available transport operators and suitable vehicles based on cargo type, volume, route, and operational requirements.",
    icon: "search",
  },
  {
    id: "commodity-cargo",
    number: "02",
    title: "Commodity & Bulk Cargo Coordination",
    description:
      "Supporting the transportation of minerals, agricultural commodities, industrial materials, and other bulk commercial cargo.",
    body:
      "Supporting the transportation of minerals, agricultural commodities, industrial materials, and other bulk commercial cargo.",
    icon: "boxes",
  },
  {
    id: "cross-border",
    number: "03",
    title: "Local & Cross-Border Transport",
    description:
      "Connecting shippers with transport operators capable of servicing local and regional routes, subject to applicable requirements.",
    body:
      "Connecting shippers with transport operators capable of servicing local and regional routes, subject to applicable requirements.",
    icon: "map",
  },
  {
    id: "capacity-matching",
    number: "04",
    title: "Load & Capacity Matching",
    description:
      "Matching transportation requirements with available vehicle types, carrying capacities, routes, and loading schedules.",
    body:
      "Matching transportation requirements with available vehicle types, carrying capacities, routes, and loading schedules.",
    icon: "settings",
  },
  {
    id: "shipment-coordination",
    number: "05",
    title: "Shipment Communication & Coordination",
    description:
      "Facilitating clear communication between shippers and transporters throughout the agreed transportation process.",
    body:
      "Facilitating clear communication between shippers and transporters throughout the agreed transportation process.",
    icon: "radio",
  },
  {
    id: "documentation",
    number: "06",
    title: "Transport Documentation Support",
    description:
      "Assisting with the coordination of relevant transport information, delivery documentation, and administrative requirements.",
    body:
      "Assisting with the coordination of relevant transport information, delivery documentation, and administrative requirements.",
    icon: "file-signature",
  },
];

export const services = SERVICES;


