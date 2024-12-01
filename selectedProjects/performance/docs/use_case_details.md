# Use Case Details

1. Title: PerformanceFlow - Employee Review Management System

2. Introduction and Purpose:
PerformanceFlow is a comprehensive employee performance review management system that facilitates self-reviews, peer reviews, and manager feedback in a streamlined manner.

3. App Use Cases:
UC1: User Authentication | Admin creates users, users log in with credentials
UC2: Review Cycle Management | Admin creates and manages review cycles with specific timeframes
UC3: Self Review Submission | Employees complete their self-assessment forms
UC4: Peer Review Management | Employees complete peer reviews for assigned colleagues
UC5: Manager Review Submission | Managers provide feedback and ratings for their direct reports
UC6: Review Status Tracking | Users track the status of their reviews and pending tasks
UC7: Performance Dashboard | Users view consolidated review data and statistics

4. UI/UX Details:

Login Page | Authentication page for users
a. Landing page of the application
b. All users can access
c. Zones:
    Header Zone:
        Components: AppBar (App Logo and Title)
    Main Content Zone:
        Components: LoginForm (MUI form)

Dashboard Page | Main landing page after login
a. Accessible after successful login
b. All authenticated users
c. Zones:
    Header Zone:
        Components: AppBar (Logo, Title, Navigation Links [Dashboard, Reviews, Profile], UserMenu)
    Main Content Zone:
        Components:
            StatusCards (Pending Reviews, Completed Reviews, Current Cycle)
            ReviewsDataGrid (Table showing pending and recent reviews)
    Modals Zone:
        Components: ErrorModal, SuccessModal

Reviews Page | Central page for managing all review activities
a. Accessible from main navigation
b. All authenticated users
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            ReviewTabs (Self Review, Peer Reviews, Manager Reviews - based on user role)
            ReviewForm (RJSF form)
            ReviewsDataGrid (Table showing review details)
    Modals Zone:
        Components:
            ReviewSubmissionModal
            ReviewDetailsModal
            ConfirmationModal

Admin Panel | Management of users and review cycles
a. Accessible from main navigation
b. Admin users only
c. Zones:
    Header Zone:
        Components: Same as Dashboard
    Main Content Zone:
        Components:
            AdminTabs (Users, Review Cycles)
            UsersDataGrid (Table for user management)
            ReviewCycleDataGrid (Table for review cycle management)
    Modals Zone:
        Components:
            UserCreationModal
            ReviewCycleModal
            DeleteConfirmationModal