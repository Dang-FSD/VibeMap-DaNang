import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
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
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 24,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  viewBtn: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
