# 💕 Bubu Dudu Valentine's Day Website 💕

A cute and interactive Valentine's Day website featuring the adorable Bubu Dudu characters!

## ✨ Features

- 🐻 **Bubu Dudu Theme**: Decorated with cute Bubu Dudu GIFs and romantic colors
- 💖 **Interactive Question**: "Will you be my Valentine?" with Yes/No options
- 🎮 **Runaway No Button**: The "No" button runs away from your cursor - you can only say YES!
- 🖱️ **Custom Cursor**: Cute Bubu-style cursor that follows your mouse
- 🎉 **Celebration Page**: Beautiful success page with embedded YouTube video and confetti
- 💕 **Floating Hearts**: Animated hearts floating across the background
- ✨ **Sparkle Trail**: Sparkles follow your cursor movement

## 🚀 Live Demo

Visit: `https://YOUR_USERNAME.github.io/ValentineWebsite/`

## 📦 Deployment to GitHub Pages

### Option 1: Quick Deploy

1. Create a new repository on GitHub named `ValentineWebsite`
2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Valentine's Day website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ValentineWebsite.git
   git push -u origin main
   ```
3. Go to repository **Settings** → **Pages**
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Wait a few minutes and your site will be live!

### Option 2: Using GitHub CLI

```bash
gh repo create ValentineWebsite --public --source=. --remote=origin --push
```

Then enable GitHub Pages in repository settings.

## 🛠️ Local Development

Simply open `index.html` in your browser - no build process needed!

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

## 📁 Project Structure

```
ValentineWebsite/
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # Interactive JavaScript
└── README.md       # This file
```

## 💖 Made with Love

Send this to someone special and watch them try to click "No" 😄

Happy Valentine's Day! 🌹
