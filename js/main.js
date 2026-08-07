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

    console.log(
        "%cCart Rescue AI",
        "font-size: 20px; font-weight: 800;"
    );

    console.log(
        "%cAI Cart Recovery System initialized successfully.",
        "font-size: 13px;"
    );

});


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