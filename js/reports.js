/* =========================================================
   CART RESCUE AI
   REPORTS & BUSINESS INTELLIGENCE ENGINE
   File: js/reports.js
   Version: 1.0.0

   Responsibilities:
   - Report dashboard
   - KPI calculation
   - Recovery performance
   - Revenue analysis
   - Customer segmentation
   - Channel performance
   - AI intervention performance
   - Date filtering
   - Report generation
   - CSV export
   - JSON export
   - Print report
   - Search and filtering
   - LocalStorage persistence
========================================================= */

"use strict";


/* =========================================================
   01. REPORT ENGINE
========================================================= */

const CartRescueReports = {

    config: {

        currency: "INR",

        defaultPeriod: "30",

        storageKey:
            "cartRescueReportsState",

        reportKey:
            "cartRescueGeneratedReports",

        animationDuration:
            700

    },


    state: {

        initialized: false,

        selectedPeriod:
            "30",

        selectedChannel:
            "all",

        selectedRisk:
            "all",

        selectedStatus:
            "all",

        search:
            "",

        currentReport:
            null,

        generatedReports:
            [],

        filteredData:
            [],

        chartsInitialized:
            false

    },


    metrics: {

        totalCarts:
            0,

        abandonedCarts:
            0,

        recoveredCarts:
            0,

        recoveryRate:
            0,

        cartValue:
            0,

        recoveredRevenue:
            0,

        lostRevenue:
            0,

        averageOrderValue:
            0,

        recoveryPotential:
            0,

        interventions:
            0,

        successfulInterventions:
            0,

        conversionRate:
            0,

        roi:
            0

    },


    data: {

        transactions: [],

        customers: [],

        interventions: [],

        channels: [],

        reasons: []

    }

};


/* =========================================================
   02. SAMPLE REPORT DATA
========================================================= */

const reportSampleData = [

    {
        id: "CR-ORD-10001",

        customerId: "CR-10001",

        customer:
            "Rahul Sharma",

        date:
            "2026-08-07",

        cartValue:
            18999,

        status:
            "recovered",

        risk:
            "high",

        riskScore:
            88,

        reason:
            "Payment Failure",

        channel:
            "On-site",

        intervention:
            "Payment Retry",

        discount:
            0,

        revenueRecovered:
            18999,

        recoveryProbability:
            91,

        conversion:
            true

    },


    {
        id: "CR-ORD-10002",

        customerId: "CR-10002",

        customer:
            "Priya Reddy",

        date:
            "2026-08-06",

        cartValue:
            7420,

        status:
            "recovered",

        risk:
            "high",

        riskScore:
            79,

        reason:
            "High Shipping Cost",

        channel:
            "WhatsApp",

        intervention:
            "Free Shipping",

        discount:
            250,

        revenueRecovered:
            7170,

        recoveryProbability:
            84,

        conversion:
            true

    },


    {
        id: "CR-ORD-10003",

        customerId:
            "CR-10003",

        customer:
            "Arjun Kumar",

        date:
            "2026-08-05",

        cartValue:
            3299,

        status:
            "abandoned",

        risk:
            "medium",

        riskScore:
            58,

        reason:
            "Still Browsing",

        channel:
            "On-site",

        intervention:
            "Product Recommendation",

        discount:
            0,

        revenueRecovered:
            0,

        recoveryProbability:
            44,

        conversion:
            false

    },


    {
        id:
            "CR-ORD-10004",

        customerId:
            "CR-10004",

        customer:
            "Sneha Rao",

        date:
            "2026-08-04",

        cartValue:
            12800,

        status:
            "recovered",

        risk:
            "high",

        riskScore:
            92,

        reason:
            "Checkout Complexity",

        channel:
            "Email",

        intervention:
            "Resume Checkout",

        discount:
            0,

        revenueRecovered:
            12800,

        recoveryProbability:
            88,

        conversion:
            true

    },


    {
        id:
            "CR-ORD-10005",

        customerId:
            "CR-10005",

        customer:
            "Vikram Singh",

        date:
            "2026-08-03",

        cartValue:
            5699,

        status:
            "abandoned",

        risk:
            "medium",

        riskScore:
            63,

        reason:
            "Price Concern",

        channel:
            "WhatsApp",

        intervention:
            "Limited Discount",

        discount:
            300,

        revenueRecovered:
            0,

        recoveryProbability:
            51,

        conversion:
            false

    },


    {
        id:
            "CR-ORD-10006",

        customerId:
            "CR-10006",

        customer:
            "Meera Sharma",

        date:
            "2026-08-02",

        cartValue:
            22499,

        status:
            "recovered",

        risk:
            "high",

        riskScore:
            86,

        reason:
            "Delivery Concern",

        channel:
            "SMS",

        intervention:
            "Delivery Assurance",

        discount:
            0,

        revenueRecovered:
            22499,

        recoveryProbability:
            89,

        conversion:
            true

    },


    {
        id:
            "CR-ORD-10007",

        customerId:
            "CR-10007",

        customer:
            "Aditya Rao",

        date:
            "2026-08-01",

        cartValue:
            4599,

        status:
            "recovered",

        risk:
            "medium",

        riskScore:
            69,

        reason:
            "Product Comparison",

        channel:
            "Push",

        intervention:
            "Product Recommendation",

        discount:
            0,

        revenueRecovered:
            4599,

        recoveryProbability:
            76,

        conversion:
            true

    },


    {
        id:
            "CR-ORD-10008",

        customerId:
            "CR-10008",

        customer:
            "Neha Kumar",

        date:
            "2026-07-31",

        cartValue:
            8999,

        status:
            "abandoned",

        risk:
            "high",

        riskScore:
            83,

        reason:
            "Stock Concern",

        channel:
            "Push",

        intervention:
            "Stock Alert",

        discount:
            0,

        revenueRecovered:
            0,

        recoveryProbability:
            62,

        conversion:
            false

    },


    {
        id:
            "CR-ORD-10009",

        customerId:
            "CR-10009",

        customer:
            "Rohit Varma",

        date:
            "2026-07-30",

        cartValue:
            14999,

        status:
            "recovered",

        risk:
            "high",

        riskScore:
            90,

        reason:
            "Payment Failure",

        channel:
            "On-site",

        intervention:
            "Alternate Payment",

        discount:
            0,

        revenueRecovered:
            14999,

        recoveryProbability:
            94,

        conversion:
            true

    },


    {
        id:
            "CR-ORD-10010",

        customerId:
            "CR-10010",

        customer:
            "Divya Naidu",

        date:
            "2026-07-29",

        cartValue:
            6799,

        status:
            "abandoned",

        risk:
            "medium",

        riskScore:
            61,

        reason:
            "High Shipping Cost",

        channel:
            "Email",

        intervention:
            "Free Shipping",

        discount:
            250,

        revenueRecovered:
            0,

        recoveryProbability:
            47,

        conversion:
            false

    }

];


