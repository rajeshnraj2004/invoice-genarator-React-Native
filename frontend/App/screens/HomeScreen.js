import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';

/* 🔹 Animated Tab Item */
const AnimatedTabItem = ({ activeIcon, inactiveIcon, onPress, isActive }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styles.navItem}
    >
      <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
        <Ionicons
          name={isActive ? activeIcon : inactiveIcon}
          size={26}
          color={isActive ? colors.primary : '#9CA3AF'}
        />
        {isActive && <View style={styles.activeDot} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

/* 🔹 Floating Add Button */
const FloatingAddButton = ({ onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Animated.View style={[styles.fab, { transform: [{ scale }] }]}>
          <Ionicons name="add" size={32} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("User");
  const [activeTab, setActiveTab] = useState("Home");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('username');
        if (storedName) setUserName(storedName);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUserName();
  }, []);

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      {/* 🔵 Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.profileCircle}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileLetter}>{firstLetter}</Text>
        </TouchableOpacity>
      </View>

      {/* 🏠 Content */}
      <View style={styles.container}>
        <Text style={styles.subtitle}>Welcome to Invora, {userName}!</Text>
      </View>

      {/* 🔥 Bottom Navigation */}
      <View style={styles.bottomNav}>

        <AnimatedTabItem
          activeIcon="home"
          inactiveIcon="home-outline"
          isActive={activeTab === "Home"}
          onPress={() => {
            setActiveTab("Home");
            navigation.navigate('Home');
          }}
        />

        <AnimatedTabItem
          activeIcon="document-text"
          inactiveIcon="document-text-outline"
          isActive={activeTab === "Invoices"}
          onPress={() => {
            setActiveTab("Invoices");
            alert("Invoices Screen");
          }}
        />

        <AnimatedTabItem
          activeIcon="settings"
          inactiveIcon="settings-outline"
          isActive={activeTab === "Settings"}
          onPress={() => {
            setActiveTab("Settings");
            navigation.navigate('Settings');
          }}
        />

        <AnimatedTabItem
          activeIcon="person"
          inactiveIcon="person-outline"
          isActive={activeTab === "Profile"}
          onPress={() => {
            setActiveTab("Profile");
            navigation.navigate('Profile');
          }}
        />

      </View>

      {/* ✅ PERFECT CENTER FAB */}
      <FloatingAddButton onPress={() => alert('Add New Item!')} />

    </SafeAreaView>
  );
}

/* 🎨 Styles */
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },

  logo: {
    width: 55,
    height: 55,
    borderRadius: 50,
    opacity: 0.9,
  },

  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  profileLetter: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },

  subtitle: {
    fontSize: 22,
    color: colors.text,
    marginTop: 3,
    paddingHorizontal: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: -10,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 45,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  fab: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: colors.background,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});