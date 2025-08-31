if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const links = document.querySelectorAll("a[data-path]");

  // Function to hide all pages and show the active one
  const showPage = (pageId) => {
    pages.forEach((page) => {
      page.classList.add("hidden");
    });
    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.remove("hidden");
    } else {
      // Fallback to home page if the requested page doesn't exist
      document.getElementById("home-page").classList.remove("hidden");
    }
  };

  // Determine the page to show on initial load based on the URL hash
  const initialHash = window.location.hash.slice(1);
  const initialPageId = initialHash ? `${initialHash}-page` : "home-page";
  showPage(initialPageId);

  // Handle internal link clicks
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Stop the default browser navigation
      const pageId = link.dataset.path;
      const newHash = pageId.replace("-page", "");
      history.pushState(null, "", `#${newHash}`);
      showPage(pageId);
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    const hash = window.location.hash.slice(1);
    const pageId = hash ? `${hash}-page` : "home-page";
    showPage(pageId);
  });

  // Search functionality for privacy search
  const privInput = document.getElementById("priv-inp");
  const privSearchButton = document.getElementById("priv-search");
  if (privInput && privSearchButton) {
    const runPrivSearch = () => {
      window.location.href = `https://duckduckgo.com/?q=${privInput.value}`;
    };
    privSearchButton.addEventListener("click", runPrivSearch);
    privInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        runPrivSearch();
      }
    });
  }

  // Search functionality for AI search
  const aiInput = document.getElementById("ai-inp");
  const aiSearchButton = document.getElementById("ai-search");
  if (aiInput && aiSearchButton) {
    const runAISearch = () => {
      window.location.href = `https://perplexity.ai/search?q=${aiInput.value}`;
    };
    aiSearchButton.addEventListener("click", runAISearch);
    aiInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        runAISearch();
      }
    });
  }
});
