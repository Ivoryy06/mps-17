<script>
document.addEventListener("DOMContentLoaded", () => {
  /* ===== LAZY LOADING ===== */
  const lazyImages = document.querySelectorAll(".lazy");
  if ("IntersectionObserver" in window) {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener("load", () => img.classList.add("loaded"));
          lazyObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => lazyObserver.observe(img));
  } else {
    // fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add("loaded");
    });
  }

  /* ===== MODAL CAROUSEL ===== */
  const modal = document.getElementById("insta-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.querySelector(".modal-close");
  let currentCarousel = [];
  let currentIndex = 0;

  const instaImages = document.querySelectorAll(".insta-carousel img");
  instaImages.forEach(img => {
    img.addEventListener("click", () => {
      const carousel = img.closest(".insta-carousel");
      currentCarousel = Array.from(carousel.querySelectorAll("img"));
      currentIndex = currentCarousel.indexOf(img);
      showModal();
    });
  });

  function showModal() {
    modal.style.display = "block";
    updateModalImage();
  }

  function updateModalImage() {
    const img = currentCarousel[currentIndex];
    modalImg.src = img.src;
    modalCaption.innerText = img.alt;
  }

  modalClose.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => { if(e.target === modal) modal.style.display = "none"; });

  document.addEventListener("keydown", e => {
    if(modal.style.display === "block") {
      if(e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % currentCarousel.length;
        updateModalImage();
      } else if(e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + currentCarousel.length) % currentCarousel.length;
        updateModalImage();
      } else if(e.key === "Escape") {
        modal.style.display = "none";
      }
    }
  });

  /* ===== BIO TOGGLE ===== */
  const bioButtons = document.querySelectorAll(".toggle-bio");
  bioButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const bio = btn.previousElementSibling;
      if(bio.style.display === "block") {
        bio.style.display = "none";
        btn.textContent = "Read More";
      } else {
        bio.style.display = "block";
        btn.textContent = "Read Less";
      }
    });
  });

  /* ===== 3D TILT CARDS ===== */
  const cards = document.querySelectorAll(".team li");
  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;

      const tiltX = dy * 10;
      const tiltY = dx * 10;
      card.style.transform = `rotateX(${-tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
});
</script>