# Israeli Housing Lottery Map

A comprehensive React TypeScript application for exploring Israeli government housing lottery projects with interactive maps and advanced filtering capabilities.

## Features

- 🗺️ **Interactive Map**: Visualize housing lottery projects across Israel using Leaflet maps
- 🔍 **Advanced Filtering**: Filter by city, price, status, construction permits, and eligibility types
- 📊 **Real-time Statistics**: View project statistics including competition ratios and pricing
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌐 **Hebrew RTL Support**: Full right-to-left language support for Hebrew content
- 🎯 **Property Details**: Detailed information panels for each housing project

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI)
- **Maps**: Leaflet with React-Leaflet
- **State Management**: Zustand
- **Styling**: MUI Theme with RTL support
- **Data**: Israeli government housing lottery API integration

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- `src/components/` - React components organized by feature
- `src/types/` - TypeScript interfaces and type definitions
- `src/hooks/` - Custom React hooks for state management
- `src/utils/` - Utility functions for data processing and formatting
- `src/services/` - API services and data fetching logic

## Data Source

This application integrates with the Israeli government's housing lottery data API to provide real-time information about available housing projects, competition ratios, and project details.

## License

MIT License
