(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var hash = link.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      var target = document.querySelector(hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });
      history.replaceState(null, "", hash);
    });
  });

  var hero = document.querySelector(".hero");
  var heroAssetNote = document.getElementById("heroAssetNote");
  var heroPath = "assets/img/hero.jpg";

  if (hero) {
    var heroImage = new Image();
    heroImage.addEventListener("load", function () {
      hero.classList.add("has-image");
      hero.style.setProperty("--hero-image", 'url("' + heroPath + '")');
      if (heroAssetNote) {
        heroAssetNote.hidden = true;
      }
    });
    heroImage.addEventListener("error", function () {
      if (heroAssetNote) {
        heroAssetNote.hidden = false;
      }
    });
    heroImage.src = heroPath;
  }

  function markMissingImage(imageNode) {
    var figure = imageNode.closest(".media-item");
    if (!figure || figure.classList.contains("missing")) {
      return;
    }

    figure.classList.add("missing");
    var placeholder = figure.getAttribute("data-placeholder") || "Add image asset";

    var note = document.createElement("p");
    note.className = "missing-note";
    note.textContent = placeholder;
    figure.appendChild(note);
  }

  var galleryImages = document.querySelectorAll(".media-item img");
  galleryImages.forEach(function (imageNode) {
    imageNode.addEventListener("error", function () {
      markMissingImage(imageNode);
    });

    if (imageNode.complete && imageNode.naturalWidth === 0) {
      markMissingImage(imageNode);
    }
  });

  var dossierButton = document.getElementById("downloadDossierBtn");
  var dossierAssetNote = document.getElementById("dossierAssetNote");

  if (dossierButton && window.location.protocol !== "file:") {
    var dossierPath = dossierButton.getAttribute("href");

    fetch(dossierPath, { method: "HEAD", cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Missing dossier");
        }
        if (dossierAssetNote) {
          dossierAssetNote.hidden = true;
        }
      })
      .catch(function () {
        dossierButton.setAttribute("aria-disabled", "true");
        dossierButton.removeAttribute("href");
        if (dossierAssetNote) {
          dossierAssetNote.hidden = false;
        }
      });
  }

  var modal = document.getElementById("imageModal");
  var modalImage = document.getElementById("modalImage");
  var modalCaption = document.getElementById("modalCaption");
  var closeModalButton = document.getElementById("closeModalBtn");

  function openModal(imageNode) {
    if (!modal || !modalImage || !modalCaption) {
      return;
    }

    var figure = imageNode.closest("figure");
    var captionNode = figure ? figure.querySelector("figcaption") : null;

    modalImage.src = imageNode.currentSrc || imageNode.src;
    modalImage.alt = imageNode.alt || "Expanded gallery image";
    modalCaption.textContent = captionNode ? captionNode.textContent : imageNode.alt;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal || !modalImage) {
      return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";
  }

  galleryImages.forEach(function (imageNode) {
    imageNode.addEventListener("click", function () {
      if (imageNode.naturalWidth > 0) {
        openModal(imageNode);
      }
    });
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("open")) {
      closeModal();
    }
  });
})();
