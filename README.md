# Yingpei Wang — AI & ML Systems Portfolio Website

A fast, responsive, and modern personal website tailored for an **AI / Machine Learning Engineer & Systems Researcher**, featuring:
- **Interactive Project Showcase**: High-performance LLMs, nanoGPT, JAX transformations, and GPT-2 reproduction with category filtering.
- **Lilian Weng & Distill-style Technical Notes**: Deep dives into FlashAttention-2 tiling, KV-cache dynamics, RoPE, and distributed training (ZeRO/FSDP).
- **LaTeX Math Rendering**: Instant mathematical formulas rendered using KaTeX ($\text{Attention}(\mathbf{Q}, \mathbf{K}, \mathbf{V})$).
- **Dark & Light Mode**: Smooth theme switcher with local storage persistence and system preference detection.
- **Printable Curriculum Vitae**: Clean `@media print` styling allowing 1-click PDF export or printing.
- **Zero-dependency Local Preview**: Instant local testing via Python 3's built-in web server.
- **Free GitHub Pages / Vercel Hosting**: Ready to deploy at `https://yingpeiwang.github.io`.

---

## 🚀 Quick Local Preview

To preview the website locally in your browser:

```bash
cd YingpeiWang.github.io
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your web browser.

---

## 🌐 Deploy to GitHub Pages (Free)

Because your GitHub username is `YingpeiWang`, GitHub gives you a free personal website URL at **`https://yingpeiwang.github.io`**!

### Step 1: Create the GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Set the repository name to exactly:
   ```
   YingpeiWang.github.io
   ```
3. Set the visibility to **Public** and leave "Add a README" unchecked.
4. Click **Create repository**.

### Step 2: Push Your Code
In your terminal, run:

```bash
cd /Users/yingpei/Documents/GitHub/YingpeiWang.github.io
git remote add origin https://github.com/YingpeiWang/YingpeiWang.github.io.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/YingpeiWang/YingpeiWang.github.io`
2. Click **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select *Deploy from a branch* (or *GitHub Actions* using the included workflow `.github/workflows/deploy.yml`).
   - **Branch**: Select `main` / `root`.
4. Click **Save**.
5. Your website will be live in 1-2 minutes at **`https://yingpeiwang.github.io`**!

---

## 📂 Project Structure

```
YingpeiWang.github.io/
├── index.html                  # Core portfolio, research pillars, projects, CV & notes
├── assets/
│   ├── css/
│   │   └── style.css           # Glassmorphism, card animations, KaTeX styles, print styles
│   └── js/
│       └── main.js             # Theme switcher, project filters, modal reader, copy utility
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
└── README.md                   # Setup and customization guide
```

---

## ✏️ Customization Guide

- **Update Bio / Tagline**: Edit the `<header>` block in [index.html](file:///Users/yingpei/Documents/GitHub/YingpeiWang.github.io/index.html).
- **Add / Edit Projects**: Add cards inside the `<div id="projects-grid">` in [index.html](file:///Users/yingpei/Documents/GitHub/YingpeiWang.github.io/index.html).
- **Add Technical Notes**: Add an `<article>` card in the `#notes` section and create corresponding `<template id="template-your-note-id">` at the bottom of [index.html](file:///Users/yingpei/Documents/GitHub/YingpeiWang.github.io/index.html). KaTeX formulas can be enclosed within `$$...$$` for block math or `$..$` for inline math.
- **Update CV & Skills**: Modify the `#resume` section in [index.html](file:///Users/yingpei/Documents/GitHub/YingpeiWang.github.io/index.html).
