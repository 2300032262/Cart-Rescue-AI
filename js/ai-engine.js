```javascript
/* =========================================================
   CART RESCUE AI
   ARTIFICIAL INTELLIGENCE ENGINE
   File: js/ai-engine.js
   Version: 1.0
   Purpose:
   - Customer behavior analysis
   - Cart abandonment prediction
   - Risk scoring
   - Abandonment reason detection
   - AI recommendation engine
   - Intervention selection
   - Recovery probability
   - Real-time simulation
========================================================= */

"use strict";


/* =========================================================
   01. AI ENGINE CONFIGURATION
========================================================= */

const CartRescueAI = {

    config: {

        version: "1.0.0",

        modelName: "Cart Rescue Predictive Engine",

        currency: "INR",

        highRiskThreshold: 75,

        mediumRiskThreshold: 45,

        minimumConfidence: 60,

        predictionInterval: 5000,

        maxBehaviorEvents: 100,

        enableSimulation: true

    },


    state: {

        initialized: false,

        running: false,

        simulationActive: false,

        lastPrediction: null,

        processedCustomers: 0,

        totalPredictions: 0,

        highRiskCustomers: 0,

        mediumRiskCustomers: 0,

        lowRiskCustomers: 0,

        successfulRecommendations: 0,

        failedRecommendations: 0

    },


    customers: {},


    predictions: {},


    behaviorHistory: [],


    metrics: {

        accuracy: 92.4,

        precision: 91.8,

        recall: 89.6,

        f1Score: 90.7,

        averagePredictionTime: 84,

        recommendationSuccessRate: 88.7

    }

};


/* =========================================================
   02. CUSTOMER BEHAVIOR MODEL
========================================================= */

const AIBehaviorWeights = {

    sessionDuration: 0.08,

    pageViews: 0.06,

    productViews: 0.07,

    cartValue: 0.06,

    cartAge: 0.10,

    inactivity: 0.15,

    checkoutStarted: 0.12,

    paymentFailure: 0.16,

    shippingCostConcern: 0.07,

    repeatedProductViews: 0.05,

    discountInteraction: 0.03,

    exitIntent: 0.10,

    mobileCheckout: 0.05,

    slowPageLoad: 0.04,

    stockConcern: 0.03,

    deliveryConcern: 0.04

};


/* =========================================================
   03. ABANDONMENT REASON MODEL
========================================================= */

const AIReasonProfiles = {

    payment_failure: {

        label: "Payment Failure",

        icon: "💳",

        weight: 1.00,

        actions: [

            "Offer alternate payment method",

            "Retry payment",

            "Display payment assistance",

            "Send secure payment reminder"

        ]

    },


    high_shipping_cost: {

        label: "High Shipping Cost",

        icon: "🚚",

        weight: 0.92,

        actions: [

            "Show free shipping eligibility",

            "Offer shipping incentive",

            "Display alternative delivery option",

            "Explain delivery value"

        ]

    },


    price_concern: {

        label: "Price Concern",

        icon: "💰",

        weight: 0.88,

        actions: [

            "Offer limited discount",

            "Show price comparison",

            "Highlight product value",

            "Offer installment option"

        ]

    },


    checkout_complexity: {

        label: "Checkout Complexity",

        icon: "🧾",

        weight: 0.84,

        actions: [

            "Enable one-click checkout",

            "Reduce form fields",

            "Show checkout assistance",

            "Resume checkout"

        ]

    },


    product_comparison: {

        label: "Product Comparison",

        icon: "🔎",

        weight: 0.76,

        actions: [

            "Show product comparison",

            "Display customer reviews",

            "Highlight product benefits",

            "Show recommended alternatives"

        ]

    },


    delivery_concern: {

        label: "Delivery Concern",

        icon: "📦",

        weight: 0.72,

        actions: [

            "Show estimated delivery",

            "Display tracking information",

            "Offer faster delivery",

            "Show delivery guarantee"

        ]

    },


    stock_concern: {

        label: "Stock Concern",

        icon: "⚠️",

        weight: 0.70,

        actions: [

            "Display stock availability",

            "Show low-stock alert",

            "Reserve product",

            "Send restock notification"

        ]

    },


    browsing: {

        label: "Still Browsing",

        icon: "🛍️",

        weight: 0.45,

        actions: [

            "Show personalized products",

            "Send product reminder",

            "Display recommendations",

            "Avoid unnecessary discount"

        ]

    }

};


/* =========================================================
   04. AI RECOMMENDATION TYPES
========================================================= */

const AIRecommendations = {

    PAYMENT_RETRY: {

        id: "payment_retry",

        title: "Payment Retry",

        description:
            "Help the customer complete the failed payment.",

        channel:
            "On-site",

        priority:
            "HIGH"

    },


    ALTERNATE_PAYMENT: {

        id: "alternate_payment",

        title: "Alternate Payment",

        description:
            "Recommend another available payment method.",

        channel:
            "On-site",

        priority:
            "HIGH"

    },


    FREE_SHIPPING: {

        id: "free_shipping",

        title: "Free Shipping",

        description:
            "Remove shipping friction for high-intent customers.",

        channel:
            "On-site",

        priority:
            "MEDIUM"

    },


    LIMITED_DISCOUNT: {

        id: "limited_discount",

        title: "Limited Discount",

        description:
            "Provide a targeted incentive only when price sensitivity is detected.",

        channel:
            "WhatsApp",

        priority:
            "MEDIUM"

    },


    CHECKOUT_RESUME: {

        id: "checkout_resume",

        title: "Resume Checkout",

        description:
            "Return the customer to the exact checkout stage.",

        channel:
            "Email",

        priority:
            "HIGH"

    },


    PRODUCT_RECOMMENDATION: {

        id: "product_recommendation",

        title: "Product Recommendation",

        description:
            "Recommend relevant products based on browsing behavior.",

        channel:
            "On-site",

        priority:
            "LOW"

    },


    DELIVERY_ASSURANCE: {

        id: "delivery_assurance",

        title: "Delivery Assurance",

        description:
            "Reduce delivery uncertainty using clear delivery information.",

        channel:
            "SMS",

        priority:
            "MEDIUM"

    },


    STOCK_ALERT: {

        id: "stock_alert",

        title: "Stock Alert",

        description:
            "Create urgency when product availability is limited.",

        channel:
            "Push",

        priority:
            "HIGH"

    }

};


/* =========================================================
   05. SAMPLE CUSTOMER DATA
========================================================= */

const sampleAICustomers = [

    {

        id: "CR-10001",

        name: "Rahul Sharma",

        device: "Mobile",

        cartValue: 18999,

        sessionDuration: 742,

        pageViews: 18,

        productViews: 8,

        cartItems: 3,

        cartAge: 18,

        inactivity: 42,

        checkoutStarted: true,

        paymentFailure: true,

        shippingCostConcern: false,

        repeatedProductViews: true,

        discountInteraction: false,

        exitIntent: true,

        mobileCheckout: true,

        slowPageLoad: false,

        stockConcern: false,

        deliveryConcern: false

    },


    {

        id: "CR-10002",

        name: "Priya Reddy",

        device: "Desktop",

        cartValue: 7420,

        sessionDuration: 486,

        pageViews: 12,

        productViews: 6,

        cartItems: 2,

        cartAge: 34,

        inactivity: 28,

        checkoutStarted: true,

        paymentFailure: false,

        shippingCostConcern: true,

        repeatedProductViews: true,

        discountInteraction: true,

        exitIntent: true,

        mobileCheckout: false,

        slowPageLoad: false,

        stockConcern: false,

        deliveryConcern: true

    },


    {

        id: "CR-10003",

        name: "Arjun Kumar",

        device: "Mobile",

        cartValue: 3299,

        sessionDuration: 260,

        pageViews: 7,

        productViews: 5,

        cartItems: 1,

        cartAge: 8,

        inactivity: 12,

        checkoutStarted: false,

        paymentFailure: false,

        shippingCostConcern: false,

        repeatedProductViews: true,

        discountInteraction: false,

        exitIntent: false,

        mobileCheckout: true,

        slowPageLoad: false,

        stockConcern: false,

        deliveryConcern: false

    },


    {

        id: "CR-10004",

        name: "Sneha Rao",

        device: "Desktop",

        cartValue: 12800,

        sessionDuration: 930,

        pageViews: 22,

        productViews: 12,

        cartItems: 4,

        cartAge: 52,

        inactivity: 64,

        checkoutStarted: true,

        paymentFailure: false,

        shippingCostConcern: true,

        repeatedProductViews: true,

        discountInteraction: true,

        exitIntent: true,

        mobileCheckout: false,

        slowPageLoad: true,

        stockConcern: false,

        deliveryConcern: true

    }

];


/* =========================================================
   06. INITIALIZE AI ENGINE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeAIEngine();

    }
);


/* =========================================================
   07. INITIALIZATION
========================================================= */

function initializeAIEngine() {

    if (
        CartRescueAI.state.initialized
    ) {

        return;

    }


    loadStoredAIState();

    registerSampleCustomers();

    bindAIControls();

    renderAIOverview();

    renderCustomerPredictions();

    renderAIRecommendations();

    renderAIModelMetrics();

    renderAIReasonAnalysis();

    updateAIStatus();

    CartRescueAI.state.initialized =
        true;


    exposeAIAPI();


    console.log(
        "%cCart Rescue AI Engine",
        "font-size:18px;font-weight:700;"
    );


    console.log(
        "%cPredictive intelligence engine initialized.",
        "font-size:12px;"
    );

}


/* =========================================================
   08. REGISTER SAMPLE CUSTOMERS
========================================================= */

function registerSampleCustomers() {

    sampleAICustomers.forEach(
        customer => {

            CartRescueAI.customers[
                customer.id
            ] = {
                ...customer
            };

            const prediction =
                predictCustomerRisk(
                    customer
                );


            CartRescueAI.predictions[
                customer.id
            ] =
                prediction;

        }
    );


    CartRescueAI.state.processedCustomers =
        Object.keys(
            CartRescueAI.customers
        ).length;

}


/* =========================================================
   09. BIND CONTROLS
========================================================= */

function bindAIControls() {

    const predictButton =
        document.getElementById(
            "runPrediction"
        );


    if (predictButton) {

        predictButton.addEventListener(
            "click",
            runPredictionForAll
        );

    }


    const simulateButton =
        document.getElementById(
            "simulateAI"
        );


    if (simulateButton) {

        simulateButton.addEventListener(
            "click",
            simulateCustomerEvent
        );

    }


    const startButton =
        document.getElementById(
            "startAISimulation"
        );


    if (startButton) {

        startButton.addEventListener(
            "click",
            startAISimulation
        );

    }


    const stopButton =
        document.getElementById(
            "stopAISimulation"
        );


    if (stopButton) {

        stopButton.addEventListener(
            "click",
            stopAISimulation
        );

    }


    const searchInput =
        document.getElementById(
            "aiCustomerSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            event => {

                renderCustomerPredictions(
                    event.target.value
                );

            }
        );

    }


    const threshold =
        document.getElementById(
            "aiRiskThreshold"
        );


    if (threshold) {

        threshold.addEventListener(
            "change",
            event => {

                const value =
                    Number(
                        event.target.value
                    );


                if (
                    Number.isFinite(value)
                ) {

                    CartRescueAI.config.highRiskThreshold =
                        value;

                    runPredictionForAll();

                }

            }
        );

    }

}


/* =========================================================
   10. CUSTOMER RISK PREDICTION
========================================================= */

function predictCustomerRisk(
    customer
) {

    const start =
        performance.now();


    if (!customer) {

        return null;

    }


    let riskScore =
        0;


    riskScore +=
        calculateSignal(
            customer.sessionDuration,
            900,
            5
        );


    riskScore +=
        calculateSignal(
            customer.pageViews,
            25,
            5
        );


    riskScore +=
        calculateSignal(
            customer.productViews,
            15,
            6
        );


    riskScore +=
        calculateSignal(
            customer.cartAge,
            60,
            12
        );


    riskScore +=
        calculateSignal(
            customer.inactivity,
            90,
            15
        );


    if (
        customer.checkoutStarted
    ) {

        riskScore +=
            12;

    }


    if (
        customer.paymentFailure
    ) {

        riskScore +=
            18;

    }


    if (
        customer.shippingCostConcern
    ) {

        riskScore +=
            9;

    }


    if (
        customer.repeatedProductViews
    ) {

        riskScore +=
            5;

    }


    if (
        customer.discountInteraction
    ) {

        riskScore +=
            3;

    }


    if (
        customer.exitIntent
    ) {

        riskScore +=
            10;

    }


    if (
        customer.mobileCheckout
    ) {

        riskScore +=
            3;

    }


    if (
        customer.slowPageLoad
    ) {

        riskScore +=
            6;

    }


    if (
        customer.stockConcern
    ) {

        riskScore +=
            7;

    }


    if (
        customer.deliveryConcern
    ) {

        riskScore +=
            6;

    }


    if (
        customer.cartValue >= 10000
    ) {

        riskScore +=
            4;

    }


    riskScore =
        Math.min(
            100,
            Math.max(
                0,
                riskScore
            )
        );


    riskScore =
        Number(
            riskScore.toFixed(1)
        );


    const riskLevel =
        getRiskLevel(
            riskScore
        );


    const reason =
        detectAbandonmentReason(
            customer
        );


    const confidence =
        calculatePredictionConfidence(
            customer,
            reason,
            riskScore
        );


    const recoveryProbability =
        calculateRecoveryProbability(
            customer,
            riskScore,
            reason
        );


    const recommendation =
        generateAIRecommendation(
            customer,
            riskScore,
            riskLevel,
            reason
        );


    const predictionTime =
        Math.round(
            performance.now() -
            start
        );


    return {

        customerId:
            customer.id,

        riskScore:

            riskScore,

        riskLevel:

            riskLevel,

        reason:

            reason,

        confidence:

            confidence,

        recoveryProbability:

            recoveryProbability,

        recommendation:

            recommendation,

        predictionTime:

            predictionTime,

        timestamp:

            new Date().toISOString()

    };

}


/* =========================================================
   11. CALCULATE SIGNAL
========================================================= */

function calculateSignal(
    value,
    maximum,
    weight
) {

    if (
        !Number.isFinite(
            Number(value)
        )
    ) {

        return 0;

    }


    const normalized =
        Math.min(
            Number(value) /
            maximum,
            1
        );


    return normalized *
        weight;

}


/* =========================================================
   12. RISK LEVEL
========================================================= */

function getRiskLevel(
    score
) {

    if (
        score >=
        CartRescueAI
            .config
            .highRiskThreshold
    ) {

        return "HIGH";

    }


    if (
        score >=
        CartRescueAI
            .config
            .mediumRiskThreshold
    ) {

        return "MEDIUM";

    }


    return "LOW";

}


/* =========================================================
   13. ABANDONMENT REASON DETECTION
========================================================= */

function detectAbandonmentReason(
    customer
) {

    const signals = [

        {
            key:
                "payment_failure",

            score:
                customer.paymentFailure
                    ? 100
                    : 0

        },

        {
            key:
                "high_shipping_cost",

            score:
                customer.shippingCostConcern
                    ? 92
                    : 0

        },

        {
            key:
                "price_concern",

            score:
                customer.discountInteraction
                    ? 78
                    : 0

        },

        {
            key:
                "checkout_complexity",

            score:
                customer.checkoutStarted &&
                customer.inactivity > 45
                    ? 82
                    : 0

        },

        {
            key:
                "product_comparison",

            score:
                customer.repeatedProductViews &&
                customer.productViews >= 8
                    ? 74
                    : 0

        },

        {
            key:
                "delivery_concern",

            score:
                customer.deliveryConcern
                    ? 72
                    : 0

        },

        {
            key:
                "stock_concern",

            score:
                customer.stockConcern
                    ? 70
                    : 0

        },

        {
            key:
                "browsing",

            score:
                !customer.checkoutStarted &&
                customer.inactivity < 25
                    ? 62
                    : 0

        }

    ];


    signals.sort(
        (
            a,
            b
        ) =>
            b.score -
            a.score
    );


    const selected =
        signals[0];


    if (
        !selected ||
        selected.score === 0
    ) {

        return {

            key:
                "browsing",

            label:
                AIReasonProfiles
                    .browsing
                    .label,

            icon:
                AIReasonProfiles
                    .browsing
                    .icon,

            confidence:
                58

        };

    }


    return {

        key:
            selected.key,

        label:
            AIReasonProfiles[
                selected.key
            ].label,

        icon:
            AIReasonProfiles[
                selected.key
            ].icon,

        confidence:
            Math.min(
                99,
                selected.score
            )

    };

}


/* =========================================================
   14. PREDICTION CONFIDENCE
========================================================= */

function calculatePredictionConfidence(
    customer,
    reason,
    riskScore
) {

    let confidence =
        68;


    const availableSignals =
        [

            customer.sessionDuration,

            customer.pageViews,

            customer.productViews,

            customer.cartAge,

            customer.inactivity,

            customer.cartValue

        ].filter(
            value =>
                value !==
                undefined &&
                value !==
                null
        ).length;


    confidence +=
        availableSignals *
        3;


    confidence +=
        reason.confidence *
        0.08;


    if (
        customer.checkoutStarted
    ) {

        confidence +=
            4;

    }


    if (
        customer.paymentFailure
    ) {

        confidence +=
            5;

    }


    if (
        riskScore >= 80 ||
        riskScore <= 20
    ) {

        confidence +=
            4;

    }


    return Number(
        Math.min(
            99.8,
            confidence
        ).toFixed(1)
    );

}


/* =========================================================
   15. RECOVERY PROBABILITY
========================================================= */

function calculateRecoveryProbability(
    customer,
    riskScore,
    reason
) {

    let probability =
        82;


    probability -=
        riskScore *
        0.35;


    probability +=
        reason.confidence *
        0.10;


    if (
        customer.checkoutStarted
    ) {

        probability +=
            8;

    }


    if (
        customer.paymentFailure
    ) {

        probability +=
            5;

    }


    if (
        customer.exitIntent
    ) {

        probability -=
            4;

    }


    if (
        customer.cartValue > 10000
    ) {

        probability -=
            2;

    }


    return Number(
        Math.min(
            96,
            Math.max(
                12,
                probability
            )
        ).toFixed(1)
    );

}


/* =========================================================
   16. AI RECOMMENDATION ENGINE
========================================================= */

function generateAIRecommendation(
    customer,
    riskScore,
    riskLevel,
    reason
) {

    let recommendation;


    switch (
        reason.key
    ) {

        case "payment_failure":

            recommendation =
                customer.checkoutStarted
                    ? AIRecommendations
                        .PAYMENT_RETRY
                    : AIRecommendations
                        .ALTERNATE_PAYMENT;

            break;


        case "high_shipping_cost":

            recommendation =
                AIRecommendations
                    .FREE_SHIPPING;

            break;


        case "price_concern":

            recommendation =
                AIRecommendations
                    .LIMITED_DISCOUNT;

            break;


        case "checkout_complexity":

            recommendation =
                AIRecommendations
                    .CHECKOUT_RESUME;

            break;


        case "product_comparison":

            recommendation =
                AIRecommendations
                    .PRODUCT_RECOMMENDATION;

            break;


        case "delivery_concern":

            recommendation =
                AIRecommendations
                    .DELIVERY_ASSURANCE;

            break;


        case "stock_concern":

            recommendation =
                AIRecommendations
                    .STOCK_ALERT;

            break;


        default:

            recommendation =
                AIRecommendations
                    .PRODUCT_RECOMMENDATION;

            break;

    }


    let urgency =
        "NORMAL";


    if (
        riskLevel === "HIGH"
    ) {

        urgency =
            "IMMEDIATE";

    }


    if (
        riskLevel === "MEDIUM"
    ) {

        urgency =
            "SOON";

    }


    return {

        ...recommendation,

        urgency:

            urgency,

        expectedImpact:

            calculateExpectedImpact(
                customer,
                riskScore
            ),

        confidence:

            calculateRecommendationConfidence(
                reason,
                riskLevel
            )

    };

}


/* =========================================================
   17. RECOMMENDATION CONFIDENCE
========================================================= */

function calculateRecommendationConfidence(
    reason,
    riskLevel
) {

    let confidence =
        reason.confidence;


    if (
        riskLevel === "HIGH"
    ) {

        confidence +=
            4;

    }


    return Number(
        Math.min(
            98,
            Math.max(
                55,
                confidence
            )
        ).toFixed(1)
    );

}


/* =========================================================
   18. EXPECTED IMPACT
========================================================= */

function calculateExpectedImpact(
    customer,
    riskScore
) {

    const recovery =
        Math.max(
            0.1,
            (
                100 -
                riskScore
            ) /
            100
        );


    const value =
        Number(
            customer.cartValue
        ) || 0;


    return Math.round(
        value *
        recovery
    );

}


/* =========================================================
   19. RUN PREDICTION FOR ALL
========================================================= */

function runPredictionForAll() {

    const customers =
        Object.values(
            CartRescueAI.customers
        );


    if (
        !customers.length
    ) {

        showAINotification(
            "No Customers",
            "There are no customer sessions available for prediction.",
            "warning"
        );


        return;

    }


    const start =
        performance.now();


    CartRescueAI.state
        .highRiskCustomers =
        0;

    CartRescueAI.state
        .mediumRiskCustomers =
        0;

    CartRescueAI.state
        .lowRiskCustomers =
        0;


    customers.forEach(
        customer => {

            const prediction =
                predictCustomerRisk(
                    customer
                );


            CartRescueAI.predictions[
                customer.id
            ] =
                prediction;


            CartRescueAI.state.totalPredictions++;


            if (
                prediction.riskLevel ===
                "HIGH"
            ) {

                CartRescueAI.state
                    .highRiskCustomers++;

            }
            else if (
                prediction.riskLevel ===
                "MEDIUM"
            ) {

                CartRescueAI.state
                    .mediumRiskCustomers++;

            }
            else {

                CartRescueAI.state
                    .lowRiskCustomers++;

            }

        }
    );


    CartRescueAI.state.lastPrediction =
        new Date();


    const duration =
        Math.round(
            performance.now() -
            start
        );


    renderAIOverview();

    renderCustomerPredictions();

    renderAIRecommendations();

    renderAIReasonAnalysis();

    updateAIStatus();


    dispatchAIPredictionEvent();


    showAINotification(
        "AI Prediction Complete",
        `${customers.length} customer sessions analyzed in ${duration} ms.`,
        "success"
    );


    saveAIState();

}


/* =========================================================
   20. RENDER AI OVERVIEW
========================================================= */

function renderAIOverview() {

    const predictions =
        Object.values(
            CartRescueAI.predictions
        );


    const high =
        predictions.filter(
            item =>
                item.riskLevel ===
                "HIGH"
        ).length;


    const medium =
        predictions.filter(
            item =>
                item.riskLevel ===
                "MEDIUM"
        ).length;


    const low =
        predictions.filter(
            item =>
                item.riskLevel ===
                "LOW"
        ).length;


    setAIValue(
        [
            "aiHighRisk",
            "highRiskCustomers",
            "highRiskCount"
        ],
        formatNumber(high)
    );


    setAIValue(
        [
            "aiMediumRisk",
            "mediumRiskCustomers",
            "mediumRiskCount"
        ],
        formatNumber(medium)
    );


    setAIValue(
        [
            "aiLowRisk",
            "lowRiskCustomers",
            "lowRiskCount"
        ],
        formatNumber(low)
    );


    setAIValue(
        [
            "aiTotalCustomers",
            "totalAICustomers"
        ],
        formatNumber(
            predictions.length
        )
    );


    const averageRisk =
        predictions.length
            ? predictions.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    item.riskScore,
                0
            ) /
            predictions.length
            : 0;


    setAIValue(
        [
            "aiAverageRisk",
            "averageRiskScore"
        ],
        `${averageRisk.toFixed(1)}%`
    );


    const averageConfidence =
        predictions.length
            ? predictions.reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    item.confidence,
                0
            ) /
            predictions.length
            : 0;


    setAIValue(
        [
            "aiAverageConfidence",
            "averageConfidence"
        ],
        `${averageConfidence.toFixed(1)}%`
    );


    updateRiskProgress(
        "aiHighRiskBar",
        high,
        predictions.length
    );


    updateRiskProgress(
        "aiMediumRiskBar",
        medium,
        predictions.length
    );


    updateRiskProgress(
        "aiLowRiskBar",
        low,
        predictions.length
    );

}


/* =========================================================
   21. RENDER CUSTOMER PREDICTIONS
========================================================= */

function renderCustomerPredictions(
    searchTerm = ""
) {

    const container =
        document.querySelector(
            "#aiPredictionsBody, #customerPredictionsBody, [data-ai-predictions]"
        );


    if (!container) {

        return;

    }


    const normalizedSearch =
        String(
            searchTerm
        )
            .trim()
            .toLowerCase();


    let customers =
        Object.values(
            CartRescueAI.customers
        );


    if (
        normalizedSearch
    ) {

        customers =
            customers.filter(
                customer =>
                    customer.name
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        ) ||

                    customer.id
                        .toLowerCase()
                        .includes(
                            normalizedSearch
                        )
            );

    }


    container.innerHTML =
        customers
            .map(
                customer => {

                    const prediction =
                        CartRescueAI.predictions[
                            customer.id
                        ] ||
                        predictCustomerRisk(
                            customer
                        );


                    return `

                        <tr
                            data-customer-id="${escapeHTML(customer.id)}"
                        >

                            <td>

                                <div class="ai-customer">

                                    <div class="ai-avatar">
                                        ${getCustomerInitials(customer.name)}
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

                                <span class="risk-badge ${prediction.riskLevel.toLowerCase()}">

                                    ${prediction.riskLevel}

                                </span>

                            </td>


                            <td>

                                <div class="risk-score">

                                    <strong>
                                        ${prediction.riskScore.toFixed(1)}%
                                    </strong>

                                    <div class="risk-score-bar">

                                        <span
                                            style="width:${prediction.riskScore}%"
                                        ></span>

                                    </div>

                                </div>

                            </td>


                            <td>

                                <span class="ai-reason">

                                    ${prediction.reason.icon}

                                    ${escapeHTML(prediction.reason.label)}

                                </span>

                            </td>


                            <td>

                                <strong>
                                    ${prediction.confidence.toFixed(1)}%
                                </strong>

                            </td>


                            <td>

                                <strong>
                                    ${prediction.recoveryProbability.toFixed(1)}%
                                </strong>

                            </td>


                            <td>

                                <button
                                    type="button"
                                    class="ai-action-btn"
                                    data-ai-customer="${escapeHTML(customer.id)}"
                                >
                                    View AI Action
                                </button>

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");


    bindPredictionActions();

}


