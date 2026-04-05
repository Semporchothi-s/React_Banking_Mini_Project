# Demo Banking Application

A full-stack banking dashboard mini-project built with the MERN stack (MongoDB, Express, React, Node.js). 

This application allows users to create an account, log in, view their account summary, make money transfers between accounts, and view their transaction history.

## Expected Features
* **User Authentication**: Secure sign-up and sign-in functionality utilizing JWT and bcrypt.
* **Account Dashboard**: View account details and current balance.
* **Money Transfer**: Effortlessly transfer amounts to different bank accounts.
* **Transaction History**: View a list of past transactions with visual indicators (e.g. green for received, red for sent).

## Tech Stack
* **Frontend**: React (with Vite), TypeScript, React Router, Bootstrap, Axios.
* **Backend**: Node.js, Express, MongoDB (Mongoose), JSONWebToken (JWT).

---

## Prerequisites
Before you begin, ensure you have met the following requirements:
* **Node.js** and **npm** installed on your local machine.
* **MongoDB** installed and running locally, or a remote MongoDB URI (e.g., MongoDB Atlas).

---

## Installation & Setup
Clone the repository, then install dependencies for both the frontend and backend.

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd BACKEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (if required). You may need a `.env` file in the `BACKEND` directory containing configurations like:
   * `PORT=3000`
   * `MONGODB_URI=<your-mongodb-connection-string>`
   * `JWT_SECRET=<your-secret-key>`
4. Start the backend server:
   ```bash
   npm start
   ```
   > The backend server runs with `nodemon` and will be accessible at `http://localhost:3000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd FRONTEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   > The frontend application will be hosted by Vite (typically at `http://localhost:5173` or as specified in the terminal).

---

## Usage Guide
1. **Database Check**: Ensure your local MongoDB instance is actively running.
2. **Launch Both Apps**: Ensure both the Backend (`npm start`) and the Frontend (`npm run dev`) terminal instances are running concurrently.
3. Open the frontend address in your browser.
4. **Register**: Create a new account.
5. **Login**: Use your credentials to sign in.
6. **Dashboard**: Navigate your dashboard, simulate transactions using the Transfer menu, and monitor updates in your Transaction History.

