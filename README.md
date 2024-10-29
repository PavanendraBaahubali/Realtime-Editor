# Collaborative Text Editor

A real-time collaborative text editor built using **React**, **Quill** for rich text editing, **Socket.IO** for real-time communication, and **MongoDB** as the database. This project allows multiple users to collaborate on the same document, with changes reflected in real-time across all users' editors. Autosave functionality and conflict management mechanisms are implemented to ensure a seamless collaborative experience.

## Features

- **Real-Time Collaboration**: Instant updates across connected users.
- **Autosave with Conflict Resolution**: Regularly saves edits with conflict handling.
- **Row Locking**: Prevents overwrites on the same line by different users.
- **Debouncing**: Limits database writes for optimized performance.
- **Cursor Tracking**: Stabilizes cursor position for each user.
- **Session Management**: Uses JWT for managing user sessions and room access.

## Tech Stack

### Frontend
- **React**
- **Quill**
- **Socket.IO**

### Backend
- **Node.js**
- **Express**
- **Socket.IO**
- **Mongoose**
- **MongoDB**

### Other Libraries
- **dotenv**
- **cors**

## Setup and Installation

### Prerequisites
- **Node.js** (v14 or above)
- **MongoDB** instance

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/collaborative-text-editor.git
   cd collaborative-text-editor
   
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/collaborative-text-editor.git
   cd collaborative-text-editor
    

