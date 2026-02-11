# ShopHub - Ecommerce Store

A modern, full-featured ecommerce product management dashboard built with Next.js 15+, React, TypeScript, and shadcn/ui.

## 🚀 Features

### Core Functionality
- **Product Listing** - Browse products with a responsive grid layout
- **Advanced Search** - Real-time search across product titles and descriptions
- **Category Filtering** - Filter products by category with a dropdown selector
- **Date Range Filtering** - Interactive calendar component to filter products by date added
- **Pagination** - Navigate through products with 10 items per page
- **Product Details** - Comprehensive product detail pages with image gallery
- **Favorites System** - Add/remove products from favorites with localStorage persistence
- **Theme Toggle** - Switch between light and dark modes with preference persistence

### UI/UX Highlights
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- **Loading States** - Skeleton loaders for better perceived performance
- **Error Handling** - Graceful error states with retry options
- **Smooth Animations** - Polished transitions and hover effects
- **Custom Calendar** - Date range picker with indigo theme and hover preview cards
- **Favorites Counter** - Visual indicator showing number of favorited items

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns, react-day-picker
- **API**: DummyJSON API

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd my-app
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
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Product list page
│   ├── globals.css          # Global styles with theme variables
│   └── products/
│       └── [id]/
│           └── page.tsx     # Product detail page
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── calendar.tsx
│   │   ├── popover.tsx
│   │   └── skeleton.tsx
│   ├── Header.tsx           # App header with navigation
│   ├── ThemeToggle.tsx      # Theme switcher component
│   ├── DateRangePicker.tsx  # Custom date range picker
│   ├── ProductCard.tsx      # Product card component
│   └── ProductCardSkeleton.tsx
├── contexts/
│   ├── ThemeContext.tsx     # Theme management
│   └── FavoritesContext.tsx # Favorites management
└── lib/
    ├── utils.ts             # Utility functions
    ├── api.ts               # API functions
    └── dateUtils.ts         # Date generation and formatting
```

## 🎨 Key Implementation Details

### Date Filtering Feature

Since the DummyJSON API doesn't provide date fields or support date filtering, I implemented a client-side solution:

1. **Date Generation**: Each product gets a consistent mock date based on its ID using a seeded random function
2. **Reproducibility**: Dates remain consistent across page refreshes by using product ID as seed
3. **Client-Side Filtering**: All products are fetched, then filtered based on the selected date range
4. **Date Range**: Products are assigned dates within the last 6 months

### Calendar Component Customization

The date range picker features:
- **Indigo Theme**: Selected dates use indigo background (#6366f1)
- **Hover Preview**: Interactive cards showing formatted dates on hover
- **Dual Month View**: Shows two months for easier range selection
- **Clear Functionality**: Easy reset button for date filters
- **Theme Aware**: Adapts to light/dark mode

### State Management

- **Theme**: React Context with localStorage persistence
- **Favorites**: React Context with localStorage persistence
- **Filters**: Local component state with URL-ready structure
- **Products**: Client-side caching to minimize API calls

### Performance Optimizations

- **Next.js Image**: Optimized image loading with proper sizing
- **useMemo**: Memoized filter calculations
- **Skeleton Loading**: Improved perceived performance
- **Efficient Rendering**: Only render visible products (pagination)

## 🎯 Features Breakdown

### Product List Page (`/`)
- Search bar with real-time filtering
- Category dropdown filter
- Date range picker with calendar
- Responsive product grid (1-4 columns based on screen size)
- Pagination with page numbers
- Active filter indicators
- Clear all filters button
- Loading skeletons
- Empty state handling

### Product Detail Page (`/products/[id]`)
- Image gallery with thumbnail navigation
- Product information (title, price, rating, category, brand)
- Discount display
- Stock information
- Favorite toggle
- Date added display
- Back navigation
- Responsive layout

### Header
- Brand logo and name
- Favorites counter badge
- Theme toggle button
- Sticky positioning

## 🔧 API Integration

The app uses the [DummyJSON API](https://dummyjson.com) with the following endpoints:

- `GET /products?limit=0` - Fetch all products
- `GET /products/{id}` - Fetch single product
- `GET /products/categories` - Fetch all categories

All products are enhanced with a `dateAdded` field generated client-side.

## 💡 Design Decisions

1. **Client-Side Filtering**: Since the API doesn't support date filtering, all filtering happens client-side after fetching all products
2. **Seeded Random Dates**: Using product ID as seed ensures dates are consistent across sessions
3. **Indigo Theme**: Custom primary color for a modern, professional look
4. **Context API**: Simple state management suitable for this app's scope
5. **shadcn/ui**: Provides accessible, customizable components
6. **Responsive First**: Mobile-first approach with progressive enhancement

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

## 📝 Assumptions & Notes

- Products are fetched once on page load and cached in state
- Date filtering is client-side due to API limitations
- Favorites are stored in localStorage (not synced across devices)
- Theme preference is stored in localStorage
- The app assumes modern browser support (ES6+, localStorage, etc.)

## 🎨 Customization

### Change Theme Color
Edit `src/app/globals.css` and modify the `--primary` CSS variable:
```css
--primary: 238.7 83.5% 66.7%; /* Indigo */
```

### Adjust Products Per Page
Edit `src/app/page.tsx`:
```typescript
const PRODUCTS_PER_PAGE = 10; // Change this value
```

## 📄 License

This project is created as a technical assessment task.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [DummyJSON](https://dummyjson.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
