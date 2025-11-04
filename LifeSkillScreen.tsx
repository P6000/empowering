import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const LifeSkillsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#006400" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoMain}>EMPOWERING</Text>
            <Text style={styles.logoSub}>THE NATION</Text>
          </View>
        </View>

        <Text style={styles.title}>Life Skills Course</Text>
        <Text style={styles.duration}>6 Months • R 1500</Text>
        
        <Text style={styles.sectionTitle}>Course Purpose</Text>
        <Text style={styles.content}>
          To provide skills to navigate basic life necessities for personal and professional development.
        </Text>

        <Text style={styles.sectionTitle}>What You Will Learn</Text>
        <Text style={styles.content}>• Opening and managing bank accounts</Text>
        <Text style={styles.content}>• Basic labour law and workers' rights</Text>
        <Text style={styles.content}>• Basic reading and writing literacy</Text>
        <Text style={styles.content}>• Basic numeric and financial literacy</Text>
        <Text style={styles.content}>• Financial management and budgeting skills</Text>

        <TouchableOpacity 
          style={styles.enrollButton}
          onPress={() => navigation.navigate('Contact', { course: 'Life Skills' })}
        >
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Courses</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { padding: 20 },
  header: { backgroundColor: '#006400', paddingVertical: 16, paddingHorizontal: 20, marginBottom: 20 },
  logoContainer: { alignItems: 'center' },
  logoMain: { fontSize: 20, fontWeight: 'bold', color: 'white', letterSpacing: 1 },
  logoSub: { fontSize: 16, color: '#ffcc00', fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#006400', marginBottom: 8, textAlign: 'center' },
  duration: { fontSize: 18, color: '#666', textAlign: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#006400', marginTop: 20, marginBottom: 10 },
  content: { fontSize: 16, lineHeight: 24, color: '#666', marginBottom: 8 },
  enrollButton: { backgroundColor: '#006400', padding: 16, borderRadius: 8, marginTop: 20 },
  enrollButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  backButton: { backgroundColor: '#666', padding: 16, borderRadius: 8, marginTop: 10 },
  backButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default LifeSkillsScreen;