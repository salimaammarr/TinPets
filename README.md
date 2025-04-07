# TinPets

TinPets is a web application for pet owners to find and care for their pets.

## Project Structure

- `frontend-react/`: React frontend application
- `backend/`: Node.js backend server
- `.github/workflows/`: GitHub Actions workflows for CI/CD
- `render.yaml`: Render deployment configuration

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB Atlas account

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5002
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd frontend-react
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   REACT_APP_API_URL=http://localhost:5002/api
   REACT_APP_NAME=TinPets
   ```

4. Start the development server:
   ```
   npm start
   ```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following environment variables:
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `PORT`: 10000
   - `CORS_ORIGIN`: https://selimaammar.github.io

### Frontend Deployment (GitHub Pages)

The frontend is automatically deployed to GitHub Pages when changes are pushed to the master branch.

## Security Considerations

- Never commit sensitive information like API keys, database credentials, or JWT secrets to the repository
- Use environment variables for all sensitive information
- Set up proper CORS configuration in production
- Use HTTPS for all API requests in production

## License

This project is licensed under the ISC License.
