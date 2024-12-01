# Use Case Details

1. Title: PizzaTracker Portal

2. Introduction and Purpose:
A team portal for tracking favorite pizza places, managing reviews, and monitoring pizza consumption metrics. Team members can collaborate to maintain a curated list of pizza establishments and share their experiences.

3. App Use Cases:
UC1: User Authentication | Users can login with credentials or sign up for new accounts
UC2: Pizza Place Management | Users can add, edit, and view pizza establishments
UC3: Review Management | Users can create, edit, and view reviews for pizza places
UC4: Consumption Tracking | Users can log and track pizza slice consumption
UC5: Admin Management | Admins can manage users and system settings

4. UI/UX Details:

Dashboard Page | Main landing page displaying pizza metrics and recent activities
a. Landing page after successful login
b. All authenticated users
c. Zones:
    Header Zone:
        Components: Appbar (Contains AppTitle, NavigationLinks (Home, Places, Reviews, Profile), Avatar with UserMenu)
    Main Content Zone:
        Components:
            MetricsCards (Total Places, Total Reviews, Total Slices Consumed, Average Rating)
            RecentActivityTable (Recent reviews and consumption logs)
            TopRatedPlacesTable (Showing highest-rated pizza places)
    Modals Zone:
        Components:
            AddConsumptionModal
            SuccessModal
            ErrorModal

Pizza Places Page | Page for managing pizza establishments
a. Accessible via navigation menu
b. All authenticated users
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            PizzaPlacesDataGrid (Table showing all pizza places with filtering and sorting)
            AddPlaceButton
    Modals Zone:
        Components:
            AddEditPlaceModal
            DeleteConfirmationModal

Profile Page | User profile management page
a. Accessible via avatar menu
b. All authenticated users
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            UserProfileForm
            UserStatsCards (Personal consumption metrics)
            UserActivityTable (Personal review history)

Admin Panel | User and system management page
a. Accessible via navigation menu (admin only)
b. Admin users only
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            UserManagementDataGrid
            SystemSettingsForm
    Modals Zone:
        Components:
            AddEditUserModal
            DeleteUserModal

Login/Signup Page | Authentication page
a. Default landing page for unauthenticated users
b. All users
c. Zones:
    Header Zone:
        Components: AppTitle
    Main Content Zone:
        Components:
            LoginForm
            SignupForm
    Modals Zone:
        Components:
            PasswordResetModal
            SuccessModal
            ErrorModal