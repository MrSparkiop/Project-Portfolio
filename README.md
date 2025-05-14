# MyPortfolio

A simple, self-hosted Node.js & Express CV/portfolio site with a custom admin panel.  
Uses SQLite (dev) / Sequelize, EJS templates, Passport.js for authentication, and Tailwind CSS (via CDN) for styling.

---

## 🚀 Features

- **Public site**  
  - List of Projects (title, description, URL)  
  - List of Experience entries (role, company, dates, description)  

- **Admin panel**  
  - Secure login (hard-coded admin user; swap in your own user table later)  
  - CRUD for Projects & Experience  
  - Responsive, Tailwind-powered UI  

- **Tech stack**  
  - **Node.js** & **Express**  
  - **SQLite** (dev) + **Sequelize** ORM  
  - **EJS** templating  
  - **Passport.js** (local strategy)  
  - **Tailwind CSS** via CDN for zero-build styling  

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org) v14+  
- [npm](https://npmjs.com) (comes with Node)  
- (Optional) Git for cloning & pushing  

---

## ⚡ Quick Start

1. **Clone this repo**  
   ```bash
   git clone https://github.com/<your-username>/MyPortfolio.git
   cd MyPortfolio
