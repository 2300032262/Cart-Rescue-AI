/* =========================================================
   CART RESCUE AI
   ANALYTICS INTELLIGENCE ENGINE
   File: js/analytics.js
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   01. ANALYTICS CONFIGURATION
========================================================= */

const CartRescueAnalytics = {

    state: {

        dateRange: "30d",

        selectedChannel: "all",

        selectedCategory: "all",

        selectedMetric: "revenue",

        searchTerm: "",

        isLoading: false,

        lastUpdated: null

    },


    config: {

        currency: "INR",

        locale: "en-IN",

        animationDuration: 700,

        highRiskThreshold: 75,

        mediumRiskThreshold: 45

    },


    data: {

        visitors: 24860,

        productViews: 18420,

        addToCart: 9230,

        checkoutStarted: 5810,

        paymentAttempts: 4380,

        purchases: 3660,

        abandonedCarts: 1274,

        recoveredCarts: 864,

        revenueGenerated: 11364000,

        revenueSaved: 26840000,

        totalCartValue: 39480000,

        averageOrderValue: 3106,

        predictionAccuracy: 92.4,

        aiDecisions: 128640

    }

};


/* =========================================================
   02. CHANNEL DATA
========================================================= */

const analyticsChannelData = [

    {
        channel: "Email",
        visitors: 6420,
        carts: 2180,
        abandoned: 486,
        recovered: 342,
        revenue: 10260000,
        recoveryRate: 70.4,
        conversionRate: 53.1
    },

    {
        channel: "WhatsApp",
        visitors: 5280,
        carts: 1960,
        abandoned: 382,
        recovered: 281,
        revenue: 8940000,
        recoveryRate: 73.6,
        conversionRate: 57.2
    },

    {
        channel: "SMS",
        visitors: 3840,
        carts: 1280,
        abandoned: 214,
        recovered: 128,
        revenue: 3920000,
        recoveryRate: 59.8,
        conversionRate: 46.8
    },

    {
        channel: "Push",
        visitors: 2960,
        carts: 1020,
        abandoned: 112,
        recovered: 76,
        revenue: 2380000,
        recoveryRate: 67.9,
        conversionRate: 48.7
    },

    {
        channel: "On-site",
        visitors: 6360,
        carts: 2790,
        abandoned: 80,
        recovered: 37,
        revenue: 1740000,
        recoveryRate: 46.3,
        conversionRate: 41.2
    }

];


/* =========================================================
   03. ABANDONMENT REASONS
========================================================= */

const abandonmentReasons = [

    {
        reason: "Payment Failure",
        count: 284,
        percentage: 22.3,
        recovered: 214,
        revenueLost: 6840000
    },

    {
        reason: "High Shipping Cost",
        count: 236,
        percentage: 18.5,
        recovered: 174,
        revenueLost: 4920000
    },

    {
        reason: "Price Concern",
        count: 218,
        percentage: 17.1,
        recovered: 142,
        revenueLost: 5260000
    },

    {
        reason: "Checkout Complexity",
        count: 184,
        percentage: 14.4,
        recovered: 126,
        revenueLost: 3180000
    },

    {
        reason: "Product Comparison",
        count: 142,
        percentage: 11.1,
        recovered: 82,
        revenueLost: 2860000
    },

    {
        reason: "Delivery Concern",
        count: 118,
        percentage: 9.3,
        recovered: 78,
        revenueLost: 2140000
    },

    {
        reason: "Other",
        count: 92,
        percentage: 7.3,
        recovered: 48,
        revenueLost: 1460000
    }

];


/* =========================================================
   04. CATEGORY PERFORMANCE
========================================================= */

const categoryAnalytics = [

    {
        category: "Electronics",
        visitors: 6840,
        carts: 2840,
        abandoned: 468,
        recovered: 326,
        revenue: 12680000,
        recoveryRate: 69.7,
        averageOrderValue: 7420
    },

    {
        category: "Fashion",
        visitors: 5320,
        carts: 2180,
        abandoned: 304,
        recovered: 212,
        revenue: 6840000,
        recoveryRate: 69.7,
        averageOrderValue: 4180
    },

    {
        category: "Home",
        visitors: 4260,
        carts: 1640,
        abandoned: 208,
        recovered: 136,
        revenue: 4820000,
        recoveryRate: 65.4,
        averageOrderValue: 4920
    },

    {
        category: "Sports",
        visitors: 3260,
        carts: 1260,
        abandoned: 146,
        recovered: 96,
        revenue: 2860000,
        recoveryRate: 65.8,
        averageOrderValue: 2980
    },

    {
        category: "Beauty",
        visitors: 2960,
        carts: 1310,
        abandoned: 148,
        recovered: 94,
        revenue: 2240000,
        recoveryRate: 63.5,
        averageOrderValue: 2180
    },

    {
        category: "Others",
        visitors: 2220,
        carts: 0,
        abandoned: 0,
        recovered: 0,
        revenue: 0,
        recoveryRate: 0,
        averageOrderValue: 0
    }

];


/* =========================================================
   05. DEVICE PERFORMANCE
========================================================= */

const deviceAnalytics = [

    {
        device: "Mobile",
        visitors: 14280,
        carts: 5820,
        abandoned: 816,
        recovered: 548,
        conversionRate: 48.4
    },

    {
        device: "Desktop",
        visitors: 8460,
        carts: 2820,
        abandoned: 368,
        recovered: 258,
        conversionRate: 61.3
    },

    {
        device: "Tablet",
        visitors: 2120,
        carts: 590,
        abandoned: 90,
        recovered: 58,
        conversionRate: 55.6
    }

];


