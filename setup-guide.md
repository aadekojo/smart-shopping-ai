# 🛠️ Setup Guide

## 📁 Project Structure
The project is divided into two main folders:
- `backend/` — FastAPI backend for handling AI search, product fetching, cart, and email handling.
- `frontend/` — React app with Tailwind for UI, includes search, cart, and quote flow.

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-shopping-ai.git
cd smart-shopping-ai
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### 🔹 Run the FastAPI Server
```bash
uvicorn app.main:app --reload
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 🔍 Features Overview

### ✅ Search Flow
1. User types a query
2. Query is processed by AI to extract intent
3. Backend fetches matching products from API or scrapes fallback
4. Results shown in `ProductCard` components

### ✅ Cart + Checkout
1. User adds products to cart
2. Cart page shows subtotal
3. On "Generate Quote":
   - User enters address
   - Delivery fee is calculated
   - Final total is shown

### ✅ Payment & Email (Future Phase)
1. Integrate Stripe or Flutterwave or Paystack; depends on prefrence and region
2. On payment success:
   - Send email to customer with order summary
   - Send email to Deliverado with delivery info

---

## 🧠 AI Integration
AI is used for:
- Parsing search queries (OpenAI or Gemini API)
- Matching queries with product metadata
- Optional: Auto-tagging product types

---

## 📦 Dependencies
### Backend (Python)
- FastAPI
- Pydantic
- Requests
- OpenAI (or Gemini)

### Frontend (React)
- React + Vite or Next.js
- TailwindCSS
- Axios

---

## ✅ Next Steps
- [ ] Set up your `.env` files for API keys (OpenAI, email provider, etc.)
- [ ] Implement mock search response to test flow
- [ ] Add product fetching logic (API and scraper)
- [ ] Connect frontend to backend search endpoint
- [ ] Add delivery quote logic based on address input
- [ ] Set up email service (SendGrid recommended)

---

Happy hacking! 💻⚡
 
>[!note]
>This is a prototype, stacks can be changed at any time