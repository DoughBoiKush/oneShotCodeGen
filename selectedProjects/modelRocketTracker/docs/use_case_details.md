# Use Case Details

1. Title: RocketBuild Progress Tracker

2. Introduction and Purpose:
A web application designed to help users track their progress in building model rockets, allowing them to manage tasks, track completion status, and maintain build documentation.

3. App Use Cases:
UC1: User Authentication | Users can login with existing credentials or sign up for a new account
UC2: Project Management | Users can create and manage rocket building projects
UC3: Task Tracking | Users can create, update, and track build tasks
UC4: Progress Monitoring | Users can view overall project progress and completion status
UC5: Admin Management | Admins can manage users and view system analytics

4. UI/UX Details:

Login Page | Authentication page for users
a. Initial landing page of the application
b. All users can access this page
c. Zones:
    Header Zone:
        Components: Appbar (App Title)
    Main Content Zone:
        Components: LoginForm, SignUpForm
    Modals Zone:
        Components: ErrorModal

Dashboard Page | Main project overview page
a. Accessible after login
b. All authenticated users can access
c. Zones:
    Header Zone:
        Components: Appbar (AppTitle, NavigationLinks [Dashboard, Projects, Profile], UserMenu)
    Main Content Zone:
        Components:
            ProjectMetricsCards (Total Projects, Completed Projects, In Progress Projects)
            ActiveProjectsTable
            ProgressChart
    Modals Zone:
        Components:
            CreateProjectModal
            DeleteConfirmationModal

Project Details Page | Detailed view of a specific project
a. Accessible by clicking on a project from the dashboard
b. All authenticated users can access their own projects
c. Zones:
    Header Zone:
        Components: Appbar (Same as Dashboard)
    Main Content Zone:
        Components:
            ProjectInfoCard
            TaskList
            ProjectProgressBar
    Modals Zone:
        Components:
            AddTaskModal
            EditTaskModal
            DeleteTaskModal

Admin Panel | System management page
a. Accessible from header navigation (only visible to admins)
b. Only admin users can access
c. Zones:
    Header Zone:
        Components: Appbar (Same as Dashboard)
    Main Content Zone:
        Components:
            UserManagementTable
            SystemMetricsCards (Total Users, Active Projects, Completed Projects)
    Modals Zone:
        Components:
            EditUserModal
            DeleteUserModal

Profile Page | User profile management
a. Accessible from header navigation
b. All authenticated users can access their own profile
c. Zones:
    Header Zone:
        Components: Appbar (Same as Dashboard)
    Main Content Zone:
        Components:
            ProfileForm
            UserStatsCard
    Modals Zone:
        Components:
            ChangePasswordModal
            DeleteAccountModal