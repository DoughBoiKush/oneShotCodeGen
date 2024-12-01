from typing import List, Dict
from ..steps.requirement_generation_step import RequirementGenerationStep
from ..steps.code_generation_step import CodeGenerationStep
from ..prompts.requirements_prompts import (
    FUNCTIONAL_REQUIREMENTS_PROMPTS,
    TECHNICAL_REQUIREMENTS_PROMPTS
)
from ..prompts.code_generation_prompts import CODE_GENERATION_CONFIGS

useCasePrompt = """
You are a product manager tasked with creating functional requirements which will be used by an engineering manager to create technical requirements and start development. You have vast experience in writing high quality and succinct requirements, you always cover all the flows, don’t leave room for assumptions and make sure that everything is covered.

You have to write the requirements based on following user input: {user_input}

Points to keep in mind before you start writing the document:-
1. While writing usecase, ensure use cases also covers admin, login,user creation and sign up flows(Sign up flows when its not an internal app).
    a.Cover All Possible Scenarios
    -Think through edge cases and how the system should handle them.
    -Ensure there are no gaps in the requirements.
    - If there are approval flows mention what kind of users can approve and reject the expense.
    b. Maintain Consistency
    -Use consistent terminology throughout the documentation.
    -This helps avoid confusion and misinterpretation.
    c.Keep It Organized
    -Structure the document with clear headings and subheadings.
    -Use numbered lists or bullet points for steps and criteria.
    e. Do not add flows which require third party integration and do not add any AI flows. Or any flows that require smtp or any other email services.
    f. Do not mention anyflow that are going to be a maybe
    g. If needed create an user type admin if needed for example to create users or change some settings
2. We will use react framework to code the frontend, so do not create unecessary pages, be as modular as you can be. If one page can support multiple views please do that.
3. Use modals instead of creating new pages if needed. Add modals to the page which is already created under header modals
4. Share all the pages needed to support the mentioned use cases
5. We are also using following ui library MUI for UI, MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, @mui/x-data-grid for tables, and Recharts for visualizations. So no need to creat custom components for UI, just use the ones provided by all these.

The output that you will give should follow the following format only mentioned details as per the format below no extra details are to be added:-

1. Title:- (name of the app) 
2. Introduction and Purpose: (A short brief on what the app is and its name)
3. App Use Cases: (mention all the use cases the app will have)
    UC1:Name of the use case | Short description of the use case
    (Example: UC1:User Login and Sign up | Users can login with a link to sign up after log in user navigates to the portal)
4. UI/UX Details:
    a. Name of the page | short description of the page 
    b. Explain how the user navigates to this page
    c. what kind of users can access.
    d. Zones: Divide the page into sections (Header Zone, Main Content Zone, Modals Zone).
    e. Components in Each Zone: List the components used in each section.
    (Example: 
    Login and Signup Page | Users can either log in with existing credentials or create a new account (if external users are supported). 
    a. Accessible from the app's landing page
    b. Both admins and regular users can access this page(All users can access this page)
    c. Zones:
            Header Zone:
                Components: Appbar(Contains Apptitle, NavigationLinks (Links: Teams, Sales, Profile, Admin Panel) and avatar with UserMenu)
            Main Content Zone:
                Components:
                    MetricsCard (4 cards showing following metrics: Total Sales Value, Total Sales Requests, Total Open Sales Requests , Total Closed Sales Requests).
                    RecentActivityList(table showing recent sales of the user).
            Modals Zone:
                Components:
                    SalesSubmissionModal.
                    SuccessModal
                    ErrorModal
"""
backendPrompt = """
You are an expert backend developer. Tasked with setup of backend and generating the database models for sqlite,other database setup and connection related files,routes,controllers,config,server,seeder and env file for the application.
Based on the provided technical and functional specifications, generate the code and output it in JSON format as specified.

Use Case and UI/UX Details Details: {use_case_details}

**Technology Stack:**
  - **Database:** sqlite3
  - **ORM:** Sequelize (Node.js)
  - **Backend Framework:** Express (Node.js)
  - **Authentication:** JSON Web Tokens (JWT)
  - **Frontend Framework:** React.js (v17.0.2)
  - **UI Library:** Material-UI (v5.0.0).Use MUI for UI, MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, @mui/x-data-grid for tables, and Recharts for visualizations.
  - **State Management:** React Hooks
  - **HTTP Client:** Axios
  - **Data Fetching and Caching:** React Query, SWR
  - **Routing:** React Router Dom (v6.26.2)

Points to keep in mind:-
1. Please go through all the use cases and UI/UX Details, and create the models,routes,controllers,config, other database setup and connection related files and .env file and run the database setup commands. Ensure the schema created is correct and compatible with sqlite.
2. Create files under backend/models folder, make sure to create the index.js file and export the sequelize and models. IN controllers while making queries to fetch associated models, in query include the alias when fetching associated models.
3. Please add the jwt secret in .env file
4. Make sure to create the relations between the models, for example if a document is related to an employee, the document model should have a foreign key to the employee model and the employee model should have a relationship to the document model. Do not add the key to the models, as sequelize will automatically add it when the models are synced.
5. Generate API endpoints and all the logic in server code in a cohesive manner
6. Use modern JavaScript (ES6+) syntax
7. Please create code that is not large and verbose in size, use component imports instead of writing the code in the file itself
8. Ensure all necessary imports are included, functions/components are exported, and code follows the latest ES6+ standards.
9. Implement RESTful API endpoints, ensure all the backend code is modular and avoid code duplication
9. Include necessary imports and exports
10. Use async/await for asynchronous operations
11. Implement proper error handling and validation
12. If there are such use cases where a user can access data of other user, ensure that get apis have version where other use can fetch the data based on the usecase and is not restricted by their user id 
13. Do not include comments explaining each part of the code
14. Do not include any code outside the code that goes into the file content
15. Add setup to create mock data in all the tables and also create a mock user which has all the access with email user@example.com and password "test123", the tables will created and seeded with mock data each time the server starts, it will check if tables are present if not create and seed them. 
15. Setup backend to run on port 3000 and main server file runs in server.js and cors is enabled
16. If there are such use cases where a user can access data of other user, ensure that get apis have version where other use can fetch the data based on the usecase and is not restricted by their user id 
17. Also share following commands to run the database setup:
    - make sure you share the "mkdir backend" command for backend folder
    - Make sure there are no commands that run on a file as we first run the commands for installation and then create the files, so if you give commands that run on a file like node server.js it will fail as the file does not exist yet
    - All the subsequent commands to install the packages should be shared in the commands key with prefix cd backend
    - Do not share startup commands like npm start, npm run dev, etc
    - Do not add cd backend command to mkdir backend command
    - Share project intialisation commands like "cd backend && npm init -y", etc after the mkdir command and add the prefix cd backend this is needed as commands will be run in the parent directory
    - Do not share any other mkdir commands to create sub folders, they are not needed as they get automatically created when files are created
    - share commands to install the dependencies related to entire backend by adding the prefix cd backend
    - Do not share any other commands that are not related to entire backend

Your response should be strictly only code , do not prettify the code DO NOT add any new line or add any extra space or indentation, in following JSON format:
{{
    "files": {{
        "path/to/file": "file content"  
    }},
    "commands": ["list of commands to run"] 
}}
"""


