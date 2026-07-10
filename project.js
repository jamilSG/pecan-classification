document.addEventListener("DOMContentLoaded", () => {
  // ---- Code file tabs ----
  const codeTabs = document.querySelectorAll(".code-tab");
  const codePanels = document.querySelectorAll(".code-panel");
  codeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      codeTabs.forEach((t) => t.classList.remove("is-active"));
      codePanels.forEach((p) => p.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.getElementById(tab.dataset.target).classList.add("is-active");
    });
  });

  // ---- Gallery lightbox ----
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxText = document.getElementById("lightboxText");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      if (!lightbox) return;

      const type = item.dataset.type;

      // Resetear visibilidad y pausar videos previos
      lightboxImg.style.display = "none";
      lightboxVideo.style.display = "none";
      lightboxVideo.pause();

      if (type === "video") {
        const video = item.querySelector("video");
        if (!lightboxVideo) return;
        lightboxVideo.src = video.src;
        lightboxVideo.style.display = "block";
        lightboxVideo.play(); // Auto-reproducir al abrir
      } else {
        const img = item.querySelector("img");
        if (!lightboxImg) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.display = "block";
      }

      lightbox.classList.add("is-open");
    });
  });

  // Al cerrar, asegúrate de pausar el video del lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.src = "";
    }
  };

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open"))
      closeLightbox();
  });
  // ---- 3D model viewer: loading indicator ----
  document.querySelectorAll("model-viewer").forEach((mv) => {
    const bar = mv
      .closest(".model-viewer-wrap")
      ?.querySelector(".model-viewer-wrap__bar .model-status");
    if (!bar) return;
    mv.addEventListener("load", () => {
      bar.textContent = "MODELO CARGADO";
    });
    mv.addEventListener("error", () => {
      bar.textContent = "ERROR AL CARGAR MODELO";
    });
  });

  // ---- Footer year (project pages have their own footer copy) ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