/* =========================================================
   03. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeReports
);


function initializeReports() {

    if (
        CartRescueReports.state.initialized
    ) {

        return;

    }


    loadReportState();

    loadReportData();

    bindReportControls();

    applyReportFilters();

    renderReportDashboard();

    renderReportTable();

    renderChannelPerformance();

    renderReasonPerformance();

    renderInterventionPerformance();

    renderRiskDistribution();

    renderReportHistory();

    updateReportStatus();


    CartRescueReports
        .state
        .initialized = true;


    exposeReportsAPI();


    console.log(
        "Cart Rescue AI Reports Engine initialized."
    );

}


/* =========================================================
   04. LOAD DATA
========================================================= */

function loadReportData() {

    CartRescueReports.data.transactions =
        [...reportSampleData];


    /*
       Integrate AI engine data when available.
    */

    if (
        window.CartRescueAIAPI &&
        window.CartRescueAIAPI.predictions
    ) {

        integrateAIReportData();

    }


    /*
       Integrate local report data.
    */

    try {

        const stored =
            localStorage.getItem(
                "cartRescueReportData"
            );


        if (
            stored
        ) {

            const parsed =
                JSON.parse(
                    stored
                );


            if (
                Array.isArray(parsed)
            ) {

                CartRescueReports
                    .data
                    .transactions
                    .push(
                        ...parsed
                    );

            }

        }

    }
    catch (
        error
    ) {

        console.warn(
            "Unable to load stored report data.",
            error
        );

    }


    buildReportDimensions();

}


/* =========================================================
   05. INTEGRATE AI DATA
========================================================= */

function integrateAIReportData() {

    const predictions =
        Object.values(
            window
                .CartRescueAIAPI
                .predictions
        );


    predictions.forEach(
        prediction => {

            if (
                !prediction ||
                !prediction.customerId
            ) {

                return;

            }


            const customer =
                window
                    .CartRescueAIAPI
                    .customers[
                        prediction.customerId
                    ];


            if (
                !customer
            ) {

                return;

            }


            const exists =
                CartRescueReports
                    .data
                    .transactions
                    .some(
                        item =>
                            item.customerId ===
                            prediction.customerId
                    );


            if (
                exists
            ) {

                return;

            }


            CartRescueReports
                .data
                .transactions
                .push({

                    id:
                        `AI-${prediction.customerId}`,

                    customerId:
                        prediction.customerId,

                    customer:
                        customer.name,

                    date:
                        new Date()
                            .toISOString()
                            .split("T")[0],

                    cartValue:
                        Number(
                            customer.cartValue
                        ) || 0,

                    status:
                        "pending",

                    risk:
                        prediction
                            .riskLevel
                            .toLowerCase(),

                    riskScore:
                        prediction
                            .riskScore,

                    reason:
                        prediction
                            .reason
                            .label,

                    channel:
                        prediction
                            .recommendation
                            .channel,

                    intervention:
                        prediction
                            .recommendation
                            .title,

                    discount:
                        0,

                    revenueRecovered:
                        0,

                    recoveryProbability:
                        prediction
                            .recoveryProbability,

                    conversion:
                        false

                });

        }
    );

}


/* =========================================================
   06. BUILD REPORT DIMENSIONS
========================================================= */

function buildReportDimensions() {

    const transactions =
        CartRescueReports
            .data
            .transactions;


    CartRescueReports.data.customers =
        [
            ...new Map(
                transactions.map(
                    item =>
                        [
                            item.customerId,
                            item
                        ]
                )
            ).values()
        ];


    CartRescueReports.data.channels =
        [
            ...new Set(
                transactions.map(
                    item =>
                        item.channel
                )
            )
        ];


    CartRescueReports.data.reasons =
        [
            ...new Set(
                transactions.map(
                    item =>
                        item.reason
                )
            )
        ];

}


/* =========================================================
   07. REPORT CONTROLS
========================================================= */

function bindReportControls() {

    const period =
        document.getElementById(
            "reportPeriod"
        );


    if (
        period
    ) {

        period.addEventListener(
            "change",
            event => {

                CartRescueReports
                    .state
                    .selectedPeriod =
                    event.target.value;

                applyReportFilters();

            }
        );

    }


    const channel =
        document.getElementById(
            "reportChannel"
        );


    if (
        channel
    ) {

        channel.addEventListener(
            "change",
            event => {

                CartRescueReports
                    .state
                    .selectedChannel =
                    event.target.value;

                applyReportFilters();

            }
        );

    }


    const risk =
        document.getElementById(
            "reportRisk"
        );


    if (
        risk
    ) {

        risk.addEventListener(
            "change",
            event => {

                CartRescueReports
                    .state
                    .selectedRisk =
                    event.target.value;

                applyReportFilters();

            }
        );

    }


    const status =
        document.getElementById(
            "reportStatus"
        );


    if (
        status
    ) {

        status.addEventListener(
            "change",
            event => {

                CartRescueReports
                    .state
                    .selectedStatus =
                    event.target.value;

                applyReportFilters();

            }
        );

    }


    const search =
        document.getElementById(
            "reportSearch"
        );


    if (
        search
    ) {

        search.addEventListener(
            "input",
            event => {

                CartRescueReports
                    .state
                    .search =
                    event.target.value;

                applyReportFilters();

            }
        );

    }


    bindButton(
        "generateReport",
        generateReport
    );


    bindButton(
        "generateAIReport",
        generateAIReport
    );


    bindButton(
        "exportCSV",
        exportCSV
    );


    bindButton(
        "exportJSON",
        exportJSON
    );


    bindButton(
        "printReport",
        printReport
    );


    bindButton(
        "downloadReport",
        exportCSV
    );


    bindButton(
        "refreshReports",
        refreshReports
    );

}


