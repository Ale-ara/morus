const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menuMobile");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("active");

    menu.classList.toggle("active");
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  });

  // Fecha menu ao clicar em links
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}
