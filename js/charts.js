/* =========================================================
   CART RESCUE AI
   CHART & DATA VISUALIZATION ENGINE
   File: js/charts.js
   Version: 1.0
========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL CONFIGURATION
========================================================= */

const CartRescueCharts = {

    instances: {},

    defaults: {

        animationDuration: 1200,

        borderWidth: 1,

        pointRadius: 3,

        pointHoverRadius: 6,

        tension: 0.4,

        fontFamily:
            "Poppins, Arial, sans-serif"

    },


    colors: {

        cyan:
            "#00e5ff",

        blue:
            "#6c63ff",

        green:
            "#00d4a8",

        purple:
            "#9b7cff",

        orange:
            "#ffab40",

        red:
            "#ff5c7a",

        yellow:
            "#ffd166",

        white:
            "#ffffff",

        muted:
            "#8f9bb3",

        grid:
            "rgba(255,255,255,0.08)"

    }

};


/* =========================================================
   02. DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            typeof Chart === "undefined"
        ) {

            console.warn(
                "Chart.js was not found. Make sure Chart.js is loaded before charts.js."
            );

            return;

        }


        configureChartJS();

        initializeCharts();

    }
);


/* =========================================================
   03. CHART.JS GLOBAL CONFIGURATION
========================================================= */

function configureChartJS() {

    Chart.defaults.font.family =
        CartRescueCharts.defaults.fontFamily;


    Chart.defaults.font.size =
        12;


    Chart.defaults.color =
        CartRescueCharts.colors.muted;


    Chart.defaults.animation.duration =
        CartRescueCharts.defaults.animationDuration;


    Chart.defaults.plugins.legend.labels.usePointStyle =
        true;


    Chart.defaults.plugins.legend.labels.boxWidth =
        8;


    Chart.defaults.plugins.legend.labels.padding =
        18;


    Chart.defaults.plugins.tooltip.backgroundColor =
        "rgba(10, 15, 30, 0.95)";


    Chart.defaults.plugins.tooltip.titleColor =
        "#ffffff";


    Chart.defaults.plugins.tooltip.bodyColor =
        "#d7deeb";


    Chart.defaults.plugins.tooltip.borderColor =
        "rgba(255,255,255,0.1)";


    Chart.defaults.plugins.tooltip.borderWidth =
        1;


    Chart.defaults.plugins.tooltip.padding =
        12;


    Chart.defaults.plugins.tooltip.cornerRadius =
        10;

}


/* =========================================================
   04. INITIALIZE ALL CHARTS
========================================================= */

function initializeCharts() {

    initializeRecoveryTrendChart();

    initializeCartStatusChart();

    initializeAbandonmentReasonsChart();

    initializeRevenueRecoveryChart();

    initializeRiskDistributionChart();

    initializeChannelPerformanceChart();

    initializeConversionChart();

    initializeCustomerActivityChart();

    initializePredictionAccuracyChart();

    initializeProductRecoveryChart();

}


/* =========================================================
   05. GET CANVAS
========================================================= */

function getCanvas(
    id
) {

    const canvas =
        document.getElementById(id);


    if (!canvas) {

        return null;

    }


    if (
        !(canvas instanceof HTMLCanvasElement)
    ) {

        return null;

    }


    return canvas;

}


/* =========================================================
   06. DESTROY EXISTING CHART
========================================================= */

function destroyChart(
    id
) {

    if (
        CartRescueCharts.instances[id]
    ) {

        CartRescueCharts.instances[id].destroy();

        delete CartRescueCharts.instances[id];

    }

}


/* =========================================================
   07. CREATE CHART
========================================================= */

function createChart(
    id,
    config
) {

    const canvas =
        getCanvas(id);


    if (!canvas) {

        return null;

    }


    destroyChart(id);


    const chart =
        new Chart(
            canvas.getContext("2d"),
            config
        );


    CartRescueCharts.instances[id] =
        chart;


    return chart;

}


/* =========================================================
   08. COMMON GRID OPTIONS
========================================================= */

function getGridOptions() {

    return {

        color:
            CartRescueCharts.colors.grid,

        drawBorder:
            false,

        tickLength:
            0

    };

}


/* =========================================================
   09. COMMON SCALES
========================================================= */

function getCommonScales(
    yBeginAtZero = true
) {

    return {

        x: {

            grid: {

                display:
                    false

            },

            border: {

                display:
                    false

            },

            ticks: {

                color:
                    CartRescueCharts.colors.muted,

                padding:
                    8

            }

        },


        y: {

            beginAtZero:
                yBeginAtZero,

            grid:
                getGridOptions(),

            border: {

                display:
                    false

            },

            ticks: {

                color:
                    CartRescueCharts.colors.muted,

                padding:
                    8

            }

        }

    };

}


