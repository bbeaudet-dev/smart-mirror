export interface WeatherData {
  current: {
    temperature: number | null;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    feelsLike: number;
    uvIndex: number;
    visibility: number;
    windDirection: string;
    pressure: number;
    gustSpeed: number;
    cloudCover: number;
    dewPoint: number;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
  error?: boolean;
  message?: string;
  location?: string;
  lastUpdated?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'appointment' | 'reminder';
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
}

export interface RoutineItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface HoroscopeData {
  sign: string;
  daily: string;
  luckyNumber: number;
  mood: string;
}



// Mock Calendar Data
export const calendarData: CalendarEvent[] = [
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
export const newsData: NewsItem[] = [
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
export const morningRoutine: RoutineItem[] = [
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

export const eveningRoutine: RoutineItem[] = [
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
export const horoscopeData: HoroscopeData = {
  sign: 'Libra',
  daily: 'Today brings harmony and balance to your relationships. Focus on communication and collaboration. Your diplomatic nature will help resolve any conflicts.',
  luckyNumber: 7,
  mood: 'Balanced and harmonious'
};


