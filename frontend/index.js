// JavaScript for e-Biz Technocrats Homepage

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initScrollAnimations();
    initStatsCounter();
    initTestimonialsSlider();
    initContactForm();
    initBackToTop();
    initThemeToggle();
    initTechFilter();
    initCostCalculator();
    initAiChatbot();
    initSearch();
});

// 1. Header Scroll effect
function initHeaderScroll() {
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 2. Mobile Nav Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Mobile dropdown accordion: toggle .mobile-open on dropdown parents
        const dropdownToggles = navMenu.querySelectorAll('li.dropdown > a');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const isMobile = window.innerWidth <= 1024;
                if (isMobile) {
                    e.preventDefault(); // Don't navigate
                    e.stopPropagation();
                    const parent = toggle.closest('li.dropdown');
                    // Close other open dropdowns
                    navMenu.querySelectorAll('li.dropdown.mobile-open').forEach(el => {
                        if (el !== parent) el.classList.remove('mobile-open');
                    });
                   if (parent.classList.contains('mobile-open')) {
    parent.classList.remove('mobile-open');
} else {

    navMenu.querySelectorAll('.dropdown.mobile-open').forEach(item => {
        item.classList.remove('mobile-open');
    });

    parent.classList.add('mobile-open');
}
                }
            });
        });
        navMenu.querySelectorAll('.dropdown-menu a').forEach(link => {

    link.addEventListener('click', () => {

        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');

        navMenu.querySelectorAll('.dropdown.mobile-open').forEach(item => {
            item.classList.remove('mobile-open');
        });

    });

});


        // Close entire menu when clicking a non-dropdown link
        const links = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                navMenu.querySelectorAll('li.dropdown.mobile-open').forEach(el => {
                    el.classList.remove('mobile-open');
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                navMenu.querySelectorAll('li.dropdown.mobile-open').forEach(el => {
                    el.classList.remove('mobile-open');
                });
            }
        });
    }
}

// 3. Scroll Reveal Animations using IntersectionObserver
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to animate
                entry.target.classList.add('animated');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 4. Counter animations for statistics
function initStatsCounter() {
    const statsSection = document.querySelector('.about-stats');
    const numbers = document.querySelectorAll('.stat-number');
    
    if (!statsSection || numbers.length === 0) return;
    
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateNumbers();
                animated = true;
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
    
    function animateNumbers() {
        numbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10);
            const duration = 2000; // 2 seconds
            const stepTime = 30; // ms per step
            const steps = duration / stepTime;
            const increment = target / steps;
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    num.innerText = target;
                    clearInterval(timer);
                } else {
                    num.innerText = Math.floor(current);
                }
            }, stepTime);
        });
    }
}

function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('sliderDots');

    if (!slides.length) return;

    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 5000;

    // Show first testimonial immediately
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === 0) slide.classList.add('active');
    });

    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';

        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');

            if (index === 0) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });

            dotsContainer.appendChild(dot);
        });
    }

    function updateDots() {
        const dots = document.querySelectorAll('#sliderDots .dot');

        dots.forEach(dot => dot.classList.remove('active'));

        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    }

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('active');

        updateDots();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    function startInterval() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();
}
// 6. Contact Form Processing simulation
function initContactForm() {
    const form = document.getElementById("inquiryForm");
    const feedback = document.getElementById("formFeedback");
    const submitBtn = document.getElementById("submitBtn");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        feedback.className = "form-feedback";
        feedback.innerHTML = "";

        const data = {
            name: document.getElementById("formName").value,
            email: document.getElementById("formEmail").value,
            phone: document.getElementById("formPhone").value,
            message: document.getElementById("formMessage").value
        };

        try {
             const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                feedback.classList.add("success");
                feedback.innerHTML = result.message;
                form.reset();
            } else {
                feedback.classList.add("error");
                feedback.innerHTML = result.message;
            }

        } catch (err) {
            feedback.classList.add("error");
            feedback.innerHTML = "An error occurred while sending your message. Please try again later.";
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Inquiry";
    });
}

