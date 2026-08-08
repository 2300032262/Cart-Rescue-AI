/* =========================================================
   CART RESCUE AI
   DASHBOARD CONTROL ENGINE
   File: js/dashboard.js
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   01. DASHBOARD CONFIGURATION
========================================================= */

const CartRescueDashboard = {

    state: {

        customers: [],

        filteredCustomers: [],

        selectedCustomer: null,

        currentFilter: "all",

        searchTerm: "",

        currentPage: 1,

        rowsPerPage: 8,

        autoRefresh: false,

        refreshInterval: null,

        lastUpdated: null

    },


    settings: {

        refreshTime: 15000,

        highRiskThreshold: 75,

        mediumRiskThreshold: 45,

        currency: "INR",

        locale: "en-IN"

    },


    stats: {

        totalVisitors: 24860,

        activeCarts: 4826,

        abandonedCarts: 1274,

        recoveredCarts: 864,

        recoveryRate: 67.8,

        revenueSaved: 26840000,

        averageOrderValue: 3106,

        aiDecisions: 128640,

        predictionAccuracy: 92.4

    }

};


/* =========================================================
   02. DEMO CUSTOMER DATA
========================================================= */

const dashboardCustomers = [

    {
        id: "CR-10001",
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        product: "Premium Wireless Headphones",
        category: "Electronics",
        value: 12999,
        risk: 92,
        riskLevel: "high",
        reason: "Payment failure",
        device: "Mobile",
        channel: "WhatsApp",
        status: "At Risk",
        lastActivity: "2 min ago",
        recommendation: "Send payment recovery link"
    },

    {
        id: "CR-10002",
        name: "Priya Reddy",
        email: "priya.reddy@example.com",
        product: "Designer Handbag",
        category: "Fashion",
        value: 8499,
        risk: 84,
        riskLevel: "high",
        reason: "High shipping cost",
        device: "Desktop",
        channel: "Email",
        status: "At Risk",
        lastActivity: "4 min ago",
        recommendation: "Offer free shipping"
    },

    {
        id: "CR-10003",
        name: "Rahul Kumar",
        email: "rahul.kumar@example.com",
        product: "Smart Watch Pro",
        category: "Electronics",
        value: 15999,
        risk: 78,
        riskLevel: "high",
        reason: "Price concern",
        device: "Mobile",
        channel: "SMS",
        status: "At Risk",
        lastActivity: "7 min ago",
        recommendation: "Send personalized offer"
    },

    {
        id: "CR-10004",
        name: "Sneha Varma",
        email: "sneha.varma@example.com",
        product: "Running Shoes",
        category: "Sports",
        value: 4999,
        risk: 63,
        riskLevel: "medium",
        reason: "Checkout complexity",
        device: "Mobile",
        channel: "Push",
        status: "Monitoring",
        lastActivity: "9 min ago",
        recommendation: "Show simplified checkout"
    },

    {
        id: "CR-10005",
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        product: "Gaming Keyboard",
        category: "Electronics",
        value: 6999,
        risk: 51,
        riskLevel: "medium",
        reason: "Price comparison",
        device: "Desktop",
        channel: "Email",
        status: "Monitoring",
        lastActivity: "11 min ago",
        recommendation: "Show product comparison"
    },

    {
        id: "CR-10006",
        name: "Ananya Rao",
        email: "ananya.rao@example.com",
        product: "Skincare Collection",
        category: "Beauty",
        value: 3299,
        risk: 42,
        riskLevel: "medium",
        reason: "Browsing hesitation",
        device: "Mobile",
        channel: "Push",
        status: "Monitoring",
        lastActivity: "14 min ago",
        recommendation: "Display customer reviews"
    },

    {
        id: "CR-10007",
        name: "Karthik Nair",
        email: "karthik.nair@example.com",
        product: "Office Chair",
        category: "Home",
        value: 11999,
        risk: 31,
        riskLevel: "low",
        reason: "Researching product",
        device: "Desktop",
        channel: "On-site",
        status: "Low Risk",
        lastActivity: "18 min ago",
        recommendation: "Continue monitoring"
    },

    {
        id: "CR-10008",
        name: "Meera Iyer",
        email: "meera.iyer@example.com",
        product: "Yoga Mat Premium",
        category: "Sports",
        value: 2499,
        risk: 24,
        riskLevel: "low",
        reason: "Normal browsing",
        device: "Mobile",
        channel: "On-site",
        status: "Low Risk",
        lastActivity: "22 min ago",
        recommendation: "Continue monitoring"
    },

    {
        id: "CR-10009",
        name: "Arjun Patel",
        email: "arjun.patel@example.com",
        product: "4K Smart TV",
        category: "Electronics",
        value: 45999,
        risk: 88,
        riskLevel: "high",
        reason: "Price concern",
        device: "Desktop",
        channel: "WhatsApp",
        status: "At Risk",
        lastActivity: "25 min ago",
        recommendation: "Offer personalized discount"
    },

    {
        id: "CR-10010",
        name: "Divya Menon",
        email: "divya.menon@example.com",
        product: "Travel Backpack",
        category: "Fashion",
        value: 3899,
        risk: 57,
        riskLevel: "medium",
        reason: "Shipping concern",
        device: "Mobile",
        channel: "SMS",
        status: "Monitoring",
        lastActivity: "28 min ago",
        recommendation: "Show delivery estimate"
    },

    {
        id: "CR-10011",
        name: "Rohit Verma",
        email: "rohit.verma@example.com",
        product: "Bluetooth Speaker",
        category: "Electronics",
        value: 5499,
        risk: 81,
        riskLevel: "high",
        reason: "Payment hesitation",
        device: "Mobile",
        channel: "WhatsApp",
        status: "At Risk",
        lastActivity: "31 min ago",
        recommendation: "Offer alternate payment"
    },

    {
        id: "CR-10012",
        name: "Lakshmi Devi",
        email: "lakshmi.devi@example.com",
        product: "Kitchen Appliance Set",
        category: "Home",
        value: 7299,
        risk: 36,
        riskLevel: "low",
        reason: "Product research",
        device: "Desktop",
        channel: "Email",
        status: "Low Risk",
        lastActivity: "35 min ago",
        recommendation: "Show product benefits"
    }

];