/* =========================================================
   06. AI PERFORMANCE
========================================================= */

const aiPerformance = {

    totalPredictions: 128640,

    correctPredictions: 118740,

    incorrectPredictions: 9900,

    accuracy: 92.4,

    precision: 91.8,

    recall: 89.6,

    f1Score: 90.7,

    falsePositiveRate: 6.8,

    falseNegativeRate: 4.9,

    averagePredictionTime: 84,

    successfulRecommendations: 82640,

    recommendationSuccessRate: 88.7

};


/* =========================================================
   07. TREND DATA
========================================================= */

const analyticsTrendData = {

    labels: [

        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6",
        "Week 7",
        "Week 8"

    ],

    visitors: [

        2460,
        2840,
        3020,
        3260,
        3480,
        3620,
        3940,
        4240

    ],

    carts: [

        920,
        1060,
        1140,
        1260,
        1320,
        1480,
        1560,
        1640

    ],

    abandoned: [

        268,
        284,
        306,
        324,
        342,
        364,
        382,
        404

    ],

    recovered: [

        162,
        184,
        208,
        226,
        244,
        268,
        296,
        324

    ],

    revenueSaved: [

        420000,
        510000,
        620000,
        710000,
        840000,
        960000,
        1120000,
        1340000

    ]

};


/* =========================================================
   08. INITIALIZE ANALYTICS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeAnalytics();

    }
);


/* =========================================================
   09. MAIN INITIALIZER
========================================================= */

function initializeAnalytics() {

    CartRescueAnalytics.state.lastUpdated =
        new Date();


    initializeAnalyticsControls();

    calculateAnalyticsKPIs();

    renderChannelPerformance();

    renderAbandonmentReasons();

    renderCategoryPerformance();

    renderDevicePerformance();

    renderAIPerformance();

    renderAnalyticsFunnel();

    renderTrendSummary();

    initializeAnalyticsCharts();

    updateAnalyticsTimestamp();

    exposeAnalyticsAPI();

}


/* =========================================================
   10. ANALYTICS CONTROLS
========================================================= */

function initializeAnalyticsControls() {

    const dateButtons =
        document.querySelectorAll(
            "[data-analytics-range]"
        );


    dateButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const range =
                        button.dataset.analyticsRange;


                    setAnalyticsDateRange(
                        range
                    );


                    dateButtons.forEach(
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


    const dateSelect =
        document.getElementById(
            "analyticsDateRange"
        );


    if (dateSelect) {

        dateSelect.addEventListener(
            "change",
            event => {

                setAnalyticsDateRange(
                    event.target.value
                );

            }
        );

    }


    const channelSelect =
        document.getElementById(
            "analyticsChannel"
        );


    if (channelSelect) {

        channelSelect.addEventListener(
            "change",
            event => {

                setAnalyticsChannel(
                    event.target.value
                );

            }
        );

    }


    const categorySelect =
        document.getElementById(
            "analyticsCategory"
        );


    if (categorySelect) {

        categorySelect.addEventListener(
            "change",
            event => {

                setAnalyticsCategory(
                    event.target.value
                );

            }
        );

    }


    const refreshButton =
        document.getElementById(
            "refreshAnalytics"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            refreshAnalytics
        );

    }


    const exportButton =
        document.getElementById(
            "exportAnalytics"
        );


    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportAnalytics
        );

    }


    const simulateButton =
        document.getElementById(
            "simulateAnalytics"
        );


    if (simulateButton) {

        simulateButton.addEventListener(
            "click",
            simulateAnalyticsEvent
        );

    }

}


/* =========================================================
   11. DATE RANGE
========================================================= */

function setAnalyticsDateRange(
    range
) {

    CartRescueAnalytics.state.dateRange =
        range || "30d";


    calculateAnalyticsKPIs();

    renderChannelPerformance();

    renderCategoryPerformance();

    renderTrendSummary();

    initializeAnalyticsCharts();


    showAnalyticsNotification(
        "Date Range Updated",
        `Analytics are now showing the ${getDateRangeLabel(range)} period.`,
        "info"
    );

}


/* =========================================================
   12. CHANNEL FILTER
========================================================= */

function setAnalyticsChannel(
    channel
) {

    CartRescueAnalytics.state.selectedChannel =
        channel || "all";


    renderChannelPerformance();

    calculateAnalyticsKPIs();


    showAnalyticsNotification(
        "Channel Filter Updated",
        channel === "all"
            ? "All channels are now included."
            : `${channel} performance is now being analyzed.`,
        "info"
    );

}


/* =========================================================
   13. CATEGORY FILTER
========================================================= */

function setAnalyticsCategory(
    category
) {

    CartRescueAnalytics.state.selectedCategory =
        category || "all";


    renderCategoryPerformance();

    calculateAnalyticsKPIs();


    showAnalyticsNotification(
        "Category Filter Updated",
        category === "all"
            ? "All product categories are included."
            : `${category} performance is now being analyzed.`,
        "info"
    );

}


/* =========================================================
   14. CALCULATE KPIs
========================================================= */

