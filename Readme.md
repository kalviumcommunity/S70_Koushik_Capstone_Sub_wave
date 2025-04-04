# SubWave - Digital Subscription Manager

## Project Overview
SubWave is a full-stack web application designed to streamline the management of recurring subscriptions. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), it helps users track, manage, and optimize their subscriptions efficiently.

With a user-friendly dashboard, the platform offers real-time insights into active subscriptions, renewal dates, associated costs, and budgeting trends. Leveraging data analytics and smart notifications, SubWave ensures users stay informed about their financial commitments while assisting in making cost-effective decisions.

---
## Key Features
### 1. Authentication & Security
- **User Authentication:** Google Sign-In, Email, and Password authentication
- **Two-Factor Authentication (2FA):** Secure login via Google Authenticator or OTP verification
- **Secure Session Management:** Cookie-based authentication for secure logins
- **Logout & Session Termination:** Ensures data privacy and session control
- **Role-Based Access Control (RBAC):** Assign roles like Owner, Admin, and Member
- **Custom Permissions:** Granular access control for managing roles and data

### 2. Subscription Management & Organization
- **Manage Multiple Subscriptions:** Add, edit, and categorize subscriptions
- **Subscription Sharing:** Invite family/team members to shared subscriptions
- **Billing Cycle Management:** Monthly, yearly, or custom subscription cycles
- **Auto-Renewal Tracking:** Monitor automatically renewing subscriptions
- **Subscription Reminders & Alerts:** Receive renewal notifications
- **Cancellation Tracking:** Mark and manage canceled or paused subscriptions
- **Custom Tags & Categories:** Organize subscriptions based on type (Streaming, Productivity, Finance, etc.)

### 3. Expense Tracking & Budgeting
- **Spending Insights & Analytics:** Visual reports on subscription expenses
- **AI-Based Budgeting Suggestions:** Personalized recommendations for cost savings
- **Expense Breakdown by Category:** Identify where money is being spent
- **Payment Method Tracking:** Associate subscriptions with credit cards or wallets
- **Recurring Payment Logs:** Track past payments and upcoming charges

### 4. Notifications & Alerts
- **Automated Renewal Reminders:** Email and in-app notifications for upcoming renewals
- **Smart Alerts for Unused Subscriptions:** AI-based suggestions for inactive subscriptions
- **Push Notifications & Email Reports:** Weekly or monthly spending reports

### 5. Collaboration & Multi-User Support
- **Subscription Sharing with Family/Teams:** Manage subscriptions collectively
- **Role-Based Subscription Access:** Control who can view or edit shared subscriptions
- **Activity Logs & Change History:** Track modifications to subscription details

---
## Tech Stack
- **Frontend:** React.js (with Tailwind/CSS for UI)
- **Backend:** Node.js & Express.js (RESTful APIs)
- **Database:** MongoDB (to store user & subscription data)
- **Authentication:** JWT & OAuth (Google Sign-in)
- **Notifications:** Nodemailer for email alerts
- **Hosting:**
  - **Frontend:** Netlify/Vercel
  - **Backend:** Heroku/Render

---
## Development Timeline
### **Week 1: Project Planning & Backend Development**
#### Day 1-2: Project Idea & Setup
- Define project scope & objectives
- Create wireframes (Figma)
- Set up GitHub repository & task management (GitHub Projects)

#### Day 3-4: Backend Initialization & API Development
- Set up Node.js & Express.js project
- Define MongoDB schema & create models

#### Day 5-7: CRUD APIs & Authentication
- Implement GET, POST, PUT APIs for subscriptions
- Implement JWT-based authentication
- Deploy backend server (Render/Heroku)

---
### **Week 2: Frontend Development**
#### Day 8-9: UI/UX Design in Figma
- Create high-fidelity UI design

#### Day 10-11: React.js Frontend Setup
- Initialize React.js application
- Setup project structure with components, routing, and state management
- Deploy initial frontend version (Netlify/Vercel)

#### Day 12-14: Develop Core Frontend & API Integration
- Implement UI for authentication
- Develop subscription dashboard UI
- Implement API calls using Axios

---
### **Week 3: Features, Enhancements & Proof of Work**
#### Day 15-16: Enhancing Subscription Management
- Implement update and delete functionalities
- Establish user-subscription relationships in the database

#### Day 17-18: Notifications & File Uploads
- Implement email notifications (Nodemailer)
- Enable file upload for invoices/receipts

#### Day 19-20: OAuth & Third-Party Authentication
- Integrate Google OAuth for authentication

---
### **Week 4: Testing, Deployment & Final Deliverables**
#### Day 21-22: Testing & API Validation
- Perform API testing using Postman
- Conduct unit testing (Jest, Mocha)
- Fix UI/UX inconsistencies

#### Day 23-24: Final Deployment & Hosting
- Deploy fully functional frontend & backend
- Configure MongoDB Atlas for production

#### Day 25-26: Documentation & Proof Submission
- Write API documentation using Swagger/Postman

#### Day 27-28: Project Review & Final Presentation
- Perform final testing & debugging
- Prepare project presentation & demo video


