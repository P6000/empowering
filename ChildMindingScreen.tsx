import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const ChildMindingScreen = ({ navigation }: any) => {
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

        <Text style={styles.title}>Child Minding Course</Text>
        <Text style={styles.duration}>6 Weeks • R 750</Text>
        
        <Text style={styles.sectionTitle}>Course Purpose</Text>
        <Text style={styles.content}>
          To provide basic child and baby care skills for immediate employment opportunities.
        </Text>

        <Text style={styles.sectionTitle}>What You Will Learn</Text>
        <Text style={styles.content}>• Birth to six-month old baby needs and care</Text>
        <Text style={styles.content}>• Seven-month to one year old development needs</Text>
        <Text style={styles.content}>• Toddler needs and appropriate care techniques</Text>
        <Text style={styles.content}>• Educational toys and developmental activities</Text>
        <Text style={styles.content}>• Child safety and emergency procedures</Text>

        <TouchableOpacity 
          style={styles.enrollButton}
          onPress={() => navigation.navigate('Contact', { course: 'Child Minding' })}
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

export default ChildMindingScreen;