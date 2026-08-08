# 🤖 Cart Rescue AI

### AI-Powered E-Commerce Cart Abandonment Prediction & Recovery Platform

> **Hackathon Project — AI Build 2026**

Cart Rescue AI is an intelligent e-commerce recovery platform designed to identify customers who are likely to abandon their shopping carts, understand the reasons behind abandonment, and recommend the most effective recovery action using Artificial Intelligence and behavioural analytics.

The platform combines **AI prediction, customer behaviour analysis, real-time risk scoring, smart recommendations, analytics, reporting, and multi-channel recovery strategies** into one professional dashboard.

---

## 🚀 Project Vision

Every abandoned cart represents a potential lost sale.

Cart Rescue AI aims to transform:

```text
Customer Behaviour
       ↓
AI Analysis
       ↓
Abandonment Risk Prediction
       ↓
Reason Detection
       ↓
Best Action Recommendation
       ↓
Customer Intervention
       ↓
Purchase Recovery
       ↓
Revenue Saved
```

The objective is not simply to offer discounts.

The system attempts to determine **why the customer may abandon the cart** and select the most appropriate intervention.

---

# 🎯 Problem Statement

E-commerce businesses lose a significant amount of potential revenue because customers add products to their carts but leave before completing the purchase.

Traditional cart-recovery systems generally depend on simple rules such as:

```text
Cart abandoned
      ↓
Send email
      ↓
Offer discount
```

This approach can result in:

* unnecessary discounts
* poor customer experience
* low recovery rates
* delayed interventions
* limited personalization
* increased marketing costs

Cart Rescue AI introduces an intelligent approach:

```text
Cart Abandoned Risk
        ↓
Why?
        ↓
Payment?
Shipping?
Price?
Checkout?
Delivery?
Comparison?
Stock?
        ↓
AI Recommendation
        ↓
Best Recovery Action
```

---

# 💡 Solution

Cart Rescue AI continuously analyzes customer behaviour and generates a dynamic **Cart Abandonment Risk Score**.

Example:

```text
Customer: CUS-1016

Cart Value: ₹31,500
Products: 7
Previous Abandonments: 4
Checkout Started: YES
Payment Failed: YES

Risk Score: 91%
Risk Level: HIGH

Predicted Reason:
Payment Failure

Recommended Action:
Payment Retry + Alternate Payment

Recovery Probability:
91.2%

Estimated Recoverable Value:
₹28,728
```

This allows businesses to prioritize customers who require immediate intervention.

---

# ✨ Core Features

## 1. 🎯 AI Risk Prediction

Predicts the probability that a customer will abandon their cart.

Risk levels:

| Risk      |  Score | Action                  |
| --------- | -----: | ----------------------- |
| 🔴 High   | 75–100 | Immediate intervention  |
| 🟡 Medium |  45–74 | Personalized engagement |
| 🟢 Low    |   0–44 | Passive monitoring      |

---

## 2. 🧠 Abandonment Reason Detection

The system identifies possible abandonment reasons such as:

* Payment Failure
* High Shipping Cost
* Price Concern
* Checkout Complexity
* Delivery Concern
* Product Comparison
* Stock Concern
* Still Browsing
* Low Purchase Intent

---

## 3. 💡 AI Action Recommendation

Instead of automatically giving discounts, the system recommends actions based on customer behaviour.

Examples:

```text
Payment Failure
        ↓
Alternate Payment

High Shipping Cost
        ↓
Free Shipping

Checkout Complexity
        ↓
Resume Checkout

Price Concern
        ↓
Limited Discount

Delivery Concern
        ↓
Delivery Assurance

Product Comparison
        ↓
Product Recommendation

Low Stock
        ↓
Stock Alert
```

---

# 📊 Analytics

The Analytics module provides business intelligence including:

* Cart abandonment rate
* Recovery rate
* Conversion rate
* Revenue recovered
* Average order value
* Customer segments
* Device performance
* Recovery channels
* Abandonment reasons
* AI performance

---

# 🤖 AI Engine

The AI Engine provides:

* Real-time risk scoring
* Prediction confidence
* Feature importance
* Model performance
* AI recommendations
* Prediction timeline
* Live prediction monitoring
* Model health monitoring
* AI alerts

### Model Metrics

Current demo model configuration:

```text
Accuracy       : 92.4%
Precision      : 90.8%
Recall         : 89.7%
F1 Score       : 90.2%
Latency        : 42 ms
```

These values are **demo/project data**, not a claim of production-model performance.

---

# 📈 Dashboard

The Dashboard provides a real-time business overview.

Key metrics include:

```text
Total Visitors
Total Carts
Abandoned Carts
Recovered Orders
Revenue Saved
Recovery Rate
AI Accuracy
AI Decisions
```

The dashboard is designed for business owners, marketing teams, e-commerce managers, and decision makers.

---

# 📑 Reports

The Reports module provides different report categories.

### Executive Report

Provides an overall business summary.

### Cart Abandonment Report

Shows:

* abandonment volume
* abandonment reasons
* lost revenue
* recovery opportunities

### AI Performance Report

Shows:

* accuracy
* precision
* recall
* F1 score
* prediction volume
* model latency

### Customer Recovery Report

Provides customer-level recovery intelligence.

### Channel Performance Report

Compares:

* On-site
* WhatsApp
* Email
* SMS
* Push

### Revenue & ROI Report

Shows:

* recovered revenue
* recovery cost
* net recovery impact
* ROI

---

# 📱 Recovery Channels

Cart Rescue AI supports a multi-channel recovery concept.

```text
                CART RESCUE AI
                      │
       ┌──────────────┼──────────────┐
       ↓              ↓              ↓
    On-site        WhatsApp        Email
       │              │              │
       └──────────────┼──────────────┘
                      ↓
                     SMS
                      ↓
                    Push
```

The actual integrations can be connected to external communication APIs in a production deployment.

---

# 👥 Customer Segmentation

The platform supports:

### 🆕 New Customers

Customers visiting or purchasing for the first time.

### 🔄 Returning Customers

Customers with previous interactions or purchases.

### 💎 VIP Customers

High-value customers requiring more personalized recovery strategies.

Example:

```text
VIP Customer
      ↓
High Cart Value
      ↓
High Abandonment Risk
      ↓
Personalized Intervention
      ↓
Avoid unnecessary generic discount
```

---

# 📱 Device Intelligence

The analytics system can compare:

* Mobile
* Desktop
* Tablet

This helps identify device-specific conversion problems.

Example:

```text
Mobile
  ↓
High Traffic
  ↓
Lower Conversion
  ↓
Checkout Optimization Opportunity
```

---

# 🏗️ Project Architecture

```text
Cart-Rescue-AI/
│
├── index.html
├── about.html
├── dashboard.html
├── analytics.html
├── ai-engine.html
├── reports.html
├── contact.html
│
├── css/
│   ├── style.css
│   ├── animation.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── particles.js
│   ├── charts.js
│   ├── dashboard.js
│   ├── analytics.js
│   ├── ai-engine.js
│   └── reports.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── logos/
│   └── videos/
│
├── data/
│   ├── customers.json
│   ├── analytics.json
│   ├── reports.json
│   └── predictions.json
│
└── README.md
```

---

# 📂 File Responsibilities

## HTML

### `index.html`

Landing page and project introduction.

### `about.html`

Project explanation, objectives, solution and technology overview.

### `dashboard.html`

Real-time business dashboard.

### `analytics.html`

Advanced analytics and visualizations.

### `ai-engine.html`

AI prediction engine interface.

### `reports.html`

Business reports and insights.

### `contact.html`

Contact and project information.

---

# 🎨 CSS

### `css/style.css`

Main application styling.

Contains:

* typography
* layouts
* cards
* buttons
* navigation
* dashboard components
* forms
* tables
* charts containers

### `css/animation.css`

UI animation system.

Contains:

* hover effects
* transitions
* card animations
* visual effects
* loading effects

### `css/responsive.css`

Responsive layouts for:

* desktop
* laptop
* tablet
* mobile

---

# ⚙️ JavaScript

### `js/main.js`

Global application functionality.

### `js/particles.js`

Background particle effects and visual AI environment.

---

# 🛒 Production Checkout

The storefront supports real Stripe Checkout sessions through Vercel serverless functions and stores pending/paid orders in Supabase.

## Setup

