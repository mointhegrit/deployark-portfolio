import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// GA4's base gtag('config', ...) call in index.html only fires a pageview
// on first load. This fires one on every client-side route change too,
// since React Router never triggers a real page load.
export default function useAnalyticsPageview() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location]);
}