function calculateAnalyticsKPIs() {

    const data =
        CartRescueAnalytics.data;


    const filteredChannel =
        getSelectedChannelData();


    let visitors =
        data.visitors;

    let carts =
        data.addToCart;

    let abandoned =
        data.abandonedCarts;

    let recovered =
        data.recoveredCarts;

    let revenue =
        data.revenueGenerated;

    let revenueSaved =
        data.revenueSaved;


    if (
        filteredChannel
    ) {

        visitors =
            filteredChannel.visitors;

        carts =
            filteredChannel.carts;

        abandoned =
            filteredChannel.abandoned;

        recovered =
            filteredChannel.recovered;

        revenue =
            filteredChannel.revenue;

        revenueSaved =
            calculateChannelRevenueSaved(
                filteredChannel
            );

    }


    const conversionRate =
        visitors > 0
            ? (
                recovered /
                visitors *
                100
            )
            : 0;


    const recoveryRate =
        abandoned > 0
            ? (
                recovered /
                abandoned *
                100
            )
            : 0;


    const abandonmentRate =
        carts > 0
            ? (
                abandoned /
                carts *
                100
            )
            : 0;


    const cartConversionRate =
        carts > 0
            ? (
                recovered /
                carts *
                100
            )
            : 0;


    const averageRecoveredValue =
        recovered > 0
            ? revenueSaved /
              recovered
            : 0;


    setAnalyticsValue(
        [
            "analyticsVisitors",
            "totalAnalyticsVisitors",
            "analytics-visitors"
        ],
        formatNumber(
            visitors
        )
    );


    setAnalyticsValue(
        [
            "analyticsCarts",
            "totalAnalyticsCarts",
            "analytics-carts"
        ],
        formatNumber(
            carts
        )
    );


    setAnalyticsValue(
        [
            "analyticsAbandoned",
            "totalAnalyticsAbandoned",
            "analytics-abandoned"
        ],
        formatNumber(
            abandoned
        )
    );


    setAnalyticsValue(
        [
            "analyticsRecovered",
            "totalAnalyticsRecovered",
            "analytics-recovered"
        ],
        formatNumber(
            recovered
        )
    );


    setAnalyticsValue(
        [
            "analyticsRevenue",
            "analytics-revenue"
        ],
        formatCurrency(
            revenue
        )
    );


    setAnalyticsValue(
        [
            "analyticsRevenueSaved",
            "analytics-revenue-saved"
        ],
        formatCurrency(
            revenueSaved
        )
    );


    setAnalyticsValue(
        [
            "analyticsConversionRate",
            "analytics-conversion-rate"
        ],
        `${conversionRate.toFixed(1)}%`
    );


    setAnalyticsValue(
        [
            "analyticsRecoveryRate",
            "analytics-recovery-rate"
        ],
        `${recoveryRate.toFixed(1)}%`
    );


    setAnalyticsValue(
        [
            "analyticsAbandonmentRate",
            "analytics-abandonment-rate"
        ],
        `${abandonmentRate.toFixed(1)}%`
    );


    setAnalyticsValue(
        [
            "analyticsCartConversion",
            "analytics-cart-conversion"
        ],
        `${cartConversionRate.toFixed(1)}%`
    );


    setAnalyticsValue(
        [
            "analyticsAverageRecoveredValue",
            "averageRecoveredValue"
        ],
        formatCurrency(
            averageRecoveredValue
        )
    );


    setAnalyticsValue(
        [
            "analyticsPredictionAccuracy"
        ],
        `${data.predictionAccuracy}%`
    );


    setAnalyticsValue(
        [
            "analyticsAIDecisions"
        ],
        formatNumber(
            data.aiDecisions
        )
    );


    renderKPIChanges();

}


/* =========================================================
   15. SET ANALYTICS VALUE
========================================================= */

function setAnalyticsValue(
    ids,
    value
) {

    ids.forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    value;

            }

        }
    );

}


/* =========================================================
   16. KPI CHANGE INDICATORS
========================================================= */

function renderKPIChanges() {

    const changes = {

        analyticsVisitorsChange:
            "+12.8%",

        analyticsCartsChange:
            "+8.6%",

        analyticsAbandonedChange:
            "-6.4%",

        analyticsRecoveredChange:
            "+18.2%",

        analyticsRevenueChange:
            "+21.7%",

        analyticsRecoveryChange:
            "+9.4%"

    };


    Object.entries(
        changes
    ).forEach(
        (
            [
                id,
                value
            ]
        ) => {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    value;


                element.classList.toggle(
                    "positive",
                    value.startsWith("+")
                );


                element.classList.toggle(
                    "negative",
                    value.startsWith("-")
                );

            }

        }
    );

}


/* =========================================================
   17. SELECTED CHANNEL
========================================================= */

function getSelectedChannelData() {

    const selected =
        CartRescueAnalytics
            .state
            .selectedChannel;


    if (
        selected === "all"
    ) {

        return null;

    }


    return analyticsChannelData.find(
        item =>
            item.channel ===
            selected
    );

}


/* =========================================================
   18. CHANNEL REVENUE SAVED
========================================================= */

function calculateChannelRevenueSaved(
    channel
) {

    if (!channel) {

        return 0;

    }


    return Math.round(
        channel.recovered *
        (
            channel.revenue /
            Math.max(
                channel.recovered,
                1
            )
        )
    );

}


/* =========================================================
   19. RENDER CHANNEL PERFORMANCE
========================================================= */

