const WORKER_BASE_URL = (
  import.meta.env.VITE_WORKER_BASE_URL || "http://localhost:8787"
).replace(/\/$/, "");

const WORKER_SITE_KEY = (import.meta.env.VITE_WORKER_SITE_KEY || "").trim();

const withWorkerUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${WORKER_BASE_URL}${normalizedPath}`);
  if (WORKER_SITE_KEY) {
    url.searchParams.set("site", WORKER_SITE_KEY);
  }
  return url.toString();
};

export const WORKER_BASE_ORIGIN = WORKER_BASE_URL;
export const WORKER_PRODUCTS_ENDPOINT = withWorkerUrl("/products");
export const WORKER_CHECKOUT_ENDPOINT = withWorkerUrl("/create-checkout-session");
