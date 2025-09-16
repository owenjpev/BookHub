# Bookhub

Bookhub is a full-stack web application that allows users to browse, borrow, and return books in a digital library system. This project was built as a learning exercise to demonstrate full-stack development skills using modern web technologies.

## Features

- **User Authentication**: Create accounts and login securely
- **Book Management**: Browse available books and view detailed information
- **Borrowing System**: Borrow and return books with user-specific tracking
- **Contact Form**: Reach out to administrators through the contact page
- **Admin Panel**: Special interface for administrators to manage content

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: Session-based authentication with [express-session](https://github.com/expressjs/session)

## Project Structure
bookhub/
├── app/ # Next.js frontend pages
├── components/ # React components
├── lib/ # Utility functions and database connection
├── routes/ # Express.js API routes
├── public/ # Static assets
└── styles/ # Global CSS files


## Current Status

This project is currently in prototype phase. While fully functional, it's designed as a learning exercise and demonstration of full-stack development capabilities. Some features may have temporary implementations for rapid development.

For planned improvements and upcoming features, see [TODO.md](TODO.md).

## Learning Objectives

This was my first public full-stack project, built to gain hands-on experience with:
- Building RESTful APIs with Express.js
- Creating responsive UIs with Next.js and Tailwind CSS
- Implementing user authentication and session management
- Connecting frontend and backend with proper data flow
- Working with PostgreSQL databases

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/bookhub.git

2. Install dependencies
    ```bash
    cd bookhub
    npm install

3. Set up environment variables
    ```bash
    # Create .env file with your database credentials
    DATABASE_URL=your_postgresql_connection_string
    SESSION_SECRET=your_session_secret

4. Run the development server
    ```bash
    npm run dev

5. Open http://localhost:3000 in your browser

---

### Contributing

This project is primarily for personal learning, but suggestions and feedback are welcome! Feel free to open an issue or submit a pull request.

### License

This project is open source and available under the MIT License.

### Acknowledgments

- Built as a learning project to understand full-stack web development
- Inspired by digital library systems and book management applications