# 🛒 E-Commerce Admin Dashboard

A modern, scalable, and enterprise-grade E-Commerce Admin Dashboard built with **Angular 21**, designed to manage products, customers, orders, inventory, analytics, and business operations from a single platform.

![Angular](https://img.shields.io/badge/Angular-21-red)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![RxJS](https://img.shields.io/badge/RxJS-7+-purple)
![License](https://img.shields.io/badge/License-MIT-green)

---


# 🚀 Overview

The E-Commerce Dashboard is a comprehensive admin panel that enables administrators and business users to:

- Manage Products
- Manage Categories
- Manage Orders
- Manage Customers
- Monitor Sales Analytics
- Track Inventory
- Generate Reports
- Manage Users & Roles

Built using the latest Angular 21 features including:

- Standalone Components
- Angular Signals
- Functional Guards
- Functional Interceptors
- Deferred Loading
- Modern Control Flow
- Lazy Loading
- Server Ready Architecture

---

# ✨ Features

## 📊 Dashboard

- Revenue Overview
- Total Orders
- Total Products
- Total Customers
- Monthly Sales Chart
- Top Selling Products
- Recent Orders
- Revenue Analytics

---

## 📦 Product Management

### Features

- Product Listing
- Product Details
- Add Product
- Edit Product
- Delete Product
- Product Categories
- Product Variants
- Product Images
- Product Status

### Product Filters

- Category
- Price Range
- Stock Availability
- Product Status
- Search Product

---

## 🛍️ Order Management

### Features

- View Orders
- Order Details
- Update Status
- Cancel Orders
- Return Orders
- Invoice Generation

### Order Status

- Pending
- Processing
- Shipped
- Delivered
- Cancelled
- Returned

---

## 👥 Customer Management

### Features

- Customer List
- Customer Profile
- Customer Orders
- Customer Search
- Customer Segmentation

---

## 📦 Inventory Management

### Features

- Stock Monitoring
- Low Stock Alerts
- Inventory Tracking
- Product Availability
- Warehouse Management

---

## 📈 Analytics & Reports

### Reports

- Sales Reports
- Product Reports
- Customer Reports
- Revenue Reports
- Inventory Reports

---

## 🔐 Authentication

### Features

- Login
- Logout
- JWT Authentication
- Refresh Token
- Session Management

---

## 👨‍💼 User Roles

### Admin

- Full Access

### Manager

- Product Management
- Order Management
- Reports

### Staff

- Orders
- Customers

---

## 🎨 UI Features

- Responsive Design
- Mobile Friendly
- Dark Theme
- Light Theme
- Material Design
- Reusable Components
- Skeleton Loaders
- Toast Notifications

---

# 🏗️ Tech Stack

## Frontend

| Technology | Version |
|------------|-----------|
| Angular | 21 |
| TypeScript | Latest |
| RxJS | Latest |
| Angular Signals | Angular 21 |
| Angular Router | Angular 21 |
| SCSS | Latest |
| Angular Material | Latest |

---

## State Management

- Angular Signals
- RxJS
- BehaviorSubject
- NgRx (Optional)

---

## Backend

Compatible with:

- Node.js
- Express.js
- NestJS
- Spring Boot
- .NET Core
- Django

---

## Database

- MongoDB
- PostgreSQL
- MySQL
- SQL Server

---

# 🏛️ Architecture

```text
┌────────────────────┐
│      Browser       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Angular Frontend   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ API Layer          │
│ HttpClient         │
│ Interceptors       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Backend Services   │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Database           │
└────────────────────┘
```

---

# 📁 Project Structure

```bash
src
│
├── app
│   │
│   ├── core
│   │   ├── services
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── constants
│   │   ├── models
│   │   └── utilities
│   │
│   ├── shared
│   │   ├── components
│   │   ├── directives
│   │   ├── pipes
│   │   └── validators
│   │
│   ├── features
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── products
│   │   ├── orders
│   │   ├── customers
│   │   ├── inventory
│   │   ├── reports
│   │   └── settings
│   │
│   ├── layouts
│   ├── app.routes.ts
│   └── app.config.ts
│
├── assets
├── environments
└── styles
```

---

# 📷 Screenshots

## Dashboard

![Dashboard](docs/screenshots/dashboard.png)

## Products

![Products](docs/screenshots/products.png)

## Orders

![Orders](docs/screenshots/orders.png)

## Customers

![Customers](docs/screenshots/customers.png)

---

# ⚙️ Getting Started

## Prerequisites

Install:

- Node.js 22+
- npm 10+
- Angular CLI 21

Verify:

```bash
node -v
npm -v
ng version
```

---

# 📥 Installation

Clone Repository

```bash
git clone https://github.com/vishnu-85/ecommerce-dashboard.git
```

Navigate Project

```bash
cd ecommerce-dashboard
```

Install Dependencies

```bash
npm install
```

---

# ▶️ Run Application

Development

```bash
ng serve
```

or

```bash
npm start
```

Application URL

```bash
http://localhost:4200
```

---

# 🌍 Environment Configuration

## environment.ts

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## environment.prod.ts

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.company.com/api'
};
```

---

# 🔗 API Integration

## Example Service

```typescript
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>('/api/products');
  }
}
```

---

# ⚡ Angular 21 Features Used

## Signals

```typescript
products = signal<Product[]>([]);
```

## Computed

```typescript
totalProducts = computed(
  () => this.products().length
);
```

## Effect

```typescript
effect(() => {
  console.log(this.products());
});
```

---

# 🔐 Authentication Flow

```text
Login
   │
   ▼
