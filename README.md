# Project-Portfolio

A personal CV & portfolio site built with Node.js, Express, EJS, Sequelize (SQLite), Passport for auth, and Tailwind CSS. Includes an admin panel (hidden behind a “secret” path) where you can CRUD Projects, Experiences, and Skills. Public visitors see a polished Hero, dynamic Skills bars, Projects list, Experience list, and standalone Project detail pages.

---

## Features

- **Public side**  
  - Hero / About section with photo, résumé download & “View Projects” scroll  
  - **Skills & Tech Stack** bars driven from the database  
  - Responsive **Projects** gallery linking to individual detail pages  
  - **Experience** list  
  - Vanilla Tailwind CSS (via CDN) for lightning-fast styling

- **Admin panel** (secret URL)  
  - 🔒 Hidden behind `/secret-admin-123/...` (change to your own)  
  - **Projects CRUD** (title, description, URL)  
  - **Experiences CRUD** (role, company, dates, description)  
  - **Skills CRUD** (name & proficiency %)  
  - Unified “Manage X” pages with bright, consistent buttons  
  - EJS templates with a shared header/footer partial  
  - Passport-Local authentication (hardcoded admin user; swap in DB user easily)

---

## Tech Stack

- **Node.js** & **Express**  
- **EJS** for server-side templates  
- **Sequelize** ORM with **SQLite** (`dev.sqlite`)  
- **Passport.js** (`passport-local`) for session-based login  
- **Express-session** & **method-override**  
- **Tailwind CSS** (CDN) + Google Fonts (Inter & Poppins)  
- **nodemon** for development

---

## Setup & Installation

1. **Clone** your repo locally  
   ```bash
   git clone https://github.com/MrSparkiop/Project-Portfolio.git
   cd Project-Portfolio
