# CyberState MLS Dashboard

A futuristic, cyberpunk-styled real estate search interface built with React, TypeScript, and Tailwind CSS.

## Features

- **Cyberpunk Aesthetic**: Monochromatic green/amber themes with terminal styling
- **Fixed Layout**: 1920x1080 viewport with no scrolling
- **Interactive Components**: Property cards, photo carousel, data modules
- **Real-time Data**: Market pulse, neighborhood analytics, price comparisons
- **Responsive Design**: Mobile adaptation with drawer interfaces

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- Mapbox GL JS for mapping
- Recharts for data visualization

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Main layout components
│   ├── modules/         # Data visualization modules
│   ├── property/        # Property viewer components
│   └── ui/              # Reusable UI components
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Deployment

This project is configured for deployment on Vercel with the included `vercel.json` configuration.
