/**
 * ==========================================================================
 * Modern Portfolio Interactive Actions (main.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollSpy();
    initBackToTopButton();
    initAccordionAnimation();
    updateCopyrightYear();
    console.log('🚀 Portfolio scripting initialized successfully with semantic interactivity.');
});

/**
 * Update Footer Copyright Year Dynamically
 */
function updateCopyrightYear() {
    const copyrightTimeEl = document.querySelector('footer time');
    if (copyrightTimeEl) {
        const currentYear = new Date().getFullYear();
        copyrightTimeEl.textContent = currentYear;
        copyrightTimeEl.setAttribute('datetime', currentYear);
    }
}

/**
 * Dynamic Scroll Spy (Highlights the current visible section in header navigation)
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('header nav ul li a');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Detects section when it occupies the center area of screen
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => spyObserver.observe(section));
}

/**
 * Creates and Handles a Smooth Floating "Back to Top" Button UI
 */
function initBackToTopButton() {
    // Create the semantic button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.type = 'button';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Scroll back to the top of the page');
    backToTopBtn.setAttribute('title', 'Go to top');
    document.body.appendChild(backToTopBtn);

    // Fade in or fade out button depending on scroll depth
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scroll action
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Smooth details/summary accordion animation transitions
 */
function initAccordionAnimation() {
    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach((el) => {
        const summary = el.querySelector('summary');
        const content = el.querySelector('.details-content');

        if (!summary || !content) return;

        summary.addEventListener('click', (e) => {
            // Prevent default behavior so we can manage open state transitions
            e.preventDefault();

            if (el.hasAttribute('open')) {
                // Shrinking animation
                el.style.overflow = 'hidden';
                const startHeight = el.offsetHeight;

                // Temporarily disable padding transitions
                const endHeight = summary.offsetHeight + 32; // basic summary height + padding

                const animation = el.animate({
                    height: [ `${startHeight}px`, `${endHeight}px` ]
                }, {
                    duration: 250,
                    easing: 'ease-out'
                });

                animation.onfinish = () => {
                    el.removeAttribute('open');
                    el.style.height = '';
                    el.style.overflow = '';
                };
            } else {
                // Expanding animation
                el.setAttribute('open', 'true');
                el.style.overflow = 'hidden';

                const endHeight = el.scrollHeight;
                const startHeight = summary.offsetHeight + 32;

                const animation = el.animate({
                    height: [ `${startHeight}px`, `${endHeight}px` ]
                }, {
                    duration: 300,
                    easing: 'ease-out'
                });

                animation.onfinish = () => {
                    el.style.height = '';
                    el.style.overflow = '';
                };
            }
        });
    });
}

/**
 * Contact form submission handling
 */
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop form from refreshing the page

    // Gather the data from the input fields
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('msg').value,
        timestamp: new Date().toISOString()
    };

    // Convert the JavaScript object into a formatted JSON string
    const jsonString = JSON.stringify(formData, null, 2);

    // Create a Blob file wrapper around the string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary hidden download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'response.json'; // The filename

    // Programmatically click the link to trigger the download window
    downloadLink.click();
});

/*USE THIS BLOCK TO SAVE SUBMISSIONS TO CSV*/
/*
function saveToCSV() {
  // 1. Gather input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // 2. Validate that fields are not empty
  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  // 3. Format data and handle commas/quotes for valid CSV syntax
  const headers = ["Name", "Email", "Message"];
  const rowData = [
    `"${name.replace(/"/g, '""')}"`,
    `"${email.replace(/"/g, '""')}"`,
    `"${message.replace(/"/g, '""')}"`
  ];

  const csvContent = headers.join(",") + "\n" + rowData.join(",");

  // 4. Create a Blob object with CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // 5. Create a temporary download link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", "response.csv");
  link.style.visibility = 'hidden';
  
  // 6. Trigger the download and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
*/