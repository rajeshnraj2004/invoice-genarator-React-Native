import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../utils/theme';

export default function ProfileScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({ username: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          setUserInfo({ username });
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');
    navigation.replace('LoginScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.avatar}>
           <Text style={styles.avatarText}>{userInfo.username.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>Profile Section</Text>
        <Text style={styles.subtitle}>Welcome, {userInfo.username || 'User'}!</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
           <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    marginTop: 10,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
