# Real Estate Platform

## Overview

This Real Estate Platform is a web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a comprehensive solution for users to list, search, and manage real estate properties, with features like user authentication, property search filters, personalized profiles, and real-time chat.

## Features

- **User Authentication**: Secure login and registration using cookies for session management.
- **Property Listing**: Users can list properties with detailed information and images.
- **Search Filters**: Search options to filter properties based on location, price, type, etc.
- **User Profiles**: Personalized profiles for users, including options for managing listed properties.
- **Image Management**: Seamless image upload and storage using Cloudinary.
- **Responsive Design**: Fully responsive layout for optimal viewing on all devices.

## Technologies Used

- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Authentication**: JSON Web Tokens (JWT), Cookies


## Project Structure

- **client/**: Contains the React frontend.
  - **src/**: React components, styles, and assets.
- **server/**: Contains the Node.js backend.
  - **models/**: Mongoose models for MongoDB.
  - **routes/**: Express routes for handling API requests.
  - **controllers/**: Functions that handle the logic for each route.
  - **middlewares/**: Custom middleware for authentication, etc.
  - **config/**: Configuration files for database and other services.
