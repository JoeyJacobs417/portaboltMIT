# Portabolt/MLC — Batterij Management Platform

## Lokaal draaien

```bash
npm install
npm run dev
```

Open http://localhost:5173 — login met `admin` / `admin`.

## Builden voor productie

```bash
npm run build
```

De output staat in de `dist/` map.

## Deployen

### Vercel (aanbevolen)

1. Push dit project naar een GitHub repository
2. Ga naar https://vercel.com en log in met GitHub
3. Klik "Add New Project" en selecteer je repository
4. Vercel detecteert automatisch Vite — klik "Deploy"
5. Klaar! Je krijgt een URL zoals `portabolt-mlc.vercel.app`

### Netlify

1. Push naar GitHub
2. Ga naar https://netlify.com en klik "Add new site" → "Import from Git"
3. Selecteer je repository
4. Build command: `npm run build`, Publish directory: `dist`
5. Klik "Deploy"

### Azure Static Web Apps

1. Push naar GitHub
2. Ga naar Azure Portal → maak een Static Web App resource
3. Koppel je GitHub repo
4. App location: `/`, Output location: `dist`
5. Azure deployt automatisch bij elke push

## Structuur

```
portabolt-mlc/
├── index.html          # HTML entry point
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuratie
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Applicatie code
```
