export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Understand Your Requirement",
    description:
      "You provide the essential shipment details, including cargo type, quantity, loading point, destination, preferred vehicle, required dates, and any special conditions.",
    icon: "file-text",
  },
  {
    number: "02",
    title: "Source Suitable Transport Capacity",
    description:
      "We identify potential transport operators from our network based on vehicle availability, carrying capacity, route suitability, and operational requirements.",
    icon: "search",
  },
  {
    number: "03",
    title: "Match & Confirm",
    description:
      "We facilitate communication between relevant parties to confirm vehicle suitability, availability, transportation rates, scheduling, and commercial terms.",
    icon: "handshake",
  },
  {
    number: "04",
    title: "Coordinate the Movement",
    description:
      "Once arrangements are confirmed, the transporter undertakes the shipment while Cargo Flow Africa supports communication and coordination throughout the movement.",
    icon: "truck",
  },
  {
    number: "05",
    title: "Delivery & Completion",
    description:
      "Cargo is delivered to the agreed destination, with relevant delivery information and documentation handled according to arrangements.",
    icon: "check-circle",
  },
];
