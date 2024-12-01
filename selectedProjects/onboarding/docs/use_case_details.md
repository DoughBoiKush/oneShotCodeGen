# Use Case Details

1. Title: HR Onboarding Management System (HROMS)

2. Introduction and Purpose:
A comprehensive system designed to streamline and manage the onboarding process for new hires, tracking tasks, document submissions, and training progress efficiently.

3. App Use Cases:
UC1: Admin Login | Admins login to access administrative features
UC2: User Creation | Admins create accounts for new hires
UC3: Task Management | Create, assign, and track onboarding tasks
UC4: Document Management | Upload and track required documents
UC5: Training Progress | Monitor and update training completion status
UC6: Dashboard Overview | View overall onboarding progress and statistics

4. UI/UX Details:

Login Page | Authentication page for admin access
a. Landing page of the application
b. Only admin users can access
c. Zones:
    Header Zone:
        Components: AppBar (App Title)
    Main Content Zone:
        Components: LoginForm (MUI Form)
    Modals Zone:
        Components: ErrorModal

Dashboard Page | Main interface showing onboarding overview
a. Accessible after login
b. Admin users only
c. Zones:
    Header Zone:
        Components: AppBar (App Title, Navigation Links: Dashboard, Employees, Tasks, Documents, Profile), UserMenu
    Main Content Zone:
        Components:
            MetricsCards (Total Employees, Pending Tasks, Pending Documents, Completed Onboardings)
            OnboardingProgressTable (MUI DataGrid)
            StatusChart (Recharts PieChart)
    Modals Zone:
        Components:
            NewEmployeeModal
            TaskAssignmentModal
            ConfirmationModal

Employee Management Page | Manage employee onboarding details
a. Accessible from Dashboard navigation
b. Admin users only
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            EmployeeTable (MUI DataGrid)
            EmployeeDetailsCard
            TaskProgressList
    Modals Zone:
        Components:
            EditEmployeeModal
            DocumentUploadModal
            TaskUpdateModal

Task Management Page | Create and manage onboarding tasks
a. Accessible from Dashboard navigation
b. Admin users only
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            TaskTable (MUI DataGrid)
            TaskTemplateList
    Modals Zone:
        Components:
            CreateTaskModal
            EditTaskModal
            DeleteConfirmationModal

Document Management Page | Track and manage required documents
a. Accessible from Dashboard navigation
b. Admin users only
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            DocumentTable (MUI DataGrid)
            DocumentStatusChart (Recharts BarChart)
    Modals Zone:
        Components:
            DocumentRequirementModal
            ViewDocumentModal