/* =========================================================
   03. INITIALIZE DASHBOARD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDashboard();

    }
);


/* =========================================================
   04. MAIN INITIALIZER
========================================================= */

function initializeDashboard() {

    CartRescueDashboard.state.customers =
        [...dashboardCustomers];


    CartRescueDashboard.state.filteredCustomers =
        [...dashboardCustomers];


    updateDashboardStats();

    initializeDashboardControls();

    renderCustomerTable();

    initializeDashboardCharts();

    initializeActionButtons();

    updateLastUpdated();

    exposeDashboardAPI();

}


/* =========================================================
   05. UPDATE DASHBOARD STATS
========================================================= */

function updateDashboardStats() {

    const stats =
        CartRescueDashboard.stats;


    setElementValue(
        [
            "totalVisitors",
            "total-visitors",
            "visitorsCount"
        ],
        formatNumber(
            stats.totalVisitors
        )
    );


    setElementValue(
        [
            "activeCarts",
            "active-carts",
            "activeCartsCount"
        ],
        formatNumber(
            stats.activeCarts
        )
    );


    setElementValue(
        [
            "abandonedCarts",
            "abandoned-carts",
            "abandonedCartsCount"
        ],
        formatNumber(
            stats.abandonedCarts
        )
    );


    setElementValue(
        [
            "recoveredCarts",
            "recovered-carts",
            "recoveredCartsCount"
        ],
        formatNumber(
            stats.recoveredCarts
        )
    );


    setElementValue(
        [
            "recoveryRate",
            "recovery-rate"
        ],
        `${stats.recoveryRate}%`
    );


    setElementValue(
        [
            "revenueSaved",
            "revenue-saved"
        ],
        formatCurrency(
            stats.revenueSaved
        )
    );


    setElementValue(
        [
            "averageOrderValue",
            "average-order-value",
            "aov"
        ],
        formatCurrency(
            stats.averageOrderValue
        )
    );


    setElementValue(
        [
            "aiDecisions",
            "ai-decisions"
        ],
        formatNumber(
            stats.aiDecisions
        )
    );


    setElementValue(
        [
            "predictionAccuracy",
            "prediction-accuracy"
        ],
        `${stats.predictionAccuracy}%`
    );

}


/* =========================================================
   06. SET ELEMENT VALUE
========================================================= */

function setElementValue(
    ids,
    value
) {

    ids.forEach(
        id => {

            const element =
                document.getElementById(id);


            if (element) {

                element.textContent =
                    value;

            }

        }
    );

}


/* =========================================================
   07. INITIALIZE CONTROLS
========================================================= */

function initializeDashboardControls() {

    const searchInputs =
        document.querySelectorAll(
            "[data-dashboard-search], #customerSearch, #searchCustomers"
        );


    searchInputs.forEach(
        input => {

            input.addEventListener(
                "input",
                event => {

                    CartRescueDashboard.state.searchTerm =
                        event.target.value
                            .trim()
                            .toLowerCase();


                    CartRescueDashboard.state.currentPage =
                        1;


                    filterCustomers();

                }
            );

        }
    );


    const filterButtons =
        document.querySelectorAll(
            "[data-risk-filter]"
        );


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.riskFilter;


                    setRiskFilter(
                        filter
                    );


                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    const filterSelect =
        document.getElementById(
            "riskFilter"
        );


    if (filterSelect) {

        filterSelect.addEventListener(
            "change",
            event => {

                setRiskFilter(
                    event.target.value
                );

            }
        );

    }


    const categorySelect =
        document.getElementById(
            "categoryFilter"
        );


    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            event => {

                filterCustomers(
                    event.target.value
                );

            }
        );

    }

}


/* =========================================================
   08. FILTER CUSTOMERS
========================================================= */

