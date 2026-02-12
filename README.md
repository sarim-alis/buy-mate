# BuyMate - Ecommerce Store

A modern, full-featured ecommerce product management dashboard built with **Next.js 15+**, **TypeScript**, **Tailwind CSS 4**, **Redux Toolkit**, and **shadcn/ui**.

---

## Setup Instructions

### Prerequisites

- **Node.js** 18+ installed
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd buy-mate

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

No environment variables or external configuration is required — the app uses the public DummyJSON API.

---

## How to Run the Project

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm install`   | Install all dependencies       |
| `npm run dev`   | Start dev server on port 3000  |
| `npm run build` | Create production build        |
| `npm start`     | Serve production build         |

---

## Technologies and Libraries Used

| Technology               | Purpose                                              |
| ------------------------ | ---------------------------------------------------- |
| **Next.js 15+**          | React framework with App Router                      |
| **TypeScript**           | Type-safe development                                |
| **Tailwind CSS 4**       | Utility-first styling                                |
| **shadcn/ui**            | UI components (Select, Calendar, Popover, Button, Card, Input, Sheet) |
| **Redux Toolkit**        | Global state management (theme, favorites, cart)      |
| **react-day-picker v8**  | Calendar date range selection inside shadcn Calendar  |
| **date-fns v3**          | Date formatting and manipulation                     |
| **Recharts**             | Data visualization (products-over-time chart)        |
| **Lucide React**         | Icon library                                         |
| **Radix UI**             | Headless primitives powering shadcn/ui               |

---

## How I Implemented the Date Filtering Feature

The DummyJSON API does **not** provide date fields or support date-based queries. Here is how I solved this:

### 1. Consistent Date Generation

Each product receives a mock `dateAdded` field generated deterministically from its ID:

```
src/lib/dateUtils.ts → generateDateForProduct(id)
```

- A **seeded random** function uses the product ID as seed so the same product always gets the same date.
- Dates are distributed within the **last 180 days** (6 months).
- Dates remain identical across page refreshes and different users.

### 2. Client-Side Filtering Pipeline

All 194 products are fetched once on page mount. Filtering is performed entirely client-side using `useMemo`:

```
Search query → Category filter → Date range filter → Paginate
```

When a date range is selected, products are filtered by checking:

```ts
productDate >= startOfDay(fromDate) && productDate <= endOfDay(toDate)
```

### 3. Calendar Component (shadcn/ui + react-day-picker v8)

The date picker is built with:

- **shadcn/ui `Calendar`** component wrapping `react-day-picker` v8
- **shadcn/ui `Popover`** for the dropdown container
- Custom `DateRangePicker` component in `src/components/DateRangePicker.tsx`

**Calendar features:**

| Feature                  | Implementation                                                    |
| ------------------------ | ----------------------------------------------------------------- |
| **Indigo selected dates** | `bg-indigo-600 text-white` with dark mode variants               |
| **Hover preview tooltip** | Custom `DayContent` component shows "January 15, 2026" on hover |
| **Dual-month view**       | `numberOfMonths={2}` for easier range selection                  |
| **Clear/reset**           | X button on trigger + "Clear dates" button inside popover         |
| **Selection summary**     | Header bar inside popover shows current selection state           |
| **Dark mode**             | Full dark mode support with indigo-900 range highlights           |
| **Range highlighting**    | Selected range cells get indigo-100/indigo-900 background tint   |

### 4. URL Persistence

The selected date range is stored in URL query parameters (`dateFrom`, `dateTo`) as ISO strings, so:

- Filters survive page refresh
- Links with filters are shareable
- Browser back/forward navigation works

### 5. Clear Functionality

Dates can be cleared via:
- The **X icon** on the date picker trigger button
- The **"Clear dates"** button inside the calendar popover
- The **"Clear Filters"** button that resets all filters at once

---

## Assumptions and Decisions

1. **Redux Toolkit** was chosen over Context API for scalability, DevTools support, and clean separation of concerns across theme, favorites, and cart slices.

2. **shadcn/ui for all UI components** — Select, Calendar, Popover, Button, Card, Input, Sheet — ensuring a consistent design system with Tailwind CSS. No Ant Design components are used in the final version.

3. **Client-side filtering** — Since the API lacks date support, all products are fetched once and filtered in-memory. This is efficient for the dataset size (~194 products) and allows instant filter response.

4. **Seeded random dates** — Using product ID as a seed guarantees date consistency across sessions, users, and page refreshes without needing a database.

5. **Indigo theme (#6366f1)** — Used as the primary accent throughout: selected calendar dates, range highlights, loading spinners, cart badges, and "Add to Cart" buttons.

6. **react-day-picker v8** — Chosen for stable API, good shadcn/ui integration, and reliable `DayContent` customization for hover tooltips.

7. **localStorage persistence** — Theme preference, favorites list, and cart contents persist across browser sessions via Redux middleware that syncs to localStorage.

8. **URL query parameters** — Search, category, and date range filters are all reflected in the URL, making filter states shareable and bookmarkable.

9. **Debounced search (300ms)** — Prevents excessive re-renders during typing while keeping the UI responsive.

10. **Next.js Image** — All product images use the `next/image` component with proper `sizes`, `fill`, and `priority` attributes for Core Web Vitals optimization.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout with Redux provider
│   ├── page.tsx                  # Home page — product list, filters, chart
│   ├── globals.css               # Theme variables (light/dark)
│   ├── favorites/page.tsx        # Favorites page
│   ├── products/[id]/page.tsx    # Product detail page
│   └── api/
│       ├── products/route.ts     # GET /api/products
│       ├── products/[id]/route.ts# GET /api/products/:id
│       └── categories/route.ts   # GET /api/categories
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── calendar.tsx          # Custom calendar with hover tooltips
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   └── sheet.tsx
│   ├── Header.tsx                # Sticky header with nav, cart, theme toggle
│   ├── DateRangePicker.tsx       # Date range picker (Calendar + Popover)
│   ├── ProductCard.tsx           # Product card with favorites & cart
│   ├── CartSheet.tsx             # Slide-out shopping cart panel
│   ├── LoadingSpinner.tsx        # Indigo animated loader
│   ├── ProductsChart.tsx         # Recharts area chart
│   ├── ThemeToggle.tsx           # Light/dark mode toggle
│   └── LayoutContent.tsx         # Client wrapper for header
├── store/
│   ├── index.ts                  # Redux store config
│   ├── hooks.ts                  # Typed useAppDispatch / useAppSelector
│   ├── StoreProvider.tsx         # Provider with localStorage init
│   └── slices/
│       ├── themeSlice.ts         # Theme state
│       ├── favoritesSlice.ts     # Favorites state
│       └── cartSlice.ts          # Cart state
├── hooks/
│   └── useDebounce.ts            # Generic debounce hook
└── lib/
    ├── utils.ts                  # cn() utility
    ├── api.ts                    # API fetch functions with retry
    └── dateUtils.ts              # Seeded date generation & formatting
```

