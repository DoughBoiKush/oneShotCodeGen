# Use Case Details

1. Title: Team Expense Management Portal  

2. Introduction and Purpose:  
The **Team Expense Management Portal** is a web-based platform designed to streamline the process of managing team expenses. It enables users to submit, review, and approve/reject expenses, while offering administrative controls for user management and expense configurations. The portal aims to provide an intuitive and efficient solution for team expense tracking, ensuring transparency and accountability.  

3. App Use Cases:  
- **UC1: User Login and Sign Up** | Users can log in with existing credentials. If the app is external, users can sign up to create an account.  
- **UC2: Admin User Management** | Admins can create, edit, or deactivate user accounts.  
- **UC3: Submit an Expense** | Users can submit their expenses for approval.  
- **UC4: Expense Approval Workflow** | Admins or designated approvers can review and approve/reject submitted expenses.  
- **UC5: View Expense Dashboard** | Users can view a dashboard showing a summary of their expenses, approvals, and rejections.  
- **UC6: View and Manage Expenses** | Admins can view all submitted expenses, filter them, and manage approvals.  
- **UC7: Edit Personal Profile** | Users can edit their profile details such as name and department.  

4. UI/UX Details:  

### Login and Sign Up Page  
a. Users can either log in with existing credentials or create a new account (if external users are supported).  
b. Accessible from the app's landing page.  
c. All users can access this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar with App Title.  
   - **Main Content Zone**:  
     Components:  
       - LoginForm (username and password fields with a login button).  
       - SignupForm (optional; displays when users choose to sign up).  
   - **Modals Zone**:  
     Components:  
       - ErrorModal (e.g., for invalid login credentials).  

---

### Dashboard Page  
a. Displays an overview of expenses, approvals, and rejections.  
b. Navigates to this page after a successful login.  
c. Both regular users and admins can access this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar (Contains App Title, Navigation Links: Dashboard, My Profile, Admin Panel (if applicable), Logout, and User Avatar with Menu).  
   - **Main Content Zone**:  
     Components:  
       - MetricsCard (3 cards showing: Total Expenses Submitted, Total Approved Expenses, Total Rejected Expenses).  
       - ExpenseSummaryChart (Bar or Pie Chart showing expense breakdown by category using Recharts).  
       - RecentExpensesTable (table showing the last 5 submitted expenses, with columns: Date, Amount, Status).  
   - **Modals Zone**:  
     Components:  
       - ExpenseDetailsModal (view details of an expense when clicked).  

---

### Submit Expense Page  
a. A page for users to submit a new expense.  
b. Accessible from the dashboard via a button/link.  
c. Regular users can access this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar (Contains App Title, Navigation Links: Dashboard, Submit Expense, Logout, User Avatar with Menu).  
   - **Main Content Zone**:  
     Components:  
       - ExpenseSubmissionForm (uses @rjsf/mui form to capture fields like Expense Title, Amount, Category, Date, and Upload Receipt).  
   - **Modals Zone**:  
     Components:  
       - ConfirmationModal (shows success/failure message after submission).  

---

### Expense Approval Page  
a. A page for admins or approvers to view and approve/reject expenses.  
b. Accessible via a navigation link for admins or designated approvers.  
c. Only admins and designated approvers can access this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar (Contains App Title, Navigation Links: Dashboard, Manage Expenses, Logout, User Avatar with Menu).  
   - **Main Content Zone**:  
     Components:  
       - ExpenseDataTable (uses @mui/x-data-grid to display all submitted expenses with filters for Date, Status, and Category).  
       - ActionButtons (Approve and Reject buttons for each expense row).  
   - **Modals Zone**:  
     Components:  
       - ApprovalConfirmationModal (shows a confirmation message for approval/rejection actions).  
       - ExpenseDetailsModal (view details of an expense).  

---

### Admin User Management Page  
a. A page for admins to create, edit, or deactivate user accounts.  
b. Accessible via a navigation link for admins only.  
c. Only admins can access this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar (Contains App Title, Navigation Links: Dashboard, User Management, Logout, User Avatar with Menu).  
   - **Main Content Zone**:  
     Components:  
       - UserDataTable (uses @mui/x-data-grid to display user information with columns: Username, Role, Status).  
       - ActionButtons (Edit and Deactivate buttons for each user row).  
       - AddUserButton (opens a modal to add a new user).  
   - **Modals Zone**:  
     Components:  
       - AddUserModal (form to input new user details).  
       - EditUserModal (form to edit existing user details).  

---

### Profile Page  
a. A page for users to view and edit their profile.  
b. Accessible via the user menu in the header.  
c. All users can access this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar (Contains App Title, Navigation Links: Dashboard, Profile, Logout, User Avatar with Menu).  
   - **Main Content Zone**:  
     Components:  
       - ProfileForm (uses @rjsf/mui form to edit user details like Name, Department, and Role).  
   - **Modals Zone**:  
     Components:  
       - ConfirmationModal (shows success/failure message after saving changes).  

--- 

### Error Page  
a. A generic page for displaying errors (e.g., 404 or unauthorized access).  
b. Redirected to this page when an invalid URL or unauthorized action is accessed.  
c. All users can view this page.  
d. Zones:  
   - **Header Zone**:  
     Components: Appbar (Contains App Title).  
   - **Main Content Zone**:  
     Components:  
       - ErrorMessage (displays an error message).  
       - GoBackButton (redirects users back to the dashboard).  
   - **Modals Zone**: None.  