# Learning Plan: React Frontend for Board Game Review API

## 1. Project Overview
*   **Technology:** React
*   **Goal:** Build a functional frontend for a Board Game Review platform that connects to a REST API. The application will support user authentication (login) and CRUD operations (Create, Read, Update, Delete) for board game reviews.
*   **Current Skill Level:** Beginner in React (completed a Todo app tutorial). Familiar with Java, HTML/CSS, and Python from university coursework. Comfortable with Git and GitHub.
*   **Time Commitment:** 10 hours per week.

---

## 2. Weekly Learning Schedule

### **Week 2: React Fundamentals & Component Architecture**
*   **Goal:** Understand the flow of data and build the static structure of the Board Game Review site.
*   **Focus:** Components, Props, and State management.
*   **Activities:**
    *   Set up the project structure using `create-react-app` or Vite.
    *   Create reusable components: `ReviewCard`, `Header`, and `ReviewList`.
    *   Practice passing data from parent to child components using Props.
*   **Resources:**
    *   [React Official Docs: Describing the UI](https://react.dev/learn/describing-the-ui)
    *   Tutorial: "React Props and State in 15 Minutes"
*   **Milestone:** A static landing page displaying a list of board games using a hardcoded array of data.

### **Week 3: Data Fetching & Side Effects**
*   **Goal:** Fetch real data from the REST API and display it dynamically.
*   **Focus:** `useEffect` hook and the Fetch API.
*   **Activities:**
    *   Learn how to use `useEffect` to trigger API calls on page load.
    *   Handle asynchronous data using `async/await`.
    *   Implement basic error handling (e.g., "Loading..." states or "Error" messages).
*   **Resources:**
    *   [React Official Docs: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
    *   Tutorial: "Fetching Data from an API with React"
*   **Milestone:** The app successfully retrieves and displays a list of board game reviews from your backend API.

### **Week 4: Authentication & Form Management**
*   **Goal:** Implement a secure login system.
*   **Focus:** Controlled components (Forms) and JWT (JSON Web Token) handling.
*   **Activities:**
    *   Build a Login form that captures user input.
    *   Send a POST request to the authentication endpoint of your API.
    *   Store the returned JWT token in `localStorage`.
*   **Resources:**
    *   [React Official Docs: Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
    *   Tutorial: "React Login Authentication with JWT and LocalStorage"
*   **Milestone:** Users can log in, and the application stores the auth token to stay "logged in."

### **Week 5: CRUD Operations & Authenticated Requests**
*   **Goal:** Complete the full review management system.
*   **Focus:** Authenticated POST/DELETE requests and Conditional Rendering.
*   **Activities:**
    *   Implement "Add Review" and "Delete Review" buttons.
    *   Add the JWT token to the request headers (`Authorization: Bearer <token>`).
    *   Use conditional rendering to show the "Delete" button only to logged-in owners of the review.
*   **Resources:**
    *   [MDN: How to use Bearer Tokens](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
*   **Milestone:** A fully working frontend where a user can log in, post a new board game review, and delete their own reviews.

---

## 3. Progress Tracking (Checklist)
- [ ] **Week 2:** Components can pass data via Props.
- [ ] **Week 3:** `useEffect` successfully fetches data from the API.
- [ ] **Week 4:** JWT token is successfully stored after a valid login.
- [ ] **Week 5:** Authenticated POST/DELETE requests work without errors.