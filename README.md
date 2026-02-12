# BuyMate - Ecommerce Store

A modern, full-featured ecommerce product management dashboard built with Next.js 15+, React, TypeScript, Redux Toolkit, and a hybrid UI approach using both shadcn/ui and Ant Design components.

## 🚀 Features

### Core Functionality
- **Product Listing** - Browse products with a responsive grid layout and staggered animations
- **Debounced Search** - Optimized real-time search (300ms debounce) across product titles and descriptions
- **Category Filtering** - Filter products by category with Ant Design dropdown selector
- **Date Range Filtering** - Shadcn calendar component with indigo theme and hover tooltips
- **Smart Pagination** - Navigate through products with 10 items per page
- **Product Details** - Comprehensive product detail pages with image gallery and add to cart
- **Favorites System** - Redux-powered favorites with localStorage persistence
- **Shopping Cart** - Full cart functionality with quantity management and checkout UI
- **Theme Toggle** - Light/dark mode switcher with Redux state management
- **URL Query Parameters** - All filters persist in URL for shareable links
- **Data Visualization** - Interactive chart showing products added over time

### UI/UX Highlights
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- **Indigo Loading Spinners** - Custom animated loaders matching the app theme
- **Error Handling** - Graceful error states with retry options
- **Smooth Animations** - Staggered fade-in animations, hover effects, and transitions
- **Ant Design Calendar** - Date range picker with indigo theme (#6366f1) and formatted date tooltips
- **Favorites Counter** - Red badge showing number of favorited items
- **Cart Badge** - Indigo badge showing total cart items
- **Interactive Charts** - Recharts visualization with indigo gradient

## 🛠️ Technology Stack

### Core
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit

### UI Libraries
- **shadcn/ui** - Buttons, Cards, Inputs, Sheet (Cart), Calendar, Select
- **Icons**: Lucide React
- **Charts**: Recharts

### Data & API
- **API**: DummyJSON API
- **Date Generation**: Seeded random based on product ID

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to http://localhost:3000

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Redux provider
│   ├── page.tsx                # Product list page with filters & chart
│   ├── globals.css             # Global styles with theme variables
│   ├── favorites/
│   │   └── page.tsx            # Favorites page
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        # Product detail page
│   └── api/
│       ├── products/
│       │   ├── route.ts        # Products API route
│       │   └── [id]/route.ts   # Single product API route
│       └── categories/
│           └── route.ts        # Categories API route
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── sheet.tsx           # Cart slide-out panel
│   │   └── calendar.tsx
│   ├── Header.tsx              # App header with cart & favorites
│   ├── ThemeToggle.tsx         # Theme switcher component
│   ├── DateRangePicker.tsx     # Ant Design date range picker
│   ├── DateRangePicker.css     # Custom calendar styling
│   ├── ProductCard.tsx         # Product card with cart button
│   ├── CartSheet.tsx           # Shopping cart component
│   ├── LoadingSpinner.tsx      # Indigo loading spinners
│   ├── ProductsChart.tsx       # Recharts visualization
│   └── LayoutContent.tsx       # Client wrapper for header
├── store/
│   ├── index.ts                # Redux store configuration
│   ├── hooks.ts                # Typed Redux hooks
│   ├── StoreProvider.tsx       # Redux provider component
│   └── slices/
│       ├── themeSlice.ts       # Theme state management
│       ├── favoritesSlice.ts   # Favorites state management
│       └── cartSlice.ts        # Shopping cart state management
├── hooks/
│   └── useDebounce.ts          # Debounce hook for search
└── lib/
    ├── utils.ts                # Utility functions
    ├── api.ts                  # API functions with retry logic
    └── dateUtils.ts            # Date generation and formatting
```

## 🎨 Key Implementation Details

### Date Filtering Feature

Since the DummyJSON API doesn't provide date fields or support date filtering, I implemented a client-side solution:

1. **Date Generation**: Each product gets a consistent mock date based on its ID using a seeded random function (`generateDateForProduct`)
2. **Reproducibility**: Dates remain consistent across page refreshes by using product ID as seed
3. **Client-Side Filtering**: All products are fetched once, then filtered based on the selected date range
4. **Date Range**: Products are assigned dates within the last 180 days (6 months)

### Calendar Component Customization

The Calendar features:
- **Indigo Theme**: Selected dates use indigo background (#6366f1)
- **Hover Tooltips**: Custom `cellRender` showing formatted dates (e.g., "January 15, 2026")
- **Dual Month View**: Shows two months for easier range selection
- **Opens Upward**: `placement="topLeft"` prevents layout breaking
- **Clear Functionality**: Built-in clear button for date filters
- **Theme Aware**: Custom CSS adapts to light/dark mode
- **Custom Styling**: `DateRangePicker.css` with indigo gradients and animations

### State Management with Redux Toolkit

All application state is managed with Redux Toolkit:

- **Theme Slice**: Light/dark mode with localStorage persistence
- **Favorites Slice**: Product IDs array with localStorage persistence
- **Cart Slice**: Shopping cart items with quantity management and localStorage persistence
- **Initialization**: All slices initialized on app mount via `StoreProvider`
- **Typed Hooks**: `useAppDispatch` and `useAppSelector` for type safety

### Performance Optimizations

- **Debounced Search**: 300ms debounce using custom `useDebounce` hook
- **useMemo**: Memoized filter calculations for products
- **Next.js Image**: Optimized image loading with proper sizing
- **Indigo Spinners**: Custom loading states instead of heavy skeleton components
- **Efficient Rendering**: Only render visible products (pagination)
- **URL Query Params**: Filter state in URL for shareable links and browser navigation
- **Single API Call**: Products fetched once and cached in Redux state

### Shopping Cart Implementation

Full-featured shopping cart with Redux:
- **Add to Cart**: From product cards and detail pages
- **Quantity Management**: Increment/decrement with +/- buttons
- **Remove Items**: Individual item removal
- **Clear Cart**: Remove all items at once
- **Total Calculation**: Real-time price and quantity totals
- **Slide-out Panel**: shadcn/ui Sheet component for cart UI
- **Persistent Storage**: Cart saved to localStorage
- **Badge Indicator**: Indigo badge showing total items in header

### Data Visualization

Interactive chart using Recharts:
- **Area Chart**: Cumulative products added over time
- **Indigo Gradient**: Matches app theme (#6366f1)
- **Responsive**: Adapts to container width
- **Tooltips**: Shows date and product count on hover
- **Theme Aware**: Chart colors adapt to light/dark mode

## 🎯 Features Breakdown

### Product List Page (`/`)
- **Debounced search bar** with 300ms delay for optimized filtering
- **Shadcn category dropdown** with all available categories
- **Shadcn date range picker** with indigo theme and hover tooltips
- **Data visualization chart** showing products added over time
- **Responsive product grid** (1-4 columns based on screen size)
- **Staggered animations** - Products fade in with 50ms delays
- **Pagination** with page numbers and Previous/Next buttons
- **Active filter indicators** showing result count
- **Clear all filters** button (appears when filters active)
- **Indigo loading spinner** with animated text
- **Empty state handling** with clear filters option
- **URL query parameters** for shareable filter states
- **Add to cart** buttons on all product cards

### Product Detail Page (`/products/[id]`)
- **Image gallery** with thumbnail navigation (up to 4 images)
- **Product information** (title, price, rating, category, brand)
- **Discount display** with original price strikethrough
- **Large "Add to Cart" button** with indigo theme and hover scale
- **Stock information** card
- **Favorite toggle** with heart icon
- **Date added** display with formatted date
- **Back to Products** button with hover animations
- **Responsive layout** (2-column on desktop, stacked on mobile)

### Favorites Page (`/favorites`)
- **Grid of favorited products** with same layout as home page
- **Empty state** with heart icon and helpful message
- **Loading spinner** while fetching favorite products
- **Product cards** with all standard features (cart, favorite toggle)

### Header
- **Brand logo and name** linking to home page
- **Favorites link** with red heart icon and badge counter
- **Shopping cart button** with indigo badge showing item count
- **Theme toggle button** for light/dark mode
- **Sticky positioning** with backdrop blur effect

### Shopping Cart (Sheet Panel)
- **Slide-out panel** from right side
- **Product list** with images, titles, and prices
- **Quantity controls** (+/- buttons) for each item
- **Remove item** button (trash icon)
- **Total price** calculation
- **Clear cart** button
- **Checkout button** (UI only)
- **Empty state** with shopping cart icon
- **Item count** in header

## 🔧 API Integration

The app uses the [DummyJSON API](https://dummyjson.com) with the following endpoints:

- `GET /products?limit=0` - Fetch all products
- `GET /products/{id}` - Fetch single product
- `GET /products/categories` - Fetch all categories

All products are enhanced with a `dateAdded` field generated client-side.

## 💡 Design Decisions

1. **Redux Toolkit over Context**: Chosen for scalability, better DevTools, and middleware support
2. **Hybrid UI Approach**: 
   - shadcn/ui for core components (buttons, cards, sheet)
   - shadcn for complex components (DatePicker, Select) with better out-of-box functionality
3. **Client-Side Filtering**: Since the API doesn't support date filtering, all filtering happens client-side after fetching all products once
4. **Seeded Random Dates**: Using product ID as seed ensures dates are consistent across sessions
5. **Indigo Theme (#6366f1)**: Custom primary color for a modern, professional look throughout
6. **URL Query Parameters**: All filters persist in URL for shareable links and browser back/forward navigation
7. **Debounced Search**: 300ms delay prevents excessive re-renders and improves performance
8. **localStorage Persistence**: Theme, favorites, and cart persist across sessions
9. **Responsive First**: Mobile-first approach with progressive enhancement
10. **Staggered Animations**: 50ms delays create a polished, professional feel

## ✨ Bonus Features Implemented

All optional bonus features from the task requirements have been implemented:

✅ **Debouncing for search input** - 300ms debounce with custom hook  
✅ **Smooth animations/transitions** - Staggered fade-in, hover effects, scale animations  
✅ **Shopping cart feature** - Full Redux-powered cart with localStorage persistence  
✅ **Data visualization** - Recharts area chart showing products added over time  
✅ **URL query parameters** - All filters (search, category, date range) persist in URL

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

## 📝 Implementation Notes

### Date Filtering Approach

Since DummyJSON API doesn't provide date fields:
- Each product gets a mock `dateAdded` field generated client-side
- Uses seeded random function based on product ID for consistency
- Dates are within the last 180 days (6 months)
- Filtering happens client-side on the full product list
- Date range is stored in URL query parameters

### State Persistence

- **Theme**: Redux + localStorage (light mode default)
- **Favorites**: Redux + localStorage (array of product IDs)
- **Cart**: Redux + localStorage (items with quantities)
- **Filters**: URL query parameters (search, category, date range)

### API Integration

- Products fetched once on mount via `/api/products` route
- Categories fetched once on mount via `/api/categories` route
- Single product details fetched on demand via `/api/products/[id]` route
- Retry logic and timeout handling for network resilience
- All routes include error handling and logging

### Browser Requirements

- Modern browser with ES6+ support
- localStorage API
- CSS Grid and Flexbox support
- JavaScript enabled


## 📄 License

This project is created as a technical assessment task.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Recharts](https://recharts.org/) - Data visualization
- [DummyJSON](https://dummyjson.com/) - Mock API
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Lucide Icons](https://lucide.dev/) - Icon library

## 📧 Contact

For questions or feedback about this implementation, please contact the development team.
