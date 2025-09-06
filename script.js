// Hamburger/close logic for nav-links
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const closeNav = document.getElementById("closeNav");
const navLinkItems = navLinks.querySelectorAll("a");

function showNavLinks() {
  navLinks.classList.add("open");
  hamburger.style.display = "none";
  if (window.innerWidth <= 768 && closeNav) closeNav.style.display = "block";
}

function hideNavLinks() {
  navLinks.classList.remove("open");
  hamburger.style.display = "block";
  if (window.innerWidth <= 768 && closeNav) closeNav.style.display = "none";
}

hamburger.addEventListener("click", showNavLinks);
if (closeNav) closeNav.addEventListener("click", hideNavLinks);

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("open");
    hamburger.style.display = "none";
    if (closeNav) closeNav.style.display = "none";
  } else {
    hamburger.style.display = "block";
    if (!navLinks.classList.contains("open") && closeNav) closeNav.style.display = "none";
  }
});

// Hide nav on clicking a nav link (mobile view)
navLinkItems.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      hideNavLinks();
    }
  });
});


// Hide navLinks on scroll (mobile only)
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768 && navLinks.classList.contains("open")) {
    hideNavLinks();
  }
});


// ...existing code...

// Optional: Reset nav on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.style.display = "flex";
    hamburger.style.display = "none";
    closeBtn.style.display = "none";
  } else {
    navLinks.style.display = "none";
    hamburger.style.display = "block";
    closeBtn.style.display = "none";
  }
});

// Toggle selection and update textarea

const selectedItemsTextarea = document.getElementById("selectedItems");
const cartBadge = document.getElementById("cartBadge");
const orderCart = document.getElementById("orderCart");

function updateCartBadge() {
  const selected = document.querySelectorAll('.item.selected').length;
  cartBadge.textContent = selected;
}

function updateTextarea() {
  const selected = Array.from(document.querySelectorAll('.item.selected p')).map(p => p.textContent.trim());
  selectedItemsTextarea.value = selected.join(', ');
}

document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    const categoryDiv = item.closest(".category");
    const itemName = item.querySelector("p").textContent.trim();
    const isSelected = item.classList.contains("selected");

    const limit = getCategoryLimit(categoryDiv);
    const selectedCount = categoryDiv.querySelectorAll(".item.selected").length;

    if (!isSelected) {
      if (selectedCount >= limit) {
        alert(`You can only select ${limit} item(s) in this category.`);
        return;
      }
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
    updateCartBadge();
    updateTextarea();
  });
});

// Scroll to contact section on cart click
orderCart.addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// Initialize badge and textarea on load
updateCartBadge();
updateTextarea();

// Extract limit from <h3> tag like "Paneer (any one)"
function getCategoryLimit(categoryDiv) {
  const h3 = categoryDiv.querySelector("h3").textContent;
  const match = h3.match(/\((.*?)\)/); // inside brackets
  if (!match) return Infinity;

  const text = match[1].toLowerCase().trim();

  if (text.includes("one")) return 1;
  if (text.includes("two")) return 2;
  if (text.includes("three")) return 3;
  if (text.includes("four")) return 4;

  const num = parseInt(text);
  return isNaN(num) ? Infinity : num;
}

// Update selected items textarea
function addItemToTextarea(item) {
  let items = selectedItemsTextarea.value ? selectedItemsTextarea.value.split("\n") : [];
  if (!items.includes(item)) {
    items.push(item);
  }
  selectedItemsTextarea.value = items.join("\n");
}

function removeItemFromTextarea(item) {
  let items = selectedItemsTextarea.value ? selectedItemsTextarea.value.split("\n") : [];
  items = items.filter(i => i !== item);
  selectedItemsTextarea.value = items.join("\n");
}
