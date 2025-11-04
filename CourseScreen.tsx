import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const CourseScreen = ({ navigation }: any) => {
  const courses = [
    { name: 'First Aid', duration: '6 Months', fee: 1500, screen: 'FirstAid' },
    { name: 'Sewing', duration: '6 Months', fee: 1500, screen: 'Sewing' },
    { name: 'Landscaping', duration: '6 Months', fee: 1500, screen: 'Landscaping' },
    { name: 'Life Skills', duration: '6 Months', fee: 1500, screen: 'LifeSkills' },
    { name: 'Child Minding', duration: '6 Weeks', fee: 750, screen: 'ChildMinding' },
    { name: 'Cooking', duration: '6 Weeks', fee: 750, screen: 'Cooking' },
    { name: 'Garden Maintenance', duration: '6 Weeks', fee: 750, screen: 'GardenMaintenance' },
  ];

  const quickLinks = [
    { title: 'Home', screen: 'Home', icon: '🏠' },
    { title: 'About Us', screen: 'About', icon: 'ℹ️' },
    { title: 'Fee Calculator', screen: 'FeeCalculator', icon: '💰' },
    { title: 'Contact', screen: 'Contact', icon: '📞' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#006400" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoMain}>EMPOWERING</Text>
            <Text style={styles.logoSub}>THE NATION</Text>
          </View>
        </View>

        {/* Main Title */}
        <Text style={styles.title}>Our Courses</Text>
        <Text style={styles.subtitle}>
          Choose from our comprehensive range of skills development programs
        </Text>
        
        {/* Six Month Courses Section */}
        <Text style={styles.sectionTitle}>Six Month Professional Courses</Text>
        {courses.filter(course => course.duration === '6 Months').map((course, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.courseCard}
            onPress={() => navigation.navigate(course.screen as any)}
          >
            <View style={styles.courseHeader}>
              <Text style={styles.courseName}>{course.name}</Text>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{course.duration}</Text>
              </View>
            </View>
            <Text style={styles.courseFee}>R {course.fee}</Text>
            <Text style={styles.courseDescription}>
              {getCourseDescription(course.name)}
            </Text>
            <Text style={styles.learnMore}>Tap to learn more →</Text>
          </TouchableOpacity>
        ))}

        {/* Six Week Courses Section */}
        <Text style={styles.sectionTitle}>Six Weeks Short Courses</Text>
        {courses.filter(course => course.duration === '6 Weeks').map((course, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.courseCard}
            onPress={() => navigation.navigate(course.screen as any)}
          >
            <View style={styles.courseHeader}>
              <Text style={styles.courseName}>{course.name}</Text>
              <View style={[styles.durationBadge, styles.shortCourse]}>
                <Text style={styles.durationText}>{course.duration}</Text>
              </View>
            </View>
            <Text style={styles.courseFee}>R {course.fee}</Text>
            <Text style={styles.courseDescription}>
              {getCourseDescription(course.name)}
            </Text>
            <Text style={styles.learnMore}>Tap to learn more →</Text>
          </TouchableOpacity>
        ))}

        {/* Quick Navigation Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Navigation</Text>
          <View style={styles.quickLinksContainer}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickLink}
                onPress={() => navigation.navigate(link.screen as any)}
              >
                <Text style={styles.quickLinkIcon}>{link.icon}</Text>
                <Text style={styles.quickLinkText}>{link.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2022 Empowering the Nation. All rights reserved.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to get course descriptions
const getCourseDescription = (courseName: string) => {
  switch (courseName) {
    case 'First Aid':
      return 'First aid awareness and basic life support for professional certification.';
    case 'Sewing':
      return 'Alterations and new garment tailoring services for professional certification.';
    case 'Landscaping':
      return 'Landscaping services for new and established gardens with professional certification.';
    case 'Life Skills':
      return 'Skills to navigate basic life necessities for personal and professional development.';
    case 'Child Minding':
      return 'Basic child and baby care skills for immediate employment opportunities.';
    case 'Cooking':
      return 'Prepare and cook nutritious family meals for domestic employment.';
    case 'Garden Maintenance':
      return 'Basic knowledge of watering, pruning and planting in domestic gardens.';
    default:
      return 'Professional skills development course.';
  }
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  scrollContainer: { 
    paddingBottom: 20 
  },
  header: { 
    backgroundColor: '#006400', 
    paddingVertical: 16, 
    paddingHorizontal: 20, 
    marginBottom: 20 
  },
  logoContainer: { 
    alignItems: 'center' 
  },
  logoMain: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white', 
    letterSpacing: 1 
  },
  logoSub: { 
    fontSize: 16, 
    color: '#ffcc00', 
    fontWeight: '600' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#006400', 
    marginBottom: 10, 
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 15,
    marginLeft: 15,
  },
  courseCard: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 12, 
    marginVertical: 8,
    marginHorizontal: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#006400',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  courseName: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    flex: 1,
  },
  durationBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  shortCourse: {
    backgroundColor: '#e3f2fd',
  },
  durationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#006400',
  },
  courseFee: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#006400',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  learnMore: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  section: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  quickLink: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginVertical: 5,
    width: (width - 60) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  quickLinkIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8fe68fff',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#62a768ff',
    paddingVertical: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#bdc3c7',
    fontSize: 12,
  },
});

export default CourseScreen;