/* =========================================================
   08. BIND BUTTON
========================================================= */

function bindButton(
    id,
    callback
) {

    const button =
        document.getElementById(
            id
        );


    if (
        button
    ) {

        button.addEventListener(
            "click",
            callback
        );

    }

}


/* =========================================================
   09. APPLY FILTERS
========================================================= */

function applyReportFilters() {

    const transactions =
        CartRescueReports
            .data
            .transactions;


    const period =
        CartRescueReports
            .state
            .selectedPeriod;


    const channel =
        CartRescueReports
            .state
            .selectedChannel;


    const risk =
        CartRescueReports
            .state
            .selectedRisk;


    const status =
        CartRescueReports
            .state
            .selectedStatus;


    const search =
        CartRescueReports
            .state
            .search
            .trim()
            .toLowerCase();


    let filtered =
        [...transactions];


    /*
       Date filter
    */

    if (
        period !== "all"
    ) {

        const days =
            Number(
                period
            );


        if (
            Number.isFinite(days)
        ) {

            const cutoff =
                new Date();


            cutoff.setDate(
                cutoff.getDate() -
                days
            );


            filtered =
                filtered.filter(
                    item =>
                        new Date(
                            item.date
                        ) >=
                        cutoff
                );

        }

    }


    /*
       Channel filter
    */

    if (
        channel !== "all"
    ) {

        filtered =
            filtered.filter(
                item =>
                    String(
                        item.channel
                    ).toLowerCase() ===
                    String(
                        channel
                    ).toLowerCase()
            );

    }


    /*
       Risk filter
    */

    if (
        risk !== "all"
    ) {

        filtered =
            filtered.filter(
                item =>
                    String(
                        item.risk
                    ).toLowerCase() ===
                    String(
                        risk
                    ).toLowerCase()
            );

    }


    /*
       Status filter
    */

    if (
        status !== "all"
    ) {

        filtered =
            filtered.filter(
                item =>
                    String(
                        item.status
                    ).toLowerCase() ===
                    String(
                        status
                    ).toLowerCase()
            );

    }


    /*
       Search
    */

    if (
        search
    ) {

        filtered =
            filtered.filter(
                item =>
                    String(
                        item.customer
                    )
                        .toLowerCase()
                        .includes(
                            search
                        ) ||

                    String(
                        item.customerId
                    )
                        .toLowerCase()
                        .includes(
                            search
                        ) ||

                    String(
                        item.reason
                    )
                        .toLowerCase()
                        .includes(
                            search
                        ) ||

                    String(
                        item.intervention
                    )
                        .toLowerCase()
                        .includes(
                            search
                        )

            );

    }


    CartRescueReports
        .state
        .filteredData =
        filtered;


    calculateReportMetrics(
        filtered
    );


    renderReportDashboard();

    renderReportTable();

    renderChannelPerformance();

    renderReasonPerformance();

    renderInterventionPerformance();

    renderRiskDistribution();

    updateReportStatus();

    saveReportState();

}


/* =========================================================
   10. CALCULATE METRICS
========================================================= */

function calculateReportMetrics(
    data
) {

    const total =
        data.length;


    const recovered =
        data.filter(
            item =>
                item.status ===
                "recovered"
        );


    const abandoned =
        data.filter(
            item =>
                item.status ===
                "abandoned"
        );


    const pending =
        data.filter(
            item =>
                item.status ===
                "pending"
        );


    const totalCartValue =
        data.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.cartValue
                ),
            0
        );


    const recoveredRevenue =
        recovered.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.revenueRecovered
                ),
            0
        );


    const lostRevenue =
        abandoned.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.cartValue
                ),
            0
        );


    const recoveryRate =
        total > 0
            ? recovered.length /
                total *
                100
            : 0;


    const averageOrderValue =
        total > 0
            ? totalCartValue /
                total
            : 0;


    const recoveryPotential =
        pending.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.cartValue
                ) *
                (
                    Number(
                        item.recoveryProbability
                    ) /
                    100
                ),
            0
        );


    const interventions =
        data.filter(
            item =>
                item.intervention
        ).length;


    const successfulInterventions =
        recovered.length;


    const conversionRate =
        interventions > 0
            ? successfulInterventions /
                interventions *
                100
            : 0;


    const interventionCost =
        data.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.discount
                ),
            0
        );


    const roi =
        interventionCost > 0
            ? (
                recoveredRevenue -
                interventionCost
            ) /
            interventionCost *
            100
            : recoveredRevenue > 0
                ? 100
                : 0;


    Object.assign(
        CartRescueReports.metrics,
        {

            totalCarts:
                total,

            abandonedCarts:
                abandoned.length,

            recoveredCarts:
                recovered.length,

            recoveryRate:
                recoveryRate,

            cartValue:
                totalCartValue,

            recoveredRevenue:
                recoveredRevenue,

            lostRevenue:
                lostRevenue,

            averageOrderValue:
                averageOrderValue,

            recoveryPotential:
                recoveryPotential,

            interventions:
                interventions,

            successfulInterventions:
                successfulInterventions,

            conversionRate:
                conversionRate,

            roi:
                roi

        }
    );

}


/* =========================================================
   11. RENDER REPORT DASHBOARD
========================================================= */

