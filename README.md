# Products App — Modern E-Commerce Storefront

An e-commerce storefront web application built with **React 19**, **React Router v7**, **Axios**, and **Vite**. The application provides an interactive product catalog powered by the DummyJSON REST API, complete with server-side pagination, detailed product pages with an interactive media gallery, real-time stock boundaries, and global shopping cart management powered by the React Context API.

---

## Overview

- **What the project does:** Delivers a dynamic e-commerce shopping experience where users can browse paginated product listings, view detailed product information (including ratings, brand, category, financing estimations, and multi-image galleries), manage items in a shopping cart with real-time price calculations, and navigate via client-side routing.
- **What problem it solves:** Eliminates full page reloads by leveraging client-side single-page architecture (SPA), synchronizes cart state globally across independent views, and protects users from selecting invalid order quantities through automated inventory boundaries.
- **Main purpose:** Serves as a clean, production-styled portfolio application demonstrating core modern React engineering: React 19 Compiler integration, Context API state management, asynchronous REST API orchestration with Axios, dynamic routing with React Router v7, and custom responsive CSS.

---

## Live Demo

[Live Demo](YOUR_LIVE_DEMO_URL)

---

## Screenshots

> _Replace placeholders below with actual project screenshots or GIFs._

| Desktop Catalog View | Interactive Product Details |
| :---: | :---: |
| ![Desktop Catalog](https://via.placeholder.com/600x350?text=Products+Catalog+Grid) | ![Product Details](https://via.placeholder.com/600x350?text=Product+Details+Gallery) |

| Shopping Cart & Summary | Responsive Mobile View |
| :---: | :---: |
| ![Shopping Cart](https://via.placeholder.com/600x350?text=Shopping+Cart+Management) | ![Mobile View](https://via.placeholder.com/300x500?text=Mobile+Responsive+View) |

---

## Features

### Implemented Features
- **Paginated Product Catalog:** Fetches products from DummyJSON API displaying 10 products per page with server-side `skip` and `limit` query parameters, complete with current page indicators and bounds-disabled Previous/Next pagination buttons.
- **Interactive Product Details:** Dynamic URL routing (`/products/:id`) that fetches and displays product specifications, categorical tags, brand info, star rating conversions (`★★★★☆`), and suggested monthly financing calculations.
- **Interactive Multi-Image Gallery:** Thumbnail strip allowing shoppers to preview and switch the active primary product display photo on click.
- **Inventory & Stock Management:**
  - Real-time stock status badges ("In stock" / "Out of stock").
  - Quantity controls with lower bound (minimum 1) and upper bound validation tied directly to available inventory (`product.stock`).
  - Action buttons disabled automatically when inventory drops to zero.
- **Global Shopping Cart (Context API):**
  - Add to cart from both catalog cards and detail views.
  - Automatic item deduplication (incrementing quantity rather than creating duplicate cart items).
  - Instant visual feedback on button click ("Added ✓" state for 1.5 seconds).
  - Real-time cart counter badge in the sticky navigation bar across all routes.
  - Itemized shopping cart view with item removal, row subtotals, and auto-calculated grand total.
  - Empty cart state with a direct call-to-action to return to shopping.
- **Client-Side Routing & 404 Handling:**
  - Fast SPA transitions via React Router v7 without page reloading.
  - Catch-all route (`*`) rendering a dedicated `NotFound` page, complete with a demo link in the navbar.
- **Asynchronous Feedback:** Explicit loading states ("Loading products...", "Loading product details...") and error handling UI for network failures.
- **Responsive Styling:** Mobile-first responsive layouts using CSS Grid and Flexbox with breakpoints at 900px and 600px.

### Feature Roadmap / Unimplemented
- Authentication: `[TODO]` (User login, registration, and protected routes are not yet implemented)
- Search & Filtering: `[TODO]` (Client or server-side keyword search and category filtering not yet implemented)
- Forms & Checkout Validation: `[TODO]` (Checkout billing and payment form validation not yet implemented)
- LocalStorage Persistence: `[TODO]` (Cart state currently resets upon browser refresh)
- Unit & Integration Testing: `[TODO]` (Testing framework not yet configured)

---

## Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core Framework** | React 19 (`^19.2.8`) | Modern React library for declarative UI building |
| **DOM Renderer** | React DOM (`^19.2.8`) | Browser rendering layer for React 19 |
| **Routing** | React Router DOM (`^7.18.3`) | Declarative client-side routing (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useParams`) |
| **State Management** | React Context API | Native React state sharing via `createContext` and `useContext` |
| **HTTP Client** | Axios (`^1.20.0`) | Promise-based HTTP client with centralized instance configuration |
| **Data Provider** | DummyJSON REST API | External public REST API (`https://dummyjson.com/products`) |
| **Build & Tooling** | Vite (`^8.2.2`) | Fast frontend build tool and local development server |
| **Optimization** | React Compiler (`babel-plugin-react-compiler`) | Automated memoization preset configured via `@rolldown/plugin-babel` |
| **Code Quality** | Oxlint (`^1.79.0`) | High-performance Rust-based linter with React rules configured |
| **Styling** | Vanilla CSS3 | Custom design system (`index.css`) utilizing CSS Grid, Flexbox, and media queries |

---

## React Architecture

```
                    ┌─────────────────────────┐
                    │      main.jsx           │
                    │   (React.StrictMode)    │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     CartProvider        │  ◄── Global Cart State (CartContext)
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     BrowserRouter       │
                    └────────────┬────────────┘
                                 │
        ┌────────────────────────┴────────────────────────┐
        │                                                 │
┌───────▼────────┐                              ┌─────────▼────────┐
│   Navbar.jsx   │ (Global Header)              │  <Routes> Outlet │
└────────────────┘                              └─────────┬────────┘
                                                          │
          ┌───────────────────────┬───────────────────────┼───────────────────────┐
          │                       │                       │                       │
   ┌──────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐
   │ProductsList │         │ProductDetail│         │    Cart     │         │  NotFound   │
   │  path="/"   │         │path="/.../:id"│       │path="/cart" │         │  path="*"   │
   └─────────────┘         └─────────────┘         └─────────────┘         └─────────────┘
```

- **Global State (`src/context/CartContext.jsx`):** Wraps the entire application. Provides `cartItems`, `addToCart(product, quantity)`, and `removeFromCart(productId)` without prop drilling.
- **Persistent Shell (`src/App.jsx` & `src/components/Navbar.jsx`):** The Navbar is mounted outside of `<Routes>` inside `<BrowserRouter>`, allowing the cart badge to reactively reflect changes across any route transition.
- **API Client Layer (`src/api/axiosInstance.js`):** Encapsulates the base configuration (`baseURL: "https://dummyjson.com"`) so endpoints are decoupled from hardcoded domain URLs.
- **Dynamic Route Consumption:** `ProductDetails.jsx` uses `useParams()` to extract the URL parameter `:id` and trigger contextual data fetches.
- **Event Propagation Management:** `ProductsList.jsx` implements `e.stopPropagation()` on nested buttons to decouple card navigation from cart dispatching.
- **React Compiler Integration:** Enabled in `vite.config.js` via `babel-plugin-react-compiler`, offloading memoization overhead to the build compiler.

---

## Project Structure

```
lab-3/
├── public/
│   └── favicon.svg              # Application favicon
├── src/
│   ├── api/
│   │   └── axiosInstance.js     # Pre-configured Axios instance (DummyJSON baseURL)
│   ├── assets/
│   │   ├── hero.png             # Static image asset
│   │   ├── react.svg            # React logo
│   │   └── vite.svg             # Vite logo
│   ├── components/
│   │   └── Navbar.jsx           # Global header with dynamic cart item counter
│   ├── context/
│   │   └── CartContext.jsx      # Cart Context Provider (add, remove, deduplication)
│   ├── pages/
│   │   ├── Cart.jsx             # Shopping cart itemization, subtotals, grand total
│   │   ├── NotFound.jsx         # 404 Error page fallback
│   │   ├── ProductDetails.jsx   # Product deep-dive, image gallery, quantity selector
│   │   └── ProductsList.jsx     # Product card grid, star rating, server pagination
│   ├── App.css                  # Reserved stylesheet
│   ├── App.jsx                  # Root component: Context Provider and Route definitions
│   ├── index.css                # Global design system, component styling, media queries
│   └── main.jsx                 # Application entry point with React StrictMode
├── .gitignore                   # Version control ignore definitions
├── .oxlintrc.json               # Oxlint linting rules (React hooks and component exports)
├── index.html                   # HTML document template
├── package.json                 # Project dependencies, scripts, and metadata
└── vite.config.js               # Vite build configuration with React Compiler preset
```

---

## API Integration

The application integrates with the public **DummyJSON Products API**:

### Endpoints Used
1. **Catalog Pagination:** `GET /products?limit=10&skip={skip}`
   - Calculates `skip = (currentPage - 1) * LIMIT`.
   - Returns an array of products along with the `total` number of available records.
2. **Product Details:** `GET /products/{id}`
   - Fetches singular product specifications by ID passed through the URL parameter.

### Data Fetching & State Lifecycle
- **Execution:** Requests are triggered inside React `useEffect` hooks with explicit dependency tracking (`[currentPage]` for pagination, `[id]` for details).
- **Loading State:** Managed via local `loading` boolean state; displays a clean loading notice while requests are pending.
- **Error Handling:** Errors are caught via `.catch(err => ...)` blocks, logged for debugging, and presented through an inline error UI (`error` state string).
- **Authentication:** `[TODO]` (Endpoints are public and unauthenticated; token-based authentication is not currently implemented).

---

## Responsive Design

The interface is styled with custom vanilla CSS (`src/index.css`) designed to adapt across screen sizes:

- **Desktop (> 900px):**
  - Product catalog is organized into a balanced 4-column CSS Grid (`grid-template-columns: repeat(4, 1fr)`).
  - Product details utilizes a two-column Flexbox layout (left column: active image and thumbnail row; right column: product metadata, pricing, financing notes, and quantity actions).
- **Tablet (601px – 900px):**
  - Product catalog transitions automatically to a 2-column grid (`grid-template-columns: repeat(2, 1fr)`).
- **Mobile (≤ 600px):**
  - Product catalog stacks into a single-column grid (`grid-template-columns: 1fr`).
  - Product details container stacks vertically (`flex-direction: column`) with image previews spanning 100% width.
  - Navbar links and items collapse into a flexible, wrap-friendly layout.

---

## Challenges & Solutions

### 1. Preventing Unintended Navigation on Card Actions
- **Challenge:** Clicking anywhere on a product card navigates to `/products/:id`. The "Add to Cart" button is situated inside the card, causing unwanted route transitions whenever a user simply intended to add an item.
- **Solution:** Injected `e.stopPropagation()` into the button's `onClick` handler. This intercepts the click event before it bubbles up to the card container, allowing cart updates to execute without triggering page navigation.

### 2. Synchronizing Cart Badge Across Disconnected Components
- **Challenge:** The `Navbar` needs to reflect real-time cart counts, but it is rendered outside the page routes and has no direct parent-child prop relation with `ProductsList` or `ProductDetails`.
- **Solution:** Centrally implemented React Context (`CartContext.Provider`) wrapping the application. In `Navbar.jsx`, the badge dynamically computes total items using `cartItems.reduce((sum, item) => sum + item.quantity, 0)`.

### 3. Cart Item Deduplication & State Immutability
- **Challenge:** Adding an existing item to the cart must increment its existing quantity rather than creating duplicate row entries in the cart array.
- **Solution:** Programmed an immutable updater inside `addToCart`: it searches for existing records with `prevItems.find(item => item.id === product.id)`. If matched, `prevItems.map(...)` increments `item.quantity + quantity`; otherwise, the new product object is appended to the array.

### 4. Enforcing Dynamic Inventory Bounds on Quantity Selectors
- **Challenge:** Users should not be able to order zero, negative, or quantities that exceed the merchant's real-time stock.
- **Solution:** Bound the quantity selector to strict guard clauses (`quantity > 1` for decrements and `quantity < product.stock` for increments). Additionally, the decrement/increment buttons and purchase buttons are programmatically disabled via `disabled` attributes when limits are reached or when `product.stock === 0`.

---

## Performance & Code Quality

- **React 19 Compiler:** Vite configuration utilizes `babel-plugin-react-compiler` via `@rolldown/plugin-babel`, enabling automatic memoization at compile-time and reducing manual `useMemo` / `useCallback` boilerplate.
- **High-Performance Linting:** Configured with `oxlint` (`.oxlintrc.json`), applying strict rules for React hooks (`react/rules-of-hooks`) and component export standards.
- **Server-Side Pagination:** Restricts queries to 10 products per request, avoiding unnecessary payload transfers and large DOM node allocations.
- **Immutable State Updates:** Functional updater patterns (`setCartItems(prev => ...)`) prevent state mutations and race conditions.
- **Clean Component Separation:** Page views, API configuration, context providers, and navigation components are cleanly isolated into dedicated directories.
- **Code Splitting & Lazy Loading:** `[TODO]` (Components are currently statically imported; route-based `React.lazy` and `Suspense` can be added for further bundle reduction).

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Step-by-Step Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/youssifmo2025/Products-App-Modern-E-Commerce-Storefront.git
   cd Products-App-Modern-E-Commerce-Storefront
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   > *Note for Windows PowerShell users:* If script execution policy blocks `npm`, run `npm.cmd run dev` or use Command Prompt / Git Bash.

4. **Open in browser:**
   Navigate to the local address displayed in your terminal (typically `http://localhost:5173/`).

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches Vite local development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and optimizes assets into the `dist/` directory for production |
| `npm run lint` | Executes `oxlint` to check for React and JavaScript syntax/hook issues |
| `npm run preview` | Locally serves the production build from `dist/` |

---

## Environment Variables

Currently, the project uses a centralized Axios configuration directly pointing to the public DummyJSON endpoint (`src/api/axiosInstance.js`).

To configure an environment-based base URL, create a `.env` file in the root directory:

```env
# .env (Optional Future Configuration)
VITE_API_BASE_URL=https://dummyjson.com
```

> **Note:** Do not commit actual `.env` files containing confidential keys to version control. The `.gitignore` file is already configured to ignore `.env*` files.

---

## Future Improvements

- [ ] **Custom Hooks:** Abstract cart state and API fetching into custom hooks (`useCart()`, `useProducts()`) for cleaner component logic.
- [ ] **Search & Category Filters:** Implement search input and category filter chips utilizing DummyJSON endpoints (`/products/search?q=` and `/products/category/`).
- [ ] **Persistent Cart:** Save and synchronize cart contents using `localStorage` so items persist across page refreshes.
- [ ] **Checkout Flow & Form Validation:** Build an interactive checkout modal/page with form validation (e.g., using React Hook Form).
- [ ] **Code Splitting:** Implement `React.lazy()` and `<Suspense>` on page routes to optimize the initial bundle size.
- [ ] **Automated Testing:** Set up Vitest and React Testing Library for component and integration testing.

---

## Author

**Frontend React Developer**
- **GitHub:** [@youssifmo2025](https://github.com/youssifmo2025)
- **LinkedIn:** [YOUR_LINKEDIN_PROFILE](https://linkedin.com/in/YOUR_LINKEDIN_PROFILE)
- **Portfolio:** [YOUR_PORTFOLIO_URL](https://YOUR_PORTFOLIO_URL)

---

## License

This project is licensed under the [MIT License](LICENSE).