dataEntityPrompt = """
You are an expert technical writer specializing in UI/UX and data entity/relation documentation in JSON form. Based on the given input requirements, write a detailed UI/UX description for a screen or feature and data entities and their relation.
Ensure clarity, conciseness, and completeness in your output. Include examples where needed and avoid ambiguity. Do not cover anything that is not mentioned in the Use Cases and ensure that whatever is mentioned in the use cases is thoroughly covered.

Input Requirements: {use_case_details}

Points to keep in mind:-
1. Please go through all the use cases and mention ALL the data entities needed for them, please do not leave anything out that is needed to implement the use cases. But do not add anything that is not covered in use cases
2. Example of an entity:
 **Entity 1: User**  
 - **Attributes:**  
  - `id` (Primary Key, Integer, Auto Increment)  
  - `email` (String, Unique, Required)  
  - `password` (String, Required, Encrypted)  
  - `name` (String, Required)  
  - `role` (Enum: Employee, Manager, Finance, Required)  
 - **Relationships:**  
  - One-to-Many with `Expense` (employee_id)  

The output that you will give should follow the following format only mentioned details as per the format below no extra details are to be added:-
1. Data Entities and their relations(this should be in form)
    a. Data Entity Name(what it does in bracket):
        i.Attributes name (Key Type, Data Type, Description,Constraints)
        ii.Relationships:
"""

