document.addEventListener("DOMContentLoaded", () => {

  /* ===== LAZY LOADING ===== */
  const lazyImages = document.querySelectorAll(".lazy");

  if ("IntersectionObserver" in window) {
    const lazyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.onload = () => img.classList.add("loaded");
          lazyObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => lazyObserver.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add("loaded");
    });
  }

  /* ===== LIGHTBOX / MODAL CAROUSEL ===== */
  const modal = document.getElementById("insta-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.querySelector(".modal-close");

  let currentCarousel = [];
  let currentIndex = 0;

  document.querySelectorAll(".insta-carousel img").forEach(img => {
    img.addEventListener("click", e => {
      e.stopPropagation();

      const carousel = img.closest(".insta-carousel");
      currentCarousel = Array.from(carousel.querySelectorAll("img"));
      currentIndex = currentCarousel.indexOf(img);

      openModal();
    });
  });

  function openModal() {
    modal.style.display = "flex";
    updateModal();
  }

  function updateModal() {
    const img = currentCarousel[currentIndex];
    modalImg.src = img.src;
    modalCaption.textContent = img.alt || "";
  }

  modalClose?.addEventListener("click", () => modal.style.display = "none");
  modal?.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  document.addEventListener("keydown", e => {
    if (modal?.style.display === "flex") {
      if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % currentCarousel.length;
        updateModal();
      } else if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + currentCarousel.length) % currentCarousel.length;
        updateModal();
      } else if (e.key === "Escape") {
        modal.style.display = "none";
      }
    }
  });

  /* ===== BIO TOGGLE ===== */
  document.querySelectorAll(".toggle-bio").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();

      const bio = btn.previousElementSibling;
      const open = bio.style.display === "block";

      bio.style.display = open ? "none" : "block";
      btn.textContent = open ? "Read More" : "Read Less";
    });
  });

  /* ===== MEMBER CARD NAVIGATION ===== */
  document.querySelectorAll(".team li").forEach(card => {
    card.addEventListener("click", e => {
      if (
        e.target.closest(".insta-carousel") ||
        e.target.closest(".toggle-bio")
      ) return;

      const link = card.dataset.link;
      if (link) window.location.href = link;
    });
  });

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger?.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "flex";
    mobileMenu.style.display = isOpen ? "none" : "flex";
    document.body.classList.toggle("menu-open", !isOpen);
  });

  /* ===== 3D TILT EFFECT ===== */
  document.querySelectorAll(".team li").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = (x - rect.width / 2) / (rect.width / 2);
      const dy = (y - rect.height / 2) / (rect.height / 2);

      card.style.transform = `
        rotateX(${-dy * 10}deg)
        rotateY(${dx * 10}deg)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0)";
    });
  });

});
