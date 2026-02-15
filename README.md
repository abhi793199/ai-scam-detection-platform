AI SCAM DETECTION PLATFORM

An intelligent web-based platform that analyzes suspicious messages and
detects scam risk using a rule-based scoring engine.

  ----------
  FEATURES
  ----------

USER PANEL (index.html) - Submit suspicious message - Risk score
calculation - Risk level classification (Low / Medium / High) - Instant
verdict display - Admin Login button

ADMIN AUTHENTICATION

admin-login.html - Secure login page - Hardcoded credentials (for
demo) - Login state stored using localStorage - Redirect protection
system

admin.html (Dashboard) - Logout button - Auto-redirect if not logged
in - Dashboard statistics - Interactive chart (Chart.js) - Searchable &
sortable table - Download reports as PDF (jsPDF)

  ----------------------
  SCAM DETECTION LOGIC
  ----------------------

Risk score is calculated using: - Keyword detection - Suspicious
patterns - Money-related content - Urgency phrases

Risk Classification: 0–20 = Low 21–40 = Medium 41+ = High

  -------------------
  PROJECT STRUCTURE
  -------------------

project-root/ 
│
├── src/
│	└── app.js
│	└── server.js  
│  	├── engine/ 
│ 		└── engine.core.js 
│  	├── controllers/ 
│ 		└──report.controller.js
│  	├── services/
│ 		└── report.service.js 
│  	├── routes/
│ 		└──report.routes.js
├── index.html 
├── admin-login.html
├── admin.html 
└── README.txt


  -------------------
  TECHNOLOGIES USED
  -------------------

-   Node.js
-   Express.js
-   SQLite
-   Chart.js
-   jsPDF
-   HTML5
-   CSS3
-   JavaScript

  ----------------------
  INSTALLATION & SETUP
  ----------------------

1.  Clone Repository git clone
    https://github.com/YOUR_USERNAME/ai-scam-detection-platform.git

2.  Install Dependencies npm install

3.  Start Server node index.js

Server runs at: http://localhost:5000

  -------------------------
  ADMIN LOGIN CREDENTIALS
  -------------------------

Username: admin Password: 12345

(Note: This is basic frontend authentication for demo purposes.)

  ----------
  DATABASE
  ----------

Database File: scam_detection.db

  --------------
  GIT WORKFLOW
  --------------

  : reports Columns: - id - raw_text - amount - risk_score - created_at

git add . git commit -m “Update message” git push origin main

  --------------
  DEVELOPED BY
  --------------

Abhishek Kumar Hackathon Project – AI Scam Detection Platform
