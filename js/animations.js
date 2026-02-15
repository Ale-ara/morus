/* ===================================================== */
/* ================= CORE READY ======================== */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  initReveal();
  initParallax();
  initCounters();
  initHeaderScroll();
  initMicroInteractions();
  initFAQ();
  initParticles();
  initMobileMenu();

});


/* ===================================================== */
/* ================= MOBILE MENU PREMIUM =============== */
/* ===================================================== */

function initMobileMenu() {

  const menuToggle  = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");

  /* aceita drawer OU nav */
  const menuDrawer =
    document.querySelector(".menu-drawer") ||
    document.querySelector(".menu-overlay-nav");

  if (!menuToggle || !menuOverlay) return;


  function openMenu() {

    menuToggle.classList.add("active");
    menuOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

  }


  function closeMenu() {

    menuToggle.classList.remove("active");
    menuOverlay.classList.remove("active");

    document.body.style.overflow = "";

  }


  function toggleMenu() {

    if (menuOverlay.classList.contains("active"))
      closeMenu();
    else
      openMenu();

  }


  /* clique hamburger */

  menuToggle.addEventListener("click", (e) => {

    e.stopPropagation();

    toggleMenu();

  });


  /* clique fora do menu */

  menuOverlay.addEventListener("click", (e) => {

    if (!menuDrawer || !menuDrawer.contains(e.target)) {

      closeMenu();

    }

  });


  /* clique links */

  document.querySelectorAll(
    ".menu-overlay a, .menu-drawer a"
  ).forEach(link => {

    link.addEventListener("click", closeMenu);

  });


  /* tecla ESC */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      closeMenu();

    }

  });

}


/* ===================================================== */
/* ================= REVEAL SYSTEM ===================== */
/* ===================================================== */

function initReveal() {

  const elements =
    document.querySelectorAll(".reveal");

  if (!elements.length) return;

  const observer =
    new IntersectionObserver((entries, obs) => {

      entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

          entry.target.style.transitionDelay =
            `${index * 80}ms`;

          entry.target.classList.add("active");

          obs.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    });

  elements.forEach(el => observer.observe(el));

}


/* ===================================================== */
/* ================= HERO PARALLAX ===================== */
/* ===================================================== */

function initParallax() {

  const hero =
    document.querySelector(".hero-cinematic");

  if (!hero) return;

  const video =
    hero.querySelector(".hero-video-bg");

  const glow =
    hero.querySelector(".hero-glow");

  window.addEventListener("scroll", () => {

    const scrolled = window.scrollY;

    const offset = scrolled * 0.25;

    if (video)
      video.style.transform =
        `translateY(${offset}px) scale(1.05)`;

    if (glow)
      glow.style.transform =
        `translateY(${offset * 0.6}px)`;

  });

}


/* ===================================================== */
/* ================= COUNT UP NUMBERS ================== */
/* ===================================================== */

function initCounters() {

  const counters =
    document.querySelectorAll(".impact-modern h3");

  if (!counters.length) return;

  const observer =
    new IntersectionObserver((entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const el = entry.target;

          const hasPercent =
            el.textContent.includes("%");

          const target =
            parseInt(el.textContent.replace(/\D/g,""));

          const duration = 1600;

          const startTime =
            performance.now();

          function update(now) {

            const progress =
              Math.min((now-startTime)/duration,1);

            const value =
              Math.floor(progress * target);

            el.textContent =
              "+" + value +
              (hasPercent ? "%" : "");

            if(progress < 1)
              requestAnimationFrame(update);

          }

          requestAnimationFrame(update);

          obs.unobserve(el);

        }

      });

    }, { threshold:.6 });

  counters.forEach(el =>
    observer.observe(el)
  );

}


/* ===================================================== */
/* ================= HEADER SCROLL ===================== */
/* ===================================================== */

function initHeaderScroll(){

  const header =
    document.querySelector(".header");

  if(!header) return;

  window.addEventListener("scroll",()=>{

    header.classList.toggle(
      "scrolled",
      window.scrollY > 50
    );

  });

}


/* ===================================================== */
/* ================= MICRO INTERACTIONS ================= */
/* ===================================================== */

function initMicroInteractions(){

  const cards =
    document.querySelectorAll(
      ".service-card,.testimonial-card"
    );

  cards.forEach(card=>{

    card.addEventListener("mousemove",e=>{

      const rect =
        card.getBoundingClientRect();

      const x =
        e.clientX-rect.left;

      const y =
        e.clientY-rect.top;

      const centerX =
        rect.width/2;

      const centerY =
        rect.height/2;

      const rotateX =
        (y-centerY)/25;

      const rotateY =
        (centerX-x)/25;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{

      card.style.transform = "";

    });

  });

}


/* ===================================================== */
/* ================= FAQ =============================== */
/* ===================================================== */

function initFAQ(){

  document.querySelectorAll(".faq-item")
  .forEach(item=>{

    const question =
      item.querySelector(".faq-question");

    if(!question) return;

    question.addEventListener("click",()=>{

      item.classList.toggle("active");

    });

  });

}


/* ===================================================== */
/* ================= PARTICLES ========================= */
/* ===================================================== */

function initParticles(){

  if(window.innerWidth < 768) return;

  const canvas =
    document.querySelector(".hero-particles");

  if(!canvas) return;

  const ctx =
    canvas.getContext("2d");

  let particles = [];

  const count = 28;

  function resize(){

    canvas.width =
      canvas.offsetWidth;

    canvas.height =
      canvas.offsetHeight;

  }

  window.addEventListener("resize", resize);

  resize();

  for(let i=0;i<count;i++){

    particles.push({

      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,

      r:Math.random()*1.5+0.5,

      s:Math.random()*0.3+0.1,

      o:Math.random()*0.4+0.2

    });

  }

  function draw(){

    ctx.clearRect(
      0,0,canvas.width,canvas.height
    );

    particles.forEach(p=>{

      p.y -= p.s;

      if(p.y < 0){

        p.y = canvas.height;

        p.x = Math.random()*canvas.width;

      }

      ctx.beginPath();

      ctx.arc(
        p.x,p.y,p.r,0,Math.PI*2
      );

      ctx.fillStyle =
        `rgba(200,169,95,${p.o})`;

      ctx.fill();

    });

    requestAnimationFrame(draw);

  }

  draw();

}
