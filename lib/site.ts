const HOSTS = {
  za: "https://www.cargoflowafrica.co.za",
  bw: "https://www.cargoflowafrica.co.bw",
} as const;

const site = process.env.SITE === "bw" ? "bw" : "za";

export const SITE_URL: string = HOSTS[site];
export const OG_LOCALE: string = site === "bw" ? "en_BW" : "en_ZA";
export const ALTERNATES: Record<string, string> = {
  "en-ZA": `${HOSTS.za}/`,
  "en-BW": `${HOSTS.bw}/`,
  "x-default": `${HOSTS.za}/`,
};
