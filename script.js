 

      // bid
        AOS.init();
      // Preloader logic
       window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('preloader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
      }, 1000); 
    });

      // Dark mode toggle
      function toggleTheme() {
        document.body.classList.toggle("light-mode");
      }

      function toggleTheme() {
        document.body.classList.toggle("light-mode");
      }

      const modal = document.getElementById("modal");
      const openModalBtn = document.getElementById("openModalBtn");
      const closeModalBtn = document.getElementById("closeModalBtn");

      openModalBtn.onclick = () => {
        modal.style.display = "block";
      };
      closeModalBtn.onclick = () => {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };

      function togglePassword() {
        const passwordInput = document.getElementById("password");
        const eyeIcon = document.getElementById("eye");
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          eyeIcon.classList.remove("fa-eye-slash");
          eyeIcon.classList.add("fa-eye");
        } else {
          passwordInput.type = "password";
          eyeIcon.classList.remove("fa-eye");
          eyeIcon.classList.add("fa-eye-slash");
        }
      }

      // Show success message after form submit
      document
        .getElementById("registerForm")
        .addEventListener("submit", function (e) {
          e.preventDefault(); // prevent actual submission
          document.getElementById("successMessage").style.display = "block";
        });

      const revealElements = document.querySelectorAll(".scroll-reveal");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      revealElements.forEach((el) => observer.observe(el));

      document.addEventListener("DOMContentLoaded", () => {
        const fadeElems = document.querySelectorAll(".fade-in");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.2 }
        );

        fadeElems.forEach((el) => observer.observe(el));
      });

      
    
      // categories
      (() => {
        const categories = ["art", "vehicles", "tech", "collectibles"];
        const buttons = document.querySelectorAll(".category-button");
        const sliders = {};

        categories.forEach((cat) => {
          sliders[cat] = document.getElementById(cat + "-slider");
        });

        // Show only the active category slider
        function showCategory(cat) {
          categories.forEach((c) => {
            const isActive = c === cat;
            const slider = sliders[c];
            slider.hidden = !isActive;
            slider.setAttribute("aria-hidden", !isActive);
            const btn = document.querySelector(
              `.category-button[data-category="${c}"]`
            );
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-selected", isActive.toString());
          });
          closeAllBidSections();
        }

        buttons.forEach((btn) => {
          btn.addEventListener("click", () => {
            showCategory(btn.dataset.category);
          });
        });

        showCategory("art");

        // CONTINUOUS SCROLL LOGIC
        const speed = 1; // pixels per frame
        const frameRate = 10; // ms interval

        categories.forEach((cat) => {
          const track = sliders[cat].querySelector(".slider-track");
          let isHovered = false;
          let scrollAmount = 0;

          sliders[cat].addEventListener("mouseenter", () => {
            isHovered = true;
          });

          sliders[cat].addEventListener("mouseleave", () => {
            isHovered = false;
          });

          setInterval(() => {
            if (!sliders[cat].hidden && !isHovered) {
              scrollAmount += speed;
              if (scrollAmount >= track.scrollWidth / 2) {
                scrollAmount = 0;
              }
              track.style.transform = `translateX(-${scrollAmount}px)`;
            }
          }, frameRate);
        });

        // Bid section toggle on "Item Details" button click
        const detailButtons = document.querySelectorAll(".item-details-btn");

        function closeAllBidSections() {
          document.querySelectorAll(".bid-section.active").forEach((s) => {
            s.classList.remove("active");
          });
          document.querySelectorAll(".bid-message").forEach((m) => {
            m.textContent = "";
          });
        }

        detailButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = button.closest(".card");
            const bidSection = card.querySelector(".bid-section");
            const isActive = bidSection.classList.contains("active");
            closeAllBidSections();
            if (!isActive) {
              bidSection.classList.add("active");
              card.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          });
        });

        // Place bid button logic
        const allCards = document.querySelectorAll(".card");
        allCards.forEach((card) => {
          const placeBidBtn = card.querySelector(".place-bid");
          const bidMessage = card.querySelector(".bid-message");
          placeBidBtn.addEventListener("click", () => {
            const input = card.querySelector('input[type="number"]');
            const currentBidText = card
              .querySelector(".bid-row span:last-child")
              .textContent.replace(/\$|,/g, "");
            const currentBid = parseFloat(currentBidText);
            let bidValue = parseFloat(input.value);
            if (isNaN(bidValue)) {
              bidMessage.textContent = "Please enter a valid bid amount.";
              bidMessage.style.color = "red";
              return;
            }
            if (bidValue <= currentBid) {
              bidMessage.textContent = `Your bid must be higher than the current bid ($${currentBid}).`;
              bidMessage.style.color = "red";
              return;
            }
            card.querySelector(
              ".bid-row span:last-child"
            ).textContent = `$${bidValue.toLocaleString()}`;
            input.min = bidValue + 1;
            input.value = "";
            bidMessage.style.color = "green";
            bidMessage.textContent = "Your bid was placed successfully.";
            setTimeout(() => {
              bidMessage.textContent = "";
            }, 4000);
          });
        });
      })();
      
