/* =========================================================
   CART RESCUE AI
   GLOBAL JAVASCRIPT
   File: js/main.js
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeAuthGate();

    initializeNavigation();

    initializeMobileMenu();

    initializeScrollReveal();

    initializeCounters();

    initializeSmoothScroll();

    initializeCurrentYear();

    initializeBackToTop();

    initializeTheme();

    initializeButtons();

    initializeTooltips();

    initializeNotifications();

    initializeKeyboardNavigation();

    initializeLazyLoading();

    initializeContactForm();

    initializeStorefront();

    console.log(
        "%cCart Rescue AI",
        "font-size: 20px; font-weight: 800;"
    );

    console.log(
        "%cAI Cart Recovery System initialized successfully.",
        "font-size: 13px;"
    );

});


function initializeAuthGate() {

    const gate = document.getElementById("authGate");

    if (!gate) {
        return;
    }

    const intro = document.getElementById("authIntro");
    const panel = document.getElementById("authPanel");
    const form = document.getElementById("authForm");
    const title = document.getElementById("authTitle");
    const subtitle = document.getElementById("authSubtitle");
    const nameField = document.getElementById("authName");
    const emailField = document.getElementById("authEmail");
    const passwordField = document.getElementById("authPassword");
    const error = document.getElementById("authError");
    const submit = document.getElementById("authSubmit");
    const switchText = document.getElementById("authSwitchText");
    let mode = "login";

    const unlock = () => {
        sessionStorage.setItem("cartRescueAuthenticated", "true");
        gate.classList.add("is-unlocked");
        document.body.classList.remove("auth-locked");
    };

    if (sessionStorage.getItem("cartRescueAuthenticated") === "true") {
        unlock();
        return;
    }

    document.body.classList.add("auth-locked");

    window.setTimeout(() => {
        intro.classList.add("is-hidden");
        intro.setAttribute("aria-hidden", "true");
        panel.classList.add("is-visible");
        panel.setAttribute("aria-hidden", "false");
        emailField.focus();
    }, 2200);

    const toggleMode = () => {
        mode = mode === "login" ? "register" : "login";
        panel.classList.toggle("is-register", mode === "register");
        title.textContent = mode === "register" ? "Create your workspace" : "Welcome back";
        subtitle.textContent = mode === "register"
            ? "Register to start turning abandoned carts into revenue."
            : "Sign in to continue to your recovery workspace.";
        submit.innerHTML = mode === "register"
            ? "Create workspace <i class=\"fa-solid fa-arrow-right\"></i>"
            : "Sign in <i class=\"fa-solid fa-arrow-right\"></i>";
        switchText.innerHTML = mode === "register"
            ? "Already have access? <button type=\"button\" data-auth-mode=\"login\">Sign in</button>"
            : "New to Cart Rescue? <button type=\"button\" data-auth-mode=\"register\">Create an account</button>";
        switchText.querySelector("button").addEventListener("click", toggleMode);
        error.textContent = "";
    };

    switchText.querySelector("button").addEventListener("click", toggleMode);

    form.addEventListener("submit", event => {
        event.preventDefault();
        error.textContent = "";

        if (mode === "register" && !nameField.value.trim()) {
            error.textContent = "Enter your name to continue.";
            nameField.focus();
            return;
        }

        if (!emailField.checkValidity()) {
            error.textContent = "Enter a valid work email.";
            emailField.focus();
            return;
        }

        if (passwordField.value.length < 6) {
            error.textContent = "Use a password with at least 6 characters.";
            passwordField.focus();
            return;
        }

        submit.disabled = true;
        submit.textContent = mode === "register" ? "Creating workspace..." : "Signing in...";

        window.setTimeout(() => {
            unlock();
            submit.disabled = false;
        }, 500);
    });

}


function initializeStorefront() {

    const grid = document.querySelector(".store-product-grid");
    const drawer = document.getElementById("storeCartDrawer");

    if (!grid || !drawer) {
        return;
    }

    const items = new Map();
    const count = document.getElementById("storeCartCount");
    const total = document.getElementById("storeCartTotal");
    const cartItems = document.getElementById("storeCartItems");
    const backdrop = document.getElementById("storeCartBackdrop");
    const search = document.getElementById("storeSearch");
    const modal = document.getElementById("storeProductModal");
    const modalTitle = document.getElementById("storeModalTitle");
    const modalDescription = document.getElementById("storeModalDescription");
    const modalPrice = document.getElementById("storeModalPrice");
    const modalAdd = document.getElementById("storeModalAdd");
    const checkoutButton = document.getElementById("storeCheckout");
    const checkoutStatus = document.getElementById("storeCheckoutStatus");
    let modalProduct = null;
        let selectedCategory = "all";

    const formatPrice = value => `₹${new Intl.NumberFormat("en-IN").format(value)}`;

    const savedCart = JSON.parse(localStorage.getItem("cartRescueStoreCart") || "[]");
    savedCart.forEach(item => items.set(item.id, item));

    const renderCart = () => {
        const products = [...items.values()];
        const itemCount = products.reduce((sum, item) => sum + item.quantity, 0);
        const cartTotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);

        count.textContent = itemCount;
        total.textContent = formatPrice(cartTotal);
        localStorage.setItem("cartRescueStoreCart", JSON.stringify(products));

        if (!products.length) {
            cartItems.innerHTML = '<p class="store-cart-empty">Your cart is waiting for a good idea.</p>';
            return;
        }

        cartItems.innerHTML = products.map(item => `
            <div class="store-cart-item" data-cart-item="${item.id}">
                <div>
                    <strong>${item.name}</strong>
                    <span>${formatPrice(item.price)} each</span>
                    <div class="store-cart-controls">
                        <button type="button" data-cart-action="decrease" aria-label="Decrease ${item.name}">-</button>
                        <span>${item.quantity}</span>
                        <button type="button" data-cart-action="increase" aria-label="Increase ${item.name}">+</button>
                    </div>
                </div>
                <strong>${formatPrice(item.price * item.quantity)}</strong>
            </div>
        `).join("");
    };

    const setDrawer = isOpen => {
        drawer.classList.toggle("is-open", isOpen);
        backdrop.classList.toggle("is-open", isOpen);
        drawer.setAttribute("aria-hidden", String(!isOpen));
        document.getElementById("storeCartTrigger").setAttribute("aria-expanded", String(isOpen));
    };

    const startCheckout = async () => {
        const cart = [...items.values()];

        if (!cart.length) {
            checkoutStatus.textContent = "Add a product before checkout.";
            return;
        }

        checkoutButton.disabled = true;
        checkoutStatus.textContent = "Preparing secure checkout...";

        try {
            const checkoutApiUrl = window.location.protocol === "file:"
                ? "https://cart-rescue-ai.vercel.app/api/create-checkout-session"
                : "/api/create-checkout-session";
            const response = await fetch(checkoutApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart })
            });
            const result = await response.json();

            if (!response.ok || !result.url) {
                throw new Error(result.error || "Checkout could not start.");
            }

            window.location.href = result.url;
        } catch (error) {
            checkoutStatus.textContent = error.message === "Failed to fetch"
                ? "Checkout service is unavailable. Confirm the Vercel API and environment variables are configured."
                : error.message;
            checkoutButton.disabled = false;
        }
    };

    grid.querySelectorAll(".store-add").forEach(button => {
        button.addEventListener("click", () => {
            const product = button.closest(".store-product");
            const id = product.dataset.storeId;
            const existing = items.get(id);

            items.set(id, {
                id,
                name: product.dataset.storeName,
                price: Number(product.dataset.storePrice),
                quantity: existing ? existing.quantity + 1 : 1
            });

            renderCart();
            setDrawer(true);
        });
    });

    grid.querySelectorAll(".store-wishlist").forEach(button => {
        const product = button.closest(".store-product");
        const saved = JSON.parse(localStorage.getItem("cartRescueWishlist") || "[]");

        if (saved.includes(product.dataset.storeId)) {
            button.classList.add("is-saved");
            button.innerHTML = '<i class="fa-solid fa-heart"></i>';
        }

        button.addEventListener("click", () => {
            const current = JSON.parse(localStorage.getItem("cartRescueWishlist") || "[]");
            const index = current.indexOf(product.dataset.storeId);

            if (index >= 0) {
                current.splice(index, 1);
                button.classList.remove("is-saved");
                button.innerHTML = '<i class="fa-regular fa-heart"></i>';
            } else {
                current.push(product.dataset.storeId);
                button.classList.add("is-saved");
                button.innerHTML = '<i class="fa-solid fa-heart"></i>';
            }

            localStorage.setItem("cartRescueWishlist", JSON.stringify(current));
        });
    });

    grid.querySelectorAll(".store-details").forEach(button => {
        button.addEventListener("click", () => {
            modalProduct = button.closest(".store-product");
            modalTitle.textContent = modalProduct.dataset.storeName;
            modalDescription.textContent = modalProduct.querySelector(".store-product-copy p").textContent;
            modalPrice.textContent = formatPrice(Number(modalProduct.dataset.storePrice));
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        modalProduct = null;
    };

    modalAdd.addEventListener("click", () => {
        if (!modalProduct) return;
        modalProduct.querySelector(".store-add").click();
        closeModal();
    });

    document.getElementById("storeModalClose").addEventListener("click", closeModal);
    modal.addEventListener("click", event => {
        if (event.target === modal) closeModal();
    });

    const applyStoreFilters = () => {
        const term = search.value.trim().toLowerCase();

        grid.querySelectorAll(".store-product").forEach(product => {
            const matchesCategory = selectedCategory === "all" || product.dataset.storeCategory === selectedCategory;
            const matchesSearch = !term || product.textContent.toLowerCase().includes(term);
            product.classList.toggle("is-hidden", !(matchesCategory && matchesSearch));
        });
    };

    search.addEventListener("input", applyStoreFilters);

    document.querySelectorAll(".store-filter").forEach(filter => {
        filter.addEventListener("click", () => {
            document.querySelectorAll(".store-filter").forEach(item => item.classList.remove("is-active"));
            filter.classList.add("is-active");

                selectedCategory = filter.dataset.storeFilter;
                applyStoreFilters();
        });
    });

    cartItems.addEventListener("click", event => {
        const button = event.target.closest("[data-cart-action]");

        if (!button) {
            return;
        }

        const item = button.closest("[data-cart-item]");
        const product = items.get(item.dataset.cartItem);

        product.quantity += button.dataset.cartAction === "increase" ? 1 : -1;

        if (product.quantity <= 0) {
            items.delete(product.id);
        }

        renderCart();
    });

    document.getElementById("storeCartTrigger").addEventListener("click", () => setDrawer(true));
    document.getElementById("storeCartClose").addEventListener("click", () => setDrawer(false));
    backdrop.addEventListener("click", () => setDrawer(false));
    checkoutButton.addEventListener("click", startCheckout);
    renderCart();

}


/* =========================================================
   02. GLOBAL SELECTORS
========================================================= */

