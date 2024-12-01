# Use Case Details

1. Title: LeaveFlow - Employee Leave Management System

2. Introduction and Purpose:
LeaveFlow is an internal application designed to streamline the leave request and approval process. It enables employees to submit leave requests, managers to review and approve/reject them, and HR to manage leave balances effectively.

3. App Use Cases:
UC1: Admin System Setup | Admin creates user accounts and assigns roles
UC2: User Authentication | Users log in to access the system
UC3: Leave Request Submission | Employees submit leave requests
UC4: Leave Request Management | Managers review and approve/reject leave requests
UC5: Leave Balance Management | HR manages and views leave balances
UC6: Dashboard Overview | Users view their leave status and history

4. UI/UX Details:

Login Page | Authentication page for users to access the system
a. Entry point of the application
b. All users can access this page
c. Zones:
    Header Zone:
        Components: Appbar (Contains App Logo and Title)
    Main Content Zone:
        Components: LoginForm (MUI form with username and password fields)

Dashboard Page | Main landing page after login showing relevant information based on user role
a. Accessible after successful login
b. All authenticated users can access
c. Zones:
    Header Zone:
        Components: Appbar (Contains App Logo, Navigation Links [Dashboard, Leave Requests, Profile], UserMenu)
    Main Content Zone:
        Components:
            LeaveBalanceCard (displays available leave balance)
            LeaveStatusTable (MUI Data Grid showing leave request status)
            LeaveHistoryChart (Recharts visualization of leave history)
    Modals Zone:
        Components:
            LeaveRequestModal
            SuccessModal
            ErrorModal

Admin Panel Page | Page for user management and system configuration
a. Accessible from dashboard navigation
b. Only admin users can access
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            UserManagementTable (MUI Data Grid for user listing and management)
            RoleAssignmentForm (RJSF form for role management)
    Modals Zone:
        Components:
            CreateUserModal
            EditUserModal
            DeleteConfirmationModal

Leave Management Page | Page for managing leave requests
a. Accessible from dashboard navigation
b. Managers and HR can access
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            LeaveRequestsTable (MUI Data Grid showing all leave requests)
            LeaveBalanceOverviewChart (Recharts visualization for team leave patterns)
    Modals Zone:
        Components:
            LeaveApprovalModal
            LeaveRejectionModal