function renderReportDashboard() {

    const metrics =
        CartRescueReports.metrics;


    setReportValue(
        [
            "totalCarts",
            "reportTotalCarts",
            "totalCartCount"
        ],
        formatNumber(
            metrics.totalCarts
        )
    );


    setReportValue(
        [
            "abandonedCarts",
            "reportAbandonedCarts"
        ],
        formatNumber(
            metrics.abandonedCarts
        )
    );


    setReportValue(
        [
            "recoveredCarts",
            "reportRecoveredCarts"
        ],
        formatNumber(
            metrics.recoveredCarts
        )
    );


    setReportValue(
        [
            "recoveryRate",
            "reportRecoveryRate"
        ],
        `${metrics.recoveryRate.toFixed(1)}%`
    );


    setReportValue(
        [
            "cartValue",
            "totalCartValue"
        ],
        formatCurrency(
            metrics.cartValue
        )
    );


    setReportValue(
        [
            "recoveredRevenue",
            "reportRecoveredRevenue"
        ],
        formatCurrency(
            metrics.recoveredRevenue
        )
    );


    setReportValue(
        [
            "lostRevenue",
            "reportLostRevenue"
        ],
        formatCurrency(
            metrics.lostRevenue
        )
    );


    setReportValue(
        [
            "averageOrderValue",
            "reportAverageOrderValue"
        ],
        formatCurrency(
            metrics.averageOrderValue
        )
    );


    setReportValue(
        [
            "recoveryPotential",
            "reportRecoveryPotential"
        ],
        formatCurrency(
            metrics.recoveryPotential
        )
    );


    setReportValue(
        [
            "conversionRate",
            "reportConversionRate"
        ],
        `${metrics.conversionRate.toFixed(1)}%`
    );


    setReportValue(
        [
            "reportROI",
            "roi"
        ],
        `${metrics.roi.toFixed(1)}%`
    );


    updateReportProgress(
        "recoveryRateBar",
        metrics.recoveryRate
    );


    updateReportProgress(
        "conversionRateBar",
        metrics.conversionRate
    );

}


/* =========================================================
   12. REPORT TABLE
========================================================= */

