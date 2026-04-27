document.addEventListener("DOMContentLoaded", () => {
  const allTriggers = document.querySelectorAll("[data-tab-target]");
  const allPanels = document.querySelectorAll(".tab-panel");
  if (!allTriggers.length) return;

  function activateTab(targetId) {
    allPanels.forEach(p => p.classList.add("hidden"));
    const panel = document.getElementById("tab-" + targetId);
    if (panel) panel.classList.remove("hidden");
    allTriggers.forEach(t => {
      const active = t.dataset.tabTarget === targetId;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", String(active));
    });
    try { sessionStorage.setItem("dashboard-tab", targetId); } catch(_) {}
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab-target]");
    if (t) { e.preventDefault(); activateTab(t.dataset.tabTarget); }
  });

  let init = "bookings";
  try { const s = sessionStorage.getItem("dashboard-tab"); if(s) init=s; } catch(_){}
  if (window.location.hash) {
    const h = window.location.hash.replace("#","");
    if (document.getElementById("tab-"+h)) init=h;
  }
  activateTab(init);

  // Checklist items
  document.querySelectorAll(".checklist-item").forEach(item => {
    item.setAttribute("tabindex", "0");
    const toggle = () => {
      const done = item.dataset.done === "true";
      item.dataset.done = done ? "false" : "true";
      const box = item.querySelector(".check-box");
      const lbl = item.querySelector("span:last-child");
      if (!done) {
        box.style.background = "#F59E0B"; box.style.borderColor = "#F59E0B";
        box.querySelector("svg").style.color = "#1C1917";
        if (lbl) { lbl.classList.add("line-through","text-stone-400"); lbl.classList.remove("text-stone-300"); }
      } else {
        box.style.background = ""; box.style.borderColor = "#57534e";
        box.querySelector("svg").style.color = "transparent";
        if (lbl) { lbl.classList.remove("line-through","text-stone-400"); lbl.classList.add("text-stone-300"); }
      }
    };
    item.addEventListener("click", toggle);
    item.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle();} });
  });

  // Collapsible sections
  document.querySelectorAll(".checklist-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const body = btn.closest(".checklist-section").querySelector(".checklist-body");
      const icon = btn.querySelector(".toggle-icon");
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      body.classList.toggle("hidden", open);
      if (icon) icon.style.transform = open ? "rotate(-90deg)" : "rotate(0deg)";
    });
  });

  // Toggle switches
  document.querySelectorAll(".toggle-switch").forEach(sw => {
    const handler = () => {
      const on = sw.classList.contains("on");
      sw.classList.toggle("on", !on);
      sw.setAttribute("aria-checked", String(!on));
    };
    sw.addEventListener("click", handler);
    sw.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){e.preventDefault();handler();} });
  });

  // Mobile Sidebar Toggle
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  if (sidebar && sidebarToggle) {
    const toggleSidebar = (show) => {
      sidebar.classList.toggle("open", show);
      if (sidebarOverlay) sidebarOverlay.classList.toggle("open", show);
      document.body.classList.toggle("overflow-hidden", show);
    };

    sidebarToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSidebar(true);
    });

    if (sidebarClose) sidebarClose.addEventListener("click", () => toggleSidebar(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", () => toggleSidebar(false));

    // Close sidebar when a link is clicked (on mobile)
    sidebar.querySelectorAll(".sidebar-link, a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 768) toggleSidebar(false);
      });
    });
  }
});