function renderChannelPerformance() {

    const container =
        document.querySelector(
            "#channelPerformanceBody, #channelAnalyticsBody, [data-channel-performance]"
        );


    if (!container) {

        return;

    }


    let data =
        [...analyticsChannelData];


    if (
        CartRescueAnalytics
            .state
            .selectedChannel !==
        "all"
    ) {

        data =
            data.filter(
                item =>
                    item.channel ===
                    CartRescueAnalytics
                        .state
                        .selectedChannel
            );

    }


    container.innerHTML =
        data.map(
            item => `

                <tr>

                    <td>

                        <div class="analytics-channel">

                            <span class="channel-icon">
                                ${getChannelIcon(item.channel)}
                            </span>

                            <strong>
                                ${escapeHTML(item.channel)}
                            </strong>

                        </div>

                    </td>


                    <td>
                        ${formatNumber(item.visitors)}
                    </td>


                    <td>
                        ${formatNumber(item.carts)}
                    </td>


                    <td>
                        ${formatNumber(item.abandoned)}
                    </td>


                    <td>
                        ${formatNumber(item.recovered)}
                    </td>


                    <td>

                        <span class="analytics-rate positive">
                            ${item.recoveryRate.toFixed(1)}%
                        </span>

                    </td>


                    <td>

                        <strong>
                            ${formatCurrency(item.revenue)}
                        </strong>

                    </td>


                    <td>

                        <span class="performance-bar">

                            <span
                                style="width:${Math.min(item.recoveryRate, 100)}%"
                            ></span>

                        </span>

                    </td>

                </tr>

            `
        )
        .join("");

}


/* =========================================================
   20. CHANNEL ICON
========================================================= */

function getChannelIcon(
    channel
) {

    const icons = {

        Email: "✉️",

        WhatsApp: "💬",

        SMS: "📱",

        Push: "🔔",

        "On-site": "🌐"

    };


    return icons[channel] ||
        "📡";

}


/* =========================================================
   21. ABANDONMENT REASONS
========================================================= */