/* =========================================================
   10. GRADIENT CREATOR
========================================================= */

function createGradient(
    context,
    color1,
    color2
) {

    const gradient =
        context.createLinearGradient(
            0,
            0,
            0,
            350
        );


    gradient.addColorStop(
        0,
        color1
    );


    gradient.addColorStop(
        1,
        color2
    );


    return gradient;

}


/* =========================================================
   11. RECOVERY TREND CHART
========================================================= */

function initializeRecoveryTrendChart() {

    const canvas =
        getCanvas(
            "recoveryTrendChart"
        );


    if (!canvas) {

        return;

    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    const gradient =
        createGradient(
            ctx,
            "rgba(0,229,255,0.35)",
            "rgba(0,229,255,0.01)"
        );


    createChart(
        "recoveryTrendChart",
        {

            type:
                "line",


            data: {

                labels: [

                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug"

                ],


                datasets: [

                    {

                        label:
                            "Recovered Orders",

                        data: [

                            1180,
                            1360,
                            1510,
                            1740,
                            1980,
                            2210,
                            2490,
                            2780

                        ],

                        borderColor:
                            CartRescueCharts.colors.cyan,

                        backgroundColor:
                            gradient,

                        fill:
                            true,

                        tension:
                            CartRescueCharts.defaults.tension,

                        borderWidth:
                            2,

                        pointRadius:
                            CartRescueCharts.defaults.pointRadius,

                        pointHoverRadius:
                            CartRescueCharts.defaults.pointHoverRadius,

                        pointBackgroundColor:
                            CartRescueCharts.colors.cyan,

                        pointBorderWidth:
                            0

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                interaction: {

                    mode:
                        "index",

                    intersect:
                        false

                },


                plugins: {

                    legend: {

                        display:
                            true

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context =>
                                    `Recovered Orders: ${formatChartNumber(context.parsed.y)}`

                        }

                    }

                },


                scales:
                    getCommonScales()

            }

        }
    );

}


/* =========================================================
   12. CART STATUS DOUGHNUT
========================================================= */

function initializeCartStatusChart() {

    createChart(
        "cartStatusChart",
        {

            type:
                "doughnut",


            data: {

                labels: [

                    "Recovered",
                    "Abandoned",
                    "Active",
                    "Converted Naturally"

                ],


                datasets: [

                    {

                        data: [

                            32,
                            28,
                            15,
                            25

                        ],

                        backgroundColor: [

                            CartRescueCharts.colors.cyan,

                            CartRescueCharts.colors.red,

                            CartRescueCharts.colors.orange,

                            CartRescueCharts.colors.green

                        ],

                        borderWidth:
                            0,

                        hoverOffset:
                            8

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                cutout:
                    "68%",


                plugins: {

                    legend: {

                        position:
                            "bottom",

                        labels: {

                            padding:
                                14

                        }

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context => {

                                    const value =
                                        context.parsed;

                                    return `${context.label}: ${value}%`;

                                }

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   13. ABANDONMENT REASONS
========================================================= */

function initializeAbandonmentReasonsChart() {

    createChart(
        "abandonmentReasonsChart",
        {

            type:
                "bar",


            data: {

                labels: [

                    "High Shipping Cost",
                    "Payment Failure",
                    "Price Concern",
                    "Checkout Complexity",
                    "Just Browsing",
                    "Slow Website"

                ],


                datasets: [

                    {

                        label:
                            "Abandoned Carts",

                        data: [

                            34,
                            25,
                            18,
                            11,
                            7,
                            5

                        ],

                        backgroundColor:
                            CartRescueCharts.colors.purple,

                        borderRadius:
                            7,

                        borderSkipped:
                            false

                    }

                ]

            },


            options: {

                indexAxis:
                    "y",

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            false

                    }

                },


                scales: {

                    x: {

                        beginAtZero:
                            true,

                        grid:
                            getGridOptions(),

                        border: {

                            display:
                                false

                        }

                    },


                    y: {

                        grid: {

                            display:
                                false

                        },

                        border: {

                            display:
                                false

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   14. REVENUE RECOVERY CHART
========================================================= */

function initializeRevenueRecoveryChart() {

    const canvas =
        getCanvas(
            "revenueRecoveryChart"
        );


    if (!canvas) {

        return;

    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    const gradient =
        createGradient(
            ctx,
            "rgba(0,212,168,0.32)",
            "rgba(0,212,168,0.01)"
        );


    createChart(
        "revenueRecoveryChart",
        {

            type:
                "line",


            data: {

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


                datasets: [

                    {

                        label:
                            "Revenue Saved",

                        data: [

                            2.8,
                            3.4,
                            4.1,
                            4.8,
                            5.3,
                            6.2,
                            7.1,
                            8.4

                        ],

                        borderColor:
                            CartRescueCharts.colors.green,

                        backgroundColor:
                            gradient,

                        fill:
                            true,

                        tension:
                            0.4,

                        borderWidth:
                            2,

                        pointRadius:
                            3,

                        pointBackgroundColor:
                            CartRescueCharts.colors.green

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            true

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context =>
                                    `Revenue Saved: ₹${context.parsed.y} Cr`

                        }

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display:
                                false

                        },

                        border: {

                            display:
                                false

                        }

                    },


                    y: {

                        beginAtZero:
                            true,

                        grid:
                            getGridOptions(),

                        border: {

                            display:
                                false

                        },

                        ticks: {

                            callback:
                                value =>
                                    `₹${value} Cr`

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   15. RISK DISTRIBUTION
========================================================= */

function initializeRiskDistributionChart() {

    createChart(
        "riskDistributionChart",
        {

            type:
                "bar",


            data: {

                labels: [

                    "0-20%",
                    "21-40%",
                    "41-60%",
                    "61-80%",
                    "81-100%"

                ],


                datasets: [

                    {

                        label:
                            "Customers",

                        data: [

                            4200,
                            5800,
                            7200,
                            6100,
                            4300

                        ],

                        backgroundColor: [

                            CartRescueCharts.colors.green,

                            "#35d6ae",

                            CartRescueCharts.colors.yellow,

                            CartRescueCharts.colors.orange,

                            CartRescueCharts.colors.red

                        ],

                        borderRadius:
                            7,

                        borderSkipped:
                            false

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            false

                    }

                },


                scales:
                    getCommonScales()

            }

        }
    );

}


/* =========================================================
   16. CHANNEL PERFORMANCE
========================================================= */

function initializeChannelPerformanceChart() {

    createChart(
        "channelPerformanceChart",
        {

            type:
                "bar",


            data: {

                labels: [

                    "Email",
                    "SMS",
                    "WhatsApp",
                    "Push",
                    "On-site"

                ],


                datasets: [

                    {

                        label:
                            "Recovery Rate",

                        data: [

                            18,
                            22,
                            31,
                            16,
                            27

                        ],

                        backgroundColor: [

                            CartRescueCharts.colors.blue,

                            CartRescueCharts.colors.cyan,

                            CartRescueCharts.colors.green,

                            CartRescueCharts.colors.orange,

                            CartRescueCharts.colors.purple

                        ],

                        borderRadius:
                            8,

                        borderSkipped:
                            false

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            false

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context =>
                                    `Recovery Rate: ${context.parsed.y}%`

                        }

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display:
                                false

                        },

                        border: {

                            display:
                                false

                        }

                    },


                    y: {

                        beginAtZero:
                            true,

                        max:
                            100,

                        grid:
                            getGridOptions(),

                        border: {

                            display:
                                false

                        },

                        ticks: {

                            callback:
                                value =>
                                    `${value}%`

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   17. CONVERSION CHART
========================================================= */

function initializeConversionChart() {

    const canvas =
        getCanvas(
            "conversionChart"
        );


    if (!canvas) {

        return;

    }


    const ctx =
        canvas.getContext(
            "2d"
        );


    createChart(
        "conversionChart",
        {

            type:
                "line",


            data: {

                labels: [

                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"

                ],


                datasets: [

                    {

                        label:
                            "Conversion Rate",

                        data: [

                            4.8,
                            5.2,
                            5.7,
                            6.1,
                            6.4,
                            7.2,
                            7.8

                        ],

                        borderColor:
                            CartRescueCharts.colors.blue,

                        backgroundColor:
                            "rgba(108,99,255,0.12)",

                        fill:
                            true,

                        tension:
                            0.4,

                        borderWidth:
                            2,

                        pointBackgroundColor:
                            CartRescueCharts.colors.blue,

                        pointRadius:
                            3

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            true

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context =>
                                    `Conversion Rate: ${context.parsed.y}%`

                        }

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display:
                                false

                        },

                        border: {

                            display:
                                false

                        }

                    },


                    y: {

                        beginAtZero:
                            true,

                        grid:
                            getGridOptions(),

                        border: {

                            display:
                                false

                        },

                        ticks: {

                            callback:
                                value =>
                                    `${value}%`

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   18. CUSTOMER ACTIVITY
========================================================= */

function initializeCustomerActivityChart() {

    createChart(
        "customerActivityChart",
        {

            type:
                "line",


            data: {

                labels: [

                    "00:00",
                    "04:00",
                    "08:00",
                    "12:00",
                    "16:00",
                    "20:00",
                    "23:59"

                ],


                datasets: [

                    {

                        label:
                            "Active Customers",

                        data: [

                            420,
                            310,
                            860,
                            1420,
                            1980,
                            2410,
                            1650

                        ],

                        borderColor:
                            CartRescueCharts.colors.cyan,

                        backgroundColor:
                            "rgba(0,229,255,0.08)",

                        fill:
                            true,

                        tension:
                            0.4,

                        borderWidth:
                            2,

                        pointRadius:
                            2

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                interaction: {

                    mode:
                        "index",

                    intersect:
                        false

                },


                plugins: {

                    legend: {

                        display:
                            true

                    }

                },


                scales:
                    getCommonScales()

            }

        }
    );

}


/* =========================================================
   19. AI PREDICTION ACCURACY
========================================================= */

function initializePredictionAccuracyChart() {

    createChart(
        "predictionAccuracyChart",
        {

            type:
                "line",


            data: {

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


                datasets: [

                    {

                        label:
                            "Prediction Accuracy",

                        data: [

                            84,
                            86,
                            87,
                            89,
                            90,
                            91,
                            92,
                            92

                        ],

                        borderColor:
                            CartRescueCharts.colors.green,

                        backgroundColor:
                            "rgba(0,212,168,0.08)",

                        fill:
                            true,

                        tension:
                            0.35,

                        borderWidth:
                            2,

                        pointRadius:
                            3

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            true

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context =>
                                    `Accuracy: ${context.parsed.y}%`

                        }

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display:
                                false

                        },

                        border: {

                            display:
                                false

                        }

                    },


                    y: {

                        min:
                            70,

                        max:
                            100,

                        grid:
                            getGridOptions(),

                        border: {

                            display:
                                false

                        },

                        ticks: {

                            callback:
                                value =>
                                    `${value}%`

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   20. PRODUCT RECOVERY CHART
========================================================= */

function initializeProductRecoveryChart() {

    createChart(
        "productRecoveryChart",
        {

            type:
                "bar",


            data: {

                labels: [

                    "Electronics",
                    "Fashion",
                    "Home",
                    "Beauty",
                    "Sports"

                ],


                datasets: [

                    {

                        label:
                            "Recovered Revenue",

                        data: [

                            18.4,
                            14.7,
                            10.2,
                            8.6,
                            6.9

                        ],

                        backgroundColor:
                            CartRescueCharts.colors.cyan,

                        borderRadius:
                            8,

                        borderSkipped:
                            false

                    }

                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,


                plugins: {

                    legend: {

                        display:
                            false

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                context =>
                                    `Recovered Revenue: ₹${context.parsed.y} Lakh`

                        }

                    }

                },


                scales: {

                    x: {

                        grid: {

                            display:
                                false

                        },

                        border: {

                            display:
                                false

                        }

                    },


                    y: {

                        beginAtZero:
                            true,

                        grid:
                            getGridOptions(),

                        border: {

                            display:
                                false

                        },

                        ticks: {

                            callback:
                                value =>
                                    `₹${value}L`

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   21. UPDATE CHART DATA
========================================================= */

function updateChartData(
    chartID,
    labels,
    datasets
) {

    const chart =
        CartRescueCharts.instances[
            chartID
        ];


    if (!chart) {

        console.warn(
            `Chart "${chartID}" was not found.`
        );

        return;

    }


    chart.data.labels =
        labels;


    chart.data.datasets =
        datasets;


    chart.update();

}


/* =========================================================
   22. UPDATE SINGLE DATASET
========================================================= */

function updateDataset(
    chartID,
    datasetIndex,
    data
) {

    const chart =
        CartRescueCharts.instances[
            chartID
        ];


    if (!chart) {

        return;

    }


    if (
        !chart.data.datasets[
            datasetIndex
        ]
    ) {

        return;

    }


    chart.data.datasets[
        datasetIndex
    ].data =
        data;


    chart.update();

}


/* =========================================================
   23. ADD DATA POINT
========================================================= */

function addDataPoint(
    chartID,
    label,
    values
) {

    const chart =
        CartRescueCharts.instances[
            chartID
        ];


    if (!chart) {

        return;

    }


    chart.data.labels.push(
        label
    );


    chart.data.datasets.forEach(
        (
            dataset,
            index
        ) => {

            if (
                values[index] !== undefined
            ) {

                dataset.data.push(
                    values[index]
                );

            }

        }
    );


    chart.update();

}


/* =========================================================
   24. REMOVE DATA POINT
========================================================= */

function removeLastDataPoint(
    chartID
) {

    const chart =
        CartRescueCharts.instances[
            chartID
        ];


    if (!chart) {

        return;

    }


    chart.data.labels.pop();


    chart.data.datasets.forEach(
        dataset => {

            dataset.data.pop();

        }
    );


    chart.update();

}


/* =========================================================
   25. REFRESH CHART
========================================================= */

function refreshChart(
    chartID
) {

    const chart =
        CartRescueCharts.instances[
            chartID
        ];


    if (!chart) {

        return;

    }


    chart.update(
        "active"
    );

}


/* =========================================================
   26. RESIZE ALL CHARTS
========================================================= */

function resizeAllCharts() {

    Object.values(
        CartRescueCharts.instances
    ).forEach(
        chart => {

            if (chart) {

                chart.resize();

            }

        }
    );

}


/* =========================================================
   27. DESTROY ALL CHARTS
========================================================= */

function destroyAllCharts() {

    Object.keys(
        CartRescueCharts.instances
    ).forEach(
        chartID => {

            destroyChart(
                chartID
            );

        }
    );

}


/* =========================================================
   28. EXPORT CHART AS PNG
========================================================= */

function exportChartAsImage(
    chartID,
    fileName = "cart-rescue-chart.png"
) {

    const chart =
        CartRescueCharts.instances[
            chartID
        ];


    if (!chart) {

        console.warn(
            `Chart "${chartID}" was not found.`
        );

        return;

    }


    const link =
        document.createElement(
            "a"
        );


    link.download =
        fileName;


    link.href =
        chart.toBase64Image(
            "image/png",
            1
        );


    link.click();

}


/* =========================================================
   29. CHART NUMBER FORMATTER
========================================================= */

function formatChartNumber(
    value
) {

    if (
        typeof value !== "number"
    ) {

        return value;

    }


    return new Intl.NumberFormat(
        "en-IN"
    ).format(
        value
    );

}


/* =========================================================
   30. CHART CURRENCY FORMATTER
========================================================= */

function formatChartCurrency(
    value
) {

    if (
        typeof value !== "number"
    ) {

        return value;

    }


    return new Intl.NumberFormat(
        "en-IN",
        {

            style:
                "currency",

            currency:
                "INR",

            maximumFractionDigits:
                0

        }
    ).format(
        value
    );

}


/* =========================================================
   31. CHART PERCENTAGE FORMATTER
========================================================= */

function formatChartPercentage(
    value
) {

    return `${Number(value).toFixed(1)}%`;

}


/* =========================================================
   32. REAL-TIME CHART EVENT
========================================================= */

document.addEventListener(
    "cartRescueResize",
    () => {

        resizeAllCharts();

    }
);


/* =========================================================
   33. WINDOW RESIZE
========================================================= */

let chartResizeTimer;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            chartResizeTimer
        );


        chartResizeTimer =
            setTimeout(
                () => {

                    resizeAllCharts();

                },
                150
            );

    },
    {
        passive: true
    }
);


/* =========================================================
   34. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            return;

        }


        resizeAllCharts();

    }
);


/* =========================================================
   35. PUBLIC API
========================================================= */

window.CartRescueChartsAPI = {

    instances:
        CartRescueCharts.instances,

    create:
        createChart,

    destroy:
        destroyChart,

    destroyAll:
        destroyAllCharts,

    update:
        updateChartData,

    updateDataset:
        updateDataset,

    addDataPoint:
        addDataPoint,

    removeLastDataPoint:
        removeLastDataPoint,

    refresh:
        refreshChart,

    resizeAll:
        resizeAllCharts,

    exportImage:
        exportChartAsImage,

    formatNumber:
        formatChartNumber,

    formatCurrency:
        formatChartCurrency,

    formatPercentage:
        formatChartPercentage

};


/* =========================================================
   36. DEBUG INFORMATION
========================================================= */

console.log(
    "%cCart Rescue AI Charts",
    "font-size: 16px; font-weight: 700;"
);

console.log(
    "%cChart visualization engine ready.",
    "font-size: 12px;"
);


/* =========================================================
   END OF CHARTS.JS
========================================================= */