# Lara-React-CRUD

This project is a CRUD (Create, Read, Update, Delete) application built using Laravel for the backend and React for the frontend. Learn how to create this project from https://youtu.be/VdYfBzOFPUQ

## Features
- Create, read, update, and delete records.
- Seamless integration between Laravel and React, Tailwind CSS, and Shadcn/ui.

## Requirements
- PHP >= 8.2 or higher
- Composer
- Node.js >= 14.x
- npm or yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/lara-react-crud.git
    cd lara-react-crud
    ```

2. Install backend dependencies:
    ```bash
    composer install
    ```

3. Set up the `.env` file:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. Configure your database in the `.env` file and run migrations:
    ```bash
    php artisan migrate
    ```

5. Install frontend dependencies:
    ```bash
    npm install
    ```

6. Build the frontend and backend assets and start the development server:
    ```bash
    composer run dev
    ```

## Usage
- Access the application at `http://localhost:8000`.
- Use the interface to perform CRUD operations.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).