// 7. Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// 8. Theme Toggle (Light / Dark Mode)
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;
    
    // Reset to light theme once
    if (localStorage.getItem('ebiz-theme-reset-v2') !== 'true') {
        localStorage.setItem('ebiz-theme', 'light');
        localStorage.setItem('theme', 'light');
        localStorage.setItem('ebiz-theme-reset-v2', 'true');
    }
    
    // Check saved preference
    const savedTheme = localStorage.getItem('ebiz-theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('ebiz-theme', 'dark');
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('ebiz-theme', 'light');
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}

// 9. Tech Stack Filter
function initTechFilter() {
    const tabs = document.querySelectorAll('.tech-tab-btn');
    const cards = document.querySelectorAll('#partnersGrid .partner-card');
    
    if (tabs.length === 0 || cards.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to current
            tab.classList.add('active');
            
            const filter = tab.getAttribute('data-filter');
            
            cards.forEach(card => {
                const categories = card.getAttribute('data-cat') || '';
                
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else if (categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// 10. Interactive Cost Calculator
function initCostCalculator() {
    const typeCards = document.querySelectorAll('#calcTypeOpts .calc-opt-card');
    const featureChecks = document.querySelectorAll('.calc-feature-check');
    const resultCost = document.getElementById('calcResultCost');
    const resultTime = document.getElementById('calcResultTime');
    const applyBtn = document.getElementById('applyCalcBtn');
    
    
    if (typeCards.length === 0 || !resultCost || !resultTime || !applyBtn) return;
    
    let activeType = 'software';
    let baseCost = 2500;
    let baseTime = 3;
    
    // Calculate total on startup
    calculateTotal();
    
    // Listen to Project Type selection
    typeCards.forEach(card => {
        card.addEventListener('click', () => {
            typeCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            activeType = card.getAttribute('data-type');
            baseCost = parseInt(card.getAttribute('data-base'), 10);
            baseTime = parseFloat(card.getAttribute('data-time'));
            
            calculateTotal();
        });
    });
    
    // Listen to Feature selections
    featureChecks.forEach(check => {
        check.addEventListener('change', () => {
            calculateTotal();
        });
    });
    
    function calculateTotal() {
        let totalCost = baseCost;
        let totalTime = baseTime;
        
        featureChecks.forEach(check => {
            if (check.checked) {
                totalCost += parseInt(check.getAttribute('data-cost'), 10);
                totalTime += parseFloat(check.getAttribute('data-time-add'));
            }
        });
        
        // Format cost as USD
        resultCost.innerText = '$' + totalCost.toLocaleString();
        
        // Format timeline
        const timelineText = totalTime % 1 === 0 ? totalTime + ' Months' : totalTime.toFixed(1) + ' Months';
        resultTime.innerText = timelineText;
        
        // Save state on apply btn click handler
        applyBtn.dataset.cost = totalCost;
        applyBtn.dataset.time = timelineText;
    }
    
    // Apply quote to form fields
    applyBtn.addEventListener('click', () => {
        const serviceSelect = document.getElementById('formService');
        const messageTextarea = document.getElementById('formMessage');
        
        if (serviceSelect) {
            // Set service type
            serviceSelect.value = activeType;
        }
        
        if (messageTextarea) {
            // Get selected features list
            const selectedFeatures = [];
            featureChecks.forEach(check => {
                if (check.checked) {
                    const label = check.parentElement.querySelector('span').innerText;
                    selectedFeatures.append ? selectedFeatures.push(label) : selectedFeatures.push(label);
                }
            });
            
            const featureStr = selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'None';
            const projectTypeName = document.querySelector('#calcTypeOpts .calc-opt-card.active span').innerText;
            
            const summaryText = `--- QUOTE ESTIMATE BREAKDOWN ---\n` +
                                `Project Type: ${projectTypeName}\n` +
                                `Features: ${featureStr}\n` +
                                `Estimated Budget: ${resultCost.innerText}\n` +
                                `Estimated Timeline: ${resultTime.innerText}\n` +
                                `---------------------------------\n\n` +
                                `Hello e-Biz Team, I have generated this estimate and would like to discuss my project. `;
            
            messageTextarea.value = summaryText;
            
            // Scroll to form fields
            serviceSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight text area briefly
            messageTextarea.style.outline = '2px solid var(--color-primary)';
            setTimeout(() => {
                messageTextarea.style.outline = 'none';
            }, 1500);
        }
    });
}

// 11. AI FAQ Chatbot Widget
function initAiChatbot() {
    const toggle = document.getElementById('aiChatToggle');
    const windowEl = document.getElementById('aiChatWindow');
    const close = document.getElementById('aiChatClose');
    const messages = document.getElementById('aiChatMessages');
    const suggestionContainer = document.getElementById('aiChatSuggestions');
    
    if (!toggle || !windowEl || !close || !messages) return;
    
    // Bot responses dictionary
    const responses = {
        services: "We offer a wide spectrum of cutting-edge IT solutions, including:<br>• <strong>Custom Software Development</strong> (PHP, Laravel, Node.js)<br>• <strong>Mobile App Development</strong> (Native Android/iOS, Flutter)<br>• <strong>Web Portals & E-commerce</strong> (Shopify, Custom platforms)<br>• <strong>IT Infrastructure & Security</strong> (Cisco, Sophos setups)<br>• <strong>Digital Marketing</strong> & result-oriented SEO strategies.",
        clients: "Our solutions are trusted by over 500+ global brands, including:<br>• <strong>JK Tyre</strong>: Custom Tire Testing Analysis Software<br>• <strong>Marvel Vinyls</strong>: Real-time Visitor & Gate Pass Management<br>• <strong>Alkaline Purifier</strong>: IoT Water Quality Companion App<br>• <strong>Advanced Solar & Batteries</strong>: Custom ERP distribution portal",
        calculator: "You can calculate your estimated budget directly in the Contact Form section above! Simply select your project type, choose your add-on features, and click 'Apply Estimate' to pre-fill your form.",
        contact: "You can reach out to our team via:<br>• <strong>Gwalior Office</strong>: +91-8962733774, 0751-4010424<br>• <strong>UK Office</strong>: +44 7855818795<br>• <strong>Australia Office</strong>: +61-438329353<br>• <strong>Email</strong>: info@ebiztechnocrats.com<br><br>Or submit the Contact form on this page!"
    };
    
    // Toggle window opening
    toggle.addEventListener('click', () => {
        windowEl.classList.toggle('open');
        scrollToBottom();
    });
    
    close.addEventListener('click', () => {
        windowEl.classList.remove('open');
    });
    
    // Handle suggestion button clicks
    suggestionContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.ai-suggest-btn');
        if (!btn) return;
        
        const key = btn.getAttribute('data-question');
        const questionText = btn.innerText;
        
        // Append user question
        appendMessage(questionText, 'user');
        
        // Typing simulation
        setTimeout(() => {
            const answer = responses[key] || "I'm sorry, I didn't understand that. Please use one of the quick questions below.";
            appendMessage(answer, 'bot');
        }, 600);
    });
    
    function appendMessage(text, sender) {
        const msg = document.createElement('div');
        msg.classList.add('ai-message', sender);
        msg.innerHTML = text;
        messages.appendChild(msg);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }
}

// 12. Responsive Search Bar & client-side search indexing
function initSearch() {
    const searchToggles = document.querySelectorAll('.search-toggle-btn');
    const overlay = document.getElementById('searchOverlay');
    const closeBtn = document.getElementById('searchCloseBtn');
    const overlayBg = document.getElementById('searchOverlayBg');
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClearBtn');
    const resultsContainer = document.getElementById('searchResults');

    if (searchToggles.length === 0 || !overlay || !closeBtn || !input || !resultsContainer) return;

    const searchIndex = [
        { title: "Home Page", url: "index.html", desc: "e-Biz Technocrats Pvt. Ltd. Premium Software Solutions & IT Services.", category: "Page" },
        { title: "Partners & Technology Stack", url: "partners.html", desc: "Our official partner certifications including AWS, Google Cloud, Microsoft, Cisco, Shopify, and more.", category: "Page" },
        { title: "Clients & Work / Case Studies", url: "clients-work.html", desc: "See our verified case studies and testimonials from clients like JK Tyre, Marvel Vinyls, and Alkaline Purifier.", category: "Page" },
        { title: "Insights & Resources Blog", url: "blogs.html", desc: "Read latest articles on AI in software engineering, blockchain, SME cloud-first models, SEO strategies, and LinkedIn optimizations.", category: "Page" },
        { title: "About Us & Leadership Team", url: "about-us.html", desc: "Meet the founders and team members behind e-Biz Technocrats: Sanjeev Goyal, Vipul Goyal, and our dedicated engineers.", category: "Page" },
        { title: "What We Do & Services", url: "what-we-do.html", desc: "Explore custom software development, IT solutions, cloud infrastructure, SaaS, digital marketing, PR, and outsourcing.", category: "Page" },
        { title: "Privacy Policy", url: "privacy-policy.html", desc: "Official privacy policy and data protection guidelines of e-Biz Technocrats.", category: "Page" },
        { title: "Terms & Conditions", url: "terms-and-conditions.html", desc: "Official terms, user responsibilities, intellectual property, and payment terms of e-Biz Technocrats.", category: "Page" },
        { title: "Software Development Services", url: "what-we-do.html#tab-it", desc: "Custom enterprise software development, database systems, testing, and debugging.", category: "Service" },
        { title: "Mobile Application Development", url: "what-we-do.html#tab-it", desc: "High-performance native and cross-platform mobile apps for Android and iOS using Flutter or React Native.", category: "Service" },
        { title: "Website Design & Custom Development", url: "what-we-do.html#tab-web", desc: "Responsive corporate websites, high-converting landing pages, e-commerce stores, and CMS integrations.", category: "Service" },
        { title: "Cloud & Infrastructure Solutions", url: "what-we-do.html#tab-cloud", desc: "Scalable cloud computing, server setups, hosting on AWS/GCP, Tally on Cloud, and desktop virtualizations.", category: "Service" },
        { title: "SaaS Application Development", url: "what-we-do.html#tab-saas", desc: "Custom Software-as-a-Service platforms, project trackers, and online admission modules.", category: "Service" },
        { title: "Telephony & SMS Solutions", url: "what-we-do.html#tab-telephony", desc: "Cloud telephony, interactive voice response (IVR), transaction SMS, OTP automation, and WhatsApp API integrations.", category: "Service" },
        { title: "PR & Digital Branding", url: "what-we-do.html#tab-marketing", desc: "Brand identity design, logo creation, visual design systems, reputation management, and public relations.", category: "Service" },
        { title: "Digital Marketing & SEO", url: "what-we-do.html#tab-marketing", desc: "Search Engine Optimization (SEO), social media ads, Google/Facebook campaigns, and high-quality copywriting.", category: "Service" },
        { title: "IT Sourcing & Outsourcing Services", url: "what-we-do.html#tab-outsourcing", desc: "Outsourced call center systems, back-office support, virtual assistant reception, and IT staffing.", category: "Service" },
        { title: "Business Consultancy & Incubation", url: "what-we-do.html#tab-consultancy", desc: "SOP development, MSA/ISO certifications, six sigma practices, fund scheme incubation, and startup strategies.", category: "Service" },
        { title: "The Decentralized Powerhouse of Blockchain", url: "blog-detail.html?id=blockchain", desc: "How blockchain technology is reshaping finance, DeFi, NFTs, supply chains, and security.", category: "Blog" },
        { title: "Crafting an Impressive LinkedIn Profile for Job Seekers", url: "blog-detail.html?id=linkedin", desc: "Key strategies to optimize your LinkedIn profile, tell your professional story, and attract recruiters.", category: "Blog" },
        { title: "How AI is Shaping the Future of Software Development", url: "blog-detail.html?id=ai", desc: "AI-driven code completion, automated QA testing, predictive maintenance, and developer assistance in 2026.", category: "Blog" }
    ];

    // Open Search Overlay
    searchToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {

        e.preventDefault();
        e.stopPropagation();

        // Close mobile menu first
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.getElementById('menuToggle');

        if (navMenu) navMenu.classList.remove('open');
        if (menuToggle) menuToggle.classList.remove('active');

        // Close any open dropdowns
        document.querySelectorAll('.dropdown.mobile-open').forEach(item => {
            item.classList.remove('mobile-open');
        });

        // Open search overlay
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            input.focus();
        }, 100);

    });
});
    // Close Search Overlay
    const closeSearch = () => {
        overlay.classList.remove('open');
        document.body.style.overflow = ''; // Unlock scroll
        input.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        resultsContainer.innerHTML = '<div class="search-status">Type to search services, pages, or articles...</div>';
    };

    closeBtn.addEventListener('click', closeSearch);
    if (overlayBg) overlayBg.addEventListener('click', closeSearch);

    // Escape key closes search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeSearch();
        }
    });

    // Clear input
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
            clearBtn.style.display = 'none';
            resultsContainer.innerHTML = '<div class="search-status">Type to search services, pages, or articles...</div>';
        });
    }

    // Live Search Logic
    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();

        if (!query) {
            if (clearBtn) clearBtn.style.display = 'none';
            resultsContainer.innerHTML = '<div class="search-status">Type to search services, pages, or articles...</div>';
            return;
        }

        if (clearBtn) clearBtn.style.display = 'block';

        // Filter results
        const filtered = searchIndex.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.desc.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query);
        });

        if (filtered.length === 0) {
            resultsContainer.innerHTML = `<div class="search-status">No results found for "${escapeHtml(query)}"</div>`;
            return;
        }

        // Render results with highlighting
        let html = '<div class="search-results-list">';
        filtered.forEach(item => {
            const highlightedTitle = highlightText(item.title, query);
            const highlightedDesc = highlightText(item.desc, query);
            html += `
                <a href="${item.url}" class="search-result-item">
                    <div class="search-result-header">
                        <span class="search-result-title">${highlightedTitle}</span>
                        <span class="search-result-cat">${item.category}</span>
                    </div>
                    <p class="search-result-desc">${highlightedDesc}</p>
                </a>
            `;
        });
        html += '</div>';
        resultsContainer.innerHTML = html;
    });

    function highlightText(text, query) {
        const index = text.toLowerCase().indexOf(query);
        if (index === -1) return escapeHtml(text);
        
        const before = text.substring(0, index);
        const match = text.substring(index, index + query.length);
        const after = text.substring(index + query.length);
        
        return escapeHtml(before) + `<span class="search-highlight">${escapeHtml(match)}</span>` + escapeHtml(after);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }
}
document.getElementById("inquiryForm").addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm(
        "service_auyq56b",
        "template_klf22sp",
        this
    )
    .then(function () {
                const feedback = document.getElementById('formFeedback');
                feedback.textContent = "Message sent successfully.";
                feedback.classList.remove('hidden');

        document.getElementById("inquiryForm").reset();
    })
    .catch(function (error) {
        alert("Failed to send message.");
        console.log(error);
    });
});

// Auto-fill subject when an Apply Now button is clicked
document.querySelectorAll(".btn-job").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const jobItem = this.closest(".job-item");
    const titleElem = jobItem?.querySelector(".job-info h5");
    const role = titleElem ? titleElem.textContent.trim() : "";
    const subjectInput = document.getElementById("formSubject");
    if (subjectInput) subjectInput.value = role;
  });
});