function filterCustomers(
    category = null
) {

    const state =
        CartRescueDashboard.state;


    let customers =
        [...state.customers];


    if (
        state.currentFilter !==
        "all"
    ) {

        customers =
            customers.filter(
                customer =>
                    state.currentFilter === "critical"
                        ? customer.risk >= CartRescueDashboard.settings.highRiskThreshold
                        : customer.riskLevel === state.currentFilter
            );

    }


    if (
        state.searchTerm
    ) {

        customers =
            customers.filter(
                customer => {

                    const searchable =
                        [

                            customer.id,
                            customer.name,
                            customer.email,
                            customer.product,
                            customer.category,
                            customer.reason,
                            customer.status

                        ]
                        .join(" ")
                        .toLowerCase();


                    return searchable.includes(
                        state.searchTerm
                    );

                }
            );

    }


    if (
        category &&
        category !== "all"
    ) {

        customers =
            customers.filter(
                customer =>
                    customer.category ===
                    category
            );

    }


    state.filteredCustomers =
        customers;


    state.currentPage =
        1;


    renderCustomerTable();

}


/* =========================================================
   09. SET RISK FILTER
========================================================= */

function setRiskFilter(
    filter
) {

    CartRescueDashboard.state.currentFilter =
        filter || "all";


    filterCustomers();

}


/* =========================================================
   10. SORT CUSTOMERS
========================================================= */

function sortCustomers(
    field,
    direction = "desc"
) {

    const customers =
        CartRescueDashboard.state.filteredCustomers;


    customers.sort(
        (
            a,
            b
        ) => {

            let valueA =
                a[field];

            let valueB =
                b[field];


            if (
                typeof valueA === "string"
            ) {

                valueA =
                    valueA.toLowerCase();

                valueB =
                    valueB.toLowerCase();

            }


            if (
                valueA < valueB
            ) {

                return direction === "asc"
                    ? -1
                    : 1;

            }


            if (
                valueA > valueB
            ) {

                return direction === "asc"
                    ? 1
                    : -1;

            }


            return 0;

        }
    );


    renderCustomerTable();

}


/* =========================================================
   11. RENDER CUSTOMER TABLE
========================================================= */

