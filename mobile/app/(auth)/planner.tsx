import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { saveTrip } from '../../src/services/api';

export default function Planner() {
  const router = useRouter();
  const { result } = useLocalSearchParams();
  
  let data = null;
  try {
    if (result) {
      data = JSON.parse(result);
    }
  } catch(e) {}

  const handleSave = async () => {
    if (!data) return;
    try {
      await saveTrip(
        data.vibes ? `Vibe Trip (${data.vibes[0]})` : 'My Custom Trip',
        'Moderate',
        data.itinerary.length,
        data.itinerary
      );
      Alert.alert('Success', 'Trip saved successfully!');
      router.push('/(auth)/trips');
    } catch (e) {
      Alert.alert('Error', 'Failed to save trip');
    }
  };

  if (!data) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No itinerary generated yet.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.push('/(auth)/dashboard')}>
          <Text style={styles.btnText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Your Custom Itinerary</Text>
        {data.vibes && (
          <Text style={styles.subheader}>Vibes: {data.vibes.join(', ')}</Text>
        )}

        {data.itinerary && data.itinerary.map((day, idx) => (
          <View key={idx} style={styles.dayCard}>
            <Text style={styles.dayTitle}>Day {day.day}: {day.theme}</Text>
            
            {day.activities.map((act, actIdx) => (
              <View key={actIdx} style={styles.activityItem}>
                <Text style={styles.time}>{act.time}</Text>
                <View style={styles.actContent}>
                  <Text style={styles.actName}>{act.name}</Text>
                  <Text style={styles.actLocation}>{act.location}</Text>
                  <Text style={styles.actDesc}>{act.description}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save to My Trips</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 16,
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
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subheader: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  dayCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  time: {
    width: 60,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    marginTop: 2,
  },
  actContent: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#e2e8f0',
    paddingLeft: 12,
  },
  actName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
  },
  actLocation: {
    fontSize: 12,
    color: '#0ea5e9',
    marginBottom: 4,
  },
  actDesc: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  saveButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
