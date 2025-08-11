# Collaborative Document Editor

A real-time collaborative document editing application built with **React**, **Tiptap**, **Liveblocks**, and **Redux Toolkit**. This project allows multiple users to simultaneously edit, comment, and review documents with live presence indicators and role-based access control.

---

## 🚀 Features

- 📝 **Real-time editing** with shared document state using Yjs
- 🎭 **Role-based access control**: Editor, Reviewer, Commenter
- 🧑‍🤝‍🧑 **Live presence**: Cursors, names, avatars for each user
- 💬 **Inline commenting and review threads**
- 🔌 **Redux-powered document state management**
-  **Offline and Online toggle Based Collabaration**
-  **Cursor Activity Simulation**

---

## 🧑‍💻 Setup Instructions

1. **Clone the Repository**
   
   - ```git clone https://github.com/your-username/Collaborative-Documents-Editor.git```
   
   - `cd Collaborative-Documents-Editor`

3. **Install Dependencies**
   - ```npm install```

4. **Run the Development Server**
  - ``` npm start```
   
5. **Simulate Cursor Activity**
    - ```npx tsx simulate-activity.ts```

   ✅ The app uses a public Liveblocks API key and requires no additional backend setup.


## Design Decisions & Assumptions
- 📐 Editor Stack
- Tiptap is used as the core text editor with extension support.
- Liveblocks handle real-time collaboration (cursor, presence, shared state).

## 👤 User Identity
- Each tab simulates a unique user.
- This identity includes a random name, color, and avatar (used across comments and cursors). It's not persisted as well.


## Tech Stack
- React & Redux Toolkit
- Tiptap v2
- Liveblocks
- Yjs
- TypeScript
- faker.js, uuid, Bootstrap
- playwright for simulation

## VISUAL DISPLAY:
- https://www.loom.com/share/9565303a6c974741880359b4ff94d392
- Latest: - https://drive.google.com/file/d/1ut8Yn8NjFQ3qeBMVf3WoEUES3MwjIiQ5/view?usp=sharing