const SELECTORS = {

    header:
        "header",

    nav:
        "nav",

    navLinks:
        "nav a",

    menuToggle:
        ".menu-toggle, .mobile-menu-btn",

    mobileMenu:
        ".mobile-menu, .site-header .main-nav",

    reveal:
        ".reveal",

    revealLeft:
        ".reveal-left",

    revealRight:
        ".reveal-right",

    revealScale:
        ".reveal-scale",

    counters:
        "[data-counter], .counter[data-target]",

    smoothLinks:
        'a[href^="#"]',

    backToTop:
        "#backToTop, .back-to-top",

    themeToggle:
        "#themeToggle, .theme-toggle",

    notification:
        ".notification",

    tooltip:
        "[data-tooltip]",

    lazyImages:
        "img[data-src]"

};


/* =========================================================
   03. MOBILE NAVIGATION
========================================================= */

function initializeMobileMenu() {

    const menuToggle =
        document.querySelector(SELECTORS.menuToggle);

    const mobileMenu =
        document.querySelector(SELECTORS.mobileMenu);

    if (!menuToggle || !mobileMenu) {

        return;

    }


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    /* Close menu after clicking a link */

    const links =
        mobileMenu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    });


    /* Close menu with Escape */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {

                mobileMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                menuToggle.focus();

            }

        }
    );

}


function initializeContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) {
        return;
    }

    const message = document.getElementById("contactMessage");
    const counter = document.getElementById("messageCounter");

    if (message && counter) {
        const updateCounter = () => {
            counter.textContent = `${message.value.length} / ${message.maxLength}`;
        };

        message.addEventListener("input", updateCounter);
        updateCounter();
    }

    form.addEventListener("submit", event => {
        event.preventDefault();

        const fields = [
            ["contactName", "nameError", "Please enter your name."],
            ["contactEmail", "emailError", "Please enter a valid email address."],
            ["contactSubject", "subjectError", "Please select a subject."],
            ["contactMessage", "messageError", "Please enter a message."]
        ];
        let valid = true;

        fields.forEach(([fieldId, errorId, text]) => {
            const field = document.getElementById(fieldId);
            const error = document.getElementById(errorId);
            const invalid = !field.value.trim() || (field.type === "email" && !field.checkValidity());

            if (error) {
                error.textContent = invalid ? text : "";
            }

            field.classList.toggle("invalid", invalid);
            valid = valid && !invalid;
        });

        const consent = document.getElementById("contactConsent");

        if (!consent.checked) {
            valid = false;
        }

        if (!valid) {
            return;
        }

        const submit = document.getElementById("contactSubmit");
        const success = document.getElementById("formSuccess");

        if (submit) {
            submit.disabled = true;
            submit.textContent = "Sending...";
        }

        window.setTimeout(() => {
            form.reset();
            if (counter) {
                counter.textContent = `0 / ${message.maxLength}`;
            }
            if (submit) {
                submit.disabled = false;
                submit.textContent = "Send Message";
            }
            if (success) {
                success.style.display = "flex";
            }
        }, 600);
    });

}