# Technical Requirements Prompts
frontendPromptI = """
You are an expert frontend developer. Tasked with generating all the frontend code for the application, using React.js and Material-UI.
Based on the provided use case, UI/UX Details, backend code and use that to generate the code only for services, context, custom hooks, login,signup components and header components and output it in JSON format as specified for:
1. Services
2. Context
3. Custom Hooks
4. Login and Signup Components
5. Header Component Appbar(Contains Apptitle, NavigationLinks (Links: Teams, Sales, Profile, Admin Panel) and avatar with UserMenu)

Use Case and UI/UX Details Details:
{use_case_details}

Code for backend:
{backend_code}

**Technology Stack:**
  - **Database:** sqlite3
  - **ORM:** Sequelize (Node.js)
  - **Backend Framework:** Express (Node.js)
  - **Authentication:** JSON Web Tokens (JWT)
  - **Frontend Framework:** React.js (v17.0.2)
  - **UI Library:** Material-UI (v5.0.0).Use MUI for UI, MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, @mui/x-data-grid for tables, and Recharts for visualizations.
  - **State Management:** React Hooks
  - **HTTP Client:** Axios
  - **Data Fetching and Caching:** React Query, SWR
  - **Routing:** React Router Dom (v6.26.2)

 **Frontend Code Generation Guidelines:**
- Use functional components, ensure the code is correct and working. As we are using JWT for authentication, ensure that the token is saved in local storage and used for all the requests.
- Please create code that is not large and verbose in size, use component imports instead of writing the code in the file itself. Follow the folder structure of react app
- Implement form handling, validations, and API interactions, ensure the code is modular and avoid code duplication. As we are using JWT for authentication, ensure that the token is saved in local storage and used for all the requests.
- Ensure authprovider and queryclient is added in the index file so that the app can use them and not error out
- Please use MUI menu and sub elements for navigation menu and user menu, please ensure appbar takes props and will support vairous menu links to be shown on different pages based on user role
- Ensure form fields match database schema
- Ensure API calls match backend endpoints, make sure the api calls have the right headers,req body and token, do not miss any necessary imports for all the files. Make sure the services are returning the data correctly and not the axios response object.
- Show loading state when the data is being fetched from the backend. Use MUI's Skeleton and stack component for loading state, make sure to create a new parentcomponent for it and use on wherever needed
- Make sure UI elements have needed padding, margine, border, shadow, etc to make it look good and aligned. Use MUI AppBar component for header section to show app logo and title, menu component to show navigation links and avatar component to show user menu
- Do not add comments
- Make sure to save the user object with the correct key, cross verify with backend code
- Do not use MUI for tables, use @mui/x-data-grid instead, Use prebuild components from MUI, use MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, Recharts for visualizations.
- For forms use MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui). Do not create forms with child elements, use following commands to install the dependencies:  npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @rjsf/mui. Also make sure to use validator while creating the form and import the form components from @rjsf/mui
- Ensure all necessary imports are included, functions/components are exported, and code follows the latest ES6+ standards.
- Make sure the assignments are done correctly, for example if we have a user object and we need to assign the user object to a variable, do not assign the user object to itself
- Ensure all the events click are linked to backend action, do not leave any action unmapped. 
- Please ensure all the UX is correct, users should be navigated after action is performed and if no navigation they should see a message notifying the status of the action. 
- Also the routes should be proptected if something should be shown to logged in user and they acess to they should go back to login page.
- Ensure that the routes are protected, if something should be shown to logged in user and they acess to they should go back to login page. Or other pages which are protected by user role, they should go to access denied page.
- Add proper error handling for the routes, if user tries to access a route which is not defined they should see a 404 page and if there is an error in the page they should see a 500 page
- Follow the ESLint Airbnb style guide
- For @mui/x-data-grid the valueGetter get cell data as params and not as params.row.columnName. Instead of "valueGetter: (params) => new Date(params.row.date).toLocaleDateString()" use "valueGetter: (params) => new Date(params).toLocaleDateString()"
- Do not include any code outside the code that goes into the file content
- Do not generate code for other files other than services, context and custom hooks
- Run frontend on port 3001 and and ensure frontend is calling the backend API correctly to port 3000
- Ensure that if any other librarry is imported in frontend we share the commands to install the dependencies, specially for MUI if we are using the icons library
- As we will use npx to setup a base react app, do share if any changes are needed in app.js, app.css or index.js or index.css
- make sure for frontend call the npx command to intiatlise and create the folder, do not add cd frontend prefix to it please
 - All the subsequent commands to install the packages should be shared in the commands key with prefix cd frontend
 - Do not share startup commands like npm start, npm run dev, etc
 - Share other dependecy installation commands and add the prefix "cd frontend" this is needed as commands will be run in the parent directory. For MUI also add these libarires @emotion/react @emotion/styled @mui/icons-material, also if you are using any other library please please share the commands to install the dependencies
 - For recharts use following commands to install the dependencies: npm install recharts
 - Do not share any other mkdir commands to create sub folders, they are not needed as they get automatically created when files are created
 - share commands to install the dependencies and all the UI libraries mentioned above related to frontend


 Your response should be strictly only code , do not prettify the code DO NOT add any new line or add any extra space or indentation, in following JSON format:
{{
    "files": {{
        "path/to/file": "file content"  
    }},
    "commands": ["list of commands to run"] 
}}
"""
frontendPromptII = """
You are an expert frontend developer. Tasked with generating all the frontend code for the application, using React.js and Material-UI.
Based on the provided use case,UI/UX Details, data entity, and specially the UI details, tech stack, backend code and frontend code for Appbar, context, custome hooks and services generate the frontend code only for:
1. Components (please generate all the components other than Appbar,login,signup components)

We will generate the code for all the pages and main app file later by using the code you will generate now. 

**Use Case and UI/UX Details and UI details:**
{use_case_details}

Code for backend:
{backend_code}

**Technology Stack:**
  - **Database:** sqlite3
  - **ORM:** Sequelize (Node.js)
  - **Backend Framework:** Express (Node.js)
  - **Authentication:** JSON Web Tokens (JWT)
  - **Frontend Framework:** React.js (v17.0.2)
  - **UI Library:** Material-UI (v5.0.0).Use MUI for UI, MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, @mui/x-data-grid for tables, and Recharts for visualizations.
  - **State Management:** React Hooks
  - **HTTP Client:** Axios
  - **Data Fetching and Caching:** React Query, SWR
  - **Routing:** React Router Dom (v6.26.2)

Code for frontend services, context, custom hooks, appbar and login,signup components:
{frontend_code1}

**Code Generation Guidelines:**

- Use functional components, ensure the code is correct and working. Make sure to save the auth token in local storage or ensure that user is logged in.
- Please create code that is not large and verbose in size, use component imports instead of writing the code in the file itself. Follow the folder structure of react app
- Implement form handling, validations, and API interactions, ensure the code is modular and avoid code duplication
- Ensure authprovider and queryclient is added in the index file so that the app can use them and not error out
- Please use MUI menu and sub elements for navigation menu and user menu
- Ensure form fields match database schema
- Ensure API calls match backend endpoints, do not miss any necessary imports for all the files. Make sure the services are returning the data correctly and not the axios response object.
- Show loading state when the data is being fetched from the backend. Use MUI's Skeleton and stack component for loading state, make sure to create a new parentcomponent for it and use on wherever needed
- Make sure UI elements have needed padding, margine, border, shadow, etc to make it look good and aligned
- Do not add comments
- For mui table x-data-grid the valueGetter get cell data as params and not as params.row.columnName. Instead of "valueGetter: (params) => new Date(params.row.date).toLocaleDateString()" use "valueGetter: (params) => new Date(params).toLocaleDateString()"
- Do not use MUI for tables, use @mui/x-data-grid instead, Use prebuild components from MUI, use MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, Recharts for visualizations.
- For forms use MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui). Do not create forms with child elements, use following commands to install the dependencies:  npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @rjsf/mui. Also make sure to use validator while creating the form and import the form components from @rjsf/mui
- Ensure without fail that all UI elements and component are generated in the code ouput, there should be no compromise on this.
- Ensure all necessary imports are included, functions/components are exported, and code follows the latest ES6+ standards.
- Make sure the assignments are done correctly, for example if we have a user object and we need to assign the user object to a variable, do not assign the user object to itself
- Ensure all the events click are linked to backend action, do not leave any action unmapped. 
- Please ensure all the UX is correct, users should be navigated after action is performed and if no navigation they should see a message notifying the status of the action. 
- Also the routes should be proptected if something should be shown to logged in user and they acess to they should go back to login page.
- Ensure that the login and signup pages are generated correctly and are working and user is redirected to dashboard/home page after login
- Ensure routes are setup correctly when user lands on route "/" if they not logged in they should go to login page and if logged in they should go to dashboard/home page,also navigation from menu and user menu and from the components should work. When using nested routes in React Router v6, you need to use Outlet for nested route rendering.
- Ensure that the routes are protected, if something should be shown to logged in user and they acess to they should go back to login page. Or other pages which are protected by user role, they should go to access denied page.
- Add proper error handling for the routes, if user tries to access a route which is not defined they should see a 404 page and if there is an error in the page they should see a 500 page
- You need to ensure that the AuthProvider component is wrapped inside a <BrowserRouter>, or else navigation will not work
- Follow the ESLint Airbnb style guide
- For @mui/x-data-grid the valueGetter get cell data as params and not as params.row.columnName. Instead of "valueGetter: (params) => new Date(params.row.date).toLocaleDateString()" use "valueGetter: (params) => new Date(params).toLocaleDateString()"
- Do not include any code outside the code that goes into the file content
- Run frontend on port 3001 and and ensure frontend is calling the backend API correctly to port 3000
- Ensure that if any other librarry is imported in frontend we share the commands to install the dependencies, specially for MUI if we are using the icons library
- As we will use npx to setup a base react app, do share if any changes are needed in app.js, app.css or index.js or index.css
- Frontend code is already generated for context, custome hooks, components and services, so do not generate them again and folder structure is also already created, so do not create them again
 - All the subsequent commands to install the packages should be shared in the commands key with prefix cd frontend
 - Do not share startup commands like npm start, npm run dev, etc
 - Share other dependecy installation commands and add the prefix "cd frontend" this is needed as commands will be run in the parent directory
 - Do not share any other mkdir commands to create sub folders, they are not needed as they get automatically created when files are created
  - For recharts use following commands to install the dependencies: npm install recharts
 - share commands to install the dependencies related to frontend
 - Do not share any other commands that are not related to frontend
 
 Your response should be strictly only code , do not prettify the code DO NOT add any new line(\n) or add any extra space or indentation for js files, in following JSON format:
{{
    "files": {{
        "path/to/file": "file content"  
    }},
    "commands": ["list of commands to run"] 
}}
"""
frontendPromptIII = """
You are an expert frontend developer. Tasked with generating all the frontend code for the application, using React.js and Material-UI.
Based on the provided use case,UI/UX Details, data models, and specially the UI details, tech stack, backend code, frontend code for context, custome hooks, services and all the components generate the remaining frontend code for:
1. Any missing frontend code
2. Pages (please generate all the pages needed for the use cases and UI/UX Details)
3. Main App, Index and Routes file
3. MUI Theme, to ensure the theme is consistent across the app, ensure the UI looks good

**Use Case and UI/UX Details and UI details:**
{use_case_details}

Code for backend:
{backend_code}

**Technology Stack:**
  - **Database:** sqlite3
  - **ORM:** Sequelize (Node.js)
  - **Backend Framework:** Express (Node.js)
  - **Authentication:** JSON Web Tokens (JWT)
  - **Frontend Framework:** React.js (v17.0.2)
  - **UI Library:** Material-UI (v5.0.0).Use MUI for UI, MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, @mui/x-data-grid for tables, and Recharts for visualizations.
  - **State Management:** React Hooks
  - **HTTP Client:** Axios
  - **Data Fetching and Caching:** React Query, SWR
  - **Routing:** React Router Dom (v6.26.2)


Code for frontend services, context, custom hooks, appbar and login,signup components:
{frontend_code1}

Frontend Code for all the components:
{frontend_code2}

**Code Generation Guidelines:**

- Ensure pages have all the necessary components including the appbar sections. The code should be correct, working and nothing should be missed. Make sure to save the auth token in local storage or ensure that user is logged in.
- Please create code that is not large and verbose in size, use component imports instead of writing the code in the file itself. Follow the folder structure of react app
- Always ensure that components using React Router hooks (useNavigate, useParams, useLocation, etc.) are wrapped by a <Router>. Ensure all the pages have the appbar component as per the UI/UX Detailss.
- Place the <Router> component as high as possible in your component tree (e.g., in index.js or App.js).
- Please ensure that when user comes on "/" route if they are not logged in they should go to login page and if logged in they should go to dashboard/home page
- Implement form handling, validations, and API interactions, ensure the code is modular and avoid code duplication
- Ensure router, authprovider and queryclient is added in the index file so that the app can use them and not error out. Also please ensure router is wrapping the authprovider.
- Ensure routes are setup correctly when user lands on route "/" if they not logged in they should go to login page and if logged in they should go to dashboard/home page,also navigation from menu and user menu and from the components should work. When using nested routes in React Router v6, you need to use Outlet for nested route rendering.
- Ensure that the routes are protected, if something should be shown to logged in user and they acess to they should go back to login page. Or other pages which are protected by user role, they should go to access denied page.
- Add proper error handling for the routes, if user tries to access a route which is not defined they should see a 404 page and if there is an error in the page they should see a 500 page
- Please use MUI menu and sub elements for navigation menu and user menu, also ensure the applogo, menu navigation links, user menu is used correctly in pages based on the use case and UI/UX Details
- Ensure form fields match database schema
- Ensure all events on the UI are linked to the correct backend action(hooks and services), do not leave any action unmapped
- Ensure API calls match backend endpoints, do not miss any necessary imports for all the files
- Show loading state when the data is being fetched from the backend. Use MUI Skeleton and stack component for loading state
- Make sure to use the correct MUI components for the UI elements, do not use the same component for different purposes
- Do not add comments
- Do not use MUI for tables, use @mui/x-data-grid instead, also use prebuild components from MUI, use MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, Recharts for visualizations.
- For forms use MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui). Do not create forms with child elements, use following commands to install the dependencies:  npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @rjsf/mui. Also make sure to use validator while creating the form and import the form components from @rjsf/mui
- Ensure without fail that all UI elements and component and pages are generated in the code ouput, there should be no compromise on this.
- Ensure all necessary imports are included, functions/components are exported, and code follows the latest ES6+ standards.
- Make sure the assignments are done correctly, for example if we have a user object and we need to assign the user object to a variable, do not assign the user object to itself
- Ensure all the events click are linked to backend action, do not leave any action unmapped. 
- Please ensure all the UX is correct, users should be navigated after action is performed and if no navigation they should see a message notifying the status of the action.
- Also the routes should be proptected if something should be shown to logged in user and they acess to they should go back to login page.
- Ensure that the login and signup pages are generated correctly and are working and user is redirected to dashboard/home page after login
- Follow the ESLint Airbnb style guide
- For @mui/x-data-grid the valueGetter get cell data as params and not as params.row.columnName. Instead of "valueGetter: (params) => new Date(params.row.date).toLocaleDateString()" use "valueGetter: (params) => new Date(params).toLocaleDateString()"
- Do not include any code outside the code that goes into the file content
- Run frontend on port 3001 and ensure frontend is calling the backend API correctly to port 3000
- Ensure that if any other librarry is imported in frontend we share the commands to install the dependencies, specially for MUI if we are using the icons library
- As we will use npx to setup a base react app, do share if any changes are needed in app.js, app.css or index.js or index.css
- Frontend code is already generated for context, custome hooks, components and services, so do not generate them again and folder structure is also already created, so do not create them again
 - All the subsequent commands to install the packages should be shared in the commands key with prefix cd frontend
 - Do not share startup commands like npm start, npm run dev, etc
 - Share other dependecy installation commands and add the prefix "cd frontend" this is needed as commands will be run in the parent directory
 - Do not share any other mkdir commands to create sub folders, they are not needed as they get automatically created when files are created
 - For recharts use following commands to install the dependencies: npm install recharts
 - share commands to install the dependencies related to frontend
 - Do not share any other commands that are not related to frontend
 Your response should be strictly only code , do not prettify the code, DO NOT add any new line(\n) or add any extra space or indentation for js files, in following JSON format:
{{
    "files": {{
        "path/to/file": "file content"  
    }},
    "commands": ["list of commands to run"] 
}}
"""

