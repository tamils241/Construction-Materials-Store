// ========== PRELOADER ==========
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.classList.add('loaded');
  }
});

// ========== NAVBAR SCROLL ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dashSidebar = document.querySelector('.dash-sidebar');

let dashOverlay = document.querySelector('.dash-overlay');
if (dashSidebar && !dashOverlay) {
  dashOverlay = document.createElement('div');
  dashOverlay.className = 'dash-overlay';
  document.body.appendChild(dashOverlay);
}

function closeMobileMenus() {
  if (hamburger) hamburger.classList.remove('active');
  if (navLinks) navLinks.classList.remove('open');
  if (dashSidebar) dashSidebar.classList.remove('open');
  if (dashOverlay) dashOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if (navLinks) {
      navLinks.classList.toggle('open');
    }
    if (dashSidebar) {
      dashSidebar.classList.toggle('open');
      if (dashOverlay) dashOverlay.classList.toggle('show');
    }
    document.body.style.overflow = (navLinks && navLinks.classList.contains('open')) || (dashSidebar && dashSidebar.classList.contains('open')) ? 'hidden' : '';
  });

  if (navLinks) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', closeMobileMenus);
    });
  }

  if (dashSidebar) {
    dashSidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenus);
    });
  }

  if (dashOverlay) {
    dashOverlay.addEventListener('click', closeMobileMenus);
  }
}

// ========== 3D TILT EFFECT ON CARDS ==========
function initTiltEffect() {
  const cards = document.querySelectorAll('.product-card, .category-card, .feature-card, .testimonial-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.zIndex = '';
    });
  });
}

// ========== HERO CARD 3D PARALLAX ==========
function initHeroParallax() {
  const heroCard = document.querySelector('.hero-card-3d');
  const heroVisual = document.querySelector('.hero-visual');

  if (heroCard && heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroCard.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 15}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
    });
  }
}

// ========== WISHLIST TOGGLE ==========
document.querySelectorAll('.product-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
    btn.style.background = btn.classList.contains('active') ? '#e74c3c' : '';
    btn.style.color = btn.classList.contains('active') ? '#fff' : '';
  });
});

// ========== ADD TO CART ANIMATION ==========
document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = '#27ae60';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 1500);
  });
});

// ========== HERO CARD ADD BUTTON ==========
document.querySelectorAll('.add-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const originalText = btn.textContent;
    btn.textContent = '✓';
    btn.style.background = '#27ae60';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 1500);
  });
});

