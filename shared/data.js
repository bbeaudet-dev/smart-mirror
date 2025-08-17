// Mock Weather Data
const weatherData = {
  current: {
    temperature: 72,
    condition: 'Sunny',
    icon: '☀️'
  },
  forecast: [
    {
      day: 'Today',
      high: 78,
      low: 65,
      condition: 'Sunny',
      icon: '☀️'
    },
    {
      day: 'Tomorrow',
      high: 65,
      low: 52,
      condition: 'Rain',
      icon: '🌧️'
    },
    {
      day: 'Wednesday',
      high: 70,
      low: 58,
      condition: 'Partly Cloudy',
      icon: '⛅'
    }
  ]
};

// Mock Calendar Data
const calendarData = [
  {
    id: '1',
    title: 'Team Meeting',
    time: '9:00 AM',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Lunch with Sarah',
    time: '12:30 PM',
    type: 'appointment'
  },
  {
    id: '3',
    title: 'Gym',
    time: '6:00 PM',
    type: 'reminder'
  },
  {
    id: '4',
    title: 'Dentist Appointment',
    time: '2:00 PM',
    type: 'appointment'
  }
];

// Mock News Data
const newsData = [
  {
    id: '1',
    title: 'New AI Breakthrough in Renewable Energy',
    category: 'Technology',
    summary: 'Scientists develop more efficient solar panel technology using AI algorithms.'
  },
  {
    id: '2',
    title: 'Global Markets Show Strong Recovery',
    category: 'Business',
    summary: 'Stock markets worldwide demonstrate resilience despite economic challenges.'
  },
  {
    id: '3',
    title: 'SpaceX Successfully Launches New Satellite Constellation',
    category: 'Science',
    summary: 'Another milestone in space exploration and global internet connectivity.'
  },
  {
    id: '4',
    title: 'Climate Summit Reaches Historic Agreement',
    category: 'Environment',
    summary: 'World leaders commit to ambitious carbon reduction targets by 2030.'
  }
];

// Mock Routine Data
const morningRoutine = [
  {
    id: '1',
    task: 'Shower',
    completed: false
  },
  {
    id: '2',
    task: 'Make bed',
    completed: false
  },
  {
    id: '3',
    task: 'Pack lunch',
    completed: false
  },
  {
    id: '4',
    task: 'Take vitamins',
    completed: false
  }
];

const eveningRoutine = [
  {
    id: '1',
    task: 'Plan tomorrow',
    completed: false
  },
  {
    id: '2',
    task: 'Pack work bag',
    completed: false
  },
  {
    id: '3',
    task: 'Read 30 min',
    completed: false
  },
  {
    id: '4',
    task: 'Set alarm',
    completed: false
  }
];

// Mock Horoscope Data
const horoscopeData = {
  sign: 'Libra',
  daily: 'Today brings harmony and balance to your relationships. Focus on communication and collaboration. Your diplomatic nature will help resolve any conflicts.',
  luckyNumber: 7,
  mood: 'Balanced and harmonious'
};

// Outfit recommendation based on weather
const getOutfitRecommendation = (temperature, condition) => {
  if (temperature < 50) {
    return 'Heavy coat, scarf, and gloves';
  } else if (temperature < 65) {
    return 'Light jacket or sweater';
  } else if (temperature < 75) {
    return 'T-shirt and light pants';
  } else {
    return 'Shorts and tank top';
  }
};

module.exports = {
  weatherData,
  calendarData,
  morningRoutine,
  eveningRoutine,
  newsData,
  horoscopeData,
  getOutfitRecommendation
};
