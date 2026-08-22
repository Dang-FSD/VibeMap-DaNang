import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { saveTrip } from '../../src/services/api';

export default function Planner() {
  const router = useRouter();
  const { result } = useLocalSearchParams();
  
  let data: any = null;
  try {
    if (result) {
      const resultStr = Array.isArray(result) ? result[0] : result;
      data = JSON.parse(resultStr);
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
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Your Custom Itinerary</Text>
        {data.vibes && (
          <Text style={styles.subheader}>Vibes: {data.vibes.join(', ')}</Text>
        )}

        {data.itinerary && data.itinerary.map((day: any, idx: number) => (
          <View key={idx} style={styles.dayCard}>
            <Text style={styles.dayTitle}>Day {day.day}: {day.theme}</Text>
            
            {day.locations && day.locations.map((loc: any, locIdx: number) => (
              <View key={locIdx} style={styles.activityItem}>
                <Text style={styles.time}>{loc.duration || '2 hrs'}</Text>
                <View style={styles.actContent}>
                  <Text style={styles.actName}>{loc.name}</Text>
                  <Text style={styles.actLocation}>{loc.category || 'Location'}</Text>
                  <Text style={styles.actDesc}>{loc.description}</Text>
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
    backgroundColor: '#020617', // Deep space dark
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 16,
  },
  btn: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: '#22d3ee',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subheader: {
    fontSize: 14,
    color: '#38bdf8',
    marginBottom: 20,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dayCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)', // Neon pink hint
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ec4899', // Neon pink title
    marginBottom: 20,
    textShadowColor: 'rgba(236, 72, 153, 0.5)',
    textShadowRadius: 8,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  time: {
    width: 65,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#22d3ee', // Cyan time
    marginTop: 2,
  },
  actContent: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#38bdf8', // Neon cyan border
    paddingLeft: 16,
    position: 'relative',
  },
  actName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 4,
  },
  actLocation: {
    fontSize: 12,
    color: '#f472b6',
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  actDesc: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(2, 6, 23, 0.85)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(34, 211, 238, 0.2)',
  },
  saveButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38bdf8',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