componentPseudoPrompt = """
You are an expert frontend developer. Tasked with generating the psuedo code for the components needed for the use cases and pages.
Based on the provided use case, data entity, and specially the UI details, tech stack generate the psuedo code for the components needed for the use cases and pages.

**Use Case Requirements:**
{use_case_details}

**Data Entity and UI Requirements:**
{data_entity_details}

Share component psuedo code for each component with the following columns in CSV where separator is "|":
1. name: Component name.
2. props: JSON array of props passed to the component (e.g., ["onSubmit", "data"]).
3. state: JSON array of state and its default value variables managed by the component (e.g., [["isVisible", false]]).
4. hooks: array of hooks with name and code (e.g., [["useEffect", "code..."]]).
5. services: JSON array of services or utilities used (e.g., ["authService"]).
6. eventhandler_functions: JSON array of event handlers with:
    a. handler: Handler name.
    b. calls: Functions or services called.
    c. code: The implementation code.
Eg. [["handleSubmit",["authService.save"], "code..."]]
7. constants_functions: JSON array of constants or utility functions which are not covered in hooks or handlers (e.g., [{{"constant": "PAGE_LIMIT","value":10}},{{"function": "getExpenses", "code": "code..."}}] ).
8. UI: A array representing the UI structure in following order, do not pass this as json with key, just pass the array. Each item contains:
    a. The React/MUI/MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui)/grid.js/Recharts libary component or HTML element name (e.g., Button, div).
    b. A JSON object of props for the element (e.g., {{"onClick": "handleSubmit","className":"btn-primary"}}).
    c. (Optional) Unique key for list items when iterate is used (“expense.id”)
    d. Iterate(Optional) Array or variable for list rendering (“expense”)
    e. (Optional) Conditional rendering logic, state variable which will be updated by the event handler(“selectedExpense”)
    f. (Optional) array of nested UI elements or components, using the same pattern to represent the data as UI elements mentioned above.

Additional details on Prop Types:
1. Static Props: Fixed values like labels ("label": "'Submit'").
2. Dynamic Props: Variables or state bindings ("value": "amount").
3. Event Handlers: Functions passed as props ("onClick": "handleSubmit").
4. Conditional Props: Props with boolean values ("disabled": "isVisible").
5. Styles and Class Names: Inline styles and CSS classes ("style": {{...}}, "className": "btn-primary").

Please reduce the nesting of components, if children become too deep, extract it as a new component and reference it.Do not add a dynamic content to nesting, create it as new components.
Libraries to use:
Use MUI for UI, MUI version of react-jsonschema-form (@rjsf/core @rjsf/mui) for forms, @mui/x-data-grid for tables, and Recharts for visualizations.
Reduce the use of simple elements use as many readymade components as you can, we need to reduce the size of the code and keep it simple.

Create code and pseudo code for 1 complex components at a time. I want to analyse if we are able to reduce the output token by using psuedo code. Do not add any filler tokens like space or dhashes, keep it as compact as possible it will be ready by a script so do not prettify the output.
Share the output in following format:
{{"pseudo_component_code": "the csv format",
"actual_component_code": "the actual code for the component"
}}
"""
def get_pipeline_config(
    pipeline_name: str,
    model_provider,
    func_version: str,
    tech_version: str,
    code_version: str,
    base_path: str
) -> List[Dict]:
    configs = {
        'requirementsV1': [ 
            RequirementGenerationStep(
                name="use_case_details",
                prompt_template=useCasePrompt,
                model_provider=model_provider
            ),
            RequirementGenerationStep(
                name="data_entity_details",
                prompt_template=dataEntityPrompt,
                model_provider=model_provider
            )
        ],
        'oneShotCodeGenV1': [
            RequirementGenerationStep(
                name="use_case_details",
                prompt_template=useCasePrompt,
                model_provider=model_provider
            ),
            CodeGenerationStep(
                name="backend_code",
                prompt_template=backendPrompt,
                model_provider=model_provider,
                output_path=f"{base_path}/backend"
            ),
            CodeGenerationStep(
                name="frontend_code1",
                prompt_template=frontendPromptI,
                model_provider=model_provider,
                output_path=f"{base_path}/frontend"
            ),
            CodeGenerationStep(
                name="frontend_code2",
                prompt_template=frontendPromptII,
                model_provider=model_provider,
                output_path=f"{base_path}/frontend"
            ),
            CodeGenerationStep(
                name="frontend_code3",
                prompt_template=frontendPromptIII,
                model_provider=model_provider,
                output_path=f"{base_path}/frontend"
            )
        ]
    }
    
    if pipeline_name not in configs:
        raise ValueError(f"Pipeline '{pipeline_name}' not found. Available pipelines: {list(configs.keys())}")
    
    return configs[pipeline_name]