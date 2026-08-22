const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- AUTHENTICATION ---
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return response.json();
};

export const register = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return response.json();
};

// --- AI SERVICE ---
export const analyzeMoodboard = async (payload) => {
  const response = await fetch(`${API_URL}/ai/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    throw new Error('Failed to analyze moodboard');
  }
  return response.json();
};

export const chatWithAI = async (messages, language = 'vi') => {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, language })
  });
  
  if (!response.ok) {
    throw new Error('Failed to chat');
  }
  return response.json();
};

// --- TRIPS ---
export const saveTrip = async (title, budgetLevel, durationDays, itinerary) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/trips`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, budgetLevel, durationDays, itinerary })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to save trip');
  }
  return response.json();
};

export const getMyTrips = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/trips`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch trips');
  }
  return response.json();
};
