# e‑Biz Technocrats Site Design

## 🌟 Project Overview
This repository hosts the **e‑Biz Technocrats** website – a modern, visually‑rich single‑page site showcasing the company’s services, certifications, and portfolio. The design features:
- A full‑width **hero section** with an animated video background and high‑contrast white text.
- **Quick‑cards** for services with dark overlays ensuring readability.
- A responsive layout that works on desktop, tablet, and mobile.
- Clean, semantic HTML and a single stylesheet (`index.css`) that leverages CSS custom properties, gradients, and smooth transitions.

## 🌐 Live Demo
Check out the live version of the site deployed on Vercel:
**[e-Biz Technocrats Site](https://e-biz-technocrats-site-design.vercel.app/)**

## ✨ Key Features
- **Animated hero video** with overlay for accessible text contrast.
- **Responsive design** using CSS Grid/Flexbox.
- **Service cards** with hover effects and clear call‑to‑action arrows.
- **Footer** with quick navigation links (privacy policy removed per request).
- **Asset‑rich** media folder containing images, icons, and the hero video.

## 🛠️ Tech Stack
- **HTML5** – semantic markup.
- **CSS3** – custom properties, gradients, animations.
- **JavaScript** – minimal, for any interactive elements (currently only the navigation toggle).

## 🚀 Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/Riya315/e-Biz-Technocrats-site-design.git
   cd e-Biz-Technocrats-site-design
   ```
2. **Open the site**
   - Simply open `index.html` in a browser.
   - Or serve it locally with a lightweight server (e.g., Python):
     ```bash
     python -m http.server 8000
     # then visit http://localhost:8000
     ```

## 📂 Project Structure
```
├─ index.html            # Main HTML page
├─ index.css             # Global stylesheet (hero, cards, footer, etc.)
├─ index.js              # Small JS for navigation toggling
├─ assets/               # Images, icons, and videos
│   ├─ images/          # All image assets
│   └─ videos/          # Hero background video
├─ README.md             # This file
└─ ... (other HTML pages like about‑us.html, blog‑detail.html, etc.)
```

## 🎨 Customization
- **Colors & Fonts** – edit the `:root` variables in `index.css` to change the theme.
- **Hero Video** – replace `assets/videos/hero-bg.mp4` with your own video; ensure the same filename or update the `<video>` source in `index.html`.
- **Service Cards** – modify the markup inside the `quick-card` section of `index.html` to add or remove services.

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes and push to your fork.
4. Open a Pull Request describing the changes.

## 📄 License
This project is **unlicensed** – feel free to use, modify, and distribute the code as you wish.

---
*Built with love for the e‑Biz Technocrats brand.*