function renderReportTable() {

    const container =
        document.querySelector(
            "#reportsTableBody, #reportTableBody, [data-report-table]"
        );


    if (
        !container
    ) {

        return;

    }


    const data =
        CartRescueReports
            .state
            .filteredData;


    if (
        !data.length
    ) {

        container.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    class="empty-state"
                >

                    <div>

                        <span>
                            📊
                        </span>

                        <strong>
                            No report data found
                        </strong>

                        <p>
                            Try changing your filters.
                        </p>

                    </div>

                </td>

            </tr>

        `;


        return;

    }


    container.innerHTML =
        data
            .map(
                item => `

                    <tr
                        data-report-id="${escapeHTML(item.id)}"
                    >

                        <td>

                            <strong>
                                ${escapeHTML(item.id)}
                            </strong>

                        </td>


                        <td>

                            <div class="report-customer">

                                <strong>
                                    ${escapeHTML(item.customer)}
                                </strong>

                                <small>
                                    ${escapeHTML(item.customerId)}
                                </small>

                            </div>

                        </td>


                        <td>
                            ${formatDate(item.date)}
                        </td>


                        <td>
                            ${formatCurrency(item.cartValue)}
                        </td>


                        <td>

                            <span class="risk-badge ${escapeHTML(item.risk)}">

                                ${escapeHTML(
                                    String(item.risk).toUpperCase()
                                )}

                            </span>

                        </td>


                        <td>

                            ${escapeHTML(item.reason)}

                        </td>


                        <td>

                            ${escapeHTML(item.channel)}

                        </td>


                        <td>

                            ${escapeHTML(item.intervention)}

                        </td>


                        <td>

                            <span class="report-status ${escapeHTML(item.status)}">

                                ${formatStatus(item.status)}

                            </span>

                        </td>


                        <td>

                            <strong>

                                ${formatCurrency(
                                    item.revenueRecovered
                                )}

                            </strong>

                        </td>


                    </tr>

                `
            )
            .join("");

}


/* =========================================================
   13. CHANNEL PERFORMANCE
========================================================= */

function renderChannelPerformance() {

    const container =
        document.querySelector(
            "#channelPerformance, #reportChannelPerformance, [data-channel-performance]"
        );


    if (
        !container
    ) {

        return;

    }


    const data =
        CartRescueReports
            .state
            .filteredData;


    const channels = {};


    data.forEach(
        item => {

            const key =
                item.channel ||
                "Unknown";


            if (
                !channels[key]
            ) {

                channels[key] = {

                    name:
                        key,

                    total:
                        0,

                    recovered:
                        0,

                    revenue:
                        0,

                    recoveryRate:
                        0

                };

            }


            channels[key].total++;


            if (
                item.status ===
                "recovered"
            ) {

                channels[key].recovered++;

                channels[key].revenue +=
                    Number(
                        item.revenueRecovered
                    );

            }

        }
    );


    const rows =
        Object.values(
            channels
        )
            .map(
                channel => {

                    channel.recoveryRate =
                        channel.total > 0
                            ? channel.recovered /
                                channel.total *
                                100
                            : 0;


                    return channel;

                }
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.recoveryRate -
                    a.recoveryRate
            );


    container.innerHTML =
        rows
            .map(
                channel => `

                    <div class="performance-row">

                        <div class="performance-name">

                            <strong>
                                ${escapeHTML(channel.name)}
                            </strong>

                            <small>
                                ${channel.recovered}/${channel.total}
                                recovered
                            </small>

                        </div>


                        <div class="performance-bar">

                            <span
                                style="width:${channel.recoveryRate}%"
                            ></span>

                        </div>


                        <strong>
                            ${channel.recoveryRate.toFixed(1)}%
                        </strong>


                        <span>
                            ${formatCurrency(channel.revenue)}
                        </span>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   14. REASON PERFORMANCE
========================================================= */

function renderReasonPerformance() {

    const container =
        document.querySelector(
            "#reasonPerformance, #reportReasonPerformance, [data-reason-performance]"
        );


    if (
        !container
    ) {

        return;

    }


    const data =
        CartRescueReports
            .state
            .filteredData;


    const reasons = {};


    data.forEach(
        item => {

            const key =
                item.reason ||
                "Unknown";


            if (
                !reasons[key]
            ) {

                reasons[key] = {

                    name:
                        key,

                    total:
                        0,

                    recovered:
                        0,

                    revenue:
                        0

                };

            }


            reasons[key].total++;


            if (
                item.status ===
                "recovered"
            ) {

                reasons[key].recovered++;


                reasons[key].revenue +=
                    Number(
                        item.revenueRecovered
                    );

            }

        }
    );


    const rows =
        Object.values(
            reasons
        )
            .map(
                reason => ({

                    ...reason,

                    recoveryRate:
                        reason.total > 0
                            ? reason.recovered /
                                reason.total *
                                100
                            : 0

                })
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.total -
                    a.total
            );


    container.innerHTML =
        rows
            .map(
                reason => `

                    <div class="reason-performance">

                        <div>

                            <strong>
                                ${escapeHTML(reason.name)}
                            </strong>

                            <small>
                                ${reason.total} carts
                            </small>

                        </div>


                        <div class="reason-rate">

                            <strong>
                                ${reason.recoveryRate.toFixed(1)}%
                            </strong>

                            <span>
                                ${formatCurrency(reason.revenue)}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   15. INTERVENTION PERFORMANCE
========================================================= */

function renderInterventionPerformance() {

    const container =
        document.querySelector(
            "#interventionPerformance, #reportInterventionPerformance, [data-intervention-performance]"
        );


    if (
        !container
    ) {

        return;

    }


    const data =
        CartRescueReports
            .state
            .filteredData;


    const interventions = {};


    data.forEach(
        item => {

            const key =
                item.intervention ||
                "Unknown";


            if (
                !interventions[key]
            ) {

                interventions[key] = {

                    name:
                        key,

                    total:
                        0,

                    recovered:
                        0,

                    revenue:
                        0,

                    cost:
                        0

                };

            }


            interventions[key].total++;


            interventions[key].cost +=
                Number(
                    item.discount
                );


            if (
                item.status ===
                "recovered"
            ) {

                interventions[key]
                    .recovered++;


                interventions[key].revenue +=
                    Number(
                        item.revenueRecovered
                    );

            }

        }
    );


    const rows =
        Object.values(
            interventions
        )
            .map(
                intervention => ({

                    ...intervention,

                    successRate:
                        intervention.total > 0
                            ? intervention.recovered /
                                intervention.total *
                                100
                            : 0

                })
            )
            .sort(
                (
                    a,
                    b
                ) =>
                    b.successRate -
                    a.successRate
            );


    container.innerHTML =
        rows
            .map(
                intervention => `

                    <div class="intervention-card">

                        <div class="intervention-title">

                            <strong>
                                ${escapeHTML(
                                    intervention.name
                                )}
                            </strong>

                            <span>
                                ${intervention.successRate.toFixed(1)}%
                            </span>

                        </div>


                        <div class="intervention-bar">

                            <span
                                style="width:${intervention.successRate}%"
                            ></span>

                        </div>


                        <div class="intervention-meta">

                            <span>
                                ${intervention.recovered}
                                recovered
                            </span>

                            <span>
                                ${formatCurrency(
                                    intervention.revenue
                                )}
                            </span>

                            <span>
                                Cost:
                                ${formatCurrency(
                                    intervention.cost
                                )}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   16. RISK DISTRIBUTION
========================================================= */

function renderRiskDistribution() {

    const container =
        document.querySelector(
            "#riskDistribution, #reportRiskDistribution, [data-risk-distribution]"
        );


    if (
        !container
    ) {

        return;

    }


    const data =
        CartRescueReports
            .state
            .filteredData;


    const high =
        data.filter(
            item =>
                item.risk ===
                "high"
        ).length;


    const medium =
        data.filter(
            item =>
                item.risk ===
                "medium"
        ).length;


    const low =
        data.filter(
            item =>
                item.risk ===
                "low"
        ).length;


    const total =
        data.length;


    const rows = [

        {
            label:
                "High Risk",

            value:
                high,

            percentage:
                total
                    ? high /
                        total *
                        100
                    : 0

        },

        {
            label:
                "Medium Risk",

            value:
                medium,

            percentage:
                total
                    ? medium /
                        total *
                        100
                    : 0

        },

        {
            label:
                "Low Risk",

            value:
                low,

            percentage:
                total
                    ? low /
                        total *
                        100
                    : 0

        }

    ];


    container.innerHTML =
        rows
            .map(
                row => `

                    <div class="risk-distribution-row">

                        <div>

                            <strong>
                                ${row.label}
                            </strong>

                            <span>
                                ${row.value}
                            </span>

                        </div>


                        <div class="risk-distribution-bar">

                            <span
                                style="width:${row.percentage}%"
                            ></span>

                        </div>


                        <small>
                            ${row.percentage.toFixed(1)}%
                        </small>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   17. GENERATE REPORT
========================================================= */

function generateReport() {

    const data =
        CartRescueReports
            .state
            .filteredData;


    if (
        !data.length
    ) {

        showReportNotification(
            "No Data",
            "There is no data available for the selected filters.",
            "warning"
        );


        return;

    }


    const metrics =
        CartRescueReports.metrics;


    const report = {

        id:
            `REPORT-${Date.now()}`,

        generatedAt:
            new Date().toISOString(),

        period:
            CartRescueReports
                .state
                .selectedPeriod,

        filters: {

            channel:
                CartRescueReports
                    .state
                    .selectedChannel,

            risk:
                CartRescueReports
                    .state
                    .selectedRisk,

            status:
                CartRescueReports
                    .state
                    .selectedStatus

        },

        metrics:
            {...metrics},

        data:
            [...data]

    };


    CartRescueReports
        .state
        .currentReport =
        report;


    CartRescueReports
        .state
        .generatedReports
        .unshift(
            report
        );


    if (
        CartRescueReports
            .state
            .generatedReports
            .length > 20
    ) {

        CartRescueReports
            .state
            .generatedReports
            .pop();

    }


    saveReportState();

    renderReportHistory();


    showReportNotification(
        "Report Generated",
        `Report ${report.id} has been generated successfully.`,
        "success"
    );


    return report;

}


/* =========================================================
   18. GENERATE AI REPORT
========================================================= */

function generateAIReport() {

    const report =
        generateReport();


    if (
        !report
    ) {

        return;

    }


    const predictions =
        window.CartRescueAIAPI
            ? Object.values(
                window
                    .CartRescueAIAPI
                    .predictions
            )
            : [];


    report.aiSummary = {

        model:
            "Cart Rescue Predictive Engine",

        accuracy:
            window.CartRescueAIAPI
                ?.metrics
                ?.accuracy ||
            92.4,

        predictions:
            predictions.length,

        highRisk:
            predictions.filter(
                item =>
                    item.riskLevel ===
                    "HIGH"
            ).length,

        mediumRisk:
            predictions.filter(
                item =>
                    item.riskLevel ===
                    "MEDIUM"
            ).length,

        lowRisk:
            predictions.filter(
                item =>
                    item.riskLevel ===
                    "LOW"
            ).length

    };


    CartRescueReports
        .state
        .currentReport =
        report;


    showReportNotification(
        "AI Report Ready",
        "The latest AI risk and recovery analysis has been included.",
        "success"
    );


    return report;

}


/* =========================================================
   19. REPORT HISTORY
========================================================= */

function renderReportHistory() {

    const container =
        document.querySelector(
            "#reportHistory, #generatedReports, [data-report-history]"
        );


    if (
        !container
    ) {

        return;

    }


    const reports =
        CartRescueReports
            .state
            .generatedReports;


    if (
        !reports.length
    ) {

        container.innerHTML = `

            <div class="empty-state">

                <span>
                    📄
                </span>

                <strong>
                    No reports generated yet
                </strong>

                <p>
                    Generate your first report to see it here.
                </p>

            </div>

        `;


        return;

    }


    container.innerHTML =
        reports
            .slice(
                0,
                10
            )
            .map(
                report => `

                    <div class="report-history-item">

                        <div>

                            <strong>
                                ${escapeHTML(report.id)}
                            </strong>

                            <small>
                                ${formatDateTime(
                                    report.generatedAt
                                )}
                            </small>

                        </div>


                        <div>

                            <span>
                                ${report.data.length}
                                records
                            </span>

                            <strong>
                                ${formatCurrency(
                                    report.metrics.recoveredRevenue
                                )}
                            </strong>

                        </div>


                        <button
                            type="button"
                            data-load-report="${escapeHTML(report.id)}"
                        >
                            View
                        </button>

                    </div>

                `
            )
            .join("");


    container
        .querySelectorAll(
            "[data-load-report]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        loadGeneratedReport(
                            button.dataset.loadReport
                        );

                    }
                );

            }
        );

}


/* =========================================================
   20. LOAD GENERATED REPORT
========================================================= */

function loadGeneratedReport(
    reportID
) {

    const report =
        CartRescueReports
            .state
            .generatedReports
            .find(
                item =>
                    item.id ===
                    reportID
            );


    if (
        !report
    ) {

        return;

    }


    CartRescueReports
        .state
        .currentReport =
        report;


    CartRescueReports
        .state
        .filteredData =
        [...report.data];


    calculateReportMetrics(
        report.data
    );


    renderReportDashboard();

    renderReportTable();

    renderChannelPerformance();

    renderReasonPerformance();

    renderInterventionPerformance();

    renderRiskDistribution();


    showReportNotification(
        "Report Loaded",
        `${report.id} is now active.`,
        "info"
    );

}


/* =========================================================
   21. CSV EXPORT
========================================================= */

function exportCSV() {

    const data =
        CartRescueReports
            .state
            .filteredData;


    if (
        !data.length
    ) {

        showReportNotification(
            "Export Failed",
            "No report records are available.",
            "warning"
        );


        return;

    }


    const headers = [

        "Report ID",

        "Customer ID",

        "Customer",

        "Date",

        "Cart Value",

        "Status",

        "Risk",

        "Risk Score",

        "Reason",

        "Channel",

        "Intervention",

        "Discount",

        "Revenue Recovered",

        "Recovery Probability"

    ];


    const rows =
        data.map(
            item => [

                item.id,

                item.customerId,

                item.customer,

                item.date,

                item.cartValue,

                item.status,

                item.risk,

                item.riskScore,

                item.reason,

                item.channel,

                item.intervention,

                item.discount,

                item.revenueRecovered,

                item.recoveryProbability

            ]
        );


    const csv = [

        headers,

        ...rows

    ]
        .map(
            row =>
                row
                    .map(
                        value =>
                            csvEscape(value)
                    )
                    .join(",")
        )
        .join("\n");


    downloadFile(
        csv,
        `cart-rescue-report-${getDateStamp()}.csv`,
        "text/csv;charset=utf-8;"
    );


    showReportNotification(
        "CSV Export Complete",
        `${data.length} records exported successfully.`,
        "success"
    );

}


/* =========================================================
   22. JSON EXPORT
========================================================= */

function exportJSON() {

    const report =
        CartRescueReports
            .state
            .currentReport ||
        generateReport();


    if (
        !report
    ) {

        return;

    }


    const json =
        JSON.stringify(
            report,
            null,
            2
        );


    downloadFile(
        json,
        `cart-rescue-report-${getDateStamp()}.json`,
        "application/json;charset=utf-8;"
    );


    showReportNotification(
        "JSON Export Complete",
        "Full report data has been exported.",
        "success"
    );

}


/* =========================================================
   23. PRINT REPORT
========================================================= */

function printReport() {

    const report =
        CartRescueReports
            .state
            .currentReport ||
        generateReport();


    if (
        !report
    ) {

        return;

    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=1200,height=800"
        );


    if (
        !printWindow
    ) {

        showReportNotification(
            "Print Blocked",
            "Please allow pop-ups to print the report.",
            "warning"
        );


        return;

    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Cart Rescue AI Report
            </title>

            <meta
                charset="UTF-8"
            >

            <style>

                body {

                    font-family:
                        Arial,
                        sans-serif;

                    margin:
                        40px;

                    color:
                        #111827;

                }

                h1 {

                    margin-bottom:
                        4px;

                }

                .subtitle {

                    color:
                        #6b7280;

                    margin-bottom:
                        30px;

                }

                .metrics {

                    display:
                        grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap:
                        15px;

                    margin-bottom:
                        30px;

                }

                .metric {

                    border:
                        1px solid #ddd;

                    padding:
                        18px;

                    border-radius:
                        10px;

                }

                .metric strong {

                    display:
                        block;

                    font-size:
                        24px;

                    margin-top:
                        6px;

                }

                table {

                    width:
                        100%;

                    border-collapse:
                        collapse;

                    font-size:
                        12px;

                }

                th,
                td {

                    border:
                        1px solid #ddd;

                    padding:
                        8px;

                    text-align:
                        left;

                }

                th {

                    background:
                        #f3f4f6;

                }

                @media print {

                    body {

                        margin:
                            20px;

                    }

                }

            </style>

        </head>


        <body>

            <h1>
                Cart Rescue AI
            </h1>

            <div class="subtitle">

                Intelligent Cart Recovery Report

                <br>

                Generated:
                ${formatDateTime(
                    report.generatedAt
                )}

            </div>


            <div class="metrics">

                <div class="metric">

                    Total Carts

                    <strong>
                        ${formatNumber(
                            report.metrics.totalCarts
                        )}
                    </strong>

                </div>


                <div class="metric">

                    Recovery Rate

                    <strong>
                        ${report.metrics.recoveryRate.toFixed(1)}%
                    </strong>

                </div>


                <div class="metric">

                    Revenue Recovered

                    <strong>
                        ${formatCurrency(
                            report.metrics.recoveredRevenue
                        )}
                    </strong>

                </div>


                <div class="metric">

                    Recovery Potential

                    <strong>
                        ${formatCurrency(
                            report.metrics.recoveryPotential
                        )}
                    </strong>

                </div>

            </div>


            <table>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Customer</th>

                        <th>Date</th>

                        <th>Cart</th>

                        <th>Risk</th>

                        <th>Reason</th>

                        <th>Channel</th>

                        <th>Status</th>

                        <th>Recovered</th>

                    </tr>

                </thead>


                <tbody>

                    ${report.data
                        .map(
                            item => `

                                <tr>

                                    <td>
                                        ${escapeHTML(item.id)}
                                    </td>

                                    <td>
                                        ${escapeHTML(item.customer)}
                                    </td>

                                    <td>
                                        ${formatDate(item.date)}
                                    </td>

                                    <td>
                                        ${formatCurrency(item.cartValue)}
                                    </td>

                                    <td>
                                        ${escapeHTML(item.risk)}
                                    </td>

                                    <td>
                                        ${escapeHTML(item.reason)}
                                    </td>

                                    <td>
                                        ${escapeHTML(item.channel)}
                                    </td>

                                    <td>
                                        ${escapeHTML(item.status)}
                                    </td>

                                    <td>
                                        ${formatCurrency(
                                            item.revenueRecovered
                                        )}
                                    </td>

                                </tr>

                            `
                        )
                        .join("")}

                </tbody>

            </table>


            <script>

                window.onload = function() {

                    window.print();

                };

            <\/script>

        </body>

        </html>

    `);


    printWindow.document.close();

}


/* =========================================================
   24. REFRESH REPORTS
========================================================= */

function refreshReports() {

    loadReportData();

    applyReportFilters();


    showReportNotification(
        "Reports Refreshed",
        "Latest available analytics have been loaded.",
        "success"
    );

}


/* =========================================================
   25. REPORT STATUS
========================================================= */

function updateReportStatus() {

    const statusElements =
        document.querySelectorAll(
            "#reportEngineStatus, [data-report-status]"
        );


    statusElements.forEach(
        element => {

            element.textContent =
                "REPORT ENGINE ONLINE";


            element.classList.add(
                "active"
            );

        }
    );


    const timestampElements =
        document.querySelectorAll(
            "#reportLastUpdated, [data-report-last-updated]"
        );


    timestampElements.forEach(
        element => {

            element.textContent =
                `Updated ${formatDateTime(
                    new Date()
                )}`;

        }
    );

}


/* =========================================================
   26. REPORT NOTIFICATION
========================================================= */

function showReportNotification(
    title,
    message,
    type = "info"
) {

    let container =
        document.getElementById(
            "reportNotifications"
        );


    if (
        !container
    ) {

        container =
            document.createElement(
                "div"
            );


        container.id =
            "reportNotifications";


        container.className =
            "report-notifications";


        document.body.appendChild(
            container
        );

    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `report-notification ${type}`;


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


        <div>

            <strong>
                ${escapeHTML(title)}
            </strong>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>


        <button
            type="button"
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


    notification
        .querySelector(
            "button"
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
        4500
    );

}


/* =========================================================
   27. REPORT HISTORY STORAGE
========================================================= */

function saveReportState() {

    try {

        const state = {

            selectedPeriod:
                CartRescueReports
                    .state
                    .selectedPeriod,

            selectedChannel:
                CartRescueReports
                    .state
                    .selectedChannel,

            selectedRisk:
                CartRescueReports
                    .state
                    .selectedRisk,

            selectedStatus:
                CartRescueReports
                    .state
                    .selectedStatus,

            generatedReports:
                CartRescueReports
                    .state
                    .generatedReports

        };


        localStorage.setItem(
            CartRescueReports
                .config
                .storageKey,
            JSON.stringify(
                state
            )
        );

    }
    catch (
        error
    ) {

        console.warn(
            "Unable to save report state.",
            error
        );

    }

}


/* =========================================================
   28. LOAD REPORT STATE
========================================================= */

function loadReportState() {

    try {

        const stored =
            localStorage.getItem(
                CartRescueReports
                    .config
                    .storageKey
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


        if (
            state.selectedPeriod
        ) {

            CartRescueReports
                .state
                .selectedPeriod =
                state.selectedPeriod;

        }


        if (
            state.selectedChannel
        ) {

            CartRescueReports
                .state
                .selectedChannel =
                state.selectedChannel;

        }


        if (
            state.selectedRisk
        ) {

            CartRescueReports
                .state
                .selectedRisk =
                state.selectedRisk;

        }


        if (
            state.selectedStatus
        ) {

            CartRescueReports
                .state
                .selectedStatus =
                state.selectedStatus;

        }


        if (
            Array.isArray(
                state.generatedReports
            )
        ) {

            CartRescueReports
                .state
                .generatedReports =
                state.generatedReports;

        }

    }
    catch (
        error
    ) {

        console.warn(
            "Unable to load report state.",
            error
        );

    }

}


/* =========================================================
   29. REPORT API
========================================================= */

function exposeReportsAPI() {

    window.CartRescueReportsAPI = {

        engine:
            CartRescueReports,

        data:
            CartRescueReports
                .data,

        metrics:
            CartRescueReports
                .metrics,

        getData:
            () =>
                CartRescueReports
                    .state
                    .filteredData,

        getMetrics:
            () =>
                CartRescueReports
                    .metrics,

        generate:
            generateReport,

        generateAI:
            generateAIReport,

        exportCSV:
            exportCSV,

        exportJSON:
            exportJSON,

        print:
            printReport,

        refresh:
            refreshReports,

        load:
            loadGeneratedReport

    };

}


/* =========================================================
   30. UTILITY FUNCTIONS
========================================================= */

function setReportValue(
    ids,
    value
) {

    ids.forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );


            if (
                element
            ) {

                element.textContent =
                    value;

            }

        }
    );

}


/* =========================================================
   31. PROGRESS BAR
========================================================= */

function updateReportProgress(
    id,
    percentage
) {

    const element =
        document.getElementById(
            id
        );


    if (
        !element
    ) {

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
   32. FORMAT NUMBER
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
   33. FORMAT CURRENCY
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
   34. FORMAT DATE
========================================================= */

function formatDate(
    value
) {

    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            value
        );

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"

        }
    ).format(
        date
    );

}


/* =========================================================
   35. FORMAT DATE TIME
========================================================= */

function formatDateTime(
    value
) {

    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return String(
            value
        );

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"

        }
    ).format(
        date
    );

}


