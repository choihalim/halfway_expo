import { Link } from 'expo-router'
import { Image, View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../assets/images/logo.png';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import ErrorPopup from '../../components/ErrorPopup';
import { getFirebaseErrorMessage } from '../../constants/firebaseErrorHandler';
// cannot use react-native-keychain in Expo, will temporarily use expo-secure-store
// import * as Keychain from 'react-native-keychain'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

// need to implement: 
// username requirement!
// field check

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    setIsSubmitting(true)
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )
      const createdUser = userCredentials.user
      await updateProfile(createdUser, { displayName: form.username })
      await SecureStore.setItemAsync('userToken', createdUser.uid)
      console.log('user created:', userCredentials)
      // add a welcome banner? tutorial?
      router.push('/home')
    } catch (err) {
      const errorMsg = getFirebaseErrorMessage(err.code)
      setError(errorMsg)
      setIsPopupVisible(true)
      console.log('error creating user:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const closePopup = () => {
    setIsPopupVisible(false)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[75vh] px-4 my-6">
          <Image
            source={logo}
            resizeMode='contain'
            className='w=[115px] h-[35px]'
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to HalfWay
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className='text-lg font-psemibold text-secondary'>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
      <ErrorPopup
        errorMessage={error}
        isVisible={isPopupVisible}
        onClose={closePopup}
      />
    </SafeAreaView>
  )
}

export default SignUp