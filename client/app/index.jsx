import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import "../global.css"

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-3xl font-pblack">HALFWAY</Text>
            <StatusBar style='auto' />
            <Link href="/home" style={{ color: 'blue' }}>
                Go to Home
            </Link>
        </View>
    );
}