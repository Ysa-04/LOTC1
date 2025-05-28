// const hamburger = document.querySelector('.hamburger') as HTMLElement;
// const navMenu = document.querySelector('.nav-menu') as HTMLElement;
// hamburger?.addEventListener('click', () => {
//   hamburger.classList.toggle('active');
//   navMenu.classList.toggle('active');
// });
// // Sluiten van menu bij klik op link
// const navLinks = document.querySelectorAll('.nav-link');
// navLinks.forEach(link =>
//   link.addEventListener('click', () => {
//     hamburger.classList.remove('active');
//     navMenu.classList.remove('active');
//   })
// );

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburgerButton || !navMenu) {
    console.warn("⚠️ Kon hamburger of nav-menu niet vinden.");
    return;
  }

  hamburgerButton.addEventListener("click", () => {
    navMenu.classList.toggle("d-none");
    console.log("🍔 Menu toggle");
  });
});
