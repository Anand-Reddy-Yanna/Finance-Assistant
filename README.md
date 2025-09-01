# Finance Assistant

A **React + Tailwind CSS frontend** for managing personal finances. Supports transaction tracking, PDF uploads, receipt extraction, filtering, and charts.

---

## Features

### Authentication
- User registration and login with JWT token storage
- Protected routes for dashboard and transactions

### Dashboard
- Overview of expenses and income
- Charts:
  - **Pie chart** by category
  - **Bar chart** monthly summary
- Quick Actions shortcut
- **Home button** to navigate back to the dashboard

### Transactions
- Add new transactions (income/expense)
- Filter transactions by:
  - Start Date
  - End Date
  - Category
- Paginated transaction list (Next/Prev buttons)
- Copy transaction ID
- Delete transaction
- No scroll in transaction list (pagination only)

### Uploads
- **Upload receipts** (Images/PDF) for transactions
- **Upload transaction history PDF** (tabular format)  
  - Automatically imports transactions
  - Accessible via the **Upload** link in the Navbar
  - Opens a separate page

### UI/UX
- Glassmorphic design with gradients
- Smooth micro-interactions with `framer-motion`
- Responsive layout

---

## Installation

### Prerequisites
- Node.js v18+ and npm installed
- Backend API running

### Frontend Setup
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```
5. Open browser at http://localhost:5173

### Backend Setup
Make sure the backend server is running and supports the following endpoints:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/transactions`
- `GET /api/transactions` (supports filters: page, limit, startDate, endDate, category)
- `GET /api/transactions/summary`
- `POST /api/upload` (receipts)
- `POST /api/transactions/upload-pdf` (PDF transaction import)
- `DELETE /api/transactions/:id` (delete transaction)

## How to Use

### Register/Login
Use your email/password to access the dashboard.

### Dashboard
View charts and quick actions.

### Transactions
- Add income/expense
- Filter transactions by date or category
- Navigate pages with Next/Prev buttons

### Upload Receipts
Upload image or PDF receipts for a transaction.

### Upload Transaction History
- Click **Upload** in the Navbar
- Opens a separate page
- Upload a PDF with tabular transactions to import multiple transactions at once.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Framer Motion
- Charts: Recharts
- HTTP: Axios
- Authentication: JWT

## Notes
- Ensure backend supports required APIs.
- CORS must allow `http://localhost:5173`.
- Receipts uploaded as PDF or images will be processed and stored.
- Pagination and filters are applied on the backend for large datasets.
- Transaction list no longer scrolls; use Next/Prev buttons.

## Future Improvements
- Optimistic UI updates
- CSV export of transactions
- Account settings management
- Enhanced OCR for receipts