/* =========================================================
   04. NAVIGATION ACTIVE STATE
========================================================= */

function initializeNavigation() {

    const links =
        document.querySelectorAll(
            SELECTORS.navLinks
        );

    if (!links.length) {

        return;

    }


    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    links.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) {

            return;

        }


        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0]
                .toLowerCase();


        link.classList.remove("active");


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   05. HEADER SCROLL EFFECT
========================================================= */

function initializeHeaderScroll() {

    const header =
        document.querySelector(
            SELECTORS.header
        );

    if (!header) {

        return;

    }


    const updateHeader =
        () => {

            if (window.scrollY > 40) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


initializeHeaderScroll();


/* =========================================================
   06. SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const elements =
        document.querySelectorAll(
            [
                SELECTORS.reveal,
                SELECTORS.revealLeft,
                SELECTORS.revealRight,
                SELECTORS.revealScale
            ].join(",")
        );


    if (!elements.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {
                element.classList.add(
                    "active"
                );
            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        element => {
            observer.observe(element);
        }
    );

}


/* =========================================================
   07. ANIMATED COUNTERS
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            SELECTORS.counters
        );

    if (!counters.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(
            counter => {
                setCounterFinalValue(counter);
            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        counter => {
            observer.observe(counter);
        }
    );

}


/* =========================================================
   08. COUNTER ANIMATION
========================================================= */

function animateCounter(element) {

    const target =
        parseFloat(
            element.dataset.counter ||
            element.dataset.target
        );


    if (
        Number.isNaN(target)
    ) {

        return;

    }


    const duration =
        parseInt(
            element.dataset.duration || "1800",
            10
        );


    const decimals =
        parseInt(
            element.dataset.decimals || "0",
            10
        );


    const prefix =
        element.dataset.prefix || "";


    const suffix =
        element.dataset.suffix || "";


    const start =
        performance.now();


    const update =
        currentTime => {

            const elapsed =
                currentTime - start;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                target *
                easedProgress;


            element.textContent =
                prefix +
                value.toFixed(decimals) +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    update
                );

            } else {

                element.textContent =
                    prefix +
                    target.toFixed(decimals) +
                    suffix;

                element.classList.add(
                    "number-updated"
                );

            }

        };


    requestAnimationFrame(update);

}


/* =========================================================
   09. SET COUNTER FINAL VALUE
========================================================= */

function setCounterFinalValue(element) {

    const target =
        parseFloat(
            element.dataset.counter ||
            element.dataset.target
        );

    const decimals =
        parseInt(
            element.dataset.decimals || "0",
            10
        );

    const prefix =
        element.dataset.prefix || "";

    const suffix =
        element.dataset.suffix || "";


    if (
        !Number.isNaN(target)
    ) {

        element.textContent =
            prefix +
            target.toFixed(decimals) +
            suffix;

    }

}


/* =========================================================
   10. SMOOTH SCROLL
========================================================= */

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll(
            SELECTORS.smoothLinks
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#" ||
                    !href.startsWith("#")
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        SELECTORS.header
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });

}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const elements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const year =
        new Date().getFullYear();


    elements.forEach(
        element => {

            element.textContent =
                year;

        }
    );

}


