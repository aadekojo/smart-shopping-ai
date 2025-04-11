###  * Vision: Smart Shopping Web App with Logistics Integration (Deliverado)**

####  Flow Summary:

1. **User searches** → AI fetches matching products (name, price, store)
2. User adds items to cart
3. Goes to cart → hits **“Generate Quote”**
4. App calculates **subtotal + delivery charge** (based on address)
5. User enters address → sees final total
6. On **payment completion**:
    - Email sent to customer (receipt/confirmation)
    - Email sent to **Deliverado** with order + delivery info

#### Build Components

| **Frontend**    | React (Next.js), TailwindCSS                             |
| --------------- | -------------------------------------------------------- |
| **Backend**     | FastAPI                                                  |
| Database        | MongoDB (not implemented)                                |
| AI Search       | Deepseek API (for query interpretation & smart matching) |
| Product Data    | Hybrid approach: APIs + scraping fallback                |
| Cart & Checkout | NextJS router table                                      |
| Delivery Logic  | Custom function based on address                         |
| Email Service   | Resend                                                   |
| Payment         | simulated                                                |

---

### 🖼️ **Feature Breakdown (MVP Style)**

#### 🔍 **1. Smart Search Page**

- User enters: _“iPhone 13 under 3K AED”_
- AI parses intent → gets matching items
- Show: (best 5 items matching the search)
    - Name
    - Price
    - Store name/logo       
    - Purchase link or internal product link
    - **Add to Cart** button

#### 🛒 **2. Cart Page**

- Items listed with:
    - Item price, source       
    - Quantity (optional)
- **Generate Quote** button

#### 📦 **3. Generate Quote Modal**

- Calculate subtotal of items
- Ask for:
    - Name
    - Email
    - Delivery address
- Logic determines delivery charge (based on zones, city, or distance)
- Display full total

#### 💳 **4. Payment & Confirmation**

- User confirms and pays (via payment gateway)
- On success:
    - Email confirmation to user
    - Order details + address sent to **Deliverado logistics team email**

---
#### Current Bugs
- Price Conversion is not working correctly (exchange rate APIs would be best)
- visual bugs
- email confirmation bug (need a domain to send email to customers)
- payment is simulated
- address functionality has not been implemented 


#### Summary
- 💡 An AI product search using DeepSeek
- 🛒 A full cart and checkout experience
- 💌 Email delivery to customer + logistics  
- 🌍 Multi-currency formatting + switching
- 🔐 Secure backend API with Server Actions
- 🚀 Deployed to Vercel and live on the web
