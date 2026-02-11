# Frontend Task

## Overview

Build an **Ecommerce Store** application using Next.js 15+ and React. This task is designed to assess your skills in modern frontend development, including component architecture, state management, API integration, and UI/UX implementation.

**Time Estimate:** 3-5 hours  
**Focus Areas:** Next.js, React, TypeScript, Frontend Best Practices, UI Component Libraries

---

## Task Description

Create a product management dashboard where users can:

- View a list of products with pagination
- Search and filter products
- Filter products by date range using an interactive calendar
- View detailed information about a product
- Add products to a favorites list (persisted in browser)
- Toggle between light and dark themes

---

## Requirements

### 1. Technology Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (required for this task)
- **UI Components:** shadcn/ui (required - install and use their components)
- **State Management:** Your choice (React Context, Zustand, Redux, or built-in React hooks)

### 2. Core Features

#### Product List Page (`/`)

- Fetch and display products from the API
- Implement pagination (10 products per page)
- Add a search bar to filter products by name
- Add a category filter dropdown
- **Add a date range filter using a calendar component:**
  - Integrate a calendar component for filtering products by date
  - Allow users to select a date range (from date and to date)
  - Products should be filtered based on their creation/added date within the selected range
  - The calendar should be visually polished with custom styling
  - Each date in the calendar should be interactive - when hovering over a date, display a preview card showing the date formatted as a readable string (e.g., "January 15, 2026")
  - Selected dates should have an indigo background color (customize the default theme)
  - Clear/reset functionality for the date filter
- Display loading states while fetching data
- Handle error states gracefully
- Show a heart icon to toggle favorites for each product

#### Product Detail Page (`/products/[id]`)

- Display detailed product information
- Show product image, title, description, price, category, rating, and date added
- Add a "Back to Products" navigation button
- Include a favorite toggle button

#### Favorites Functionality

- Users can add/remove products from favorites
- Favorites should persist in localStorage
- Show a visual indicator on product cards that are favorited
- (Optional) Add a favorites counter in the header

#### Theme Toggle

- Implement a light/dark theme switcher
- Persist theme preference
- Apply theme across all pages
- Ensure the calendar component respects the theme

### 3. Technical Requirements

#### UI Component Library Integration

- Install and configure shadcn/ui properly
- Use shadcn/ui components throughout the application (buttons, inputs, cards, etc.)
- Customize the component theme to use indigo as the primary accent color for selected states
- Implement proper component composition and reusability

#### Performance & Optimization

- Use Next.js Image component for optimized images
- Implement proper loading states (skeletons or spinners)
- Use React Server Components where appropriate
- Optimize for Core Web Vitals

#### Code Quality

- Write clean, readable, and maintainable code
- Use proper TypeScript types
- Follow React best practices (proper hooks usage, component composition)
- Implement proper error boundaries

#### UI/UX

- Responsive design (mobile, tablet, desktop)
- Smooth transitions and interactions
- Accessible UI elements (semantic HTML, ARIA labels where needed)
- Consistent spacing and typography
- Polished calendar interactions with smooth hover states

---

## API Information

Use the **DummyJSON API** for product data:

**Base URL:** `https://dummyjson.com`

### Endpoints:

```
GET /products?limit=10&skip=0          # Get products with pagination
GET /products/search?q={query}         # Search products
GET /products/{id}                      # Get single product
GET /products/categories                # Get all categories
GET /products/category/{category}      # Get products by category
```

**Note:** The DummyJSON API doesn't provide date fields or support date filtering. You should:

- Generate mock "dateAdded" for each product on the client side (assign dates within the last 6 months)
- Store these dates consistently - use the product ID as a seed for reproducibility so dates don't change on refresh
- Implement **client-side filtering** - fetch all products, then filter the results based on the selected date range
- Consider pagination implications: you may need to fetch more products to have enough results after filtering

**Documentation:** https://dummyjson.com/docs/products

---

## Calendar Component Requirements

The date range filter should:

1. Use a calendar component from shadcn/ui (you'll need to find and install the right component)
2. Support selecting a date range (start and end date)
3. Have custom styling:
   - Selected dates should have an indigo background (#6366f1 or similar)
   - Selected date text should be white for contrast
4. Display an interactive preview when hovering over dates:
   - Show a small card/popover that appears on hover
   - Display the date in a human-readable format (e.g., "Monday, January 15, 2024")
   - The preview should be subtle but polished
5. Work seamlessly in both light and dark themes
6. Have smooth animations for interactions

**Hint:** You may need to explore shadcn/ui documentation to find components that work well together for this feature.

---

## Deliverables

1. **Source Code**
   - A GitHub repository with your solution
   - Include a clear README.md with:
     - Setup instructions
     - How to run the project
     - Any assumptions or decisions you made
     - Technologies and libraries used
     - How you implemented the date filtering feature

2. **Running Application**
   - Ensure the app runs with `npm install` and `npm run dev`
   - No build errors
   - All features functional

---

## Evaluation Criteria

We'll assess your submission based on:

1. **Functionality** (30%)
   - All required features work as expected
   - Calendar filtering works correctly with client-side logic
   - Multiple filters work together seamlessly
   - Proper error handling and edge cases

2. **Code Quality** (25%)
   - Clean, organized code structure
   - Proper use of TypeScript
   - Component reusability and composition
   - Meaningful naming conventions

3. **Next.js & React Proficiency** (20%)
   - Effective use of Next.js App Router features
   - Proper hooks usage and component lifecycle management
   - Understanding of client vs server components

4. **UI/UX Implementation** (15%)
   - Responsive design
   - Visual polish and attention to detail
   - Loading and error states
   - Calendar component customization and polish

5. **Performance** (10%)
   - Optimized rendering
   - Efficient data fetching
   - Proper use of Next.js optimization features

---

## Bonus Points (Optional)

These are not required but will be positively considered:

- Implement debouncing for search input
- Add smooth animations/transitions for better UX
- Implement infinite scroll instead of pagination
- Add a shopping cart feature
- Add data visualization (e.g., products added over time chart)
- Persist filter states (including date range) in URL query parameters
- Deploy the application (Vercel, Netlify, etc.) and share the live URL

---

## Submission

Please submit your solution via:

- GitHub repository link (make sure it's public or invite us as collaborators on these emails)
  - najam@strivio.ai
  - akhtar.tarar12@gmail.com

- Live deployment URL (if applicable)

---

## Tips

- Take time to explore the shadcn/ui documentation - it's well-organized and will help you find the right components
- The date filtering will be **client-side** since the API doesn't support it - think about how to make this performant
- Use a consistent approach to generate dates (e.g., seeded random based on product ID) so they don't change between renders
- Consider caching fetched products to avoid unnecessary API calls when filtering
- Think about the user experience when multiple filters are applied simultaneously
- Don't forget to handle edge cases (e.g., what happens when no products match the selected date range?)

---

## Good Luck! 🚀

We're excited to see your solution. Take your time to showcase your skills, and don't hesitate to add your personal touch to make the application stand out!