JWT Token
   │
   ▼
Store Token
   │
   ▼
Attach Token
Interceptor
   │
   ▼
Authorized APIs
```

---

# 📡 HTTP Interceptor

```typescript
export const authInterceptor: HttpInterceptorFn =
(req, next) => {

 const token = localStorage.getItem('token');

 const authReq = req.clone({
   setHeaders: {
      Authorization: `Bearer ${token}`
   }
 });

 return next(authReq);
};
```

---

# 📊 State Management

## Signals

Used For:

- UI State
- Component State
- Filters
- Forms

## NgRx

Used For:

- API Calls
- Async Streams

## Optional NgRx

Used For:

- Enterprise Scale Applications

---

# 🚀 Performance Optimizations

### Lazy Loading

```typescript
loadComponent: () =>
 import('./products/products.component')
 .then(m => m.ProductsComponent)
```

### Track By

```html
@for(product of products(); track product.id){
   <app-product-card />
}
```

### OnPush

```typescript
changeDetection:
ChangeDetectionStrategy.OnPush
```

### Image Optimization

```html
<img
 ngSrc="product.jpg"
 width="300"
 height="300"
/>
```

---

# 🧪 Testing

## Unit Testing

```bash
ng test
```

## Coverage

```bash
ng test --code-coverage
```

## E2E

```bash
ng e2e
```

---

# 📏 Coding Standards

### Follow Angular Style Guide

- Single Responsibility Principle
- Standalone Components
- Reusable Components
- Strong Typing
- SOLID Principles
- Clean Architecture

---

# 🔒 Security

### Security Implementations

- JWT Authentication
- Role Based Access
- Route Guards
- CSRF Protection
- XSS Prevention
- HTTPS
- API Validation
- Input Sanitization

---

# 🚢 Deployment

## Production Build

```bash
ng build --configuration production
```

Output Folder

```bash
dist/ecommerce-dashboard
```

---

# ☁️ Deployment Platforms

- Netlify

---

# 🔄 CI/CD

### GitHub Actions

```yaml
name: Build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install
        run: npm install

      - name: Build
        run: ng build
```

---

# 🛣️ Roadmap

### Phase 1

- Authentication
- Dashboard
- Products

### Phase 2

- Orders
- Customers
- Inventory

### Phase 3

- Reports
- Export Features
- Notifications

### Phase 4

- AI Analytics
- Recommendation Engine
- Real-Time Monitoring

---

# 🤝 Contributing

1. Fork Project
2. Create Feature Branch

```bash
git checkout -b feature/new-feature
```

3. Commit Changes

```bash
git commit -m "Added new feature"
```

4. Push Changes

```bash
git push origin feature/new-feature
```

5. Create Pull Request

---

# 👨‍💻 Author

### Vishnu Kant

**Assistant Manager | Angular Developer | Frontend Architect**

- Angular
- TypeScript
- RxJS
- NgRx
- Micro Frontend
- System Design

---

# 📄 License

MIT License

Copyright (c) 2026 Vishnu Kant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files.

---

⭐ If you found this project useful, please consider giving it a star on GitHub.