// Mobile Menu Animation start

// ── Mobile menu toggle ──
// const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  const hamTop = hamburger.querySelector('.ham-top');
  const hamMid = hamburger.querySelector('.ham-mid');
  const hamBot = hamburger.querySelector('.ham-bot');
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      // hamTop.style.transform = 'translateY(7px) rotate(45deg)';
      // hamMid.style.opacity = '0';
      // hamMid.style.transform = 'scaleX(0)';
      // hamBot.style.width = '24px';
      // hamBot.style.transform = 'translateY(-7px) rotate(-45deg)';
      // Adding a background to navbar when menu is open (if not scrolled)
      navbar.classList.add('bg-[#070d1e]');
    } else {
      mobileMenu.style.maxHeight = '0';
      // hamTop.style.transform = '';
      // hamMid.style.opacity = '';
      // hamMid.style.transform = '';
      // hamBot.style.width = '';
      // hamBot.style.transform = '';
      if (window.scrollY <= 20) {
        navbar.classList.remove('bg-[#070d1e]');
      }
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuOpen) toggleMenu();
    });
  });
}
// Mobile Menu Animation end



// banner Mouse Move 
document.addEventListener("mousemove", (e) => {
  const tags = document.querySelectorAll(".mouse-move-tag");

  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;

  tags.forEach((tag, index) => {
    const speed = (index + 1) * 0.5;
    tag.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
  });
});

// const lenis = new Lenis({
//   duration: 1.2,
//   easing: (t) => 1 - Math.pow(1 - t, 4),
//   smooth: true,
//   direction: "vertical",
//   gestureDirection: "vertical",
//   smoothTouch: false,
//   touchMultiplier: 2,
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);


// Button Hover 
const resumeBtns = document.querySelectorAll('.resume-btn');
resumeBtns.forEach(btn => {
  const texts = btn.querySelectorAll('.btn-text');
  const icon = btn.querySelector('.download-icon');

  const tl = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: "power2.inOut" } });

  tl.to(texts, { yPercent: -100 })
    .to(icon, { rotate: 15, scale: 1.1 }, 0);

  btn.addEventListener('mouseenter', () => tl.play());
  btn.addEventListener('mouseleave', () => tl.reverse());
});


// ── Smooth scroll (Lenis) ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}


// counter animation 
gsap.registerPlugin(ScrollTrigger);
const counters = document.querySelectorAll('span[data-target]');
counters.forEach((counter) => {
  const targetValue = +counter.getAttribute('data-target');
  gsap.to(counter, {
    innerText: targetValue,
    duration: 2,
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      toggleActions: "play none none none",
    },
    onUpdate: function () {
    }
  });
});


// splide js 
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#main-slider', {
    type: 'loop',
    focus: 'center',
    gap: "42px",
    arrows: true,
    padding: "31%",
    pagination: false,
    clones: 4,
    breakpoints: {
      1024: {
        perPage: 1,
        padding: '25%',
      },
      768: {
        perPage: 1,
        padding: '3%',
      }
    }
  }).mount();
});

// project tab 
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".card");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    // Reset all tabs
    tabs.forEach(t => {
      t.style.backgroundColor = "#FFF"; // gray-200
      t.style.color = "#9CA3AF"; // black text
    });

    // Active tab
    tab.style.backgroundColor = "#336AEA"; // black
    tab.style.color = "#ffffff"; // white

    filterCards(filter);
  });
});

function filterCards(filter) {

  const showCards = [];
  const hideCards = [];

  cards.forEach(card => {
    const category = card.dataset.category;

    if (filter === "all" || category === filter) {
      showCards.push(card);
    } else {
      hideCards.push(card);
    }
  });

  // Hide animation
  gsap.to(hideCards, {
    opacity: 0,
    scale: 0.9,
    duration: 0.3,
    stagger: 0.05,
    onComplete: () => {
      hideCards.forEach(card => card.classList.add("hidden"));

      // Show animation (after hide completes)
      showCards.forEach(card => card.classList.remove("hidden"));

      gsap.fromTo(showCards,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08 }
      );
    }
  });
}

gsap.utils.toArray(".fade-up").forEach((el) => {
  let delay = el.getAttribute("data-delay") || 0;

  gsap.from(el, {
    y: 60,
    opacity: 0,
    duration: 1,
    delay: delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
    }
  });
});