/* =========================================================
   12. BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button =
        document.querySelector(
            SELECTORS.backToTop
        );


    if (!button) {

        return;

    }


    const updateVisibility =
        () => {

            if (
                window.scrollY > 500
            ) {

                button.classList.add(
                    "visible"
                );

            } else {

                button.classList.remove(
                    "visible"
                );

            }

        };


    updateVisibility();


    window.addEventListener(
        "scroll",
        updateVisibility,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   13. THEME SYSTEM
========================================================= */

function initializeTheme() {

    const toggle =
        document.querySelector(
            SELECTORS.themeToggle
        );


    const savedTheme =
        localStorage.getItem(
            "cart-rescue-theme"
        );


    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {

        document.documentElement.dataset.theme =
            savedTheme;

        document.body.classList.toggle(
            "light-theme",
            savedTheme === "light"
        );

    }


    if (!toggle) {

        return;

    }


    updateThemeButton(
        toggle,
        document.documentElement.dataset.theme ||
        "dark"
    );


    toggle.addEventListener(
        "click",
        () => {

            const current =
                document.documentElement.dataset.theme ||
                "dark";


            const next =
                current === "dark"
                    ? "light"
                    : "dark";


            document.documentElement.dataset.theme =
                next;

            document.body.classList.toggle(
                "light-theme",
                next === "light"
            );


            localStorage.setItem(
                "cart-rescue-theme",
                next
            );


            updateThemeButton(
                toggle,
                next
            );

        }
    );

}


/* =========================================================
   14. THEME BUTTON
========================================================= */

function updateThemeButton(
    button,
    theme
) {

    button.setAttribute(
        "aria-label",
        theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
    );


    button.setAttribute(
        "title",
        theme === "dark"
            ? "Light mode"
            : "Dark mode"
    );


    const icon =
        button.querySelector(
            "[data-theme-icon]"
        );


    if (icon) {

        icon.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";

    }

}


/* =========================================================
   15. BUTTON INTERACTIONS
========================================================= */

function initializeButtons() {

    const buttons =
        document.querySelectorAll(
            "button[data-action]"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;


                handleButtonAction(
                    action,
                    button
                );

            }
        );

    });

}


/* =========================================================
   16. BUTTON ACTION HANDLER
========================================================= */

function handleButtonAction(
    action,
    button
) {

    switch (action) {

        case "demo":

            showNotification(
                "AI demo launched successfully.",
                "success"
            );

            break;


        case "refresh":

            button.classList.add(
                "loading"
            );

            setTimeout(
                () => {

                    button.classList.remove(
                        "loading"
                    );

                    showNotification(
                        "Dashboard data refreshed.",
                        "success"
                    );

                },
                700
            );

            break;


        case "export":

            showNotification(
                "Preparing your report...",
                "info"
            );

            break;


        case "clear":

            showNotification(
                "Filters cleared.",
                "info"
            );

            break;


        default:

            console.log(
                "Unknown action:",
                action
            );

    }

}


/* =========================================================
   17. TOOLTIP SYSTEM
========================================================= */

function initializeTooltips() {

    const elements =
        document.querySelectorAll(
            SELECTORS.tooltip
        );


    elements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                const text =
                    element.dataset.tooltip;


                if (!text) {

                    return;

                }


                element.setAttribute(
                    "aria-label",
                    text
                );

            }
        );

    });

}


/* =========================================================
   18. NOTIFICATION SYSTEM
========================================================= */

function initializeNotifications() {

    document.addEventListener(
        "click",
        event => {

            const closeButton =
                event.target.closest(
                    "[data-close-notification]"
                );


            if (!closeButton) {

                return;

            }


            const notification =
                closeButton.closest(
                    ".notification"
                );


            if (notification) {

                removeNotification(
                    notification
                );

            }

        }
    );

}


/* =========================================================
   19. SHOW NOTIFICATION
========================================================= */