/* =========================================================
   22. BIND PREDICTION ACTIONS
========================================================= */

function bindPredictionActions() {

    document
        .querySelectorAll(
            "[data-ai-customer]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const customerID =
                            button.dataset.aiCustomer;


                        showCustomerAIInsight(
                            customerID
                        );

                    }
                );

            }
        );

}


/* =========================================================
   23. CUSTOMER AI INSIGHT
========================================================= */

function showCustomerAIInsight(
    customerID
) {

    const customer =
        CartRescueAI.customers[
            customerID
        ];


    const prediction =
        CartRescueAI.predictions[
            customerID
        ];


    if (
        !customer ||
        !prediction
    ) {

        return;

    }


    const message = `

        <div class="ai-insight-panel">

            <div class="ai-insight-header">

                <span class="ai-insight-icon">
                    🤖
                </span>

                <div>

                    <strong>
                        AI Customer Insight
                    </strong>

                    <small>
                        ${escapeHTML(customer.name)}
                    </small>

                </div>

            </div>


            <div class="ai-insight-grid">

                <div>
                    <span>Risk Score</span>
                    <strong>${prediction.riskScore}%</strong>
                </div>

                <div>
                    <span>Confidence</span>
                    <strong>${prediction.confidence}%</strong>
                </div>

                <div>
                    <span>Recovery Probability</span>
                    <strong>${prediction.recoveryProbability}%</strong>
                </div>

                <div>
                    <span>Cart Value</span>
                    <strong>${formatCurrency(customer.cartValue)}</strong>
                </div>

            </div>


            <div class="ai-insight-reason">

                <span>
                    ${prediction.reason.icon}
                </span>

                <div>

                    <strong>
                        ${escapeHTML(prediction.reason.label)}
                    </strong>

                    <p>
                        AI detected this as the most likely
                        abandonment reason.
                    </p>

                </div>

            </div>


            <div class="ai-insight-recommendation">

                <span>
                    Recommended Action
                </span>

                <strong>
                    ${escapeHTML(prediction.recommendation.title)}
                </strong>

                <p>
                    ${escapeHTML(prediction.recommendation.description)}
                </p>

                <small>
                    Channel: ${escapeHTML(prediction.recommendation.channel)}
                    ·
                    Priority: ${escapeHTML(prediction.recommendation.priority)}
                </small>

            </div>

        </div>

    `;


    showAIInsightModal(
        message
    );

}


