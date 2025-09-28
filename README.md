# Alimentação Inteligente APP (Demo Mode)

Demo-only version of a nutrition and fitness application built with Next.js 14.

## Features

- **Demo Mode Only**: Complete demo experience without external dependencies
- **Mobile-First**: Responsive design optimized for mobile devices
- **Next.js 14**: App Router with TypeScript
- **TailwindCSS**: Clean, modern styling
- **Lucide Icons**: Beautiful icons throughout the app

## Demo Mode Features

- **Home**: Large logo with demo entry and registration placeholder
- **Dashboard**: Overview cards with zero values
- **Workouts**: ✅ **FULLY FUNCTIONAL** - Complete CRUD with localStorage
- **Meal Analysis**: UI shown but locked with overlay
- **Chat**: Interface visible but disabled
- **Stats**: Charts/data shown with zero values
- **Profile**: Form visible but editing disabled
- **Subscription**: Locked page with call-to-action

## Getting Started

```bash
# Install dependencies
npm install

# Run development server  
npm run dev

# Build for production
npm run build
```

## Demo Mode Usage

1. Visit the home page (`/`)
2. Click "Entrar em modo Demonstração"
3. Explore the app - only **Workouts** section is fully unlocked
4. All data is stored locally in your browser

## Deployment

This project builds without any environment variables and deploys cleanly to Vercel:

```bash
npm run build
```

No external APIs or secrets required for the demo version.

## Project Structure

- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components  
- `src/lib/` - Demo mode utilities
- `public/` - Static assets (logo, etc.)

## Navigation

Bottom navbar appears only when in demo mode, providing access to:
- Início (Dashboard)
- Refeições (Meals) 🔒
- Treino (Workouts) ✅
- Estatísticas (Stats) 🔒  
- Perfil (Profile) 🔒
- Subscrição (Subscription) 🔒
