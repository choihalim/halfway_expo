import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'
import "../global.css";
import logo from '../assets/images/logo.png';
import CustomButton from '../components/CustomButton';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
// cannot use react-native-keychain in Expo, will temporarily use expo-secure-store
// import * as Keychain from 'react-native-keychain'
import * as SecureStore from 'expo-secure-store';

export default function App() {

    //user state
    const [user, setUser] = useState(null);
    // Firebase auth instance
    const auth = getAuth();

    useEffect(() => {
        // check for user logged in on app load
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // set user 
                setUser(user)
                // store user info in Keychain
                // await Keychain.setGenericPassword('userToken', user.uid)

                // store user info in SecureStore
                await SecureStore.setItemAsync('userToken', user.uid)
            } else {
                // no user signed in
                setUser(null)
                // await Keychain.resetGenericPassword()

                // reset stored user credentials in SecureStore
                await SecureStore.deleteItemAsync('userToken')
            }
        })

        // clean up listener on component unmount
        return () => {
            auth.onAuthStateChanged(() => { })
        }
    }, [auth])

    if (user) {
        return <Redirect href='/home' />
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Image
                        source={logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Meet HalfWay{'\n'}
                            <Text className="text-lg font-pregular text-gray-100 mt-7 text-center">
                                a solution to planning trips the smart way
                            </Text>
                        </Text>
                    </View>
                    <CustomButton
                        title="Continue with Email"
                        containerStyles="w-full mt-7"
                        handlePress={() => router.push('/(auth)/sign-in')}
                    />
                </View>
            </ScrollView>
            <StatusBar backgroundColor='#161622' style='light' />
        </SafeAreaView>
    );
}