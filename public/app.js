document.addEventListener('DOMContentLoaded', () => {
  /* ─────────────────────────────────────────
   * 1. Mobile-menu toggle
   * ───────────────────────────────────────── */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.querySelectorAll('span')
        .forEach(span => span.classList.toggle('active'));
    });

    navMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.querySelectorAll('span')
          .forEach(span => span.classList.remove('active'));
      })
    );
  }

  /* ─────────────────────────────────────────
   * 2. Consultation form submit (Fetch + FastAPI)
   * ───────────────────────────────────────── */
  const consultationForm = document.getElementById('consultationForm');

  if (consultationForm) {
    consultationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = consultationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // UI Feedback
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(consultationForm);

      try {
              const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.status?.includes('sent')) {
          alert('✅ Your consultation request has been sent successfully!');
          consultationForm.reset();
        } else {
          alert(`❌ Error: ${data.error || data.status || 'Something went wrong.'}`);
        }
      } catch (error) {
        console.error('Network error:', error);
        alert(`❌ Network error: ${error.message}`);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ─────────────────────────────────────────
   * 3. Card animation on scroll (Fade-in)
   * ───────────────────────────────────────── */
  const cards = document.querySelectorAll('.service-card, .contact__card');

  if (cards.length) {
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    cards.forEach(card => observer.observe(card));

    const style = document.createElement('style');
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
    `;
    document.head.appendChild(style);
  }
});