function showNotification(
    message,
    type = "info",
    duration = 4000
) {

    let container =
        document.querySelector(
            ".notification-container"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.className =
            "notification-container";


        Object.assign(
            container.style,
            {
                position: "fixed",
                top: "90px",
                right: "20px",
                zIndex: "9999",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                maxWidth: "360px",
                width: "calc(100% - 40px)"
            }
        );


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `notification notification-${type}`;


    notification.setAttribute(
        "role",
        "status"
    );


    notification.innerHTML = `

        <div class="notification-content">

            <span class="notification-icon">
                ${getNotificationIcon(type)}
            </span>

            <span class="notification-message">
                ${escapeHTML(message)}
            </span>

        </div>

        <button
            type="button"
            data-close-notification
            aria-label="Close notification"
        >
            ×
        </button>

    `;


    container.appendChild(
        notification
    );


    requestAnimationFrame(
        () => {

            notification.classList.add(
                "show"
            );

        }
    );


    if (duration > 0) {

        setTimeout(
            () => {

                removeNotification(
                    notification
                );

            },
            duration
        );

    }


    return notification;

}


/* =========================================================
   20. NOTIFICATION ICON
========================================================= */

function getNotificationIcon(type) {

    const icons = {

        success: "✓",

        error: "✕",

        warning: "!",

        info: "i"

    };


    return icons[type] || icons.info;

}


/* =========================================================
   21. REMOVE NOTIFICATION
========================================================= */

function removeNotification(
    notification
) {

    if (!notification) {

        return;

    }


    notification.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            if (
                notification.parentNode
            ) {

                notification.parentNode.removeChild(
                    notification
                );

            }

        },
        300
    );

}


/* =========================================================
   22. ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value);


    return div.innerHTML;

}


/* =========================================================
   23. KEYBOARD NAVIGATION
========================================================= */

function initializeKeyboardNavigation() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter" &&
                event.key !== " "
            ) {

                return;

            }


            const element =
                event.target;


            if (
                element.matches(
                    "[role='button']"
                )
            ) {

                event.preventDefault();

                element.click();

            }

        }
    );

}


/* =========================================================
   24. LAZY IMAGE LOADING
========================================================= */

function initializeLazyLoading() {

    const images =
        document.querySelectorAll(
            SELECTORS.lazyImages
        );


    if (!images.length) {

        return;

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(
            image => {

                loadImage(image);

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            loadImage(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "200px"
            }
        );


    images.forEach(
        image => {

            observer.observe(
                image
            );

        }
    );

}


/* =========================================================
   25. LOAD IMAGE
========================================================= */

function loadImage(image) {

    const source =
        image.dataset.src;


    if (!source) {

        return;

    }


    image.src =
        source;


    image.removeAttribute(
        "data-src"
    );


    image.classList.add(
        "loaded"
    );

}


/* =========================================================
   26. ONLINE / OFFLINE STATUS
========================================================= */

function initializeConnectionStatus() {

    window.addEventListener(
        "online",
        () => {

            showNotification(
                "Internet connection restored.",
                "success"
            );

        }
    );


    window.addEventListener(
        "offline",
        () => {

            showNotification(
                "You are currently offline.",
                "warning",
                0
            );

        }
    );

}


initializeConnectionStatus();


/* =========================================================
   27. WINDOW RESIZE HANDLER
========================================================= */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    document.dispatchEvent(
                        new CustomEvent(
                            "cartRescueResize"
                        )
                    );

                },
                150
            );

    }
);


/* =========================================================
   28. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   29. COPY TO CLIPBOARD
========================================================= */

async function copyToClipboard(
    text
) {

    try {

        await navigator.clipboard.writeText(
            text
        );


        showNotification(
            "Copied to clipboard.",
            "success"
        );


        return true;

    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );


        showNotification(
            "Unable to copy text.",
            "error"
        );


        return false;

    }

}


/* =========================================================
   30. COPY BUTTONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-copy]"
            );


        if (!button) {

            return;

        }


        const value =
            button.dataset.copy;


        if (value) {

            copyToClipboard(
                value
            );

        }

    }
);


/* =========================================================
   31. LOCAL STORAGE HELPERS
========================================================= */

