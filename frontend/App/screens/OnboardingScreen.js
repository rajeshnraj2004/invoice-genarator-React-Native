import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../utils/theme';

export default function OnboardingScreen({ navigation }) {


  const handlegetstarted = () => {
        navigation.navigate('LoginScreen');
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, padding: 20, margin: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.content}>
                Welcome to Invora!
            </Text>
            <Text style={styles.subtext}>
                Discover a new way to manage your Service Invoices and Billings.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={handlegetstarted}>
                <Text style={{ color: colors.btnText }}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    content:{
        fontSize:24,
        fontWeight:'bold',
        color: colors.primary,
    },
    subtext: {
        fontSize: 16,
        color: colors.subText,
        marginTop: 10,
        textAlign: 'center',
    },

    btn:{
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        marginTop: 30,
    }
})