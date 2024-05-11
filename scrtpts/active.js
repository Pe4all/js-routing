export function active(e) {
    const navItems = document.querySelectorAll(".nav-link");
    navItems.forEach(item => item.classList.remove("active"));
  
    const currentLink = document.querySelector(`.nav-link[href="${e}"]`);
    if (currentLink) {
      const currentItem = currentLink.closest(".nav-link");
      currentItem.classList.add("active");
    }
  }