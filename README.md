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



2. **Usage**

## Usage Notes

1. **Dummy Credentials**: Use these credentials to log in:
   - **email**: `ned@gmail.com`
   - **Password**: `ned`

   - **email**: `snow@gmail.com`
   - **Password**: `snow`

2. **Logging In**: Enter the dummy credentials on the login page and click **Login**.

3. **Creating a Room**:
   - After logging in, navigate to the **Create Room** section.
   - Enter a **Room Name** in the input field.
   - Click **Create** to set up the room.

![create](./assets/create.gif)

4. **Joining a Room**:
   - Go to the **Join Room** section.
   - Select an available room from the list or enter the **Room Name** manually.
   - Click **Join** to enter the room.

![join](./assets/join.gif)

5. **Editing in a Room**:
   - Once inside the room, people can join the room with roomId. And whatever changes you made in the editor will reflect to other who are in the room.

6. **Logging Out**: To log out, click on your profile icon in the top right corner and select **Logout**.

## Features

- **User Authentication**: Secure login and logout functionality with dummy credentials.
- **Room Creation**: Users can create new chat rooms with custom names.
- **Room Joining**: Users can join existing chat rooms by selecting from a list or entering the room name.
- **Concurrent**: Multiple users can't edit same row at the same time. The application use row level locking.
## Real-Time Conflict Handling

Our application manages real-time editing conflicts by implementing row-level locking. Here’s how it works:

- **Exclusive Row Locking**: Each row can only be locked by a single user. For example, if **User A** is editing row 23, that row becomes locked for **User A**, preventing other users from making any changes to it. However, other users can still view the changes in real-time.

- **Automatic Lock Release**: The lock on a row is automatically released when the user stops typing, allowing other users to edit that row if needed.

- **Editing Other Sections**: Users are free to edit other rows in the document without any restrictions, as long as those rows are not currently locked by another user.

### Conflict Detection Example

Consider this scenario:
- **User A** is typing in row 23, and **User B** is editing row 40.
- In this case, rows 23 and 40 are locked. If another user tries to edit these rows, the system will detect a conflict and prevent unauthorized changes.

This conflict-handling mechanism ensures smooth, uninterrupted collaboration while maintaining data integrity.

![join](./assets/conflict.gif)

- As you can see from above, left side user typing something on a specific row, and righ side user tries to type something on same row. It detect typing conflict. And restrict the user to do so.