function renderCustomerTable() {

    const tableBody =
        document.querySelector(
            "#customerTableBody, #customersTableBody, #riskTableBody, [data-customer-table]"
        );


    if (!tableBody) {

        return;

    }


    const state =
        CartRescueDashboard.state;


    const customers =
        state.filteredCustomers;


    const start =
        (
            state.currentPage -
            1
        ) *
        state.rowsPerPage;


    const end =
        start +
        state.rowsPerPage;


    const pageCustomers =
        customers.slice(
            start,
            end
        );


    if (
        pageCustomers.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="100%"
                    class="empty-state"
                >

                    <div class="empty-state-content">

                        <span class="empty-icon">
                            🔍
                        </span>

                        <strong>
                            No customers found
                        </strong>

                        <small>
                            Try changing your search or filters.
                        </small>

                    </div>

                </td>

            </tr>

        `;


        renderPagination(
            0
        );


        return;

    }


    tableBody.innerHTML =
        pageCustomers
            .map(
                customer =>
                    createCustomerRow(
                        customer
                    )
            )
            .join("");


    attachCustomerRowEvents();

    renderPagination(
        customers.length
    );

}


/* =========================================================
   12. CREATE CUSTOMER ROW
========================================================= */

function createCustomerRow(
    customer
) {

    return `

        <tr
            data-customer-id="${escapeHTML(customer.id)}"
            class="customer-row"
        >

            <td>

                <div class="customer-cell">

                    <div class="customer-avatar">
                        ${getInitials(customer.name)}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(customer.name)}
                        </strong>

                        <small>
                            ${escapeHTML(customer.id)}
                        </small>

                    </div>

                </div>

            </td>


            <td>

                <div class="product-cell">

                    <strong>
                        ${escapeHTML(customer.product)}
                    </strong>

                    <small>
                        ${escapeHTML(customer.category)}
                    </small>

                </div>

            </td>


            <td>

                <strong>
                    ${formatCurrency(customer.value)}
                </strong>

            </td>


            <td>

                <div class="risk-cell">

                    <div class="risk-score ${customer.riskLevel}">

                        ${customer.risk}%

                    </div>

                    <span class="risk-label ${customer.riskLevel}">
                        ${escapeHTML(customer.riskLevel)}
                    </span>

                </div>

            </td>


            <td>

                <span class="reason-label">
                    ${escapeHTML(customer.reason)}
                </span>

            </td>


            <td>

                <span class="status-badge ${getStatusClass(customer.status)}">

                    ${escapeHTML(customer.status)}

                </span>

            </td>


            <td>

                <span class="activity-time">
                    ${escapeHTML(customer.lastActivity)}
                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        type="button"
                        class="table-action view"
                        data-view-customer="${escapeHTML(customer.id)}"
                        title="View customer"
                    >
                        👁
                    </button>


                    <button
                        type="button"
                        class="table-action rescue"
                        data-rescue-customer="${escapeHTML(customer.id)}"
                        title="Start recovery"
                    >
                        ⚡
                    </button>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   13. ATTACH ROW EVENTS
========================================================= */

function attachCustomerRowEvents() {

    document
        .querySelectorAll(
            "[data-view-customer]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const customer =
                            findCustomer(
                                button.dataset.viewCustomer
                            );


                        if (customer) {

                            openCustomerDetails(
                                customer
                            );

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            "[data-rescue-customer]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        const customer =
                            findCustomer(
                                button.dataset.rescueCustomer
                            );


                        if (customer) {

                            executeRecoveryAction(
                                customer
                            );

                        }

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".customer-row"
        )
        .forEach(
            row => {

                row.addEventListener(
                    "dblclick",
                    () => {

                        const customer =
                            findCustomer(
                                row.dataset.customerId
                            );


                        if (customer) {

                            openCustomerDetails(
                                customer
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   14. FIND CUSTOMER
========================================================= */

function findCustomer(
    customerID
) {

    return CartRescueDashboard
        .state
        .customers
        .find(
            customer =>
                customer.id ===
                customerID
        );

}


/* =========================================================
   15. CUSTOMER DETAILS MODAL
========================================================= */

function openCustomerDetails(
    customer
) {

    CartRescueDashboard.state.selectedCustomer =
        customer;


    const existingModal =
        document.getElementById(
            "customerDetailsModal"
        );


    if (existingModal) {

        existingModal.remove();

    }


    const modal =
        document.createElement(
            "div"
        );


    modal.id =
        "customerDetailsModal";


    modal.className =
        "dashboard-modal-overlay";


    modal.innerHTML = `

        <div
            class="dashboard-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="customerModalTitle"
        >

            <button
                type="button"
                class="modal-close"
                id="closeCustomerModal"
                aria-label="Close"
            >
                ×
            </button>


            <div class="modal-header">

                <div class="modal-avatar">
                    ${getInitials(customer.name)}
                </div>

                <div>

                    <span class="modal-eyebrow">
                        CUSTOMER PROFILE
                    </span>

                    <h2 id="customerModalTitle">
                        ${escapeHTML(customer.name)}
                    </h2>

                    <p>
                        ${escapeHTML(customer.email)}
                    </p>

                </div>

            </div>


            <div class="modal-risk-card">

                <div>

                    <span>
                        AI Abandonment Risk
                    </span>

                    <strong>
                        ${customer.risk}%
                    </strong>

                </div>

                <span class="risk-label ${customer.riskLevel}">
                    ${escapeHTML(customer.riskLevel)} risk
                </span>

            </div>


            <div class="modal-grid">

                <div class="modal-info">

                    <span>Cart ID</span>

                    <strong>
                        ${escapeHTML(customer.id)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Cart Value</span>

                    <strong>
                        ${formatCurrency(customer.value)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Product</span>

                    <strong>
                        ${escapeHTML(customer.product)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Category</span>

                    <strong>
                        ${escapeHTML(customer.category)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Primary Reason</span>

                    <strong>
                        ${escapeHTML(customer.reason)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Device</span>

                    <strong>
                        ${escapeHTML(customer.device)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Channel</span>

                    <strong>
                        ${escapeHTML(customer.channel)}
                    </strong>

                </div>


                <div class="modal-info">

                    <span>Last Activity</span>

                    <strong>
                        ${escapeHTML(customer.lastActivity)}
                    </strong>

                </div>

            </div>


            <div class="ai-recommendation">

                <div class="recommendation-icon">
                    🤖
                </div>

                <div>

                    <span>
                        AI RECOMMENDATION
                    </span>

                    <strong>
                        ${escapeHTML(customer.recommendation)}
                    </strong>

                </div>

            </div>


            <div class="modal-actions">

                <button
                    type="button"
                    class="btn-outline"
                    id="modalCloseButton"
                >
                    Close
                </button>


                <button
                    type="button"
                    class="btn"
                    id="modalRescueButton"
                >
                    ⚡ Rescue Cart
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    document.body.classList.add(
        "modal-open"
    );


    document
        .getElementById(
            "closeCustomerModal"
        )
        .addEventListener(
            "click",
            closeCustomerDetails
        );


    document
        .getElementById(
            "modalCloseButton"
        )
        .addEventListener(
            "click",
            closeCustomerDetails
        );


    document
        .getElementById(
            "modalRescueButton"
        )
        .addEventListener(
            "click",
            () => {

                executeRecoveryAction(
                    customer
                );

            }
        );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                modal
            ) {

                closeCustomerDetails();

            }

        }
    );


    document.addEventListener(
        "keydown",
        handleModalEscape
    );

}


/* =========================================================
   16. CLOSE CUSTOMER DETAILS
========================================================= */

function closeCustomerDetails() {

    const modal =
        document.getElementById(
            "customerDetailsModal"
        );


    if (modal) {

        modal.remove();

    }


    document.body.classList.remove(
        "modal-open"
    );


    document.removeEventListener(
        "keydown",
        handleModalEscape
    );

}


function handleModalEscape(
    event
) {

    if (
        event.key ===
        "Escape"
    ) {

        closeCustomerDetails();

    }

}


/* =========================================================
   17. RECOVERY ACTION
========================================================= */

function executeRecoveryAction(
    customer
) {

    if (!customer) {

        return;

    }


    const recommendation =
        customer.recommendation;


    showNotification(
        "AI Recovery Activated",
        `${recommendation} for ${customer.name}.`,
        "success"
    );


    customer.status =
        "Recovery Active";


    customer.lastActivity =
        "Just now";


    CartRescueDashboard.stats.aiDecisions +=
        1;


    CartRescueDashboard.stats.recoveredCarts +=
        1;


    CartRescueDashboard.stats.revenueSaved +=
        customer.value;


    updateDashboardStats();

    filterCustomers();

    closeCustomerDetails();


    logRecoveryAction(
        customer
    );

}


/* =========================================================
   18. LOG RECOVERY ACTION
========================================================= */

function logRecoveryAction(
    customer
) {

    const event =
        new CustomEvent(
            "cartRescueRecoveryAction",
            {

                detail: {

                    customer:
                        customer,

                    timestamp:
                        new Date().toISOString()

                }

            }
        );


    document.dispatchEvent(
        event
    );


    try {

        const history =
            JSON.parse(
                localStorage.getItem(
                    "cartRescueRecoveryHistory"
                )
            ) || [];


        history.unshift({

            customerID:
                customer.id,

            customerName:
                customer.name,

            value:
                customer.value,

            recommendation:
                customer.recommendation,

            timestamp:
                new Date().toISOString()

        });


        localStorage.setItem(
            "cartRescueRecoveryHistory",
            JSON.stringify(
                history.slice(
                    0,
                    100
                )
            )
        );

    } catch (error) {

        console.warn(
            "Unable to save recovery history.",
            error
        );

    }

}


/* =========================================================
   19. PAGINATION
========================================================= */

function renderPagination(
    totalItems
) {

    const container =
        document.querySelector(
            "#dashboardPagination, #customerPagination, [data-pagination]"
        );


    if (!container) {

        return;

    }


    const state =
        CartRescueDashboard.state;


    const totalPages =
        Math.ceil(
            totalItems /
            state.rowsPerPage
        );


    if (
        totalPages <= 1
    ) {

        container.innerHTML =
            "";

        return;

    }


    let html = "";


    html += `

        <button
            type="button"
            class="pagination-btn"
            data-page-action="prev"
            ${state.currentPage === 1 ? "disabled" : ""}
        >
            ‹
        </button>

    `;


    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        if (
            totalPages > 7 &&
            page > 3 &&
            page < totalPages - 2 &&
            Math.abs(
                page -
                state.currentPage
            ) > 1
        ) {

            if (
                page === 4 ||
                page === totalPages - 3
            ) {

                html += `
                    <span class="pagination-dots">
                        …
                    </span>
                `;

            }

            continue;

        }


        html += `

            <button
                type="button"
                class="pagination-btn
                    ${page === state.currentPage ? "active" : ""}"
                data-page="${page}"
            >
                ${page}
            </button>

        `;

    }


    html += `

        <button
            type="button"
            class="pagination-btn"
            data-page-action="next"
            ${state.currentPage === totalPages ? "disabled" : ""}
        >
            ›
        </button>

    `;


    container.innerHTML =
        html;


    container
        .querySelectorAll(
            "[data-page]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        state.currentPage =
                            Number(
                                button.dataset.page
                            );


                        renderCustomerTable();

                    }
                );

            }
        );


    const previous =
        container.querySelector(
            '[data-page-action="prev"]'
        );


    const next =
        container.querySelector(
            '[data-page-action="next"]'
        );


    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                if (
                    state.currentPage > 1
                ) {

                    state.currentPage--;

                    renderCustomerTable();

                }

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                if (
                    state.currentPage <
                    totalPages
                ) {

                    state.currentPage++;

                    renderCustomerTable();

                }

            }
        );

    }

}


/* =========================================================
   20. INITIALIZE ACTION BUTTONS
========================================================= */

function initializeActionButtons() {

    document
        .querySelectorAll(
            "[data-dashboard-action]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        handleDashboardAction(
                            button.dataset.dashboardAction
                        );

                    }
                );

            }
        );


    const refreshButton =
        document.getElementById(
            "refreshDashboard"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            () => {

                refreshDashboard();

            }
        );

    }


    const autoRefreshButton =
        document.getElementById(
            "autoRefreshDashboard"
        );


    if (autoRefreshButton) {

        autoRefreshButton.addEventListener(
            "click",
            () => {

                toggleAutoRefresh();

            }
        );

    }

}


/* =========================================================
   21. HANDLE DASHBOARD ACTION
========================================================= */

function handleDashboardAction(
    action
) {

    switch (
        action
    ) {

        case "refresh":

            refreshDashboard();

            break;


        case "export":

            exportDashboardData();

            break;


        case "simulate":

            simulateCustomerActivity();

            break;


        case "recover-high-risk":

            recoverHighRiskCustomers();

            break;


        case "clear-filters":

            clearDashboardFilters();

            break;


        case "auto-refresh":

            toggleAutoRefresh();

            break;


        default:

            console.warn(
                `Unknown dashboard action: ${action}`
            );

    }

}


/* =========================================================
   22. REFRESH DASHBOARD
========================================================= */

function refreshDashboard() {

    showNotification(
        "Dashboard Refresh",
        "AI dashboard data is being synchronized...",
        "info"
    );


    setTimeout(
        () => {

            simulateMetricsUpdate();

            updateDashboardStats();

            updateLastUpdated();


            showNotification(
                "Dashboard Updated",
                "Latest AI intelligence is now available.",
                "success"
            );

        },
        700
    );

}


/* =========================================================
   23. SIMULATE METRIC UPDATE
========================================================= */

function simulateMetricsUpdate() {

    const stats =
        CartRescueDashboard.stats;


    const visitorChange =
        randomInteger(
            -30,
            80
        );


    const cartChange =
        randomInteger(
            -15,
            35
        );


    stats.totalVisitors +=
        visitorChange;


    stats.activeCarts =
        Math.max(
            0,
            stats.activeCarts +
            cartChange
        );


    stats.aiDecisions +=
        randomInteger(
            50,
            400
        );


    stats.predictionAccuracy =
        Math.min(
            99.9,
            Math.max(
                85,
                stats.predictionAccuracy +
                randomFloat(
                    -0.2,
                    0.3
                )
            )
        );


    stats.recoveryRate =
        Math.min(
            99,
            Math.max(
                40,
                stats.recoveryRate +
                randomFloat(
                    -0.5,
                    0.8
                )
            )
        );


    stats.recoveryRate =
        Number(
            stats.recoveryRate.toFixed(
                1
            )
        );

}


/* =========================================================
   24. AUTO REFRESH
========================================================= */

function toggleAutoRefresh() {

    const state =
        CartRescueDashboard.state;


    if (
        state.autoRefresh
    ) {

        stopAutoRefresh();


        showNotification(
            "Auto Refresh Disabled",
            "Live dashboard synchronization has been paused.",
            "info"
        );


        return;

    }


    startAutoRefresh();


    showNotification(
        "Auto Refresh Enabled",
        "Dashboard will synchronize automatically.",
        "success"
    );

}


/* =========================================================
   25. START AUTO REFRESH
========================================================= */

function startAutoRefresh() {

    stopAutoRefresh();


    CartRescueDashboard.state.autoRefresh =
        true;


    CartRescueDashboard.state.refreshInterval =
        setInterval(
            () => {

                refreshDashboard();

            },
            CartRescueDashboard.settings.refreshTime
        );


    updateAutoRefreshUI();

}


/* =========================================================
   26. STOP AUTO REFRESH
========================================================= */

function stopAutoRefresh() {

    const state =
        CartRescueDashboard.state;


    if (
        state.refreshInterval
    ) {

        clearInterval(
            state.refreshInterval
        );

    }


    state.refreshInterval =
        null;


    state.autoRefresh =
        false;


    updateAutoRefreshUI();

}


/* =========================================================
   27. AUTO REFRESH UI
========================================================= */

function updateAutoRefreshUI() {

    const button =
        document.getElementById(
            "autoRefreshDashboard"
        );


    if (!button) {

        return;

    }


    const enabled =
        CartRescueDashboard.state.autoRefresh;


    button.classList.toggle(
        "active",
        enabled
    );


    button.setAttribute(
        "aria-pressed",
        String(enabled)
    );


    button.innerHTML =
        enabled
            ? "⏸ Auto Refresh"
            : "▶ Auto Refresh";

}


/* =========================================================
   28. RECOVER HIGH RISK CUSTOMERS
========================================================= */

function recoverHighRiskCustomers() {

    const customers =
        CartRescueDashboard
            .state
            .customers
            .filter(
                customer =>
                    customer.risk >=
                    CartRescueDashboard.settings.highRiskThreshold
            );


    if (
        customers.length === 0
    ) {

        showNotification(
            "No High-Risk Carts",
            "There are currently no high-risk carts requiring action.",
            "info"
        );


        return;

    }


    customers.forEach(
        customer => {

            if (
                customer.status !==
                "Recovery Active"
            ) {

                customer.status =
                    "Recovery Active";

                customer.lastActivity =
                    "Just now";

                CartRescueDashboard.stats.aiDecisions++;

            }

        }
    );


    CartRescueDashboard.stats.recoveredCarts +=
        customers.length;


    updateDashboardStats();

    filterCustomers();


    showNotification(
        "Recovery Campaign Started",
        `${customers.length} high-risk carts are now being targeted by AI.`,
        "success"
    );

}


/* =========================================================
   29. CLEAR FILTERS
========================================================= */

function clearDashboardFilters() {

    const state =
        CartRescueDashboard.state;


    state.currentFilter =
        "all";


    state.searchTerm =
        "";


    state.currentPage =
        1;


    document
        .querySelectorAll(
            "[data-dashboard-search], #customerSearch, #searchCustomers"
        )
        .forEach(
            input => {

                input.value =
                    "";

            }
        );


    const riskFilter =
        document.getElementById(
            "riskFilter"
        );


    if (riskFilter) {

        riskFilter.value =
            "all";

    }


    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (categoryFilter) {

        categoryFilter.value =
            "all";

    }


    document
        .querySelectorAll(
            "[data-risk-filter]"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.riskFilter ===
                    "all"
                );

            }
        );


    filterCustomers();


    showNotification(
        "Filters Cleared",
        "All dashboard customers are visible again.",
        "info"
    );

}


/* =========================================================
   30. SIMULATE CUSTOMER ACTIVITY
========================================================= */

function simulateCustomerActivity() {

    const customers =
        CartRescueDashboard.state.customers;


    if (
        customers.length === 0
    ) {

        return;

    }


    const customer =
        customers[
            randomInteger(
                0,
                customers.length - 1
            )
        ];


    const oldRisk =
        customer.risk;


    const riskChange =
        randomInteger(
            -8,
            12
        );


    customer.risk =
        Math.min(
            99,
            Math.max(
                5,
                customer.risk +
                riskChange
            )
        );


    customer.riskLevel =
        getRiskLevel(
            customer.risk
        );


    customer.status =
        customer.risk >=
        CartRescueDashboard.settings.highRiskThreshold
            ? "At Risk"
            : customer.risk >=
              CartRescueDashboard.settings.mediumRiskThreshold
                ? "Monitoring"
                : "Low Risk";


    customer.lastActivity =
        "Just now";


    CartRescueDashboard.stats.aiDecisions++;


    filterCustomers();


    showNotification(
        "AI Event Detected",
        `${customer.name}'s risk changed from ${oldRisk}% to ${customer.risk}%.`,
        customer.risk >= 75
            ? "warning"
            : "info"
    );

}


/* =========================================================
   31. INITIALIZE DASHBOARD CHARTS
========================================================= */

function initializeDashboardCharts() {

    /*
        charts.js automatically initializes
        all matching canvas elements.

        This function simply verifies that
        the chart engine is available.
    */


    if (
        window.CartRescueChartsAPI
    ) {

        setTimeout(
            () => {

                window.CartRescueChartsAPI
                    .resizeAll();

            },
            100
        );

    }

}


/* =========================================================
   32. UPDATE LAST UPDATED
========================================================= */

function updateLastUpdated() {

    const now =
        new Date();


    CartRescueDashboard.state.lastUpdated =
        now;


    const elements =
        document.querySelectorAll(
            "#lastUpdated, #dashboardLastUpdated, [data-last-updated]"
        );


    elements.forEach(
        element => {

            element.textContent =
                `Updated ${formatTime(now)}`;

        }
    );

}


/* =========================================================
   33. EXPORT DASHBOARD DATA
========================================================= */

function exportDashboardData() {

    const customers =
        CartRescueDashboard.state.customers;


    const headers = [

        "Customer ID",
        "Customer",
        "Email",
        "Product",
        "Category",
        "Cart Value",
        "Risk %",
        "Risk Level",
        "Reason",
        "Device",
        "Channel",
        "Status",
        "Last Activity",
        "AI Recommendation"

    ];


    const rows =
        customers.map(
            customer => [

                customer.id,
                customer.name,
                customer.email,
                customer.product,
                customer.category,
                customer.value,
                customer.risk,
                customer.riskLevel,
                customer.reason,
                customer.device,
                customer.channel,
                customer.status,
                customer.lastActivity,
                customer.recommendation

            ]
        );


    const csv =
        [
            headers,
            ...rows
        ]
        .map(
            row =>
                row
                    .map(
                        value =>
                            `"${String(value)
                                .replace(
                                    /"/g,
                                    '""'
                                )}"`
                    )
                    .join(",")
        )
        .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `cart-rescue-dashboard-${getDateStamp()}.csv`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showNotification(
        "Export Complete",
        "Dashboard customer data has been exported successfully.",
        "success"
    );

}


/* =========================================================
   34. NOTIFICATION SYSTEM
========================================================= */

function showNotification(
    title,
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "dashboardNotifications"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );


        container.id =
            "dashboardNotifications";


        container.className =
            "dashboard-notifications";


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `dashboard-notification ${type}`;


    notification.innerHTML = `

        <div class="notification-icon">

            ${
                type === "success"
                    ? "✓"
                    : type === "warning"
                        ? "!"
                        : type === "error"
                            ? "×"
                            : "i"
            }

        </div>


        <div class="notification-content">

            <strong>
                ${escapeHTML(title)}
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>


        <button
            type="button"
            class="notification-close"
            aria-label="Close notification"
        >
            ×
        </button>

    `;


    container.appendChild(
        notification
    );


    const closeButton =
        notification.querySelector(
            ".notification-close"
        );


    closeButton.addEventListener(
        "click",
        () => {

            removeNotification(
                notification
            );

        }
    );


    requestAnimationFrame(
        () => {

            notification.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        () => {

            removeNotification(
                notification
            );

        },
        5000
    );

}


/* =========================================================
   35. REMOVE NOTIFICATION
========================================================= */

function removeNotification(
    notification
) {

    if (
        !notification
    ) {

        return;

    }


    notification.classList.remove(
        "show"
    );


    setTimeout(
        () => {

            notification.remove();

        },
        250
    );

}


/* =========================================================
   36. RISK LEVEL
========================================================= */

function getRiskLevel(
    risk
) {

    if (
        risk >=
        CartRescueDashboard.settings.highRiskThreshold
    ) {

        return "high";

    }


    if (
        risk >=
        CartRescueDashboard.settings.mediumRiskThreshold
    ) {

        return "medium";

    }


    return "low";

}


/* =========================================================
   37. STATUS CLASS
========================================================= */

function getStatusClass(
    status
) {

    const normalized =
        String(
            status
        )
        .toLowerCase()
        .replace(
            /\s+/g,
            "-"
        );


    return normalized;

}


/* =========================================================
   38. INITIALS
========================================================= */

function getInitials(
    name
) {

    return String(
        name
    )
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(
        word =>
            word.charAt(0)
    )
    .join("")
    .toUpperCase();

}


/* =========================================================
   39. NUMBER FORMATTER
========================================================= */

function formatNumber(
    value
) {

    return new Intl.NumberFormat(
        CartRescueDashboard.settings.locale
    ).format(
        Number(value) || 0
    );

}


/* =========================================================
   40. CURRENCY FORMATTER
========================================================= */

function formatCurrency(
    value
) {

    const number =
        Number(value) || 0;


    if (
        number >= 10000000
    ) {

        return `₹${(
            number /
            10000000
        ).toFixed(2)} Cr`;

    }


    if (
        number >= 100000
    ) {

        return `₹${(
            number /
            100000
        ).toFixed(2)} L`;

    }


    return new Intl.NumberFormat(
        CartRescueDashboard.settings.locale,
        {

            style:
                "currency",

            currency:
                CartRescueDashboard.settings.currency,

            maximumFractionDigits:
                0

        }
    ).format(
        number
    );

}


/* =========================================================
   41. TIME FORMATTER
========================================================= */

function formatTime(
    date
) {

    return new Intl.DateTimeFormat(
        "en-IN",
        {

            hour:
                "2-digit",

            minute:
                "2-digit",

            second:
                "2-digit",

            hour12:
                true

        }
    ).format(
        date
    );

}


/* =========================================================
   42. DATE STAMP
========================================================= */

function getDateStamp() {

    const date =
        new Date();


    return [

        date.getFullYear(),

        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        ),

        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        )

    ].join("-");

}


/* =========================================================
   43. RANDOM INTEGER
========================================================= */

function randomInteger(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (
            max -
            min +
            1
        )
    ) + min;

}


/* =========================================================
   44. RANDOM FLOAT
========================================================= */

function randomFloat(
    min,
    max
) {

    return Math.random() *
        (
            max -
            min
        ) +
        min;

}


/* =========================================================
   45. ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    const element =
        document.createElement(
            "div"
        );


    element.textContent =
        String(
            value ?? ""
        );


    return element.innerHTML;

}


/* =========================================================
   46. PUBLIC DASHBOARD API
========================================================= */

function exposeDashboardAPI() {

    window.CartRescueDashboardAPI = {

        state:
            CartRescueDashboard.state,

        stats:
            CartRescueDashboard.stats,

        customers:
            CartRescueDashboard.state.customers,

        refresh:
            refreshDashboard,

        filter:
            setRiskFilter,

        search:
            (
                term
            ) => {

                CartRescueDashboard.state.searchTerm =
                    String(
                        term || ""
                    )
                    .toLowerCase();


                filterCustomers();

            },

        sort:
            sortCustomers,

        recover:
            executeRecoveryAction,

        recoverHighRisk:
            recoverHighRiskCustomers,

        simulate:
            simulateCustomerActivity,

        export:
            exportDashboardData,

        clearFilters:
            clearDashboardFilters,

        startAutoRefresh:
            startAutoRefresh,

        stopAutoRefresh:
            stopAutoRefresh,

        findCustomer:
            findCustomer,

        showNotification:
            showNotification

    };

}


/* =========================================================
   47. CUSTOM EVENT LISTENERS
========================================================= */

document.addEventListener(
    "cartRescueCustomerAdded",
    event => {

        if (
            !event.detail ||
            !event.detail.customer
        ) {

            return;

        }


        CartRescueDashboard
            .state
            .customers
            .unshift(
                event.detail.customer
            );


        filterCustomers();


        showNotification(
            "New Customer Detected",
            `${event.detail.customer.name} has entered the AI monitoring system.`,
            "info"
        );

    }
);


/* =========================================================
   48. REAL-TIME CUSTOMER RISK EVENT
========================================================= */

document.addEventListener(
    "cartRescueRiskUpdate",
    event => {

        if (
            !event.detail
        ) {

            return;

        }


        const customer =
            findCustomer(
                event.detail.customerID
            );


        if (!customer) {

            return;

        }


        if (
            typeof event.detail.risk ===
            "number"
        ) {

            customer.risk =
                Math.min(
                    100,
                    Math.max(
                        0,
                        event.detail.risk
                    )
                );

        }


        customer.riskLevel =
            getRiskLevel(
                customer.risk
            );


        customer.status =
            customer.risk >= 75
                ? "At Risk"
                : customer.risk >= 45
                    ? "Monitoring"
                    : "Low Risk";


        customer.lastActivity =
            "Just now";


        filterCustomers();

    }
);


/* =========================================================
   49. CLEANUP
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        stopAutoRefresh();

    }
);


/* =========================================================
   50. INITIAL CONSOLE MESSAGE
========================================================= */

console.log(
    "%cCart Rescue AI Dashboard",
    "font-size:18px;font-weight:700;"
);

console.log(
    "%cAI dashboard engine initialized successfully.",
    "font-size:12px;"
);


/* =========================================================
   END OF DASHBOARD.JS
========================================================= */