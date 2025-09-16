# Todo List - Bookhub (Prototype)

This document outlines pending features and improvements for the Bookhub prototype. Items are prioritized by impact and feasibility.

## Planned Features

- [ ] **Mobile-responsive navigation**  
  Implement a mobile-friendly header navigation component that adapts to smaller screens.

- [ ] **Refactor notification system**  
  Replace direct `window.addNotification()` calls with a centralized, reusable notification component. Remove `// @ts-ignore` workarounds.

- [ ] **Code style consistency**  
  Add semicolons to all `.tsx` files to maintain consistent code formatting across the project.

- [ ] **Enhance loading states**  
  Create dedicated loading screens and components to improve UX during data fetching (e.g., book details, user auth).
  Currently, I have "loading" and "setLoading" states in each file, but nothing happens on the "loading" state.

- [ ] **Admin dashboard**  
  Build an admin interface for managing users, books, and content (including CRUD operations).

- [ ] **Book review management**  
  Add functionality to create and delete reviews directly from the book detail page.

- [ ] **Newsletter signup integration**  
  Implement form handling and backend logic for the newsletter signup section on the About page.

- [ ] **Demo book detail page**  
  Create a `/my-books/:id` route that displays a book’s details (possibly as a demo without full database persistence).

## 🔧 Future Ideas (Post-MVP)

- [ ] User profile pages with borrowing history
- [ ] Search and filtering for books
- [ ] Dark mode toggle
- [ ] Offline support via service workers
- [ ] Full authentication flow (register, forgot password, etc.)

> 💡 This project is currently in prototype phase. Some features may be implemented with temporary solutions for rapid development.