const Storage = {

    set(key, value) {

        try {

            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {

            console.error(
                "Storage set error:",
                error
            );

            return false;

        }

    },


    get(key, fallback = null) {

        try {

            const value =
                localStorage.getItem(
                    key
                );


            return value === null
                ? fallback
                : JSON.parse(value);

        } catch (error) {

            console.error(
                "Storage get error:",
                error
            );

            return fallback;

        }

    },


    remove(key) {

        try {

            localStorage.removeItem(
                key
            );

            return true;

        } catch (error) {

            return false;

        }

    }

};


/* =========================================================
   32. FORMAT NUMBER
========================================================= */

function formatNumber(
    value,
    options = {}
) {

    const {

        locale = "en-IN",

        maximumFractionDigits = 2,

        minimumFractionDigits = 0

    } = options;


    return new Intl.NumberFormat(
        locale,
        {
            maximumFractionDigits,
            minimumFractionDigits
        }
    ).format(value);

}


/* =========================================================
   33. FORMAT CURRENCY
========================================================= */

function formatCurrency(
    value,
    currency = "INR"
) {

    return new Intl.NumberFormat(
        "en-IN",
        {

            style:
                "currency",

            currency,

            maximumFractionDigits:
                0

        }
    ).format(value);

}


/* =========================================================
   34. FORMAT PERCENTAGE
========================================================= */

function formatPercentage(
    value,
    decimals = 1
) {

    return `${Number(value).toFixed(decimals)}%`;

}


/* =========================================================
   35. DATE FORMATTER
========================================================= */

function formatDate(
    date
) {

    const parsed =
        new Date(date);


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return "—";

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }
    ).format(parsed);

}


/* =========================================================
   36. DEBOUNCE
========================================================= */

function debounce(
    callback,
    delay = 300
) {

    let timer;


    return function (...args) {

        clearTimeout(
            timer
        );


        timer =
            setTimeout(
                () => {

                    callback.apply(
                        this,
                        args
                    );

                },
                delay
            );

    };

}


/* =========================================================
   37. THROTTLE
========================================================= */

function throttle(
    callback,
    delay = 100
) {

    let waiting = false;


    return function (...args) {

        if (waiting) {

            return;

        }


        callback.apply(
            this,
            args
        );


        waiting = true;


        setTimeout(
            () => {

                waiting = false;

            },
            delay
        );

    };

}


/* =========================================================
   38. RANDOM ID
========================================================= */

function generateID(
    prefix = "id"
) {

    return (

        prefix +
        "-" +
        Date.now().toString(36) +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8)

    );

}


/* =========================================================
   39. AI SESSION ID
========================================================= */

function getAISessionID() {

    let sessionID =
        sessionStorage.getItem(
            "cart-rescue-session"
        );


    if (!sessionID) {

        sessionID =
            generateID(
                "CRAI"
            );


        sessionStorage.setItem(
            "cart-rescue-session",
            sessionID
        );

    }


    return sessionID;

}


/* =========================================================
   40. PAGE ANALYTICS EVENT
========================================================= */

function trackPageEvent(
    eventName,
    data = {}
) {

    const event = {

        id:
            generateID("event"),

        name:
            eventName,

        page:
            window.location.pathname,

        timestamp:
            new Date().toISOString(),

        session:
            getAISessionID(),

        data

    };


    console.log(
        "[Cart Rescue Analytics]",
        event
    );


    window.dispatchEvent(
        new CustomEvent(
            "cartRescueEvent",
            {
                detail: event
            }
        )
    );

}


/* =========================================================
   41. TRACK NAVIGATION
========================================================= */

document.addEventListener(
    "click",
    event => {

        const link =
            event.target.closest(
                "a"
            );


        if (!link) {

            return;

        }


        const href =
            link.getAttribute(
                "href"
            );


        if (!href) {

            return;

        }


        trackPageEvent(
            "navigation_click",
            {
                text:
                    link.textContent.trim(),

                href

            }
        );

    }
);


/* =========================================================
   42. GLOBAL ERROR HANDLER
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Cart Rescue AI Error:",
            event.error ||
            event.message
        );

    }
);


/* =========================================================
   43. PROMISE ERROR HANDLER
========================================================= */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Unhandled Promise Rejection:",
            event.reason
        );

    }
);


/* =========================================================
   44. PUBLIC CART RESCUE API
========================================================= */

window.CartRescue = {

    version:
        "1.0.0",

    showNotification,

    removeNotification,

    formatNumber,

    formatCurrency,

    formatPercentage,

    formatDate,

    copyToClipboard,

    generateID,

    getAISessionID,

    trackPageEvent,

    debounce,

    throttle,

    Storage

};


/* =========================================================
   45. INITIAL SESSION
========================================================= */

getAISessionID();


/* =========================================================
   46. INITIAL PAGE EVENT
========================================================= */

trackPageEvent(
    "page_view",
    {

        title:
            document.title,

        referrer:
            document.referrer || null

    }
);


/* =========================================================
   END OF MAIN.JS
========================================================= */