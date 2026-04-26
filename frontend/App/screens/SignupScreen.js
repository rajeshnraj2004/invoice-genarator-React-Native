import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors } from '../utils/theme'
import { API_BASE_URL } from '../utils/api'


export default function SignupScreen({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    if (!username || !password) {
      alert('Please enter both username and password')
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        await AsyncStorage.setItem('username', username)
        alert(data.message || 'User created successfully')
        navigation.replace('Home')
      } else {
        alert(data.message || 'Signup failed')
      }

    } catch (error) {
      console.error('Error during signup:', error)
      alert('An error occurred while signing up')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder='Choose a Username'
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder='Choose a Password'
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  button: {
    marginTop: 30,
    width: 300,
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
    borderColor: colors.text,
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginVertical: 5,
    color: colors.text,
  },
  label: {
    alignSelf: 'flex-start',
    width: 300,
    fontSize: 16,
    color: colors.text,
    marginTop: 10,
    marginLeft: 10,
  }
})
