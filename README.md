# Log Ingestor Project

This project is a log ingestor system built using the MERN (MongoDB, Express.js, React, Node.js) stack and Tailwind CSS. It efficiently handles vast volumes of log data and provides a user-friendly interface for querying the data.

## Table of Contents

- [Project Structure](#project-structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [Advanced Features and Query Interface](#advanced-features-and-query-interface)

## Project Structure

The project is structured into two main components: the backend (Node.js & Express) and the frontend (React).

### Backend

The backend is responsible for ingesting logs into MongoDB.

#### Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling for Node.js
- `body-parser`: Middleware to parse incoming request bodies
- `cors`: Middleware for enabling Cross-Origin Resource Sharing
- `dotenv`: Zero-dependency module that loads environment variables from a .env file
- `nodemon`: Tool for automatically restarting the Node.js application during development

#### Setting Up

1. Navigate to the project root:

   ```bash
   cd log-ingestor
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your MongoDB URI:

   ```env
   MONGODB_URI=mongodb+srv://admin:admin@dyte-assignement.gkgfcge.mongodb.net/
   PORT=3000
   ```

4. Run the backend server:

   ```bash
   nodemon server.js
   ```

### Frontend

The frontend is a React application responsible for interacting with the backend to ingest logs.

#### Dependencies

- `axios`: Promise-based HTTP client for the browser and Node.js
- `react`: JavaScript library for building user interfaces
- `react-dom`: React package for working with the DOM
- `react-router-dom`: Declarative routing for React.js
- `Tailwind-css`: CSS framework for responsiveness and formatting.

#### Setting Up

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Run the React development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at [http://localhost:5173](http://localhost:5173).


## Advanced Features and Query Interface

- **Beautiful and Animated UI:**
  Create an aesthetically pleasing and animated user interface to enhance the overall user experience.

- **Responsive UI:**
  Ensure the user interface is responsive, providing an optimal viewing and interaction experience across various devices and screen sizes.

- **Mandatory Form Field Validation:**
  Implement a validation mechanism to prevent users from proceeding if any required form field is left unfilled. This ensures data integrity and accuracy.

- **Filter Data by Each Field:**
  Enable users to filter log data based on individual fields such as level, message, resourceId, timestamp, traceId, spanId, commit, and metadata.parentResourceId.

- **Search Query Filtering:**
  Implement a search functionality allowing users to filter log data by entering a search query. This enhances the flexibility of the query interface.

- **Date Range Filtering:**
  Allow users to filter log data within specific date ranges. This feature enhances precision by providing the capability to narrow down results based on temporal criteria.

These advanced features contribute to the professionalism and efficiency of the log query interface, providing users with a visually appealing, responsive, and feature-rich experience.


### Backend Endpoints

http:localhost:3000/logs :-> This endpoint provides logs that are stored in MongoDB.
