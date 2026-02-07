# MERN Auth Client

A modern, secure, and feature-rich React frontend for the MERN Auth Boilerplate.

## Features

- **Authentication**:
  - User Registration & Login.
  - JWT-based authentication with `AuthContext`.
  - Protected Routes (`ProtectedRoute`, `AdminRoute`).
- **Role-Based Access Control (RBAC)**:
  - **Regular Users**: Access to personal Dashboard and Profile.
  - **Administrators**: Exclusive access to User Management Dashboard (View, Promote, Delete users).
- **UI/UX**:
  - **Modern Design**: Glassmorphism effects, soft gradients, and responsive layout using Tailwind CSS.
  - **Animations**: Smooth page transitions and interactive elements powered by `framer-motion`.
- **Tech Stack**:
  - React (Vite)
  - Tailwind CSS
  - Framer Motion
  - React Router DOM
  - Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Backend server running (MERN Auth Server)

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/mern-auth-client.git
    cd mern-auth-client
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    - Create a `.env` file in the root directory.
    - Add your API URL (default is localhost or your deployed backend):
      ```env
      VITE_API_URL=http://localhost:5000/api
      ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

- `src/components`: Reusable UI components (`Navbar`, `Layout`, `AdminRoute`, `PageTransition`).
- `src/pages`: Application views (`Login`, `Signup`, `Dashboard`, `Profile`, `AdminDashboard`).
- `src/context`: State management (`AuthContext`).
- `src/services`: API integration (`api.js`, `authService.js`, `userService.js`).

## Usage

1.  **Register**: Create a new account.
2.  **Login**: Access your dashboard.
3.  **Admin Access**: If you have an admin account, click the "Admin" link in the navbar to manage users.

## License

MIT
