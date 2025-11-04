import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header Navigation */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* Logo from URL - REPLACE THIS URL WITH YOUR ACTUAL LOGO */}
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <View style={styles.logoText}>
            <Text style={styles.logoMain}>EMPOWERING</Text>
            <Text style={styles.logoSub}>THE NATION</Text>
          </View>
        </View>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={[styles.navText, styles.activeNav]}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('About' as never)}
          >
            <Text style={styles.navText}>ABOUT US</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Courses' as never)}
          >
            <Text style={styles.navText}>COURSES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('FeeCalculator' as never)}
          >
            <Text style={styles.navText}>FEES</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => navigation.navigate('Contact' as never)}
          >
            <Text style={styles.navText}>CONTACT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          {/* Logo Section */}
          <View style={styles.heroLogoContainer}>
            <Text style={styles.heroLogoMain}>EMPOWERING</Text>
            <View style={styles.nationContainer}>
              <Text style={styles.heroLogoSub}>THE NATION</Text>
            </View>
            <View style={styles.logoDivider} />
            <Text style={styles.heroTagline}>EMPOWERING SKILLS,</Text>
            <Text style={styles.heroTagline}>CHANGING LIVES</Text>
          </View>
          
          {/* Hero Image */}
          <View style={styles.heroImage}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
              }}
              style={styles.image}
            />
          </View>
        </View>

        {/* Call to Action Button */}
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => navigation.navigate('Courses' as never)}
        >
          <Text style={styles.btnText}>VIEW COURSES</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Info Section */}
      <View style={styles.quickInfo}>
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>About Us</Text>
            <Text style={styles.infoCardText}>Learn about our mission and success stories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('About' as never)}>
              <Text style={styles.infoCardLink}>Learn More →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Our Courses</Text>
            <Text style={styles.infoCardText}>Explore all available training programs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses' as never)}>
              <Text style={styles.infoCardLink}>Learn More →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>Fee Calculator</Text>
            <Text style={styles.infoCardText}>Calculate course costs</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FeeCalculator' as never)}>
              <Text style={styles.infoCardLink}>Calculate →</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#006400',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
  logoText: {
    alignItems: 'flex-start',
  },
  logoMain: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  logoSub: {
    fontSize: 12,
    color: '#ffcc00', // This stays gold for the header
    fontWeight: '600',
  },
  nav: {
    flexDirection: 'row',
  },
  navItem: {
    marginLeft: 15,
  },
  navText: {
    color: '#ecf0f1',
    fontSize: 12,
    fontWeight: '500',
  },
  activeNav: {
    color: '#f8f7f2ff',
    fontWeight: 'bold',
  },
  heroSection: {
    backgroundColor: '#006400',
    padding: 30,
    alignItems: 'center',
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  heroLogoContainer: {
    flex: 1,
    marginRight: 20,
    alignItems: 'center',
  },
  heroLogoMain: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 5,
  },
  nationContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 15,
  },
  heroLogoSub: {
    fontSize: 24,
    color: '#006400', // Dark green text on white background
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  logoDivider: {
    width: '80%',
    height: 3,
    backgroundColor: '#ffcc00',
    marginBottom: 15,
    borderRadius: 2,
  },
  heroTagline: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 24,
  },
  heroImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffcc00',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btn: {
    backgroundColor: '#ffcc00',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 40,
    minWidth: 200,
  },
  btnText: {
    color: '#006400',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  quickInfo: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderTopWidth: 5,
    borderTopColor: '#ffcc00',
  },
  infoCardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#006400',
    textAlign: 'center',
    marginBottom: 8,
  },
  infoCardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCardLink: {
    color: '#006400',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  quickLinksSection: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006400',
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
    width: (390 - 70) / 2,
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

export default HomeScreen;