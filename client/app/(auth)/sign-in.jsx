import { Link } from 'expo-router'
import { Image, View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../../assets/images/logo.png';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import ErrorPopup from '../../components/ErrorPopup';
import { getFirebaseErrorMessage } from '../../constants/firebaseErrorHandler';
// cannot use react-native-keychain in Expo, will temporarily use expo-secure-store
// import * as Keychain from 'react-native-keychain'
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    setIsSubmitting(true)
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )
      const loggedUser = userCredentials.user
      // cannot use Keychain for now
      // await Keychain.setGenericPassword('userToken', loggedUser.uid);
      await SecureStore.setItemAsync('userToken', loggedUser.uid)
      // send user to home
      router.push('/home')
      console.log('user logged in:', loggedUser.displayName)
    } catch (err) {
      const errorMsg = getFirebaseErrorMessage(err.code)
      setError(errorMsg)
      setIsPopupVisible(true)
      console.log('error logging in user:', err)
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
            Log in to HalfWay
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Log In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className='text-lg font-psemibold text-secondary'>
              Sign Up
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

export default SignIn