import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Linking,
  Platform,
  Dimensions,
  Modal
} from 'react-native';

interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  courseInterests: string[];
  messageType: string;
  message: string;
}

interface ContactScreenProps {
  navigation: any;
  route?: any;
}

const ContactScreen: React.FC<ContactScreenProps> = ({ navigation, route }) => {
  const [form, setForm] = useState<ContactForm>({
    fullName: '',
    email: '',
    phone: '',
    courseInterests: [],
    messageType: '',
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const courseInterests = [
    { value: 'first_aid', label: 'First Aid', duration: '6 Months', price: 'R1500' },
    { value: 'sewing', label: 'Sewing', duration: '6 Months', price: 'R1500' },
    { value: 'landscaping', label: 'Landscaping', duration: '6 Months', price: 'R1500' },
    { value: 'life_skills', label: 'Life Skills', duration: '6 Months', price: 'R1500' },
    { value: 'child_minding', label: 'Child Minding', duration: '6 Weeks', price: 'R750' },
    { value: 'cooking', label: 'Cooking', duration: '6 Weeks', price: 'R750' },
    { value: 'garden_maintenance', label: 'Garden Maintenance', duration: '6 Weeks', price: 'R750' },
    { value: 'all_courses', label: 'All Courses', duration: 'Multiple', price: 'Various' },
    { value: 'not_sure', label: 'Not Sure Yet', duration: 'Need Guidance', price: 'TBD' }
  ];

  const messageTypes = [
    { value: '', label: 'Select inquiry type' },
    { value: 'admission', label: 'Admission Information' },
    { value: 'pricing', label: 'Course Pricing' },
    { value: 'schedule', label: 'Course Schedule' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'other', label: 'Other' }
  ];

  // Quick Links Data
  const quickLinks = [
    { title: 'Home', screen: 'Home', icon: '🏠' },
    { title: 'Courses', screen: 'Courses', icon: '📚' },
    { title: 'Fee Calculator', screen: 'FeeCalculator', icon: '💰' },
    { title: 'About Us', screen: 'About', icon: 'ℹ️' },
  ];

  const updateForm = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleCourseSelection = (courseValue: string) => {
    setForm(prev => {
      const currentInterests = prev.courseInterests;
      if (currentInterests.includes(courseValue)) {
        return {
          ...prev,
          courseInterests: currentInterests.filter(item => item !== courseValue)
        };
      } else {
        return {
          ...prev,
          courseInterests: [...currentInterests, courseValue]
        };
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    // Check required fields
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }

    // Phone validation (optional but if provided, validate)
    if (form.phone.trim() && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll to top to show errors
      return;
    }

    // Store the name for the success message
    setSubmittedName(form.fullName);
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Reset form but keep the name for display
    setForm({
      fullName: '',
      email: '',
      phone: '',
      courseInterests: [],
      messageType: '',
      message: ''
    });

    // Clear any existing errors
    setErrors({});
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedName('');
  };

  const makePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openMaps = () => {
    const address = 'Empowering+the+Nation+Training+Center,Braamfontein,Johannesburg,South+Africa';
    const url = Platform.OS === 'ios' 
      ? `http://maps.apple.com/?q=${address}`
      : `https://maps.google.com/?q=${address}`;
    
    Linking.openURL(url);
  };

  const openWhatsApp = () => {
    const phoneNumber = '27821234567';
    const message = 'Hello, I would like more information about your courses.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    Linking.openURL(url);
  };

  const getSelectedCoursesText = () => {
    if (form.courseInterests.length === 0) return 'No courses selected';
    if (form.courseInterests.length === 1) {
      const course = courseInterests.find(c => c.value === form.courseInterests[0]);
      return course ? course.label : '1 course selected';
    }
    return `${form.courseInterests.length} courses selected`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#006400" barStyle="light-content" />
      
      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={closeSuccessModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✅</Text>
            </View>
            
            <Text style={styles.modalTitle}>Message Sent Successfully!</Text>
            
            <Text style={styles.modalMessage}>
              Thank you <Text style={styles.highlightedName}>{submittedName}</Text>, 
              we will get back to you within 24 hours.
            </Text>
            
            <Text style={styles.modalNote}>
              Your message has been received and our team will contact you soon.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={closeSuccessModal}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => {
                  closeSuccessModal();
                  navigation.navigate('Home');
                }}
              >
                <Text style={styles.modalButtonSecondaryText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
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
          <Text style={styles.heroTitle}>Get In Touch</Text>
          <Text style={styles.heroSubtitle}>
            We're here to help you start your skills development journey
          </Text>
        </View>

        {/* Error Message */}
        {Object.keys(errors).length > 0 && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Please fix the following errors:</Text>
            {errors.fullName && <Text style={styles.errorText}>• {errors.fullName}</Text>}
            {errors.email && <Text style={styles.errorText}>• {errors.email}</Text>}
            {errors.phone && <Text style={styles.errorText}>• {errors.phone}</Text>}
            {errors.message && <Text style={styles.errorText}>• {errors.message}</Text>}
          </View>
        )}

        <View style={styles.contactContent}>
          
          {/* Contact Information */}
          <View style={styles.contactCard}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            
            {/* Address */}
            <View style={styles.contactItem}>
              <View style={styles.contactHeader}>
                <Text style={styles.contactIcon}>📍</Text>
                <Text style={styles.contactItemTitle}>Address</Text>
              </View>
              <Text style={styles.contactText}>
                Empowering the Nation Training Center{'\n'}
                123 Education Street{'\n'}
                Braamfontein{'\n'}
                Johannesburg, 2022{'\n'}
                South Africa
              </Text>
              
              <TouchableOpacity 
                style={styles.directionsButton}
                onPress={openMaps}
              >
                <Text style={styles.directionsButtonText}>Get Directions</Text>
              </TouchableOpacity>
            </View>

            {/* Phone */}
            <View style={styles.contactItem}>
              <View style={styles.contactHeader}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactItemTitle}>Phone</Text>
              </View>
              <TouchableOpacity onPress={() => makePhoneCall('+27111234567')}>
                <Text style={[styles.contactText, styles.clickableText]}>+27 11 123 4567</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openWhatsApp}>
                <Text style={[styles.contactText, styles.clickableText]}>
                  +27 82 123 4567 (WhatsApp)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.contactItem}>
              <View style={styles.contactHeader}>
                <Text style={styles.contactIcon}>📧</Text>
                <Text style={styles.contactItemTitle}>Email</Text>
              </View>
              <TouchableOpacity onPress={() => sendEmail('info@empoweringthenation.co.za')}>
                <Text style={[styles.contactText, styles.clickableText]}>
                  info@empoweringthenation.co.za
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sendEmail('admissions@empoweringthenation.co.za')}>
                <Text style={[styles.contactText, styles.clickableText]}>
                  admissions@empoweringthenation.co.za
                </Text>
              </TouchableOpacity>
            </View>

            {/* Social Media */}
            <View style={styles.contactItem}>
              <View style={styles.contactHeader}>
                <Text style={styles.contactIcon}>🌐</Text>
                <Text style={styles.contactItemTitle}>Follow Us</Text>
              </View>
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialLink}>
                  <Text style={styles.socialIcon}>📘</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLink}>
                  <Text style={styles.socialIcon}>📷</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLink}>
                  <Text style={styles.socialIcon}>🐦</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialLink}>
                  <Text style={styles.socialIcon}>💼</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Business Hours */}
            <View style={styles.businessHours}>
              <Text style={styles.businessHoursTitle}>🕒 Business Hours</Text>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Monday - Thursday:</Text>
                <Text style={styles.hourTime}>8:00 AM - 5:00 PM</Text>
              </View>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Friday:</Text>
                <Text style={styles.hourTime}>8:00 AM - 4:00 PM</Text>
              </View>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Saturday:</Text>
                <Text style={styles.hourTime}>9:00 AM - 1:00 PM</Text>
              </View>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Sunday:</Text>
                <Text style={styles.hourTime}>Closed</Text>
              </View>
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.contactCard}>
            <Text style={styles.cardTitle}>Send Us a Message</Text>
            <Text style={styles.cardSubtitle}>
              Fill out the form below and we'll get back to you within 24 hours
            </Text>

            {/* Full Name */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Full Name *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errors.fullName && styles.textInputError
                ]}
                value={form.fullName}
                onChangeText={(text) => updateForm('fullName', text)}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
              />
              {errors.fullName && (
                <Text style={styles.errorTextSmall}>{errors.fullName}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email Address *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errors.email && styles.textInputError
                ]}
                value={form.email}
                onChangeText={(text) => updateForm('email', text)}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorTextSmall}>{errors.email}</Text>
              )}
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Phone Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errors.phone && styles.textInputError
                ]}
                value={form.phone}
                onChangeText={(text) => updateForm('phone', text)}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
              {errors.phone && (
                <Text style={styles.errorTextSmall}>{errors.phone}</Text>
              )}
            </View>

            {/* Course Interest - MULTIPLE SELECTION */}
            <View style={styles.formGroup}>
              <View style={styles.courseSelectionHeader}>
                <Text style={styles.formLabel}>Course Interests</Text>
                <Text style={styles.selectedCount}>
                  {getSelectedCoursesText()}
                </Text>
              </View>
              <Text style={styles.courseSelectionSubtitle}>
                Select one or more courses you're interested in
              </Text>
              
              <View style={styles.courseGrid}>
                {courseInterests.map((course, index) => (
                  <TouchableOpacity
                    key={course.value}
                    style={[
                      styles.courseOption,
                      form.courseInterests.includes(course.value) && styles.courseOptionSelected
                    ]}
                    onPress={() => toggleCourseSelection(course.value)}
                  >
                    <View style={styles.courseOptionHeader}>
                      <View style={[
                        styles.courseCheckbox,
                        form.courseInterests.includes(course.value) && styles.courseCheckboxSelected
                      ]}>
                        {form.courseInterests.includes(course.value) && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </View>
                      <Text style={[
                        styles.courseName,
                        form.courseInterests.includes(course.value) && styles.courseNameSelected
                      ]}>
                        {course.label}
                      </Text>
                    </View>
                    <View style={styles.courseDetails}>
                      <Text style={styles.courseDuration}>{course.duration}</Text>
                      <Text style={styles.coursePrice}>{course.price}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Message Type */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Type of Inquiry</Text>
              <View style={styles.pickerContainer}>
                {messageTypes.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.pickerOption,
                      form.messageType === item.value && styles.pickerOptionSelected
                    ]}
                    onPress={() => updateForm('messageType', item.value)}
                  >
                    <Text style={[
                      styles.pickerOptionText,
                      form.messageType === item.value && styles.pickerOptionTextSelected
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Message */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Message *</Text>
              <TextInput
                style={[
                  styles.textInput,
                  styles.textArea,
                  errors.message && styles.textInputError
                ]}
                value={form.message}
                onChangeText={(text) => updateForm('message', text)}
                placeholder="Tell us about your inquiry or questions..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              {errors.message && (
                <Text style={styles.errorTextSmall}>{errors.message}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>🚨 Urgent Admissions</Text>
          <Text style={styles.emergencyText}>
            For immediate assistance with course admissions or urgent inquiries, call us directly:
          </Text>
          <TouchableOpacity onPress={() => makePhoneCall('+27821234567')}>
            <Text style={styles.emergencyPhone}>+27 82 123 4567</Text>
          </TouchableOpacity>
          <Text style={styles.emergencyText}>Available during business hours</Text>
        </View>

        {/* Quick Navigation */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Navigation</Text>
          <Text style={styles.quickLinksSubtitle}>
            Explore more of what we offer
          </Text>
          <View style={styles.quickLinksContainer}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickLink}
                onPress={() => navigation.navigate(link.screen)}
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
          <Text style={styles.footerSubtext}>
            Transforming lives through skills development
          </Text>
          
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  highlightedName: {
    fontWeight: 'bold',
    color: '#006400',
  },
  modalNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#006400',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#006400',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonSecondaryText: {
    color: '#006400',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Error Message Styles
  errorMessage: {
    backgroundColor: '#FFEAA7',
    margin: 16,
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#E17055',
  },
  errorIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D63031',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#D63031',
    marginBottom: 4,
  },
  errorTextSmall: {
    fontSize: 12,
    color: '#D63031',
    marginTop: 4,
    fontStyle: 'italic',
  },
  contactContent: {
    padding: 16,
    gap: 20,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactItem: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  contactItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  clickableText: {
    color: '#2196F3',
  },
  directionsButton: {
    backgroundColor: '#006400',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  directionsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  socialLink: {
    width: 40,
    height: 40,
    backgroundColor: '#006400',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 16,
    color: 'white',
  },
  businessHours: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  businessHoursTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 12,
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hourDay: {
    fontSize: 14,
    color: '#666',
  },
  hourTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textInputError: {
    borderColor: '#D63031',
    backgroundColor: '#FFEAA7',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  // Course Selection Styles
  courseSelectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedCount: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  courseSelectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  courseOption: {
    width: (Dimensions.get('window').width - 80) / 2,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  courseOptionSelected: {
    backgroundColor: '#E8F5E8',
    borderColor: '#006400',
  },
  courseOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#006400',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  courseCheckboxSelected: {
    backgroundColor: '#006400',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  courseNameSelected: {
    color: '#006400',
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDuration: {
    fontSize: 12,
    color: '#666',
  },
  coursePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#006400',
  },
  // Message Type Picker
  pickerContainer: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  pickerOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerOptionSelected: {
    backgroundColor: '#E8F5E8',
  },
  pickerOptionText: {
    fontSize: 16,
    color: '#666',
  },
  pickerOptionTextSelected: {
    color: '#006400',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#006400',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emergencySection: {
    backgroundColor: '#FFF3CD',
    padding: 20,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  emergencyPhone: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  // Quick Links Styles
  quickLinksSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  quickLinksSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 15,
  },
  quickLink: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    width: (Dimensions.get('window').width - 70) / 2,
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
    fontSize: 32,
    marginBottom: 12,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  // Footer Styles
  footer: {
    backgroundColor: '#006400',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#ffcc00',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footerSubtext: {
    color: '#ecf0f1',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  footerLink: {
    color: '#ffcc00',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ContactScreen;