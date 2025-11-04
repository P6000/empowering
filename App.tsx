import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import ALL screens
import HomeScreen from './HomeScreen';
import AboutScreen from './About';
import CourseScreen from './CourseScreen';
import FeeCalculatorScreen from './FeeCalculatorScreen';
import ContactScreen from './ContactScreen';

// Import individual course screens
import FirstAidScreen from './FirstAidScreen';
import SewingScreen from './SewingScreen';
import LandscapingScreen from './LandscapingScreen';
import LifeSkillsScreen from './LifeSkillScreen';
import ChildMindingScreen from './ChildMindingScreen';
import CookingScreen from './CookingScreen';


// Define the stack params
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Courses: undefined;
  FeeCalculator: undefined;
  Contact: undefined;
  FirstAid: undefined;
  Sewing: undefined;
  Landscaping: undefined;
  LifeSkills: undefined;
  ChildMinding: undefined;
  Cooking: undefined;
  GardenMaintenance: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#006400' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Main Screens */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ title: 'About Us' }} 
        />
        <Stack.Screen 
          name="Courses" 
          component={CourseScreen} 
          options={{ title: 'Our Courses' }} 
        />
        <Stack.Screen 
          name="FeeCalculator" 
          component={FeeCalculatorScreen} 
          options={{ title: 'Fee Calculator' }} 
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen} 
          options={{ title: 'Contact Us' }} 
        />

        {/* Individual Course Screens */}
        <Stack.Screen 
          name="FirstAid" 
          component={FirstAidScreen} 
          options={{ title: 'First Aid Course' }} 
        />
        <Stack.Screen 
          name="Sewing" 
          component={SewingScreen} 
          options={{ title: 'Sewing Course' }} 
        />
        <Stack.Screen 
          name="Landscaping" 
          component={LandscapingScreen} 
          options={{ title: 'Landscaping Course' }} 
        />
        <Stack.Screen 
          name="LifeSkills" 
          component={LifeSkillsScreen} 
          options={{ title: 'Life Skills Course' }} 
        />
        <Stack.Screen 
          name="ChildMinding" 
          component={ChildMindingScreen} 
          options={{ title: 'Child Minding Course' }} 
        />
        <Stack.Screen 
          name="Cooking" 
          component={CookingScreen} 
          options={{ title: 'Cooking Course' }} 
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}