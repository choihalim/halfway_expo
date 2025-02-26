import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'

const TabIcon = ({ color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <FontAwesome
        name={name}
        size={24}
        color={focused ? '#3e754a' : color}
      />
      {/* optionally add text to tabs */}
      {/* <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>
        {name}
      </Text> */}
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home"
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="search"
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="plus-square-o"
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='trips'
          options={{
            title: 'Trips',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="calendar-check-o"
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='friends'
          options={{
            title: 'Friends',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="users"
                color={color}
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="user"
                color={color}
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout