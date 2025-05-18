# Project Portfolio

A personal CV & portfolio website with an admin panel to manage content (projects, skills, experience, site settings, and contact messages) built with Node.js, Express, EJS, Tailwind CSS, MongoDB/Mongoose, and Passport.js.

---

## Features

- **Public site**  
  - Hero section with name, subtitle, profile image  
  - Skills & Tech Stack with animated progress bars  
  - Featured Projects grid with “View Project” links  
  - Experience timeline entries  
  - Social links rendered as styled pills  
  - AJAX-powered contact form with in-place confirmation banner  

- **Admin panel** (mounted at `/secret-admin-123`)  
  - Secure login/logout via Passport local strategy  
  - CRUD for Projects, Experiences, Skills  
  - Site Settings (site title, hero subtitle, resume URL, nav links, social links)  
  - View & delete Contact Messages submitted from the public form  
  - Responsive admin navbar with quick links & “View Site” button  

- **Error pages**  
  - Custom 404 and 500 pages sharing the same header/footer  

---

## Tech Stack

- **Server:** Node.js, Express  
- **Templating:** EJS  
- **Styling:** Tailwind CSS (via CDN)  
- **Database:** MongoDB with Mongoose ODM  
- **Auth:** Passport.js (LocalStrategy), express-session, bcryptjs  
- **Forms & AJAX:** `fetch` + JSON + express.json()  
- **Utilities:** method-override for PUT/DELETE, dotenv (optional)  

---

## Installation

1. Clone the repo:  
   ```bash
   git clone https://github.com/YourUser/Project-Portfolio.git
   cd Project-Portfolio