/* =========================================================
   24. AI RECOMMENDATIONS
========================================================= */

function renderAIRecommendations() {

    const container =
        document.querySelector(
            "#aiRecommendations, #aiRecommendationList, [data-ai-recommendations]"
        );


    if (!container) {

        return;

    }


    const predictions =
        Object.values(
            CartRescueAI.predictions
        )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.riskScore -
                    a.riskScore
            )
            .slice(
                0,
                8
            );


    container.innerHTML =
        predictions
            .map(
                prediction => `

                    <div class="ai-recommendation-card">

                        <div class="recommendation-icon">

                            ${prediction.reason.icon}

                        </div>


                        <div class="recommendation-content">

                            <div class="recommendation-top">

                                <strong>
                                    ${escapeHTML(
                                        prediction.recommendation.title
                                    )}
                                </strong>

                                <span class="risk-badge ${prediction.riskLevel.toLowerCase()}">
                                    ${prediction.riskLevel}
                                </span>

                            </div>


                            <p>
                                ${escapeHTML(
                                    prediction.recommendation.description
                                )}
                            </p>


                            <div class="recommendation-meta">

                                <span>
                                    ${escapeHTML(
                                        prediction.recommendation.channel
                                    )}
                                </span>

                                <span>
                                    ${prediction.recommendation.confidence}%
                                    confidence
                                </span>

                                <span>
                                    ₹${formatNumber(
                                        prediction.recommendation.expectedImpact
                                    )}
                                    expected impact
                                </span>

                            </div>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   25. REASON ANALYSIS
========================================================= */

function renderAIReasonAnalysis() {

    const container =
        document.querySelector(
            "#aiReasonAnalysis, #aiReasons, [data-ai-reasons]"
        );


    if (!container) {

        return;

    }


    const predictions =
        Object.values(
            CartRescueAI.predictions
        );


    const reasonMap = {};


    predictions.forEach(
        prediction => {

            const key =
                prediction.reason.key;


            if (
                !reasonMap[key]
            ) {

                reasonMap[key] = {

                    label:
                        prediction.reason.label,

                    icon:
                        prediction.reason.icon,

                    count:
                        0,

                    averageConfidence:
                        0

                };

            }


            reasonMap[key].count++;

            reasonMap[key]
                .averageConfidence +=
                prediction.reason.confidence;

        }
    );


    const reasons =
        Object.values(
            reasonMap
        )
            .map(
                item => ({

                    ...item,

                    averageConfidence:
                        item.averageConfidence /
                        item.count

                })
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.count -
                    a.count
            );


    const total =
        predictions.length;


    container.innerHTML =
        reasons
            .map(
                reason => {

                    const percentage =
                        total > 0
                            ? (
                                reason.count /
                                total *
                                100
                            )
                            : 0;


                    return `

                        <div class="ai-reason-row">

                            <div class="ai-reason-label">

                                <span>
                                    ${reason.icon}
                                </span>

                                <strong>
                                    ${escapeHTML(reason.label)}
                                </strong>

                            </div>


                            <div class="ai-reason-progress">

                                <span
                                    style="width:${percentage}%"
                                ></span>

                            </div>


                            <strong>
                                ${reason.count}
                            </strong>


                            <small>
                                ${reason.averageConfidence.toFixed(1)}%
                            </small>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   26. AI MODEL METRICS
========================================================= */

function renderAIModelMetrics() {

    const metrics =
        CartRescueAI.metrics;


    setAIValue(
        [
            "modelAccuracy",
            "aiModelAccuracy"
        ],
        `${metrics.accuracy}%`
    );


    setAIValue(
        [
            "modelPrecision",
            "aiModelPrecision"
        ],
        `${metrics.precision}%`
    );


    setAIValue(
        [
            "modelRecall",
            "aiModelRecall"
        ],
        `${metrics.recall}%`
    );


    setAIValue(
        [
            "modelF1",
            "aiModelF1"
        ],
        `${metrics.f1Score}%`
    );


    setAIValue(
        [
            "modelPredictionTime",
            "aiAveragePredictionTime"
        ],
        `${metrics.averagePredictionTime} ms`
    );


    setAIValue(
        [
            "modelRecommendationSuccess"
        ],
        `${metrics.recommendationSuccessRate}%`
    );


    updateAIProgress(
        "modelAccuracyBar",
        metrics.accuracy
    );


    updateAIProgress(
        "modelPrecisionBar",
        metrics.precision
    );


    updateAIProgress(
        "modelRecallBar",
        metrics.recall
    );


    updateAIProgress(
        "modelF1Bar",
        metrics.f1Score
    );

}


/* =========================================================
   27. AI STATUS
========================================================= */

function updateAIStatus() {

    const statusElements =
        document.querySelectorAll(
            "#aiStatus, [data-ai-status]"
        );


    statusElements.forEach(
        element => {

            element.textContent =
                CartRescueAI.state.running
                    ? "AI ENGINE ACTIVE"
                    : "AI ENGINE READY";


            element.classList.toggle(
                "active",
                CartRescueAI.state.running
            );

        }
    );


    const statusDot =
        document.querySelectorAll(
            "#aiStatusDot, [data-ai-status-dot]"
        );


    statusDot.forEach(
        element => {

            element.classList.toggle(
                "active",
                CartRescueAI.state.running
            );

        }
    );

}


/* =========================================================
   28. START AI SIMULATION
========================================================= */

function startAISimulation() {

    if (
        CartRescueAI.state.simulationActive
    ) {

        return;

    }


    CartRescueAI.state.simulationActive =
        true;

    CartRescueAI.state.running =
        true;


    updateAIStatus();


    CartRescueAI.simulationTimer =
        setInterval(
            simulateCustomerEvent,
            CartRescueAI
                .config
                .predictionInterval
        );


    showAINotification(
        "AI Engine Started",
        "Real-time customer behavior simulation is now active.",
        "success"
    );

}


/* =========================================================
   29. STOP AI SIMULATION
========================================================= */

function stopAISimulation() {

    if (
        CartRescueAI.simulationTimer
    ) {

        clearInterval(
            CartRescueAI.simulationTimer
        );

    }


    CartRescueAI.state.simulationActive =
        false;

    CartRescueAI.state.running =
        false;


    updateAIStatus();


    showAINotification(
        "AI Engine Paused",
        "Real-time simulation has been stopped.",
        "info"
    );

}


/* =========================================================
   30. SIMULATE CUSTOMER EVENT
========================================================= */

function simulateCustomerEvent() {

    const customer =
        generateRandomCustomer();


    CartRescueAI.customers[
        customer.id
    ] =
        customer;


    const prediction =
        predictCustomerRisk(
            customer
        );


    CartRescueAI.predictions[
        customer.id
    ] =
        prediction;


    CartRescueAI.state
        .processedCustomers++;


    CartRescueAI.state
        .totalPredictions++;


    if (
        prediction.riskLevel ===
        "HIGH"
    ) {

        CartRescueAI.state
            .highRiskCustomers++;

    }
    else if (
        prediction.riskLevel ===
        "MEDIUM"
    ) {

        CartRescueAI.state
            .mediumRiskCustomers++;

    }
    else {

        CartRescueAI.state
            .lowRiskCustomers++;

    }


    CartRescueAI.behaviorHistory.push({

        customerId:
            customer.id,

        risk:
            prediction.riskScore,

        reason:
            prediction.reason.label,

        timestamp:
            prediction.timestamp

    });


    if (
        CartRescueAI.behaviorHistory.length >
        CartRescueAI.config.maxBehaviorEvents
    ) {

        CartRescueAI.behaviorHistory.shift();

    }


    renderAIOverview();

    renderCustomerPredictions();

    renderAIRecommendations();

    renderAIReasonAnalysis();


    dispatchAIPredictionEvent();


    if (
        prediction.riskLevel ===
        "HIGH"
    ) {

        showAINotification(
            "High-Risk Cart Detected",
            `${customer.name} has a ${prediction.riskScore}% abandonment risk.`,
            "warning"
        );

    }

}


/* =========================================================
   31. GENERATE RANDOM CUSTOMER
========================================================= */

function generateRandomCustomer() {

    const names = [

        "Ananya Patel",

        "Vikram Singh",

        "Kiran Reddy",

        "Meera Sharma",

        "Aditya Rao",

        "Neha Kumar",

        "Rohit Varma",

        "Divya Naidu",

        "Sanjay Gupta",

        "Lakshmi Reddy"

    ];


    const devices = [

        "Mobile",

        "Desktop",

        "Tablet"

    ];


    const randomName =
        names[
            randomInteger(
                0,
                names.length - 1
            )
        ];


    const device =
        devices[
            randomInteger(
                0,
                devices.length - 1
            )
        ];


    const id =
        `CR-${Date.now()
            .toString()
            .slice(-6)}`;


    return {

        id:
            id,

        name:
            randomName,

        device:
            device,

        cartValue:
            randomInteger(
                999,
                24999
            ),

        sessionDuration:
            randomInteger(
                60,
                1200
            ),

        pageViews:
            randomInteger(
                2,
                30
            ),

        productViews:
            randomInteger(
                1,
                15
            ),

        cartItems:
            randomInteger(
                1,
                6
            ),

        cartAge:
            randomInteger(
                1,
                90
            ),

        inactivity:
            randomInteger(
                2,
                100
            ),

        checkoutStarted:
            Math.random() >
            0.35,

        paymentFailure:
            Math.random() >
            0.75,

        shippingCostConcern:
            Math.random() >
            0.68,

        repeatedProductViews:
            Math.random() >
            0.55,

        discountInteraction:
            Math.random() >
            0.70,

        exitIntent:
            Math.random() >
            0.60,

        mobileCheckout:
            device ===
            "Mobile",

        slowPageLoad:
            Math.random() >
            0.88,

        stockConcern:
            Math.random() >
            0.84,

        deliveryConcern:
            Math.random() >
            0.72

    };

}


/* =========================================================
   32. AI INSIGHT MODAL
========================================================= */

function showAIInsightModal(
    content
) {

    let modal =
        document.getElementById(
            "aiInsightModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "aiInsightModal";


        modal.className =
            "ai-modal";


        modal.innerHTML = `

            <div class="ai-modal-overlay"></div>

            <div class="ai-modal-content">

                <button
                    class="ai-modal-close"
                    type="button"
                    aria-label="Close"
                >
                    ×
                </button>

                <div
                    class="ai-modal-body"
                ></div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        const close =
            modal.querySelector(
                ".ai-modal-close"
            );


        const overlay =
            modal.querySelector(
                ".ai-modal-overlay"
            );


        close.addEventListener(
            "click",
            () => {

                closeAIInsightModal();

            }
        );


        overlay.addEventListener(
            "click",
            () => {

                closeAIInsightModal();

            }
        );

    }


    modal.querySelector(
        ".ai-modal-body"
    ).innerHTML =
        content;


    modal.classList.add(
        "show"
    );

}


/* =========================================================
   33. CLOSE MODAL
========================================================= */

function closeAIInsightModal() {

    const modal =
        document.getElementById(
            "aiInsightModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   34. AI NOTIFICATION
========================================================= */

function showAINotification(
    title,
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "aiNotifications"
        );


    if (!container) {

        container =
            document.createElement(
                "div"
            );


        container.id =
            "aiNotifications";


        container.className =
            "ai-notifications";


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `ai-notification ${type}`;


    notification.innerHTML = `

        <div class="ai-notification-icon">

            ${
                type === "success"
                    ? "✓"
                    : type === "warning"
                        ? "!"
                        : type === "error"
                            ? "×"
                            : "AI"
            }

        </div>


        <div class="ai-notification-content">

            <strong>
                ${escapeHTML(title)}
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>


        <button
            type="button"
            class="ai-notification-close"
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


    notification
        .querySelector(
            ".ai-notification-close"
        )
        .addEventListener(
            "click",
            () => {

                notification.remove();

            }
        );


    setTimeout(
        () => {

            if (
                notification.isConnected
            ) {

                notification.remove();

            }

        },
        5000
    );

}


/* =========================================================
   35. DISPATCH AI PREDICTION EVENT
========================================================= */

function dispatchAIPredictionEvent() {

    document.dispatchEvent(
        new CustomEvent(
            "cartRescueAIPrediction",
            {

                detail: {

                    predictions:
                        CartRescueAI.predictions,

                    metrics:
                        CartRescueAI.metrics,

                    state:
                        CartRescueAI.state

                }

            }
        )
    );

}


/* =========================================================
   36. DISPATCH RISK UPDATE
========================================================= */

function dispatchRiskUpdate(
    customer,
    prediction
) {

    document.dispatchEvent(
        new CustomEvent(
            "cartRescueRiskUpdate",
            {

                detail: {

                    customer:
                        customer,

                    risk:
                        prediction.riskScore,

                    level:
                        prediction.riskLevel,

                    reason:
                        prediction.reason,

                    recommendation:
                        prediction.recommendation

                }

            }
        )
    );

}


/* =========================================================
   37. SET AI VALUE
========================================================= */

function setAIValue(
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
   38. UPDATE AI PROGRESS
========================================================= */

function updateAIProgress(
    id,
    percentage
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.style.width =
        `${Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        )}%`;

}


/* =========================================================
   39. UPDATE RISK PROGRESS
========================================================= */

function updateRiskProgress(
    id,
    count,
    total
) {

    const percentage =
        total > 0
            ? (
                count /
                total *
                100
            )
            : 0;


    updateAIProgress(
        id,
        percentage
    );

}


/* =========================================================
   40. CUSTOMER INITIALS
========================================================= */

function getCustomerInitials(
    name
) {

    return String(
        name
    )
        .split(" ")
        .map(
            word =>
                word.charAt(0)
        )
        .slice(
            0,
            2
        )
        .join("")
        .toUpperCase();

}


/* =========================================================
   41. FORMAT NUMBER
========================================================= */

function formatNumber(
    value
) {

    return new Intl.NumberFormat(
        "en-IN"
    ).format(
        Number(value) || 0
    );

}


/* =========================================================
   42. FORMAT CURRENCY
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


    return `₹${formatNumber(
        Math.round(number)
    )}`;

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
   44. ESCAPE HTML
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
   45. SAVE AI STATE
========================================================= */

function saveAIState() {

    try {

        const state = {

            highRiskCustomers:
                CartRescueAI
                    .state
                    .highRiskCustomers,

            mediumRiskCustomers:
                CartRescueAI
                    .state
                    .mediumRiskCustomers,

            lowRiskCustomers:
                CartRescueAI
                    .state
                    .lowRiskCustomers,

            totalPredictions:
                CartRescueAI
                    .state
                    .totalPredictions,

            lastPrediction:
                CartRescueAI
                    .state
                    .lastPrediction

        };


        localStorage.setItem(
            "cartRescueAIState",
            JSON.stringify(
                state
            )
        );

    } catch (
        error
    ) {

        console.warn(
            "Unable to save AI state.",
            error
        );

    }

}


/* =========================================================
   46. LOAD AI STATE
========================================================= */

function loadStoredAIState() {

    try {

        const stored =
            localStorage.getItem(
                "cartRescueAIState"
            );


        if (
            !stored
        ) {

            return;

        }


        const state =
            JSON.parse(
                stored
            );


        Object.assign(
            CartRescueAI.state,
            state
        );

    } catch (
        error
    ) {

        console.warn(
            "Unable to load AI state.",
            error
        );

    }

}


/* =========================================================
   47. PUBLIC AI API
========================================================= */

function exposeAIAPI() {

    window.CartRescueAIAPI = {

        engine:
            CartRescueAI,

        customers:
            CartRescueAI.customers,

        predictions:
            CartRescueAI.predictions,

        metrics:
            CartRescueAI.metrics,

        predict:
            predictCustomerRisk,

        predictAll:
            runPredictionForAll,

        simulate:
            simulateCustomerEvent,

        start:
            startAISimulation,

        stop:
            stopAISimulation,

        getCustomer:
            customerID =>
                CartRescueAI
                    .customers[
                        customerID
                    ],

        getPrediction:
            customerID =>
                CartRescueAI
                    .predictions[
                        customerID
                    ],

        getReason:
            detectAbandonmentReason,

        getRecommendation:
            generateAIRecommendation

    };

}


/* =========================================================
   48. INTEGRATION WITH ANALYTICS
========================================================= */

document.addEventListener(
    "cartRescueAIPrediction",
    event => {

        if (
            !event.detail
        ) {

            return;

        }


        const predictions =
            Object.values(
                event.detail
                    .predictions ||
                {}
            );


        if (
            !predictions.length
        ) {

            return;

        }


        const highRisk =
            predictions.filter(
                item =>
                    item.riskLevel ===
                    "HIGH"
            ).length;


        const mediumRisk =
            predictions.filter(
                item =>
                    item.riskLevel ===
                    "MEDIUM"
            ).length;


        console.debug(
            "Cart Rescue Analytics:",
            {

                total:
                    predictions.length,

                highRisk:
                    highRisk,

                mediumRisk:
                    mediumRisk

            }
        );

    }
);


/* =========================================================
   49. GLOBAL KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Ctrl + Shift + P
            Run AI prediction
        */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "p"
        ) {

            event.preventDefault();

            runPredictionForAll();

        }


        /*
            Ctrl + Shift + S
            Start / stop simulation
        */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();


            if (
                CartRescueAI.state
                    .simulationActive
            ) {

                stopAISimulation();

            }
            else {

                startAISimulation();

            }

        }

    }
);