function renderAbandonmentReasons() {

    const container =
        document.querySelector(
            "#abandonmentReasonsBody, #reasonsAnalyticsBody, [data-abandonment-reasons]"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        abandonmentReasons
            .map(
                item => {

                    const recoveryRate =
                        item.count > 0
                            ? (
                                item.recovered /
                                item.count *
                                100
                            )
                            : 0;


                    return `

                        <tr>

                            <td>

                                <div class="reason-name">

                                    <span class="reason-dot"></span>

                                    <strong>
                                        ${escapeHTML(item.reason)}
                                    </strong>

                                </div>

                            </td>


                            <td>
                                ${formatNumber(item.count)}
                            </td>


                            <td>

                                <strong>
                                    ${item.percentage.toFixed(1)}%
                                </strong>

                            </td>


                            <td>
                                ${formatNumber(item.recovered)}
                            </td>


                            <td>

                                <span class="analytics-rate">
                                    ${recoveryRate.toFixed(1)}%
                                </span>

                            </td>


                            <td>

                                <strong class="loss-value">
                                    ${formatCurrency(item.revenueLost)}
                                </strong>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   22. CATEGORY PERFORMANCE
========================================================= */

function renderCategoryPerformance() {

    const container =
        document.querySelector(
            "#categoryPerformanceBody, #categoryAnalyticsBody, [data-category-performance]"
        );


    if (!container) {

        return;

    }


    let data =
        [...categoryAnalytics];


    if (
        CartRescueAnalytics
            .state
            .selectedCategory !==
        "all"
    ) {

        data =
            data.filter(
                item =>
                    item.category ===
                    CartRescueAnalytics
                        .state
                        .selectedCategory
            );

    }


    container.innerHTML =
        data.map(
            item => `

                <tr>

                    <td>

                        <div class="category-name">

                            <span>
                                ${getCategoryIcon(item.category)}
                            </span>

                            <strong>
                                ${escapeHTML(item.category)}
                            </strong>

                        </div>

                    </td>


                    <td>
                        ${formatNumber(item.visitors)}
                    </td>


                    <td>
                        ${formatNumber(item.carts)}
                    </td>


                    <td>
                        ${formatNumber(item.abandoned)}
                    </td>


                    <td>
                        ${formatNumber(item.recovered)}
                    </td>


                    <td>

                        <span class="analytics-rate positive">
                            ${item.recoveryRate.toFixed(1)}%
                        </span>

                    </td>


                    <td>
                        ${formatCurrency(item.revenue)}
                    </td>


                    <td>
                        ${formatCurrency(item.averageOrderValue)}
                    </td>

                </tr>

            `
        )
        .join("");

}


/* =========================================================
   23. CATEGORY ICON
========================================================= */

function getCategoryIcon(
    category
) {

    const icons = {

        Electronics: "💻",

        Fashion: "👕",

        Home: "🏠",

        Sports: "⚽",

        Beauty: "💄",

        Others: "📦"

    };


    return icons[category] ||
        "📦";

}


/* =========================================================
   24. DEVICE PERFORMANCE
========================================================= */

function renderDevicePerformance() {

    const container =
        document.querySelector(
            "#devicePerformanceBody, #deviceAnalyticsBody, [data-device-performance]"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        deviceAnalytics
            .map(
                item => `

                    <tr>

                        <td>

                            <div class="device-name">

                                <span>
                                    ${getDeviceIcon(item.device)}
                                </span>

                                <strong>
                                    ${item.device}
                                </strong>

                            </div>

                        </td>


                        <td>
                            ${formatNumber(item.visitors)}
                        </td>


                        <td>
                            ${formatNumber(item.carts)}
                        </td>


                        <td>
                            ${formatNumber(item.abandoned)}
                        </td>


                        <td>
                            ${formatNumber(item.recovered)}
                        </td>


                        <td>

                            <span class="analytics-rate positive">
                                ${item.conversionRate.toFixed(1)}%
                            </span>

                        </td>

                    </tr>

                `
            )
            .join("");

}


/* =========================================================
   25. DEVICE ICON
========================================================= */

function getDeviceIcon(
    device
) {

    const icons = {

        Mobile: "📱",

        Desktop: "🖥️",

        Tablet: "📲"

    };


    return icons[device] ||
        "💻";

}


/* =========================================================
   26. AI PERFORMANCE
========================================================= */

function renderAIPerformance() {

    const data =
        aiPerformance;


    setAnalyticsValue(
        [
            "aiTotalPredictions",
            "totalPredictions"
        ],
        formatNumber(
            data.totalPredictions
        )
    );


    setAnalyticsValue(
        [
            "aiCorrectPredictions",
            "correctPredictions"
        ],
        formatNumber(
            data.correctPredictions
        )
    );


    setAnalyticsValue(
        [
            "aiIncorrectPredictions",
            "incorrectPredictions"
        ],
        formatNumber(
            data.incorrectPredictions
        )
    );


    setAnalyticsValue(
        [
            "aiAccuracy",
            "predictionAccuracy"
        ],
        `${data.accuracy}%`
    );


    setAnalyticsValue(
        [
            "aiPrecision"
        ],
        `${data.precision}%`
    );


    setAnalyticsValue(
        [
            "aiRecall"
        ],
        `${data.recall}%`
    );


    setAnalyticsValue(
        [
            "aiF1Score"
        ],
        `${data.f1Score}%`
    );


    setAnalyticsValue(
        [
            "aiFalsePositive"
        ],
        `${data.falsePositiveRate}%`
    );


    setAnalyticsValue(
        [
            "aiFalseNegative"
        ],
        `${data.falseNegativeRate}%`
    );


    setAnalyticsValue(
        [
            "aiPredictionTime"
        ],
        `${data.averagePredictionTime} ms`
    );


    setAnalyticsValue(
        [
            "aiRecommendationSuccess"
        ],
        `${data.recommendationSuccessRate}%`
    );


    const accuracyBar =
        document.querySelector(
            "#aiAccuracyBar, [data-ai-accuracy-bar]"
        );


    if (accuracyBar) {

        accuracyBar.style.width =
            `${data.accuracy}%`;

    }


    const precisionBar =
        document.querySelector(
            "#aiPrecisionBar, [data-ai-precision-bar]"
        );


    if (precisionBar) {

        precisionBar.style.width =
            `${data.precision}%`;

    }


    const recallBar =
        document.querySelector(
            "#aiRecallBar, [data-ai-recall-bar]"
        );


    if (recallBar) {

        recallBar.style.width =
            `${data.recall}%`;

    }


    const f1Bar =
        document.querySelector(
            "#aiF1Bar, [data-ai-f1-bar]"
        );


    if (f1Bar) {

        f1Bar.style.width =
            `${data.f1Score}%`;

    }

}


/* =========================================================
   27. ANALYTICS FUNNEL
========================================================= */

function renderAnalyticsFunnel() {

    const data =
        CartRescueAnalytics.data;


    const funnel = [

        {
            name: "Visitors",
            value: data.visitors,
            percentage: 100
        },

        {
            name: "Product Views",
            value: data.productViews,
            percentage:
                calculatePercentage(
                    data.productViews,
                    data.visitors
                )
        },

        {
            name: "Add to Cart",
            value: data.addToCart,
            percentage:
                calculatePercentage(
                    data.addToCart,
                    data.visitors
                )
        },

        {
            name: "Checkout Started",
            value: data.checkoutStarted,
            percentage:
                calculatePercentage(
                    data.checkoutStarted,
                    data.visitors
                )
        },

        {
            name: "Payment Attempt",
            value: data.paymentAttempts,
            percentage:
                calculatePercentage(
                    data.paymentAttempts,
                    data.visitors
                )
        },

        {
            name: "Purchase",
            value: data.purchases,
            percentage:
                calculatePercentage(
                    data.purchases,
                    data.visitors
                )
        }

    ];


    const container =
        document.querySelector(
            "#analyticsFunnel, [data-analytics-funnel]"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        funnel
            .map(
                (
                    item,
                    index
                ) => `

                    <div
                        class="funnel-step"
                        style="--funnel-width:${Math.max(item.percentage, 8)}%"
                    >

                        <div class="funnel-info">

                            <span>
                                ${escapeHTML(item.name)}
                            </span>

                            <strong>
                                ${formatNumber(item.value)}
                            </strong>

                        </div>


                        <div class="funnel-bar">

                            <span
                                style="width:${Math.max(item.percentage, 8)}%"
                            ></span>

                        </div>


                        <small>
                            ${item.percentage.toFixed(1)}% of visitors
                        </small>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   28. TREND SUMMARY
========================================================= */

function renderTrendSummary() {

    const trend =
        analyticsTrendData;


    const firstRevenue =
        trend.revenueSaved[0];


    const lastRevenue =
        trend.revenueSaved[
            trend.revenueSaved.length - 1
        ];


    const revenueGrowth =
        calculateGrowth(
            firstRevenue,
            lastRevenue
        );


    const firstRecovered =
        trend.recovered[0];


    const lastRecovered =
        trend.recovered[
            trend.recovered.length - 1
        ];


    const recoveryGrowth =
        calculateGrowth(
            firstRecovered,
            lastRecovered
        );


    const firstVisitors =
        trend.visitors[0];


    const lastVisitors =
        trend.visitors[
            trend.visitors.length - 1
        ];


    const visitorGrowth =
        calculateGrowth(
            firstVisitors,
            lastVisitors
        );


    setAnalyticsValue(
        [
            "revenueTrendGrowth",
            "analyticsRevenueGrowth"
        ],
        `+${revenueGrowth.toFixed(1)}%`
    );


    setAnalyticsValue(
        [
            "recoveryTrendGrowth",
            "analyticsRecoveryGrowth"
        ],
        `+${recoveryGrowth.toFixed(1)}%`
    );


    setAnalyticsValue(
        [
            "visitorTrendGrowth",
            "analyticsVisitorGrowth"
        ],
        `+${visitorGrowth.toFixed(1)}%`
    );

}


/* =========================================================
   29. CHART INTEGRATION
========================================================= */

function initializeAnalyticsCharts() {

    /*
        If charts.js exposes the CartRescueChartsAPI,
        analytics.js can ask it to redraw or resize.

        The analytics page can also use the chart IDs
        below directly with Chart.js.
    */


    if (
        window.CartRescueChartsAPI
    ) {

        try {

            if (
                typeof window
                    .CartRescueChartsAPI
                    .resizeAll ===
                "function"
            ) {

                window
                    .CartRescueChartsAPI
                    .resizeAll();

            }

        } catch (error) {

            console.warn(
                "Analytics chart resize failed.",
                error
            );

        }

    }


    createAnalyticsCharts();

}


/* =========================================================
   30. CREATE ANALYTICS CHARTS
========================================================= */

function createAnalyticsCharts() {

    if (
        typeof Chart ===
        "undefined"
    ) {

        console.warn(
            "Chart.js is not loaded."
        );


        return;

    }


    createOrUpdateChart(
        "analyticsTrendChart",
        "line",
        {

            labels:
                analyticsTrendData.labels,

            datasets: [

                {
                    label:
                        "Visitors",

                    data:
                        analyticsTrendData.visitors,

                    tension:
                        0.4,

                    fill:
                        false

                },

                {
                    label:
                        "Recovered Carts",

                    data:
                        analyticsTrendData.recovered,

                    tension:
                        0.4,

                    fill:
                        false

                }

            ]

        }
    );


    createOrUpdateChart(
        "revenueTrendChart",
        "line",
        {

            labels:
                analyticsTrendData.labels,

            datasets: [

                {
                    label:
                        "Revenue Saved",

                    data:
                        analyticsTrendData.revenueSaved,

                    tension:
                        0.4,

                    fill:
                        true

                }

            ]

        }
    );


    createOrUpdateChart(
        "abandonmentReasonChart",
        "doughnut",
        {

            labels:
                abandonmentReasons.map(
                    item =>
                        item.reason
                ),

            datasets: [

                {

                    label:
                        "Abandoned Carts",

                    data:
                        abandonmentReasons.map(
                            item =>
                                item.count
                        )

                }

            ]

        }
    );


    createOrUpdateChart(
        "channelPerformanceChart",
        "bar",
        {

            labels:
                analyticsChannelData.map(
                    item =>
                        item.channel
                ),

            datasets: [

                {

                    label:
                        "Recovery Rate",

                    data:
                        analyticsChannelData.map(
                            item =>
                                item.recoveryRate
                        )

                }

            ]

        }
    );


    createOrUpdateChart(
        "categoryRevenueChart",
        "bar",
        {

            labels:
                categoryAnalytics.map(
                    item =>
                        item.category
                ),

            datasets: [

                {

                    label:
                        "Revenue",

                    data:
                        categoryAnalytics.map(
                            item =>
                                item.revenue
                        )

                }

            ]

        }
    );


    createOrUpdateChart(
        "deviceConversionChart",
        "bar",
        {

            labels:
                deviceAnalytics.map(
                    item =>
                        item.device
                ),

            datasets: [

                {

                    label:
                        "Conversion Rate",

                    data:
                        deviceAnalytics.map(
                            item =>
                                item.conversionRate
                        )

                }

            ]

        }
    );

}


/* =========================================================
   31. CREATE / UPDATE CHART
========================================================= */

function createOrUpdateChart(
    canvasID,
    type,
    data
) {

    const canvas =
        document.getElementById(
            canvasID
        );


    if (!canvas) {

        return;

    }


    if (
        !window.CartRescueAnalyticsCharts
    ) {

        window.CartRescueAnalyticsCharts =
            {};

    }


    if (
        window.CartRescueAnalyticsCharts[
            canvasID
        ]
    ) {

        window.CartRescueAnalyticsCharts[
            canvasID
        ].destroy();

    }


    window.CartRescueAnalyticsCharts[
        canvasID
    ] =
        new Chart(
            canvas,
            {

                type:
                    type,

                data:
                    data,

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    animation: {

                        duration:
                            CartRescueAnalytics
                                .config
                                .animationDuration

                    },

                    plugins: {

                        legend: {

                            display:
                                true

                        }

                    },

                    scales:
                        type === "doughnut"
                            ? {}
                            : {

                                y: {

                                    beginAtZero:
                                        true

                                }

                            }

                }

            }
        );

}


/* =========================================================
   32. REFRESH ANALYTICS
========================================================= */

function refreshAnalytics() {

    if (
        CartRescueAnalytics.state.isLoading
    ) {

        return;

    }


    CartRescueAnalytics.state.isLoading =
        true;


    showAnalyticsNotification(
        "Refreshing Analytics",
        "AI intelligence data is being synchronized...",
        "info"
    );


    setTimeout(
        () => {

            simulateAnalyticsData();

            calculateAnalyticsKPIs();

            renderChannelPerformance();

            renderAbandonmentReasons();

            renderCategoryPerformance();

            renderDevicePerformance();

            renderAIPerformance();

            renderAnalyticsFunnel();

            renderTrendSummary();

            createAnalyticsCharts();

            updateAnalyticsTimestamp();


            CartRescueAnalytics.state.isLoading =
                false;


            showAnalyticsNotification(
                "Analytics Updated",
                "The latest performance intelligence is now available.",
                "success"
            );

        },
        700
    );

}


/* =========================================================
   33. SIMULATE ANALYTICS DATA
========================================================= */

function simulateAnalyticsData() {

    const data =
        CartRescueAnalytics.data;


    data.visitors +=
        randomInteger(
            100,
            600
        );


    data.productViews +=
        randomInteger(
            80,
            400
        );


    data.addToCart +=
        randomInteger(
            30,
            180
        );


    data.checkoutStarted +=
        randomInteger(
            20,
            120
        );


    data.paymentAttempts +=
        randomInteger(
            10,
            100
        );


    data.purchases +=
        randomInteger(
            10,
            90
        );


    data.recoveredCarts +=
        randomInteger(
            5,
            60
        );


    data.abandonedCarts +=
        randomInteger(
            10,
            70
        );


    data.aiDecisions +=
        randomInteger(
            100,
            1000
        );


    data.revenueSaved +=
        randomInteger(
            50000,
            400000
        );


    data.revenueGenerated +=
        randomInteger(
            30000,
            250000
        );


    data.predictionAccuracy =
        Math.min(
            99.9,
            Math.max(
                85,
                data.predictionAccuracy +
                randomFloat(
                    -0.2,
                    0.3
                )
            )
        );


    data.predictionAccuracy =
        Number(
            data.predictionAccuracy.toFixed(
                1
            )
        );

}


/* =========================================================
   34. ANALYTICS SIMULATION EVENT
========================================================= */

function simulateAnalyticsEvent() {

    simulateAnalyticsData();

    calculateAnalyticsKPIs();

    renderAIPerformance();

    renderAnalyticsFunnel();

    renderTrendSummary();


    showAnalyticsNotification(
        "AI Event Simulated",
        "A new customer behavior event has been processed by the analytics engine.",
        "success"
    );

}


/* =========================================================
   35. EXPORT ANALYTICS
========================================================= */

function exportAnalytics() {

    const rows = [

        [
            "Metric",
            "Value"
        ],

        [
            "Visitors",
            CartRescueAnalytics.data.visitors
        ],

        [
            "Product Views",
            CartRescueAnalytics.data.productViews
        ],

        [
            "Add to Cart",
            CartRescueAnalytics.data.addToCart
        ],

        [
            "Checkout Started",
            CartRescueAnalytics.data.checkoutStarted
        ],

        [
            "Payment Attempts",
            CartRescueAnalytics.data.paymentAttempts
        ],

        [
            "Purchases",
            CartRescueAnalytics.data.purchases
        ],

        [
            "Abandoned Carts",
            CartRescueAnalytics.data.abandonedCarts
        ],

        [
            "Recovered Carts",
            CartRescueAnalytics.data.recoveredCarts
        ],

        [
            "Revenue Generated",
            CartRescueAnalytics.data.revenueGenerated
        ],

        [
            "Revenue Saved",
            CartRescueAnalytics.data.revenueSaved
        ],

        [
            "Prediction Accuracy",
            `${CartRescueAnalytics.data.predictionAccuracy}%`
        ],

        [
            "AI Decisions",
            CartRescueAnalytics.data.aiDecisions
        ]

    ];


    const csv =
        rows
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


    downloadFile(
        csv,
        `cart-rescue-analytics-${getDateStamp()}.csv`,
        "text/csv;charset=utf-8;"
    );


    showAnalyticsNotification(
        "Analytics Exported",
        "Analytics data has been exported successfully.",
        "success"
    );

}


/* =========================================================
   36. DOWNLOAD FILE
========================================================= */

function downloadFile(
    content,
    filename,
    type
) {

    const blob =
        new Blob(
            [content],
            {
                type:
                    type
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
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );

}


/* =========================================================
   37. ANALYTICS NOTIFICATIONS
========================================================= */

function showAnalyticsNotification(
    title,
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "analyticsNotifications"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );


        container.id =
            "analyticsNotifications";


        container.className =
            "analytics-notifications";


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `analytics-notification ${type}`;


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
            aria-label="Close"
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


    const close =
        notification.querySelector(
            ".notification-close"
        );


    if (close) {

        close.addEventListener(
            "click",
            () => {

                notification.remove();

            }
        );

    }


    setTimeout(
        () => {

            if (
                notification.isConnected
            ) {

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

        },
        5000
    );

}


/* =========================================================
   38. UPDATE TIMESTAMP
========================================================= */

function updateAnalyticsTimestamp() {

    const now =
        new Date();


    CartRescueAnalytics.state.lastUpdated =
        now;


    document
        .querySelectorAll(
            "#analyticsLastUpdated, #analyticsUpdatedAt, [data-analytics-updated]"
        )
        .forEach(
            element => {

                element.textContent =
                    `Updated ${formatTime(now)}`;

            }
        );

}


/* =========================================================
   39. DATE RANGE LABEL
========================================================= */

function getDateRangeLabel(
    range
) {

    const labels = {

        "24h":
            "last 24 hours",

        "7d":
            "last 7 days",

        "30d":
            "last 30 days",

        "90d":
            "last 90 days",

        "1y":
            "last 12 months"

    };


    return labels[range] ||
        "selected period";

}


/* =========================================================
   40. CALCULATE PERCENTAGE
========================================================= */

function calculatePercentage(
    value,
    total
) {

    if (
        !total
    ) {

        return 0;

    }


    return (
        value /
        total *
        100
    );

}


/* =========================================================
   41. CALCULATE GROWTH
========================================================= */

function calculateGrowth(
    previous,
    current
) {

    if (
        previous === 0
    ) {

        return 0;

    }


    return (
        (
            current -
            previous
        ) /
        previous
    ) *
    100;

}


/* =========================================================
   42. FORMAT NUMBER
========================================================= */

function formatNumber(
    value
) {

    return new Intl.NumberFormat(
        CartRescueAnalytics
            .config
            .locale
    ).format(
        Number(value) || 0
    );

}


/* =========================================================
   43. FORMAT CURRENCY
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
        CartRescueAnalytics
            .config
            .locale,
        {

            style:
                "currency",

            currency:
                CartRescueAnalytics
                    .config
                    .currency,

            maximumFractionDigits:
                0

        }
    ).format(
        number
    );

}


/* =========================================================
   44. FORMAT TIME
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
   45. DATE STAMP
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
   46. RANDOM INTEGER
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
   47. RANDOM FLOAT
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
   48. ESCAPE HTML
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
   49. PUBLIC ANALYTICS API
========================================================= */

function exposeAnalyticsAPI() {

    window.CartRescueAnalyticsAPI = {

        state:
            CartRescueAnalytics.state,

        data:
            CartRescueAnalytics.data,

        channels:
            analyticsChannelData,

        categories:
            categoryAnalytics,

        reasons:
            abandonmentReasons,

        devices:
            deviceAnalytics,

        ai:
            aiPerformance,

        trends:
            analyticsTrendData,

        refresh:
            refreshAnalytics,

        export:
            exportAnalytics,

        simulate:
            simulateAnalyticsEvent,

        setDateRange:
            setAnalyticsDateRange,

        setChannel:
            setAnalyticsChannel,

        setCategory:
            setAnalyticsCategory,

        getSelectedChannel:
            getSelectedChannelData,

        calculateKPIs:
            calculateAnalyticsKPIs

    };

}


/* =========================================================
   50. INTEGRATION WITH DASHBOARD.JS
========================================================= */

document.addEventListener(
    "cartRescueRecoveryAction",
    event => {

        if (
            !event.detail
        ) {

            return;

        }


        const customer =
            event.detail.customer;


        if (
            !customer
        ) {

            return;

        }


        CartRescueAnalytics.data.recoveredCarts++;

        CartRescueAnalytics.data.aiDecisions++;


        CartRescueAnalytics.data.revenueSaved +=
            Number(
                customer.value
            ) || 0;


        calculateAnalyticsKPIs();

        renderAnalyticsFunnel();


        showAnalyticsNotification(
            "Recovery Recorded",
            `Recovery activity from ${customer.name} has been added to analytics.`,
            "success"
        );

    }
);


/* =========================================================
   51. LISTEN FOR RISK UPDATES
========================================================= */

document.addEventListener(
    "cartRescueRiskUpdate",
    event => {

        if (
            !event.detail
        ) {

            return;

        }


        CartRescueAnalytics.data.aiDecisions++;


        renderAIPerformance();


        const risk =
            Number(
                event.detail.risk
            );


        if (
            risk >= 75
        ) {

            showAnalyticsNotification(
                "High-Risk Customer Detected",
                "AI analytics detected a high abandonment probability.",
                "warning"
            );

        }

    }
);


/* =========================================================
   52. STORAGE SUPPORT
========================================================= */

function saveAnalyticsState() {

    try {

        localStorage.setItem(
            "cartRescueAnalyticsState",
            JSON.stringify(
                CartRescueAnalytics.state
            )
        );

    } catch (error) {

        console.warn(
            "Unable to save analytics state.",
            error
        );

    }

}


function loadAnalyticsState() {

    try {

        const saved =
            localStorage.getItem(
                "cartRescueAnalyticsState"
            );


        if (
            !saved
        ) {

            return;

        }


        const parsed =
            JSON.parse(
                saved
            );


        if (
            parsed.dateRange
        ) {

            CartRescueAnalytics.state.dateRange =
                parsed.dateRange;

        }


        if (
            parsed.selectedChannel
        ) {

            CartRescueAnalytics.state.selectedChannel =
                parsed.selectedChannel;

        }


        if (
            parsed.selectedCategory
        ) {

            CartRescueAnalytics.state.selectedCategory =
                parsed.selectedCategory;

        }

    } catch (error) {

        console.warn(
            "Unable to load analytics state.",
            error
        );

    }

}


/* =========================================================
   53. SAVE FILTER STATE ON CHANGE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.closest(
                "[data-analytics-range]"
            )
        ) {

            saveAnalyticsState();

        }

    }
);


/* =========================================================
   54. LOAD STORED STATE
========================================================= */

loadAnalyticsState();


/* =========================================================
   55. PAGE VISIBILITY OPTIMIZATION
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            return;

        }


        updateAnalyticsTimestamp();

    }
);


/* =========================================================
   56. CONSOLE INFORMATION
========================================================= */

console.log(
    "%cCart Rescue AI Analytics",
    "font-size:18px;font-weight:700;"
);

console.log(
    "%cAnalytics intelligence engine initialized successfully.",
    "font-size:12px;"
);


/* =========================================================
   END OF ANALYTICS.JS
========================================================= */