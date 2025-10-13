# Getting Started with Mapbox

## 1. Get Your Free Mapbox Token

1. Go to [https://mapbox.com](https://mapbox.com)
2. Sign up for a free account
3. Go to your [Account page](https://account.mapbox.com/)
4. Copy your **Default public token**

## 2. Add Token to Environment

Create a `.env.local` file in your project root:

```bash
VITE_MAPBOX_TOKEN=your_token_here
```

## 3. Update MapView Component

Replace the placeholder token in `src/components/map/MapView.tsx`:

```typescript
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'your_token_here'
```

## 4. Features Included

- **Dark Cyberpunk Theme**: Uses Mapbox Dark style
- **Custom Markers**: Glowing markers that match your theme
- **Interactive Popups**: Property info on marker hover
- **Grid Overlay**: Optional cyberpunk grid effect
- **Navigation Controls**: Zoom, pan, reset view
- **Responsive**: Adapts to layout state changes
- **Property Selection**: Click markers to select listings

## 5. Customization Options

- **Map Style**: Change `style: 'mapbox://styles/mapbox/dark-v11'` to other styles
- **Center Location**: Modify `center: [-122.4194, 37.7749]` (San Francisco)
- **Zoom Level**: Adjust `zoom: 12` for initial view
- **Marker Colors**: Update marker colors in the component

## 6. Advanced Features (Future)

- **Clustering**: Group nearby markers
- **Heat Maps**: Show price density
- **Custom Layers**: School districts, crime data
- **3D Buildings**: Add building footprints
- **Real-time Updates**: Live property data

## 7. Troubleshooting

- **Token Issues**: Make sure your token is valid and has proper permissions
- **CORS Errors**: Ensure your domain is whitelisted in Mapbox settings
- **Performance**: Use marker clustering for 1000+ properties
- **Styling**: Custom CSS overrides in `mapbox-styles.css`
