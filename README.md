# Task Master - Backend API

This repository contains the backend server for the TaskMaster application. It is a RESTful API built with Node.js, Express, and MySQL, designed to handle all data operations for the TaskMaster frontend.

[View Frontend Repository](https://github.com/KottaiRaja/Task_Management_Frontend)  ·  [Report Bug](https://github.com/KottaiRaja/Task_Management_Backend/issues)

## ✨ Features

*   **Robust RESTful API:** Provides full CRUD (Create, Read, Update, Delete) functionality for tasks.
*   **Advanced Filtering & Search:** Endpoints support filtering tasks by `status` and `priority`, as well as a full-text `search` on task titles and descriptions.
*   **Email Notifications:** Automatically sends emails using Nodemailer upon task creation and updates.
*   **Scheduled Reminders:** A daily cron job runs to check for tasks due the next day and sends reminder emails.
*   **Secure & Configurable:** Uses environment variables (`.env`) to securely manage database credentials and application secrets.

---

## 🛠️ Tech Stack

*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [MySQL](https://www.mysql.com/)
*   **MySQL Driver:** [mysql2](https://github.com/sidorares/node-mysql2)
*   **Emailing Service:** [Nodemailer](https://nodemailer.com/)
*   **Task Scheduling:** [node-cron](https://www.npmjs.com/package/node-cron)
*   **Environment Variables:** [dotenv](https://www.npmjs.com/package/dotenv)
*   **Development Utility:** [Nodemon](https://nodemon.io/) for automatic server restarts.

---

## 🚀 Getting Started

Follow these instructions to get the backend server up and running on your local machine.

### Prerequisites

*   Node.js (v16 or newer recommended)
*   npm (or yarn / pnpm)
*   A running MySQL Server instance
*   Git

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/KottaiRaja/Task_Management_Backend.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd Task_Management_Backend
    ```

3.  **Set up the Database:**
    *   Ensure your MySQL server is running.
    *   Using a MySQL client (like MySQL Workbench, DBeaver, or the command line), execute the script located at `db_setup.sql` to create the `taskmaster_db` database and the `tasks` table.

4.  **Configure Environment Variables:**
    *   In the root of the project, create a file named `.env`.
    *   Copy the contents below into your `.env` file and replace the placeholder values with your actual credentials.

    ```dotenv
    # .env file

    # --- Database Connection ---
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=taskmaster_db

    # --- Server Configuration ---
    PORT=5000

    # --- Email Credentials (Gmail with an App Password is recommended) ---
    # The email account that will send notifications.
    EMAIL_USER=your-email@gmail.com
    # The 16-character App Password generated from your Google Account.
    EMAIL_PASS=your16characterapppassword
    ```

5.  **Install Dependencies:**
    ```bash
    npm install
    ```

6.  **Start the Server:**
    *   For development with auto-restarting on file changes:
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```
    The API server will now be running at `http://localhost:5000`.


---

## ⚙️ API Endpoints

The API provides the following endpoints, all prefixed with `/api`.

| Method | Endpoint         | Description                                                      |
|:-------|:-----------------|:-----------------------------------------------------------------|
| `POST` | `/tasks`     | Create a new task. Requires a JSON body with task details. |
| `GET`  | `/tasks`     | Fetch all tasks. Supports query parameters: `?status=...`, `?priority=...`, and `?search=...`. |
| `GET`  | `/tasks/:id` | Fetch a single task by its unique ID.                                   |
| `PUT`  | `/tasks/:id` | Update an existing task. Requires a JSON body with the new task details. |
| `DELETE`| `/tasks/:id` | Delete a task by its unique ID.                                        |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to fork the repository, create a feature branch, and open a pull request.

---

## 📜 License

Distributed under the MIT License.

---

## 📧 Contact

Kottai Raja - (kottairaja1220@gmail.com)

Project Link: (https://github.com/KottaiRaja/Task_Management_Backend)
