document.addEventListener('DOMContentLoaded', () => {
  /* ─────────────────────────────────────────
   * 1. Mobile-menu toggle
   * ───────────────────────────────────────── */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle the 'active' class on the menu button (for the 'X' animation)
      mobileMenuBtn.classList.toggle('active');
      // Toggle the 'active' class on the nav menu (to slide it in/out)
      navMenu.classList.toggle('active');
    });

    // When a menu link is clicked, hide the menu again
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ─────────────────────────────────────────
   * 2. Consultation form submit (REMOVED)
   * The form now submits directly via the HTML action attribute.
   * No JavaScript is needed for this anymore.
   * ───────────────────────────────────────── */

  /* ─────────────────────────────────────────
   * 3. Card animation on scroll (Fade‑in)
   * ───────────────────────────────────────── */
  const cards = document.querySelectorAll('.service-card, .contact__card');

  if (cards.length) {
    // Initial state for animation
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));
  }
});