---

## Features Summary

### Core
- Product listing with responsive grid (1–4 columns)
- Debounced search (300ms) across titles and descriptions
- Category filter dropdown (shadcn Select)
- Date range filter with interactive calendar (shadcn Calendar + Popover)
- Pagination (10 products/page) with smart page numbers
- Product detail pages with image gallery
- Favorites with localStorage persistence and badge counter
- Shopping cart with quantity management and slide-out panel
- Light/dark theme toggle with Redux persistence
- All filters persist in URL query parameters

### Bonus Features Implemented
- **Debounced search** — custom `useDebounce` hook (300ms)
- **Smooth animations** — staggered fade-in, hover effects, scale transitions
- **Shopping cart** — full Redux-powered cart with localStorage
- **Data visualization** — Recharts area chart (products added over time)
- **URL query parameters** — search, category, and date range in URL

---

## API Integration

Uses the [DummyJSON API](https://dummyjson.com):

| Endpoint                     | Usage                     |
| ---------------------------- | ------------------------- |
| `GET /products?limit=0`      | Fetch all products        |
| `GET /products/{id}`         | Single product details    |
| `GET /products/categories`   | Category list for filter  |

All API calls go through Next.js API routes (`/api/products`, `/api/categories`) with retry logic and error handling.

---

## License

This project was created as a frontend technical assessment.
