# Use Case Details

1. Title: FriendFlix

2. Introduction and Purpose:
FriendFlix is a collaborative platform where friends can share and track movie/show recommendations along with their ratings, creating a trusted circle of entertainment suggestions.

3. App Use Cases:
UC1: User Authentication | Users can sign up, login, and manage their account
UC2: Friend Management | Users can add/remove friends and manage friend requests
UC3: Content Management | Users can add, edit, and delete movie/show recommendations
UC4: Rating System | Users can rate and review recommendations from friends
UC5: Admin Management | Admins can manage users and content moderation

4. UI/UX Details:

Login and Signup Page | Authentication page for users
a. Accessible from the app's landing page
b. All users can access this page
c. Zones:
    Header Zone:
        Components: Appbar (App Logo, App Title)
    Main Content Zone:
        Components: 
            LoginForm (MUI Form)
            SignupForm (MUI Form)
    Modals Zone:
        Components:
            ErrorModal

Home Page | Main dashboard showing recommendations and activities
a. Accessible after login
b. All authenticated users can access
c. Zones:
    Header Zone:
        Components: Appbar (Contains App Logo, NavigationLinks (Home, Friends, Profile), UserAvatar with Menu)
    Main Content Zone:
        Components:
            RecommendationsList (MUI DataGrid showing friend recommendations)
            ActivityFeed (List showing recent activities)
            RatingStats (Recharts visualization for rating distribution)
    Modals Zone:
        Components:
            AddRecommendationModal
            EditRecommendationModal
            RatingModal

Friends Page | Manage friends and their recommendations
a. Accessible from header navigation
b. All authenticated users can access
c. Zones:
    Header Zone:
        Components: Same as Home Page
    Main Content Zone:
        Components:
            FriendsList (MUI DataGrid)
            FriendRequestsList (MUI List)
    Modals Zone:
        Components:
            AddFriendModal
            ConfirmationModal

Admin Dashboard | Manage users and content
a. Accessible from header navigation (admin only)
b. Only admin users can access
c. Zones:
    Header Zone:
        Components: Same as Home Page
    Main Content Zone:
        Components:
            UserManagementGrid (MUI DataGrid)
            ContentModerationGrid (MUI DataGrid)
    Modals Zone:
        Components:
            UserEditModal
            ContentRemovalModal
            ConfirmationModal

Profile Page | User profile management
a. Accessible from header navigation
b. All authenticated users can access
c. Zones:
    Header Zone:
        Components: Same as Home Page
    Main Content Zone:
        Components:
            ProfileForm (MUI Form)
            UserStatsCard (showing recommendation and rating counts)
    Modals Zone:
        Components:
            PasswordChangeModal
            ConfirmationModal