1. Create a Supabase project and run `supabase-schema.sql` in the SQL editor.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` for local development.
4. Add the same variables to the Vercel project settings:
        * `STRIPE_SECRET_KEY`
        * `STRIPE_WEBHOOK_SECRET`
        * `SUPABASE_URL`
        * `SUPABASE_SERVICE_ROLE_KEY`
        * `PUBLIC_SITE_URL`
5. In Stripe, create a webhook for `/api/stripe-webhook` and subscribe to `checkout.session.completed`.
6. Deploy with `vercel --prod`.

Never expose `STRIPE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in frontend code.

### `js/charts.js`

Reusable Chart.js configuration and chart rendering.

### `js/dashboard.js`

Dashboard data loading and KPI rendering.

### `js/analytics.js`

Analytics calculations and visualization logic.

### `js/ai-engine.js`

AI prediction interface and risk analysis.

### `js/reports.js`

Reports, filtering, summaries and report rendering.

---

# 🗄️ Data Layer

The project currently uses JSON files as a frontend demo data layer.

## `customers.json`

Contains customer behaviour and customer information.

## `analytics.json`

Contains aggregated analytics information.

## `reports.json`

Contains report datasets, KPIs, financial information, recommendations and alerts.

## `predictions.json`

Contains AI prediction records, risk scores, model metrics, recommendations and simulation data.

---

# 🔄 Data Flow

```text
JSON DATA
   │
   ├── customers.json
   ├── analytics.json
   ├── predictions.json
   └── reports.json
          │
          ↓
     JavaScript
          │
    ┌─────┼─────┐
    ↓     ↓     ↓
Dashboard Analytics AI Engine
    │     │     │
    └─────┼─────┘
          ↓
       Reports
```

---

# 📊 Example AI Prediction

```json
{
  "customerId": "CUS-1001",
  "riskScore": 94,
  "riskLevel": "HIGH",
  "confidence": 96.8,
  "cartValue": 18490,
  "predictedReason": "Payment Failure",
  "recommendedAction": "Alternate Payment",
  "recoveryProbability": 86.4
}
```

The frontend can transform this data into a visual card:

```text
┌──────────────────────────────────────┐
│ 🔴 HIGH RISK                         │
│                                      │
│ Customer: CUS-1001                   │
│ Cart Value: ₹18,490                  │
│                                      │
│ Risk Score             94%           │
│ Confidence             96.8%         │
│                                      │
│ Reason                                │
│ Payment Failure                      │
│                                      │
│ AI Recommendation                    │
│ Alternate Payment                    │
│                                      │
│ Recovery Probability    86.4%        │
└──────────────────────────────────────┘
```

---

# 🧮 Risk Scoring Concept

The project can combine multiple behavioural signals:

```text
Payment Failure
        +
Cart Value
        +
Checkout Activity
        +
Previous Abandonments
        +
Time On Site
        +
Shipping Cost
        +
Product Views
        +
Customer Type
        ↓
AI Risk Score
```

Example conceptual weighting:

```text
Payment Failure        94
Cart Value             89
Checkout Started       87
Previous Abandonments  81
Time On Site            76
Shipping Cost           74
Product Views           68
Customer Type            64
```

These are demo feature-importance values from the project dataset.

---

# 🧪 Demo / Simulation Mode

The frontend includes a simulation concept for demonstrating AI behaviour without requiring a live backend.

Example:

```text
Simulation
     ↓
Generate Prediction
     ↓
Calculate Risk
     ↓
Assign Reason
     ↓
Recommend Action
     ↓
Display Result
```

The simulation can demonstrate:

* changing risk scores
* changing confidence
* changing cart values
* intervention events
* recovery events
* live prediction activity

---

# 🛠️ Technologies

## Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js

## Data

* JSON
* JavaScript Fetch API

## AI / ML Concept

* Behavioural analysis
* Risk scoring
* Classification
* Feature importance
* Prediction confidence
* Recommendation engine

## Future Backend

The project architecture can later connect to:

* Node.js
* Express.js
* Python
* FastAPI
* REST APIs
* Machine Learning models
* SQL / NoSQL databases

---

# ▶️ How to Run

Because the project uses JSON files and JavaScript modules/data loading, it is recommended to run it through a local development server instead of opening the HTML file directly.

## Option 1 — VS Code Live Server

1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

---

## Option 2 — Python Local Server

Open a terminal inside the project directory:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

---

# 🔐 Production Architecture

The current project is primarily a frontend/demo architecture.

A production version can evolve into:

