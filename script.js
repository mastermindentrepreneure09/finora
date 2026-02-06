/* NAVIGATION */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(link.dataset.section).classList.add("active");
  });
});

/* DARK MODE */
document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

/* BLOGS FROM GOOGLE SHEETS (ACCORDION) */
const BLOG_API_URL =
  "https://script.google.com/macros/s/AKfycbytZ5J5FO4P2pAaA_jjiJR7R7sj7zYXyoufCXt7cDM98COb-YQ54ee9tX_Xs5trQ2WCzQ/exec";

fetch(BLOG_API_URL)
  .then(res => res.json())
  .then(data => {
    const blogList = document.getElementById("blogList");
    blogList.innerHTML = "";

    data.forEach((blog, index) => {
      const div = document.createElement("div");
      div.className = "blog-item";

      div.innerHTML = `
        <div class="blog-title" data-index="${index}">
          <span>${blog.title}</span>
          <span class="plus">+</span>
        </div>
        <div class="blog-content">
          <p>${blog.content}</p>
        </div>
      `;

      blogList.appendChild(div);
    });

    setupAccordion();
  })
  .catch(() => {
    document.getElementById("blogList").innerText =
      "Unable to load blogs";
  });

function setupAccordion() {
  const titles = document.querySelectorAll(".blog-title");

  titles.forEach(title => {
    title.addEventListener("click", () => {
      const currentContent = title.nextElementSibling;
      const currentPlus = title.querySelector(".plus");

      // Close all others
      document.querySelectorAll(".blog-content").forEach(content => {
        if (content !== currentContent) {
          content.style.display = "none";
        }
      });

      document.querySelectorAll(".plus").forEach(p => {
        if (p !== currentPlus) p.innerText = "+";
      });

      // Toggle current
      if (currentContent.style.display === "block") {
        currentContent.style.display = "none";
        currentPlus.innerText = "+";
      } else {
        currentContent.style.display = "block";
        currentPlus.innerText = "−";
      }
    });
  });
}

/* SIP CALCULATOR */
function calculateSIP() {
  const monthly = Number(sipAmount.value);
  const rate = Number(sipRate.value) / 100 / 12;
  const months = Number(sipYears.value) * 12;

  let total = 0;
  for (let i = 0; i < months; i++) {
    total = (total + monthly) * (1 + rate);
  }

  sipResult.innerText =
    "Estimated Value: ₹" + Math.round(total).toLocaleString();
}

/* INTEREST CALCULATOR */
function calculateInterest() {
  const interest = (principal.value * rate.value * time.value) / 100;
  const total = Number(principal.value) + interest;

  interestResult.innerText =
    "Interest: ₹" + interest.toLocaleString() +
    " | Total Amount: ₹" + total.toLocaleString();
}
