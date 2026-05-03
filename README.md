# Personalized Content Dashboard

A dynamic, interactive web dashboard built with Next.js, Redux Toolkit, Tailwind CSS, and Framer Motion. This project fulfills the requirements for the Software Development Engineer (SDE) Intern assignment.

## Features

- **Personalized Feed**: Curated content from Mock News, Recommendations, and Social Media APIs.
- **Drag-and-Drop Organization**: Reorder your feed dynamically using `@hello-pangea/dnd`.
- **Global Search**: Debounced search functionality to filter the feed in real-time.
- **User Preferences**: Customize your feed by selecting favorite categories (saved locally via Redux Persist).
- **Dark Mode**: Fully implemented class-based dark mode toggle.
- **Favorites**: Bookmark articles and media to save for later.
- **Animations**: Smooth transitions and hover effects powered by Framer Motion.
- **Responsive Layout**: Sidebar and grid system adapting seamlessly to different screen sizes.

## Technology Stack

- **Framework**: React / Next.js 15 (App Router)
- **State Management**: Redux Toolkit, Redux Persist
- **Data Fetching**: RTK Query
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Testing**: Jest, React Testing Library, Cypress

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

**Unit Tests (Jest + RTL):**
```bash
npm run test
```

**End-to-End Tests (Cypress):**
```bash
npm run cypress:open
```
*(Make sure the development server is running before executing Cypress tests)*