```text
                         E-COMMERCE WEBSITE
                                │
                                ↓
                         Event Collection
                                │
                                ↓
                         API / Event Stream
                                │
                    ┌───────────┴───────────┐
                    ↓                       ↓
              Customer DB              Event Store
                    │                       │
                    └───────────┬───────────┘
                                ↓
                         AI Prediction API
                                │
                    ┌───────────┼───────────┐
                    ↓           ↓           ↓
                 Risk        Reason      Action
                 Score       Detection   Engine
                    │           │           │
                    └───────────┼───────────┘
                                ↓
                         Recovery System
                                │
              ┌─────────┬───────┼───────┬─────────┐
              ↓         ↓       ↓       ↓         ↓
           On-site   WhatsApp Email    SMS       Push
              │         │       │       │         │
              └─────────┴───────┼───────┴─────────┘
                                ↓
                         Purchase Recovery
                                │
                                ↓
                           Revenue Saved
```

---

# 🔮 Future Roadmap

## Phase 1 — Frontend Demo

* [x] Landing page
* [x] Dashboard
* [x] Analytics
* [x] AI Engine UI
* [x] Reports
* [x] JSON datasets
* [x] Responsive interface

## Phase 2 — Backend

* [ ] REST API
* [ ] User authentication
* [ ] Database integration
* [ ] Customer event tracking
* [ ] Real-time data ingestion

## Phase 3 — Machine Learning

* [ ] Real training dataset
* [ ] Feature engineering
* [ ] Model training
* [ ] Model validation
* [ ] Model versioning
* [ ] Model monitoring
* [ ] Automated retraining

## Phase 4 — E-Commerce Integration

* [ ] Shopify integration
* [ ] WooCommerce integration
* [ ] Custom e-commerce API
* [ ] Checkout event tracking
* [ ] Payment event integration
* [ ] Product inventory integration

## Phase 5 — Recovery Automation

* [ ] Email automation
* [ ] SMS integration
* [ ] WhatsApp integration
* [ ] Push notifications
* [ ] Personalized offers
* [ ] Automated recovery campaigns

## Phase 6 — Enterprise AI

* [ ] Multi-store support
* [ ] Multi-tenant architecture
* [ ] Advanced customer segmentation
* [ ] Real-time streaming
* [ ] A/B testing
* [ ] AI campaign optimization
* [ ] Revenue forecasting
* [ ] Model drift detection

---

# 🏆 Hackathon Value Proposition

Cart Rescue AI is designed around a simple business objective:

> **Recover more revenue without unnecessarily giving away discounts.**

Instead of treating every abandoned cart equally, the platform attempts to answer three questions:

```text
1. WHO is likely to abandon?

2. WHY are they likely to abandon?

3. WHAT is the best action to recover them?
```

This creates a more intelligent recovery workflow.

---

# 📌 Key Metrics

The demonstration dataset contains example metrics such as:

```text
AI Prediction Accuracy     92.4%
Recovered Revenue          ₹2.64 Cr
Prediction Volume          120,480
Recovery Rate              32.15%
AI Decisions               120K+
```

These figures are **demo values for the project interface and dataset** and should be replaced with measured production results when real customer data is connected.

---

# ⚠️ Important Note

Cart Rescue AI is currently structured as a **frontend/demo prototype with simulated JSON data**.

The AI performance numbers, revenue figures, customer records, predictions and recovery statistics included in the project are demonstration data.

For production deployment, the system should use:

* real customer consent
* privacy-compliant data collection
* secure APIs
* authenticated access
* encrypted customer data
* validated ML models
* production monitoring
* appropriate financial and communication controls

---

# 👨‍💻 Project

## Cart Rescue AI

**Category:** Artificial Intelligence / E-Commerce / Revenue Intelligence

**Project Type:** Hackathon Prototype

**Year:** 2026

**Primary Goal:**

```text
Predict → Understand → Recommend → Recover
```

---

# 🌟 Final Vision

Cart Rescue AI aims to become an intelligent revenue-recovery layer for modern e-commerce platforms.

The long-term vision is:

```text
Customer
   ↓
Behaviour
   ↓
AI Understands Intent
   ↓
Predicts Abandonment
   ↓
Finds Root Cause
   ↓
Chooses Best Intervention
   ↓
Customer Returns
   ↓
Purchase Completed
   ↓
Revenue Recovered
   ↓
AI Learns From Outcome
   ↺
```

### **Cart Rescue AI**

### *Don't just recover carts. Understand customers.*