/* =========================================================
   50. PERIODIC MODEL HEALTH CHECK
========================================================= */

setInterval(
    () => {

        if (
            !CartRescueAI.state.initialized
        ) {

            return;

        }


        const health =
            calculateModelHealth();


        document
            .querySelectorAll(
                "#aiModelHealth, [data-ai-model-health]"
            )
            .forEach(
                element => {

                    element.textContent =
                        `${health}%`;

                }
            );

    },
    15000
);


/* =========================================================
   51. MODEL HEALTH
========================================================= */

function calculateModelHealth() {

    const metrics =
        CartRescueAI.metrics;


    const health =
        (
            metrics.accuracy *
            0.35
        ) +

        (
            metrics.precision *
            0.20
        ) +

        (
            metrics.recall *
            0.20
        ) +

        (
            metrics.f1Score *
            0.15
        ) +

        (
            metrics.recommendationSuccessRate *
            0.10
        );


    return Number(
        Math.min(
            100,
            health
        ).toFixed(1)
    );

}


/* =========================================================
   52. AUTOMATIC MODEL HEALTH EVENT
========================================================= */

setInterval(
    () => {

        if (
            !CartRescueAI.state.initialized
        ) {

            return;

        }


        const health =
            calculateModelHealth();


        document.dispatchEvent(
            new CustomEvent(
                "cartRescueModelHealthUpdate",
                {

                    detail: {

                        health:
                            health,

                        timestamp:
                            new Date()
                                .toISOString()

                    }

                }
            )
        );

    },
    30000
);


/* =========================================================
   53. WINDOW UNLOAD
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (
            CartRescueAI
                .state
                .simulationActive
        ) {

            stopAISimulation();

        }


        saveAIState();

    }
);


/* =========================================================
   END OF AI-ENGINE.JS
========================================================= */
```
