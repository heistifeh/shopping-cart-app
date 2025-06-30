# 🛒 Shopping Cart Application

This is a frontend technical test project built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It implements a fully functional shopping cart with product listing, coupon code discounts, and quantity management — all using Context API for state management.

---

## 🚀 Tech Stack

- ⚛️ React 19 + TypeScript
- ⚡ Vite for fast development
- 💨 Tailwind CSS for styling
- 🔄 React Router v7 — page routing
- 🔧 Context API — global cart state
- 🔔 React Toastify — notifications
- 🎯 ESLint + TypeScript for code quality

---

## 📄 Project Features

| Feature               | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| 🛍 Product Listing     | Products are fetched from a local JSON mock (`/public/products.json`) |
| ➕ Add to Cart        | Add any product to the cart with default quantity                     |
| ➖➕ Quantity Control | Increase or decrease product quantity in the cart                     |
| ❌ Remove Items       | Remove items entirely from the cart                                   |
| 💰 Total Calculator   | Calculates total price dynamically                                    |
| 🎟️ Coupon Support     | Supports `POWERLABSx` for 13.2% discount                              |
| ✅ Input Validation   | Validates coupon code before applying                                 |
| 🛑 Error Handling     | Handles errors and edge cases gracefully                              |
| 📦 Responsive UI      | Fully mobile-friendly interface                                       |

---

## 🧩 Folder Structure

```
src/
├── assets/              # Images and static files
├── components/          # Shared reusable components (Navbar, ProductCard, Cart, etc.)
├── context/             # CartContext using React's Context API
├── pages/               # Main route pages (Home, Search)
├── types/               # TypeScript type definitions
├── ui/                  # Custom UI elements (e.g., Loading spinners, ProductThumb)
├── utils/               # Helpers like formatCurrency, localStorage handlers
├── App.tsx              # Main route setup
└── main.tsx             # React entry point
```

---

## 🌐 Routes

```tsx
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<SearchPage />} />
  </Routes>
</Router>
```

---

## 📦 Key Dependencies

```json
"react": "^19.1.0",
"react-router-dom": "^7.6.3",
"tailwindcss": "^4.1.11",
"react-toastify": "^11.0.5",
"framer-motion": "^12.19.2"
```

Dev dependencies include:

```json
"typescript": "~5.8.3",
"eslint": "^9.29.0",
"@vitejs/plugin-react": "^4.5.2"
```

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shopping-cart.git
cd shopping-cart
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

App will run locally at `http://localhost:5173`

---

## ✅ Completed Features

- [x] Product display from local `products.json`
- [x] Cart functionality with quantity updates and item removal
- [x] Total price calculation
- [x] Coupon validation (POWERLABSx → 13.2% off)
- [x] Responsive Tailwind CSS styling
- [x] Context API state management
- [x] React Toastify for alerts
- [x] Clean routing with React Router v7
- [x] Live hosted version via Vercel or GitHub Pages

---

## 📄 Notes

- This is a frontend-only project.
- All data is mocked — no external API or backend integration.
- Context API manages global cart state cleanly and efficiently.
- You can find mock data in `public/products.json`.
- Feel free to fork, reuse, and build upon this project!

---

## 🌍 Live Demo

**Live URL**: https://shopping-cart-app-brown.vercel.app/
**GitHub Repo**: https://github.com/heistifeh/shopping-cart-app

---

## 👨‍💻 Author

Boluwatife Eniola Osineye

Made with ❤️ by [Your Name](https://github.com/heistifeh)
