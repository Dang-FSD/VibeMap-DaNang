import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
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
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Budget per Day (VND)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={budgetVND}
            onChangeText={setBudgetVND}
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
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  pillContainer: {
    marginBottom: 20,
  },
  pillScroll: {
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillSelected: {
    backgroundColor: '#e0f2fe',
    borderColor: '#38bdf8',
  },
  pillText: {
    color: '#64748b',
    fontWeight: '500',
  },
  pillTextSelected: {
    color: '#0369a1',
    fontWeight: 'bold',
  },
  generateButton: {
    backgroundColor: '#0ea5e9',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
