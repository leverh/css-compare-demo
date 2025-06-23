document.addEventListener("DOMContentLoaded", function () {
  if (window.ResizeObserver) {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".comparison-section");
    const containerDemo = document.querySelector(".container-demo");
    const cssVarsDemo = document.querySelector(".css-vars-demo");
    const themeButtons = document.querySelectorAll(".theme-btn");
    const jsBox = document.getElementById("jsBox");
    const jsBtn = document.querySelector(".js-animate-btn");

    function updateActiveNav() {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();

    if (containerDemo) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const width = Math.round(entry.contentRect.width);
          const hint = entry.target.parentNode.querySelector(".resize-hint");
          if (hint) {
            hint.textContent = `Container width: ${width}px - ${
              width <= 300 ? "Stacked layout!" : "Side-by-side layout"
            }`;
          }
        }
      });

      resizeObserver.observe(containerDemo);
    }

    if (cssVarsDemo && themeButtons.length > 0) {
      themeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const theme = this.getAttribute("data-theme");

          themeButtons.forEach((btn) => btn.classList.remove("active"));

          this.classList.add("active");

          cssVarsDemo.setAttribute("data-theme", theme);
        });
      });

      themeButtons[0].classList.add("active");
    }
    if (jsBox && jsBtn) {
      jsBtn.addEventListener("click", function () {
        let pos = 0;
        let rotation = 0;
        jsBox.style.transform = "translateX(0) rotate(0deg)";

        function animate() {
          pos += 3;
          rotation += 5;
          jsBox.style.transform = `translateX(${pos}px) rotate(${rotation}deg)`;

          if (pos < 200) {
            requestAnimationFrame(animate);
          }
        }
        animate();
      });
    }

    const cssBox = document.querySelector(".css-box");
    const cssBtn = document.querySelector(".css-animate-btn");

    if (cssBox && cssBtn) {
      cssBtn.addEventListener("click", function () {
        cssBox.classList.remove("animate");
        void cssBox.offsetWidth; // Trigger reflow
        cssBox.classList.add("animate");
      });
    }

    document.documentElement.style.scrollBehavior = "smooth";
  }
});