// ========== COUNTDOWN TIMER ==========
function initCountdown() {
  const countdownEl = document.querySelector('.countdown');
  if (!countdownEl) return;

  const target = new Date();
  target.setDate(target.getDate() + 3);

  function update() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const nums = countdownEl.querySelectorAll('.number');
    if (nums.length >= 4) {
      nums[0].textContent = String(days).padStart(2, '0');
      nums[1].textContent = String(hours).padStart(2, '0');
      nums[2].textContent = String(minutes).padStart(2, '0');
      nums[3].textContent = String(seconds).padStart(2, '0');
    }
  }

  update();
  setInterval(update, 1000);
}

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ========== BACK TO TOP ==========
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========== FORM VALIDATION (Auth Pages) ==========
function initAuthForms() {
  const forms = document.querySelectorAll('.auth-form');

  const nameInput = document.getElementById('name');
  if (nameInput) {
    nameInput.setAttribute('maxlength', '16');
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^a-zA-Z]/g, '').slice(0, 16);
    });
  }

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      function markInvalid(el, msg) {
        valid = false;
        alert(msg);
        el.style.borderColor = '#e74c3c';
        el.addEventListener('input', () => {
          el.style.borderColor = '';
        }, { once: true });
      }

      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const subject = form.querySelector('#subject');
      const message = form.querySelector('#message');

      if (name) {
        if (!name.value.trim()) {
          markInvalid(name, 'Please enter your Full Name.');
        } else if (!/^[a-zA-Z]+$/.test(name.value.trim())) {
          markInvalid(name, 'Full Name can only contain letters (no numbers, special characters, or spaces).');
        } else if (name.value.trim().length > 16) {
          markInvalid(name, 'Full Name must be 16 characters or less.');
        }
      }

      if (email) {
        if (!email.value.trim()) {
          markInvalid(email, 'Please enter your Email Address.');
        } else if (!/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) {
          markInvalid(email, 'Please enter a valid email address. Example: sun@gmail.com');
        }
      }

      if (subject) {
        if (!subject.value.trim()) {
          markInvalid(subject, 'Please enter a Subject.');
        } else if (subject.value.trim().length < 3) {
          markInvalid(subject, 'Subject must be at least 3 characters.');
        } else if (subject.value.trim().length > 100) {
          markInvalid(subject, 'Subject must be 100 characters or less.');
        }
      }

      if (message) {
        if (!message.value.trim()) {
          markInvalid(message, 'Please enter your Message.');
        } else if (message.value.trim().length < 10) {
          markInvalid(message, 'Message must be at least 10 characters.');
        } else if (message.value.trim().length > 500) {
          markInvalid(message, 'Message must be 500 characters or less.');
        }
      }

      const fullname = form.querySelector('#fullname');
      if (fullname) {
        if (!fullname.value.trim()) {
          markInvalid(fullname, 'Please enter your Full Name.');
        } else if (!/^[a-zA-Z]+$/.test(fullname.value.trim())) {
          markInvalid(fullname, 'Full Name can only contain letters (no numbers, special characters, or spaces).');
        } else if (fullname.value.trim().length > 16) {
          markInvalid(fullname, 'Full Name must be 16 characters or less.');
        }
      }

      const phone = form.querySelector('#phone');
      if (phone) {
        if (!phone.value.trim()) {
          markInvalid(phone, 'Please enter your Phone Number.');
        } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(phone.value.trim())) {
          markInvalid(phone, 'Please enter a valid phone number.');
        }
      }

      const password = form.querySelector('#password');
      const confirmPassword = form.querySelector('#confirm-password');
      if (password) {
        if (!password.value.trim()) {
          markInvalid(password, 'Please create a password.');
        } else if (password.value.length < 6) {
          markInvalid(password, 'Password must be at least 6 characters.');
        }
      }
      if (confirmPassword) {
        if (!confirmPassword.value.trim()) {
          markInvalid(confirmPassword, 'Please confirm your password.');
        } else if (password && confirmPassword.value !== password.value) {
          markInvalid(confirmPassword, 'Passwords do not match.');
        }
      }

      const terms = form.querySelector('.form-check input[type="checkbox"]');
      if (terms && !terms.checked) {
        valid = false;
        alert('Please agree to the Terms & Conditions.');
      }

      if (valid) {
        const btn = form.querySelector('.auth-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        const roleInput = form.querySelector('input[name="role"]:checked');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          if (roleInput) {
            if (roleInput.value === 'admin') {
              window.location.href = 'admin-dashboard.html';
            } else {
              window.location.href = 'customer-dashboard.html';
            }
          } else {
            alert('Action completed successfully!');
          }
        }, 1500);
      }
    });
  });
}

// ========== NEWSLETTER FORM ==========
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    const original = btn.textContent;
    const email = input.value.trim();

    if (!email) {
      alert('Please enter your email address.');
      input.style.borderColor = '#e74c3c';
      return;
    }

    const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address. Example: sun@gmail.com');
      input.style.borderColor = '#e74c3c';
      return;
    }

    input.style.borderColor = '#27ae60';
    btn.textContent = 'Subscribed!';
    btn.style.background = '#27ae60';
    alert('Subscription successful! You will now receive our latest deals.');
    input.value = '';

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      input.style.borderColor = '';
    }, 2000);
  });
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const value = target.getAttribute('data-count');
        if (!value) return;

        let current = 0;
        const increment = Math.ceil(parseInt(value) / 60);
        const suffix = target.getAttribute('data-suffix') || '';

        const timer = setInterval(() => {
          current += increment;
          if (current >= parseInt(value)) {
            current = parseInt(value);
            clearInterval(timer);
          }
          target.textContent = current.toLocaleString() + suffix;
        }, 30);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ========== INIT ALL ==========
document.addEventListener('DOMContentLoaded', () => {
  initTiltEffect();
  initHeroParallax();
  initCountdown();
  initScrollReveal();
  initAuthForms();
  initNewsletter();
  animateCounters();
});
