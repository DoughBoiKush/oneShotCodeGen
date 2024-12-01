# Use Case Details

1. Title: MomoTrack Portal

2. Introduction and Purpose:
A web-based inventory and sales management system for momo dumpling shops to efficiently track their inventory levels and sales transactions.

3. App Use Cases:
UC1: User Authentication | Users can login with credentials, admin can create new users
UC2: Inventory Management | Track and manage inventory items, update stock levels
UC3: Sales Recording | Record daily sales transactions and generate sales reports
UC4: Dashboard Analytics | View sales metrics and inventory status
UC5: Menu Management | Manage momo varieties and their prices

4. UI/UX Details:

Login Page | Authentication page for users
a. Landing page of the application
b. All users can access
c. Zones:
    Main Content Zone:
        Components:
            LoginForm (MUI form with username and password fields)
            ErrorAlert

Dashboard Page | Central hub showing key metrics and recent activities
a. Accessible after login
b. All authenticated users
c. Zones:
    Header Zone:
        Components:
            Appbar (Logo, Navigation Links: Dashboard, Inventory, Sales, Menu, Admin)
            UserMenu (Profile, Logout)
    Main Content Zone:
        Components:
            MetricsCards (Total Sales Today, Low Stock Items, Total Revenue, Most Sold Item)
            InventoryStatusChart (Stock levels visualization)
            RecentSalesTable (Latest transactions)

Inventory Page | Manage stock levels and inventory items
a. Accessible from navigation menu
b. All authenticated users
c. Zones:
    Header Zone:
        Components:
            Same as Dashboard
    Main Content Zone:
        Components:
            InventoryDataGrid (Table showing all inventory items)
            StockAlertsList (Items running low)
    Modal Zone:
        Components:
            AddInventoryModal
            UpdateStockModal
            DeleteConfirmationModal

Sales Page | Record and view sales transactions
a. Accessible from navigation menu
b. All authenticated users
c. Zones:
    Header Zone:
        Components:
            Same as Dashboard
    Main Content Zone:
        Components:
            SalesDataGrid (Table showing all sales)
            DailySalesChart
    Modal Zone:
        Components:
            NewSaleModal
            SaleDetailsModal

Admin Panel | User management and system settings
a. Accessible from navigation menu
b. Admin users only
c. Zones:
    Header Zone:
        Components:
            Same as Dashboard
    Main Content Zone:
        Components:
            UserManagementDataGrid
            SystemSettingsForm
    Modal Zone:
        Components:
            CreateUserModal
            EditUserModal
            DeleteUserModal

Menu Management Page | Manage momo varieties and pricing
a. Accessible from navigation menu
b. Admin users only
c. Zones:
    Header Zone:
        Components:
            Same as Dashboard
    Main Content Zone:
        Components:
            MenuItemsDataGrid
    Modal Zone:
        Components:
            AddMenuItemModal
            EditMenuItemModal
            DeleteMenuItemModal