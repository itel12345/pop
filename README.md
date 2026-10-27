# Horizon Hotels — hotel-switching prototype

A front-end demo of a two-property hotel group site: a split-screen gateway, a homepage per hotel, and a persistent "Switch Hotel" control with a curtain transition between them. No build step, no backend. Booking buttons are visual only and never make a reservation.

## Structure
```
index.html      page markup
css/style.css   all styles (theme colors are CSS variables at the top)
js/main.js      hotel content (the `H` object), rendering, switching, interactions
```

## Run it
Open `index.html` in a browser, or use the Live Server extension in VS Code.

## Publish with GitHub Pages
Settings → Pages → Deploy from a branch → `main` / root.
Direct links: `/#a` opens Hotel A, `/#b` opens Hotel B.

## Editing
- Change copy, rooms and photos in the `H` object at the top of `js/main.js`.
- Photos load from Unsplash (internet required). Replace the IDs, or point `U()` at local files in an `images/` folder.
