document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

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

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
      navbar.style.transform = `translateY(-${navbarHeight}px)`;
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
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

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    // Handle contact form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      console.log("Form submitted:", Object.fromEntries(formData));

      alert("Thank you for your message! I will get back to you soon.");

      this.reset();
    });
  }

  const projectImages = document.querySelectorAll(".project-img img");

  // Fade in project images on load
  projectImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });

  const form = document.querySelector(".contact-form");

  // Validate contact form before submission
  function validateForm(e) {
    const email = form.querySelector('input[type="email"]').value;
    const name = form.querySelector('input[name="name"]').value;

    if (name.length < 2) {
      alert("Please enter a valid name");
      e.preventDefault();
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      e.preventDefault();
      return false;
    }

    return true;
  }

  form.addEventListener("submit", validateForm);
});
