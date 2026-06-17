// ⚙️ JavaScript Functions & Interactions - Ashmita Shah Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Active Scroll spy for Nav Links
  initScrollSpy();

  // Initialize Skill Progress Bars animation on scroll
  initSkillAnimation();

  // Initialize Demos
  updateGrid(3); // Start grid demo with 3 columns
  runGenerator(); // Render initial Bootstrap component
});

/* ==========================================================================
   🧭 Sticky Navigation & Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   👩💻 About Me Section - Animated Skill Bars
   ========================================================================== */
function initSkillAnimation() {
  const skillsSection = document.querySelector(".skills-container");
  const skillFills = document.querySelectorAll(".skill-fill");

  const showSkills = () => {
    skillFills.forEach((fill) => {
      const targetPercent = fill.getAttribute("data-percent");
      fill.style.width = targetPercent;
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        showSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

/* ==========================================================================
   📚 HTML Section Demos
   ========================================================================== */

// submitHTMLForm() - Validates & displays success message inside the HTML demo panel
function submitHTMLForm(event) {
  if (event) event.preventDefault();

  const nameEl = document.getElementById("html-name");
  const emailEl = document.getElementById("html-email");
  const msgEl = document.getElementById("html-message");
  const alertEl = document.getElementById("html-alert");

  if (!nameEl.value || !emailEl.value || !msgEl.value) {
    alert("Please fill out all fields in the HTML demo form.");
    return false;
  }

  // Display success message
  alertEl.style.display = "block";
  alertEl.innerHTML = `🎉 Success! Thank you, <strong>${escapeHTML(nameEl.value)}</strong>. Your contact form demo submitted successfully.`;

  // Clear fields
  nameEl.value = "";
  emailEl.value = "";
  msgEl.value = "";

  // Hide alert after 4 seconds
  setTimeout(() => {
    alertEl.style.display = "none";
  }, 4000);

  return false;
}

/* ==========================================================================
   📚 CSS Section Demos
   ========================================================================== */

// setBMHighlight(btn, color) - Updates Box Model demo layers color highlights
function setBMHighlight(btn, activeLayer) {
  // Update button classes
  const buttons = document.querySelectorAll(".bm-btn");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const marginBox = document.querySelector(".bm-margin");
  const borderBox = document.querySelector(".bm-border");
  const paddingBox = document.querySelector(".bm-padding");
  const contentBox = document.querySelector(".bm-content");

  // Reset all boxes styling to default
  marginBox.style.borderColor = "#94a3b8";
  marginBox.style.borderStyle = "dashed";
  marginBox.style.boxShadow = "none";

  borderBox.style.borderColor = "#ef4444";
  borderBox.style.boxShadow = "none";

  paddingBox.style.backgroundColor = "#3b82f6";
  paddingBox.style.boxShadow = "none";

  contentBox.style.backgroundColor = "#ffffff";
  contentBox.style.boxShadow = "none";

  // Highlight selected box layer
  if (activeLayer === "margin") {
    marginBox.style.borderColor = "#f59e0b"; // Amber highlight
    marginBox.style.borderStyle = "solid";
    marginBox.style.boxShadow = "0 0 15px rgba(245, 158, 11, 0.4)";
  } else if (activeLayer === "border") {
    borderBox.style.borderColor = "#f43f5e"; // Rose highlight
    borderBox.style.boxShadow = "0 0 15px rgba(244, 63, 94, 0.4)";
  } else if (activeLayer === "padding") {
    paddingBox.style.backgroundColor = "#0f766e"; // Teal highlight
    paddingBox.style.boxShadow = "0 0 15px rgba(15, 118, 110, 0.4)";
  } else if (activeLayer === "content") {
    contentBox.style.backgroundColor = "#ccfbf1"; // Light teal background
    contentBox.style.boxShadow = "0 0 12px rgba(15, 118, 110, 0.3)";
  }
}

// updateGrid(val) - Updates dynamic grid columns live layout + slider label
function updateGrid(val) {
  const gridDisplay = document.getElementById("grid-display");
  const sliderVal = document.getElementById("grid-slider-val");

  if (gridDisplay && sliderVal) {
    gridDisplay.style.gridTemplateColumns = `repeat(${val}, 1fr)`;
    sliderVal.innerText = val;
  }
}

/* ==========================================================================
   📚 Bootstrap Section Demos
   ========================================================================== */

// runGenerator() - Renders live dynamic Bootstrap component based on dropdown selections
function runGenerator() {
  const type = document.getElementById("bs-comp-type").value;
  const style = document.getElementById("bs-comp-style").value;
  const text = document.getElementById("bs-comp-text").value || "Preview Text";
  const output = document.getElementById("bs-generator-output");

  let htmlContent = "";

  // Map theme colors
  const colorMap = {
    primary: { main: "#0f766e", bg: "#ccfbf1", text: "#115e59", border: "#99f6e4" },
    success: { main: "#22c55e", bg: "#dcfce7", text: "#15803d", border: "#bbf7d0" },
    danger: { main: "#f43f5e", bg: "#ffe4e6", text: "#be123c", border: "#fecdd3" },
    warning: { main: "#f59e0b", bg: "#fef3c7", text: "#b45309", border: "#fde68a" },
    info: { main: "#06b6d4", bg: "#ecfeff", text: "#0e7490", border: "#cffafe" }
  };

  const colors = colorMap[style] || colorMap.primary;

  switch (type) {
    case "alert":
      htmlContent = `
        <div style="background-color: ${colors.bg}; color: ${colors.text}; border: 1px solid ${colors.border}; padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 500; font-size: 0.85rem; width: 100%; text-align: center;">
          ${escapeHTML(text)}
        </div>`;
      break;

    case "button":
      htmlContent = `
        <button style="background-color: ${colors.main}; color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">
          ${escapeHTML(text)}
        </button>`;
      break;

    case "badge":
      htmlContent = `
        <span style="background-color: ${colors.main}; color: white; padding: 0.25rem 0.6rem; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.02em;">
          ${escapeHTML(text)}
        </span>`;
      break;

    case "card":
      htmlContent = `
        <div class="bs-card-output">
          <div class="bs-card-img" style="background: linear-gradient(135deg, ${colors.main} 0%, rgba(255,255,255,0.1) 100%);"></div>
          <div class="bs-card-body">
            <h4 class="bs-card-title">${escapeHTML(text)}</h4>
            <p class="bs-card-text">This is a dynamic Bootstrap style card generated live.</p>
          </div>
        </div>`;
      break;

    case "progress":
      htmlContent = `
        <div style="width: 100%;">
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 600; margin-bottom: 4px; color: ${colors.text};">
            <span>Progress</span>
            <span>82%</span>
          </div>
          <div style="background-color: #e2e8f0; height: 10px; border-radius: 9999px; overflow: hidden; width: 100%;">
            <div style="background-color: ${colors.main}; width: 82%; height: 100%; border-radius: 9999px;"></div>
          </div>
        </div>`;
      break;
  }

  output.innerHTML = htmlContent;
}

/* ==========================================================================
   📚 JavaScript Section Demos
   ========================================================================== */

// Calculator Implementation
let calcExpression = "";

function calcAppend(v) {
  const currentEl = document.getElementById("calc-current");
  const exprEl = document.getElementById("calc-expr");

  // Prevent multiple consecutive operators
  const operators = ["+", "-", "*", "/"];
  const lastChar = calcExpression.slice(-1);
  if (operators.includes(v) && operators.includes(lastChar)) {
    return;
  }

  calcExpression += v;
  currentEl.innerText = calcExpression;
  exprEl.innerText = "";
}

function calcClear() {
  calcExpression = "";
  document.getElementById("calc-current").innerText = "0";
  document.getElementById("calc-expr").innerText = "";
}

function calcEquals() {
  const currentEl = document.getElementById("calc-current");
  const exprEl = document.getElementById("calc-expr");

  if (!calcExpression) return;

  try {
    // Sanitize calculations for security before eval
    const sanitizedExpr = calcExpression.replace(/[^0-9+\-*/.]/g, "");
    
    // Evaluate safely using eval on sanitized math characters only
    const result = eval(sanitizedExpr);
    
    exprEl.innerText = calcExpression + " =";
    currentEl.innerText = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
    calcExpression = currentEl.innerText; // Set output as new base expression
  } catch (error) {
    currentEl.innerText = "Error";
    calcExpression = "";
  }
}

// DOM Manipulator Implementation
function domAddTask() {
  const input = document.getElementById("dom-task-input");
  const list = document.getElementById("dom-task-list");

  if (!input || !list) return;

  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please type a task before adding.");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.className = "dom-item";
  
  // Set inner HTML with secure escaping
  li.innerHTML = `
    <span>${escapeHTML(taskText)}</span>
    <button class="dom-remove-btn" onclick="this.parentElement.remove()" aria-label="Remove Task">✕</button>
  `;

  // Append to task list
  list.appendChild(li);

  // Clear input
  input.value = "";
}

/* ==========================================================================
   📬 Contact Section Form
   ========================================================================== */

// submitContact() - Validates contact details, displays success banner, clears form, fades in 5s
function submitContact(event) {
  if (event) event.preventDefault();

  const fname = document.getElementById("contact-fname").value.trim();
  const lname = document.getElementById("contact-lname").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const subject = document.getElementById("contact-subject").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const banner = document.getElementById("contact-banner");

  if (!fname || !lname || !email || !subject || !message) {
    alert("Please fill out all fields of the contact form.");
    return false;
  }

  // Show banner
  banner.className = "contact-banner contact-banner-success";
  banner.innerHTML = `🎉 Thank you, <strong>${escapeHTML(fname)} ${escapeHTML(lname)}</strong>! Your message has been sent successfully. Ashmita will get back to you shortly.`;
  banner.style.display = "block";

  // Reset form inputs
  document.getElementById("portfolio-contact-form").reset();

  // Scroll smooth to banner
  banner.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Auto-hide after 5 seconds
  setTimeout(() => {
    banner.style.display = "none";
  }, 5000);

  return false;
}

/* ==========================================================================
   🔒 Helpers
   ========================================================================== */
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