/* =========================================================
   36. FORMAT STATUS
========================================================= */

function formatStatus(
    status
) {

    const value =
        String(
            status
        );


    return value
        .charAt(0)
        .toUpperCase() +
        value
            .slice(1);

}


/* =========================================================
   37. CSV ESCAPE
========================================================= */

function csvEscape(
    value
) {

    const string =
        String(
            value ?? ""
        );


    if (
        /[",\n]/.test(
            string
        )
    ) {

        return `"${string.replace(
            /"/g,
            '""'
        )}"`;

    }


    return string;

}


/* =========================================================
   38. DOWNLOAD FILE
========================================================= */

function downloadFile(
    content,
    filename,
    type
) {

    const blob =
        new Blob(
            [
                content
            ],
            {
                type:
                    type
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const anchor =
        document.createElement(
            "a"
        );


    anchor.href =
        url;


    anchor.download =
        filename;


    document.body.appendChild(
        anchor
    );


    anchor.click();


    anchor.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        1000
    );

}


/* =========================================================
   39. DATE STAMP
========================================================= */

function getDateStamp() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        )
            .padStart(
                2,
                "0"
            );


    const day =
        String(
            now.getDate()
        )
            .padStart(
                2,
                "0"
            );


    return `${year}-${month}-${day}`;

}


