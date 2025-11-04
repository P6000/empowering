import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Courses: undefined;
  FeeCalculator: undefined;
  Contact: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'About'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Timeline Data
const timelineData = [
  {
    year: '2022 - Foundation',
    description: 'Founded by Precious Radebe to address skills gaps in Johannesburg. Started with domestic worker and gardener training programs.'
  },
  {
    year: '2023 - First Expansion',
    description: 'Added new courses and trained hundreds of students. Established partnerships with local employers for job placements.'
  },
  {
    year: '2024 - Digital Transformation',
    description: 'Launched online platforms and expanded course offerings. Reached milestone of training over 1,000 students.'
  },
  {
    year: '2025 - National Recognition',
    description: 'Awarded for excellence in skills development. Expanded training centers across Johannesburg with advanced facilities.'
  },
  {
    year: '2026 - Future Vision',
    description: 'Planning international partnerships and advanced certification programs. Targeting 5,000 students trained by 2026.'
  }
];

// Stats Data
const statsData = [
  { number: 1000, label: 'Students Trained', suffix: '+' },
  { number: 85, label: 'Employment Rate', suffix: '%' },
  { number: 7, label: 'Courses Offered', suffix: '' },
  { number: 25, label: 'Partner Companies', suffix: '+' }
];

// Gallery Data
const galleryData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Classroom Learning Sessions'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Graduation Ceremony 2024'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Hands-on Practical Training'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1583512603861-d63d6c43bac9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Community Outreach Program'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Student Success Stories'
  }
];

