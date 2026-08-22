import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { analyzeMoodboard } from '../../src/services/api';

const MOODS = ['chill', 'adventurous', 'romantic', 'cultural', 'party'];
const COMPANIONS = ['solo', 'couple', 'family', 'friends'];
const PACES = ['relaxed', 'moderate', 'fast'];
const DIETS = ['none', 'vegetarian', 'vegan', 'halal', 'no-seafood'];
const TRANSPORTS = ['motorbike', 'grab', 'walking'];
const GOALS = ['exploration', 'relaxation', 'food', 'photography'];

const PillSelector = ({ label, options, selected, onSelect }) => (
  <View style={styles.pillContainer}>
    <Text style={styles.label}>{label}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll}>
      {options.map((opt) => (
        <TouchableOpacity 
          key={opt}
          style={[styles.pill, selected === opt && styles.pillSelected]}
          onPress={() => onSelect(opt)}
        >
          <Text style={[styles.pillText, selected === opt && styles.pillTextSelected]}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export default function Dashboard() {
  const router = useRouter();
  const [durationDays, setDurationDays] = useState('3');
  const [budgetVND, setBudgetVND] = useState('1500000');
  const [mood, setMood] = useState('chill');
  const [companion, setCompanion] = useState('solo');
  const [pace, setPace] = useState('moderate');
  const [dietary, setDietary] = useState('none');
  const [transport, setTransport] = useState('motorbike');
  const [primaryGoal, setPrimaryGoal] = useState('exploration');
  const [isScanning, setIsScanning] = useState(false);

  const handleAnalyze = async () => {
    if (!durationDays || !budgetVND) {
      Alert.alert('Error', 'Please fill in duration and budget');
      return;
    }

    setIsScanning(true);
    try {
      const payload = {
        durationDays: parseInt(durationDays, 10),
        budgetVND: parseInt(budgetVND, 10),
        mood,
        preferences: { companion, pace, dietary, transport, primaryGoal },
        language: 'en'
      };
      
      const result = await analyzeMoodboard(payload);
      // Navigate to planner
      router.push({
        pathname: '/(auth)/planner',
        params: { result: JSON.stringify(result) }
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to generate itinerary. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />
      <Text style={styles.header}>Plan Your Vibe</Text>
      <Text style={styles.subheader}>Tell us what you're looking for</Text>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duration (Days)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={durationDays}
            onChangeText={setDurationDays}
            placeholderTextColor="#64748b"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget per Day (VND)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={budgetVND}
            onChangeText={setBudgetVND}
            placeholderTextColor="#64748b"
          />
        </View>

        <PillSelector label="Mood" options={MOODS} selected={mood} onSelect={setMood} />
        <PillSelector label="Who's traveling?" options={COMPANIONS} selected={companion} onSelect={setCompanion} />
        <PillSelector label="Pace" options={PACES} selected={pace} onSelect={setPace} />
        <PillSelector label="Dietary Restrictions" options={DIETS} selected={dietary} onSelect={setDietary} />
        <PillSelector label="Transport" options={TRANSPORTS} selected={transport} onSelect={setTransport} />
        <PillSelector label="Primary Goal" options={GOALS} selected={primaryGoal} onSelect={setPrimaryGoal} />
      </View>

      <TouchableOpacity 
        style={styles.generateButton}
        onPress={handleAnalyze}
        disabled={isScanning}
      >
        {isScanning ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.generateButtonText}>Generate Itinerary</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617', // Dark space background
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
    textShadowColor: '#22d3ee',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subheader: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.2)',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#38bdf8', // Neon cyan label
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#f8fafc',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  pillContainer: {
    marginBottom: 24,
  },
  pillScroll: {
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  pillSelected: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)', // Light neon pink bg
    borderColor: '#ec4899', // Neon pink border
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  pillText: {
    color: '#64748b',
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#fbcfe8',
    fontWeight: 'bold',
    textShadowColor: '#ec4899',
    textShadowRadius: 5,
  },
  generateButton: {
    backgroundColor: '#22d3ee', // Bright Cyan button
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#67e8f9',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  generateButtonText: {
    color: '#082f49', // Dark text for contrast on cyan
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});
