import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getMyTrips } from '../../src/services/api';
import { Calendar, Map } from 'lucide-react-native';

export default function MyTrips() {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getMyTrips();
      setTrips(data.data || data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  const handleViewTrip = (trip) => {
    router.push({
      pathname: '/(auth)/planner',
      params: { 
        result: JSON.stringify({ itinerary: trip.itinerary, vibes: ['saved'] }) 
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <Text style={styles.header}>My Trips</Text>

      {trips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't saved any trips yet.</Text>
          <TouchableOpacity style={styles.btn} onPress={() => router.push('/(auth)/dashboard')}>
            <Text style={styles.btnText}>Plan a Trip</Text>
          </TouchableOpacity>
        </View>
      ) : (
        trips.map((trip) => (
          <View key={trip._id} style={styles.card}>
            <Text style={styles.title}>{trip.title || 'My Danang Trip'}</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Calendar size={16} color="#0ea5e9" />
                <Text style={styles.statText}>{trip.durationDays} Days</Text>
              </View>
              <View style={styles.stat}>
                <Map size={16} color="#0ea5e9" />
                <Text style={styles.statText}>{trip.itinerary?.length || 0} Days Plan</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewBtn}
              onPress={() => handleViewTrip(trip)}
            >
              <Text style={styles.viewBtnText}>View Itinerary</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // Deep space dark
  },
  content: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 24,
    textShadowColor: '#22d3ee',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#334155', // Darker dash
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38bdf8',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.2)',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#f8fafc',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#38bdf8', // Neon cyan text
    fontWeight: '700',
  },
  viewBtn: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ec4899', // Neon pink border
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  viewBtnText: {
    color: '#ec4899', // Neon pink text
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
