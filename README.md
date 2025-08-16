# Smart Mirror Interface

A React-based smart mirror interface optimized for 16" 2.5K displays, designed for fullscreen viewing with a dark theme and high contrast for mirror visibility.

## Features

### 🕐 Time & Date Display

- Real-time clock updating every second
- Large, readable fonts with high contrast
- Prominent positioning at the top of the interface

### 🌤️ Weather Panel

- Current weather conditions with temperature and icons
- 3-day forecast with high/low temperatures
- Smart outfit recommendations based on weather data
- Mock data included for demonstration

### 📅 Calendar Integration

- Today's schedule display
- Event categorization (meetings, appointments, reminders)
- Color-coded event types with icons
- Summary statistics

### ✅ Daily Routines

- Time-based routine switching (morning 6-11 AM, evening 7-11 PM)
- Interactive checklist with progress tracking
- Morning routine: Shower, Make bed, Pack lunch, Take vitamins
- Evening routine: Plan tomorrow, Pack work bag, Read 30 min, Set alarm

### 📰 News Headlines

- Latest news with category filtering
- Technology, Business, Science, and Environment categories
- Color-coded category indicators
- News statistics and summaries

### 🔮 Daily Horoscope

- Zodiac sign display with mystical styling
- Daily reading with lucky numbers and mood indicators
- Interactive zodiac icons and cosmic theme

## Technical Features

- **Responsive Design**: Optimized for 16" 2.5K displays with mobile fallback
- **Dark Theme**: High contrast design for mirror visibility
- **Auto-refresh**: Content updates every 30 seconds
- **Smooth Animations**: Subtle transitions and hover effects
- **No User Interaction**: Pure display interface
- **TypeScript**: Full type safety and better development experience

## Layout Structure

```
┌─────────────────────────────────────┐
│           TIME & DATE               │
├─────────────┬─────────────┬─────────┤
│   WEATHER   │  CALENDAR   │ ROUTINE │
├─────────────┴─────────────┴─────────┤
│              NEWS                   │
├─────────────────────────────────────┤
│            HOROSCOPE                │
└─────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bbeaudet-dev/smart-mirror.git
cd smart-mirror
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the smart mirror interface.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/           # React components
│   ├── TimeDisplay.tsx   # Clock and date component
│   ├── WeatherPanel.tsx  # Weather information
│   ├── CalendarPanel.tsx # Schedule display
│   ├── RoutinePanel.tsx  # Daily routines
│   ├── NewsPanel.tsx     # News headlines
│   └── HoroscopePanel.tsx # Daily horoscope
├── data/
│   └── mockData.ts       # Mock data for all panels
├── App.tsx              # Main application component
├── App.css              # Main layout styles
└── index.css            # Global styles
```

## Customization

### Mock Data

All data is currently mock data located in `src/data/mockData.ts`. You can:

- Update weather information
- Modify calendar events
- Change news headlines
- Adjust routine tasks
- Update horoscope content

### Styling

The interface uses a dark theme with:

- Background: Dark gradient with subtle animations
- Text: White/light gray for high contrast
- Panels: Semi-transparent with backdrop blur
- Accent colors: Blue, green, pink, and purple themes

### Responsive Breakpoints

- **Desktop**: 3-column grid layout (optimized for 2.5K displays)
- **Tablet**: 2-column grid layout
- **Mobile**: Single column layout

## Future Enhancements

- [ ] Real API integration for weather data
- [ ] Calendar API integration (Google Calendar, Outlook)
- [ ] News API integration
- [ ] Voice commands
- [ ] Gesture controls
- [ ] Camera integration for mirror functionality
- [ ] Smart home integration
- [ ] Customizable layouts
- [ ] User preferences and settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by smart mirror projects and IoT home automation
- Built with React and TypeScript for modern web development
- Designed for optimal mirror visibility and user experience
