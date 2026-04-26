import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../utils/theme'
import { API_BASE_URL } from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function LoginScreen({ navigation }) {

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Please enter both username and password')
      return
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        console.log('Login Successful:', data)
        await AsyncStorage.setItem('userToken', data.token)
        await AsyncStorage.setItem('username', username)

        // 👉 Navigate after success
        navigation.replace('Home')
      } else {
        alert(data.message || 'Login failed')
      }

    } catch (error) {
      console.error('Error during login:', error)
      alert('An error occurred while logging in')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Invora Login</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder='Enter Your Username'
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder='Enter Your Password'
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate('SignupScreen')}
          >
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Don't have an account? Sign up</Text>
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