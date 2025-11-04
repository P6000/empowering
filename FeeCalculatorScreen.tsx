import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';

interface Course {
  id: string;
  name: string;
  duration: string;
  price: number;
  type: '6-month' | '6-week';
  selected: boolean;
}

interface FeeCalculatorScreenProps {
  navigation: any;
  route?: any;
}

const FeeCalculatorScreen: React.FC<FeeCalculatorScreenProps> = ({ navigation, route }) => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'first_aid',
      name: 'First Aid',
      duration: '6 Months',
      price: 1500,
      type: '6-month',
      selected: false
    },
    {
      id: 'sewing',
      name: 'Sewing',
      duration: '6 Months',
      price: 1500,
      type: '6-month',
      selected: false
    },
    {
      id: 'landscaping',
      name: 'Landscaping',
      duration: '6 Months',
      price: 1500,
      type: '6-month',
      selected: false
    },
    {
      id: 'life_skills',
      name: 'Life Skills',
      duration: '6 Months',
      price: 1500,
      type: '6-month',
      selected: false
    },
    {
      id: 'child_minding',
      name: 'Child Minding',
      duration: '6 Weeks',
      price: 750,
      type: '6-week',
      selected: false
    },
    {
      id: 'cooking',
      name: 'Cooking',
      duration: '6 Weeks',
      price: 750,
      type: '6-week',
      selected: false
    },
    {
      id: 'garden_maintenance',
      name: 'Garden Maintenance',
      duration: '6 Weeks',
      price: 750,
      type: '6-week',
      selected: false
    }
  ]);

  const [calculation, setCalculation] = useState({
    showResults: false,
    courseCount: 0,
    subtotal: 0,
    vatAmount: 0,
    discountAmount: 0,
    discountRate: 0,
    amountAfterDiscount: 0,
    totalAmount: 0
  });

  // Handle preselected course from navigation
  useEffect(() => {
    if (route.params?.preselectedCourse) {
      const preselected = route.params.preselectedCourse;
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.name.toLowerCase().replace(' ', '') === preselected.toLowerCase()
            ? { ...course, selected: true }
            : course
        )
      );
    }
  }, [route.params]);

  const toggleCourseSelection = (courseId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, selected: !course.selected }
          : course
      )
    );
  };

  const calculateFees = () => {
    const selectedCourses = courses.filter(course => course.selected);
    
    if (selectedCourses.length === 0) {
      Alert.alert('No Courses Selected', 'Please select at least one course to calculate fees.');
      return;
    }

    // Calculate subtotal (excluding VAT)
    const subtotal = selectedCourses.reduce((sum, course) => sum + course.price, 0);

    // Calculate VAT (15%) on subtotal - BEFORE discount
    const vatAmount = subtotal * 0.15;

    // Calculate discount based on number of courses
    let discountRate = 0;
    if (selectedCourses.length === 2) {
      discountRate = 0.05; // 5%
    } else if (selectedCourses.length === 3) {
      discountRate = 0.10; // 10%
    } else if (selectedCourses.length >= 4) {
      discountRate = 0.15; // 15%
    }

    // Apply discount to subtotal + VAT
    const totalBeforeDiscount = subtotal + vatAmount;
    const discountAmount = totalBeforeDiscount * discountRate;
    const amountAfterDiscount = totalBeforeDiscount - discountAmount;

    setCalculation({
      showResults: true,
      courseCount: selectedCourses.length,
      subtotal,
      vatAmount,
      discountAmount,
      discountRate,
      amountAfterDiscount,
      totalAmount: amountAfterDiscount
    });
  };

  const resetCalculator = () => {
    setCourses(prevCourses => 
      prevCourses.map(course => ({ ...course, selected: false }))
    );
    setCalculation({
      showResults: false,
      courseCount: 0,
      subtotal: 0,
      vatAmount: 0,
      discountAmount: 0,
      discountRate: 0,
      amountAfterDiscount: 0,
      totalAmount: 0
    });
  };

  const selectedCoursesCount = courses.filter(course => course.selected).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#006400" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoMain}>EMPOWERING</Text>
          <Text style={styles.logoSub}>THE NATION</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Course Fee Calculator</Text>
          <Text style={styles.heroSubtitle}>
            Calculate your investment in skills development with automatic discounts
          </Text>
        </View>

        <View style={styles.calculatorLayout}>
          
          {/* Course Selection Card */}
          <View style={styles.calculatorCard}>
            <Text style={styles.cardTitle}>Select Your Courses</Text>
            <Text style={styles.cardSubtitle}>Choose one or more courses:</Text>

            {/* Course List */}
            <View style={styles.courseList}>
              {courses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={[
                    styles.courseCheckbox,
                    course.selected && styles.courseCheckboxSelected
                  ]}
                  onPress={() => toggleCourseSelection(course.id)}
                >
                  <View style={[
                    styles.checkbox,
                    course.selected && styles.checkboxSelected
                  ]}>
                    {course.selected && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseDuration}>{course.duration}</Text>
                  </View>
                  
                  <Text style={styles.coursePrice}>R {course.price}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* VAT Note */}
            <View style={styles.vatNote}>
              <Text style={styles.vatNoteText}>
                <Text style={styles.vatNoteBold}>Note:</Text> 15% VAT is calculated first, then discounts are applied to the total amount.
              </Text>
            </View>

            <View style={styles.discountInfo}>
              <Text style={styles.discountInfoTitle}>Discount Structure:</Text>
              <Text style={styles.discountInfoItem}>• 2 courses: 5% discount</Text>
              <Text style={styles.discountInfoItem}>• 3 courses: 10% discount</Text>
              <Text style={styles.discountInfoItem}>• 4+ courses: 15% discount</Text>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity 
              style={[
                styles.calculateButton,
                selectedCoursesCount === 0 && styles.calculateButtonDisabled
              ]}
              onPress={calculateFees}
              disabled={selectedCoursesCount === 0}
            >
              <Text style={styles.calculateButtonText}>
                Calculate Total Fees ({selectedCoursesCount} selected)
              </Text>
            </TouchableOpacity>

            {selectedCoursesCount > 0 && (
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetCalculator}
              >
                <Text style={styles.resetButtonText}>Reset Selection</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Results Card */}
          {calculation.showResults && (
            <View style={styles.calculatorCard}>
              <Text style={styles.cardTitle}>Fee Breakdown</Text>
              
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultTitle}>Fee Calculation Result</Text>
                  <Text style={styles.resultSubtitle}>
                    VAT calculated before discount application
                  </Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Selected Courses:</Text>
                  <Text style={styles.resultValue}>
                    {calculation.courseCount} course{calculation.courseCount > 1 ? 's' : ''}
                  </Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Subtotal (excl. VAT):</Text>
                  <Text style={styles.resultValue}>R {calculation.subtotal.toFixed(2)}</Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>VAT (15%):</Text>
                  <Text style={styles.resultValue}>R {calculation.vatAmount.toFixed(2)}</Text>
                </View>

                <View style={styles.resultItem}>
                  <Text style={styles.resultLabel}>Total Before Discount:</Text>
                  <Text style={styles.resultValue}>
                    R {(calculation.subtotal + calculation.vatAmount).toFixed(2)}
                  </Text>
                </View>

                {calculation.discountAmount > 0 && (
                  <View style={styles.resultItem}>
                    <Text style={styles.resultLabel}>
                      Discount ({calculation.discountRate * 100}%):
                    </Text>
                    <Text style={[styles.resultValue, styles.discountText]}>
                      -R {calculation.discountAmount.toFixed(2)}
                    </Text>
                  </View>
                )}

                <View style={styles.resultTotal}>
                  <Text style={styles.resultTotalLabel}>Total Amount Due:</Text>
                  <Text style={styles.resultTotalValue}>R {calculation.totalAmount.toFixed(2)}</Text>
                </View>

                {/* Savings Info */}
                {calculation.discountAmount > 0 && (
                  <View style={styles.savingsSection}>
                    <Text style={styles.savingsText}>
                      You save: R {calculation.discountAmount.toFixed(2)}
                    </Text>
                  </View>
                )}

                {/* Action Buttons */}
                <View style={styles.resultActions}>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => navigation.navigate('Contact', { 
                      calculatedAmount: calculation.totalAmount,
                      selectedCourses: courses.filter(c => c.selected).map(c => c.name)
                    })}
                  >
                    <Text style={styles.contactButtonText}>Contact Us</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.coursesButton}
                    onPress={() => navigation.navigate('Courses')}
                  >
                    <Text style={styles.coursesButtonText}>Browse Courses</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Default State - Only show when no results */}
          {!calculation.showResults && (
            <View style={styles.calculatorCard}>
              <Text style={styles.cardTitle}>Fee Breakdown</Text>
              
              <View style={styles.defaultState}>
                <View style={styles.defaultHeader}>
                  <Text style={styles.defaultTitle}>Ready to Calculate?</Text>
                  <Text style={styles.defaultSubtitle}>
                    Select courses to see your pricing with VAT calculated before discounts
                  </Text>
                </View>
                
                <View style={styles.calculationExample}>
                  <Text style={styles.exampleTitle}>Calculation Method:</Text>
                  <Text style={styles.exampleStep}>1. Calculate course subtotal</Text>
                  <Text style={styles.exampleStep}>2. Add 15% VAT to subtotal</Text>
                  <Text style={styles.exampleStep}>3. Apply discount to total amount</Text>
                  <Text style={styles.exampleStep}>4. Display final amount due</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Quick Navigation */}
        <View style={styles.quickNav}>
          <Text style={styles.quickNavTitle}>Need More Information?</Text>
          <View style={styles.navButtons}>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigation.navigate('Courses')}
            >
              <Text style={styles.navButtonText}>Browse All Courses</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => navigation.navigate('Contact')}
            >
              <Text style={styles.navButtonText}>Contact Our Team</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#006400',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoMain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  logoSub: {
    fontSize: 16,
    color: '#ffcc00',
    fontWeight: '600',
  },
  heroSection: {
    backgroundColor: '#006400',
    padding: 30,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    lineHeight: 22,
  },
  calculatorLayout: {
    padding: 16,
    gap: 20,
  },
  calculatorCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderTopWidth: 5,
    borderTopColor: '#ffcc00',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006400',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  courseList: {
    marginBottom: 16,
  },
  courseCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  courseCheckboxSelected: {
    borderColor: '#006400',
    backgroundColor: '#E8F5E8',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#006400',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#006400',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  courseDuration: {
    fontSize: 14,
    color: '#666',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
  },
  vatNote: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  vatNoteText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 18,
  },
  vatNoteBold: {
    fontWeight: 'bold',
  },
  discountInfo: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  discountInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  discountInfoItem: {
    fontSize: 14,
    color: '#E65100',
    lineHeight: 18,
  },
  calculateButton: {
    backgroundColor: '#006400',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  calculateButtonDisabled: {
    backgroundColor: '#ccc',
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#006400',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  discountText: {
    color: '#4CAF50',
  },
  resultTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#006400',
  },
  resultTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
  },
  resultTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
  },
  savingsSection: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  contactButton: {
    flex: 1,
    backgroundColor: '#006400',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  coursesButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  coursesButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  defaultState: {
    alignItems: 'center',
    padding: 20,
  },
  defaultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  defaultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  defaultSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  calculationExample: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  exampleStep: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  quickNav: {
    backgroundColor: '#f8f9fa',
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  quickNavTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 16,
  },
  navButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  navButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 160,
  },
  navButtonText: {
    color: '#004d00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FeeCalculatorScreen;