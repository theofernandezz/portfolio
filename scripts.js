document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const menuBtn = document.querySelector(".menu-btn");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  let lastScrollTop = 0;
  const navbar = document.querySelector("header");
  const navbarHeight = navbar.offsetHeight;

  // Change navbar style on scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
      navbar.style.backgroundColor = "rgba(58, 175, 169, 0.95)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.backgroundColor = "var(--color-primary)";
      navbar.style.boxShadow = "none";
    }

    // Modified hide/show navbar logic
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight * 2) {
      // Increased threshold
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-bar a");

  // Highlight active navigation item on scroll
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").slice(1) === current) {
        item.classList.add("active");
      }
    });
  });

  const projectBtns = document.querySelectorAll(".project-btn");

  // Add hover effect to project buttons
  projectBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", function (e) {
      this.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", function (e) {
      this.style.transform = "translateY(0)";
    });
  });

  const projectImages = document.querySelectorAll(".project-img img");

  // Fade in project images on load
  projectImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });

  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Validate form
      if (!validateForm(e)) return;

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Get the submit button
      const submitBtn = form.querySelector('button[type="submit"]');

      try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Send email using FormSubmit
        const response = await fetch(
          "https://formsubmit.co/ajax/theo@netflux.com.ar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        // Show success message
        alert("Thank you for your message! I will get back to you soon.");
        form.reset();
      } catch (error) {
        // Show error message
        alert(
          "Sorry, there was an error sending your message. Please try again."
        );
        console.error("Form submission error:", error);
      } finally {
        // Always reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });

    function validateForm(e) {
      const email = form.querySelector('input[type="email"]').value;
      const name = form.querySelector('input[name="name"]').value;

      if (name.length < 2) {
        alert("Please enter a valid name");
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return false;
      }

      return true;
    }
  }

  const overlay = document.createElement(`div`);
  overlay.classList.add(`menu-overlay`);
  body.appendChild(overlay);

  // Toggle mobile menu
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");

    // Toggle body scroll
    if (menuBtn.classList.contains("active")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  });

  // close menu when clicking overlay
  overlay.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
    body.style.overflow = "";
  });

  // close menu when clicking menu items
  const navLinksMobile = document.querySelectorAll(".nav-menu a");
  navLinksMobile.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // close menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menuBtn.classList.remove("active");
      navMenu.classList.remove("active");
      overlay.classList.remove("active");
      body.style.overflow = "";
    }
  });
});