/* =========================================================
   40. HTML ESCAPE
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
   41. AI ENGINE EVENT INTEGRATION
========================================================= */

document.addEventListener(
    "cartRescueAIPrediction",
    event => {

        if (
            !event.detail
        ) {

            return;

        }


        /*
           Rebuild report data after
           the AI engine produces
           fresh predictions.
        */

        loadReportData();

        applyReportFilters();

    }
);


/* =========================================================
   42. REAL-TIME REPORT UPDATE
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
            event.detail.customer;


        const risk =
            event.detail.risk;


        const level =
            event.detail.level;


        if (
            !customer
        ) {

            return;

        }


        const existing =
            CartRescueReports
                .data
                .transactions
                .find(
                    item =>
                        item.customerId ===
                        customer.id
                );


        if (
            existing
        ) {

            existing.riskScore =
                risk;

            existing.risk =
                String(
                    level
                ).toLowerCase();

        }


        applyReportFilters();

    }
);


/* =========================================================
   43. REPORT AUTO REFRESH
========================================================= */

setInterval(
    () => {

        if (
            !CartRescueReports
                .state
                .initialized
        ) {

            return;

        }


        updateReportStatus();

    },
    30000
);


/* =========================================================
   44. KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           Ctrl + Shift + R
           Refresh report
        */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "r"
        ) {

            event.preventDefault();

            refreshReports();

        }


        /*
           Ctrl + Shift + E
           Export CSV
        */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "e"
        ) {

            event.preventDefault();

            exportCSV();

        }

    }
);


/* =========================================================
   45. WINDOW UNLOAD
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        saveReportState();

    }
);


/* =========================================================
   END OF JS/REPORTS.JS
========================================================= */