// Team Data - Updated with Precious Radebe's actual photo
const teamData = [
  {
    id: '1',
    name: 'Precious Radebe',
    role: 'Founder & Director',
    description: 'Visionary leader dedicated to empowering communities through skills development and education. Founded Empowering the Nation in 2022 to address skills gaps and create opportunities for domestic workers and gardeners.',
    image: '/assets/precious.jpg'
  },
  {
    
    id: '2',
    name: 'Mr. James Mbeki',
    role: 'Academic Director',
    description: '15+ years in vocational training and curriculum development for adult learners. Specializes in creating practical, employment-focused training programs.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    name: 'Mr. robert sighn',
    role: 'Student Support Manager',
    description: 'Dedicated to ensuring every student receives personalized support throughout their journey. Manages student welfare and career placement services.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
];

// Testimonials Data
const testimonialsData = [
  {
    id: '1',
    quote: '"Empowering the Nation gave me skills that changed my life. I went from domestic worker to running my own small catering business!"',
    author: 'Maria Shabangu',
    role: 'Cooking Graduate 2023'
  },
  {
    id: '2',
    quote: '"The landscaping course helped me start my own garden maintenance service. I now employ two assistants and have regular clients."',
    author: 'Thomas Moloi',
    role: 'Landscaping Graduate 2023'
  },
  {
    id: '3',
    quote: '"As an employer, I always look for Empowering the Nation graduates. Their training is practical and their work ethic is exceptional."',
    author: 'Mrs. van der Merwe',
    role: 'Regular Employer Partner'
  }
];

// Quick Links Data
const quickLinks = [
  { title: 'Home', screen: 'Home', icon: '🏠' },
  { title: 'Courses', screen: 'Courses', icon: '📚' },
  { title: 'Fee Calculator', screen: 'FeeCalculator', icon: '💰' },
  { title: 'Contact', screen: 'Contact', icon: '📞' },
];

const AboutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderTimelineItem = ({ item, index }: { item: any; index: number }) => (
    <View style={[
      styles.timeline,
      index % 2 === 0 ? styles.timelineLeft : styles.timelineRight
    ]}>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineYear}>{item.year}</Text>
        <Text style={styles.timelineDescription}>{item.description}</Text>
      </View>
      <View style={styles.timelineDot} />
    </View>
  );

  const renderStatItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.statItem}>
      <View style={styles.statCircle}>
        <Text style={styles.statNumber}>{item.number}{item.suffix}</Text>
      </View>
      <Text style={styles.statLabel}>{item.label}</Text>
      <Text style={styles.statSubtext}>Since our establishment in 2022</Text>
    </View>
  );

  const renderGalleryItem = ({ item }: { item: any }) => (
    <View style={styles.galleryItem}>
      <Image source={{ uri: item.image }} style={styles.galleryImage} />
      <View style={styles.imageOverlay}>
        <Text style={styles.overlayText}>{item.title}</Text>
      </View>
    </View>
  );

  const renderTeamMember = ({ item }: { item: any }) => (
    <View style={styles.teamMember}>
      <View style={styles.memberImage}>
        <Image source={{ uri: item.image }} style={styles.teamImage} />
        {item.id === '1' && (
          <View style={styles.founderBadge}>
            <Text style={styles.founderBadgeText}>FOUNDER</Text>
          </View>
        )}
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
        <Text style={styles.memberDescription}>{item.description}</Text>
        <View style={styles.memberSocial}>
          <TouchableOpacity style={styles.socialIcon}>
            <Text style={styles.socialText}>in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Text style={styles.socialText}>✉</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Text style={styles.socialText}>📘</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTestimonialDot = (index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.testimonialDot,
        currentTestimonial === index && styles.testimonialDotActive
      ]}
      onPress={() => setCurrentTestimonial(index)}
    />
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.setValue(event.nativeEvent.contentOffset.y);
  };

  const parallaxHeader = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -150],
    extrapolate: 'clamp',
  });

  return (
    <ScrollView 
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoMain}>EMPOWERING</Text>
          <Text style={styles.logoSub}>THE NATION</Text>
        </View>
        <View style={styles.nav}>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.navText}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navText, styles.activeNav]}>ABOUT US</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Courses')}
          >
            <Text style={styles.navText}>COURSES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('FeeCalculator')}
          >
            <Text style={styles.navText}>FEE CALCULATOR</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Contact')}
          >
            <Text style={styles.navText}>CONTACT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Parallax Hero */}
      <Animated.View style={[
        styles.parallaxHero,
        { transform: [{ translateY: parallaxHeader }] }
      ]}>
        <View style={styles.heroOverlay} />
        <Animated.View 
          style={[
            styles.heroContent,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.heroTitle}>Our Legacy of Empowerment</Text>
          <Text style={styles.heroSubtitle}>
            Transforming communities through innovative skills development since 2022
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Founder Spotlight Section */}
      <View style={styles.founderSection}>
        <Text style={styles.sectionTitle}>Meet Our Founder</Text>
        <View style={styles.founderContainer}>
          <View style={styles.founderImageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }}
              style={styles.founderImage}
            />
            <View style={styles.founderImageBadge}>
              <Text style={styles.founderImageBadgeText}>FOUNDER & CEO</Text>
            </View>
          </View>
          <View style={styles.founderInfo}>
            <Text style={styles.founderName}>Precious Radebe</Text>
            <Text style={styles.founderTitle}>Visionary Leader & Social Entrepreneur</Text>
            <Text style={styles.founderBio}>
              Precious Radebe founded Empowering the Nation in 2022 with a vision to transform 
              lives through practical skills development. With a background in community 
              development and a passion for education, she recognized the untapped potential 
              in domestic workers and gardeners across Johannesburg.
            </Text>
            <Text style={styles.founderBio}>
              Her innovative approach to vocational training has helped over 1,000 students 
              gain valuable skills, start their own businesses, or secure better employment 
              opportunities. Under her leadership, the organization has grown from a small 
              community initiative to a recognized skills development center.
            </Text>
            <View style={styles.founderQuote}>
              <Text style={styles.founderQuoteText}>
                "Every person deserves the opportunity to learn, grow, and build a better future 
                for themselves and their families. Education is the most powerful tool we have 
                to break cycles of poverty."
              </Text>
              <Text style={styles.founderQuoteAuthor}>- Precious Radebe</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Timeline Section */}
      <View style={styles.timelineSection}>
        <Text style={styles.sectionTitle}>Our Journey</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineLine} />
          {timelineData.map((item, index) => (
            <View key={index} style={[
              styles.timelineItemContainer,
              index % 2 === 0 ? styles.timelineLeft : styles.timelineRight
            ]}>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineYear}>{item.year}</Text>
                <Text style={styles.timelineDescription}>{item.description}</Text>
              </View>
              <View style={styles.timelineDot} />
            </View>
          ))}
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, styles.whiteText]}>Our Impact in Real Numbers</Text>
        <FlatList
          data={statsData}
          renderItem={renderStatItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.statsGrid}
        />
      </View>

      {/* Gallery Section */}
      <View style={styles.gallerySection}>
        <Text style={styles.sectionTitle}>Through the Years</Text>
        <FlatList
          data={galleryData}
          renderItem={renderGalleryItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.galleryGrid}
        />
      </View>

      {/* Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.sectionTitle}>Leadership Team</Text>
        <FlatList
          data={teamData}
          renderItem={renderTeamMember}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.teamList}
        />
      </View>

      {/* Testimonials Section */}
      <View style={styles.testimonialsSection}>
        <Text style={[styles.sectionTitle, styles.whiteText]}>What Our Community Says</Text>
        <View style={styles.testimonialContainer}>
          <Text style={styles.testimonialQuote}>
            {testimonialsData[currentTestimonial].quote}
          </Text>
          <Text style={styles.testimonialAuthor}>
            {testimonialsData[currentTestimonial].author}
          </Text>
          <Text style={styles.testimonialRole}>
            {testimonialsData[currentTestimonial].role}
          </Text>
        </View>
        <View style={styles.testimonialDots}>
          {testimonialsData.map((_, index) => renderTestimonialDot(index))}
        </View>
      </View>

      {/* Quick Links Section */}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#006400',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'flex-start',
  },
  logoMain: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoSub: {
    fontSize: 12,
    color: '#ffcc00',
    marginTop: 2,
    fontWeight: '600',
  },
  nav: {
    flexDirection: 'row',
  },
  navItem: {
    marginLeft: 15,
  },
  navText: {
    color: '#bdc3c7',
    fontSize: 12,
    fontWeight: '500',
  },
  activeNav: {
    color: '#ffcc00',
    fontWeight: 'bold',
  },
  parallaxHero: {
    height: 400,
    backgroundColor: '#006400',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 100, 0, 0.8)',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#ffcc00',
    textAlign: 'center',
    lineHeight: 24,
  },
  // Founder Section Styles
  founderSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  founderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 30,
  },
  founderImageContainer: {
    position: 'relative',
    width: 200,
  },
  founderImage: {
    width: 200,
    height: 250,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#ffcc00',
  },
  founderImageBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#006400',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  founderImageBadgeText: {
    color: '#ffcc00',
    fontSize: 10,
    fontWeight: 'bold',
  },
  founderInfo: {
    flex: 1,
  },
  founderName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 5,
  },
  founderTitle: {
    fontSize: 16,
    color: '#ffcc00',
    fontWeight: '600',
    marginBottom: 20,
  },
  founderBio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  founderQuote: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffcc00',
    marginTop: 15,
  },
  founderQuoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  founderQuoteAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#006400',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006400',
    textAlign: 'center',
    marginBottom: 30,
  },
  whiteText: {
    color: '#fff',
  },
  timelineSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  timeline: {
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    width: 4,
    backgroundColor: '#006400',
    top: 0,
    bottom: 0,
    marginLeft: -2,
    borderRadius: 10,
  },
  timelineItemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    position: 'relative',
    width: '50%',
  },
  timelineLeft: {
    alignSelf: 'flex-start',
    paddingRight: 20,
  },
  timelineRight: {
    alignSelf: 'flex-end',
    paddingLeft: 20,
  },
  timelineContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#ffcc00',
  },
  timelineYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 8,
  },
  timelineDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  timelineDot: {
    position: 'absolute',
    top: '50%',
    width: 20,
    height: 20,
    backgroundColor: '#ffcc00',
    borderWidth: 4,
    borderColor: '#006400',
    borderRadius: 10,
    zIndex: 2,
  },
  statsSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#006400',
  },
  statsGrid: {
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    minWidth: 150,
  },
  statCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 204, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffcc00',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  statSubtext: {
    fontSize: 12,
    color: '#ecf0f1',
    textAlign: 'center',
  },
  gallerySection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  galleryGrid: {
    justifyContent: 'space-between',
  },
  galleryItem: {
    flex: 1,
    margin: 5,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 100, 0, 0.7)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  overlayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  teamSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  teamList: {
    paddingVertical: 20,
  },
  teamMember: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  memberImage: {
    height: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  teamImage: {
    width: '100%',
    height: '100%',
  },
  founderBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#006400',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  founderBadgeText: {
    color: '#ffcc00',
    fontSize: 10,
    fontWeight: 'bold',
  },
  memberInfo: {
    padding: 20,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006400',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#ffcc00',
    marginBottom: 10,
    fontWeight: '500',
  },
  memberDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  memberSocial: {
    flexDirection: 'row',
    gap: 10,
  },
  socialIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#006400',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  testimonialsSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#006400',
  },
  testimonialContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  testimonialQuote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 20,
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffcc00',
    marginBottom: 5,
  },
  testimonialRole: {
    fontSize: 14,
    color: '#ecf0f1',
  },
  testimonialDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  testimonialDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  testimonialDotActive: {
    backgroundColor: '#ffcc00',
    transform: [{ scale: 1.2 }],
  },
  // Quick Links Styles
  quickLinksSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
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
    width: (screenWidth - 70) / 2,
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
    color: '#006400',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#006400',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#ffcc00',
    fontSize: 12,
  },
});

export default AboutScreen;