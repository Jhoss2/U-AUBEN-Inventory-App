import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BlocDetailsScreen from '../screens/BlocDetailsScreen';
import SubBlocLevelsScreen from '../screens/SubBlocLevelsScreen';
import RoomProfilesScreen from '../screens/RoomProfilesScreen';
import RoomDetailsScreen from '../screens/RoomDetailsScreen';
import RoomContentsScreen from '../screens/RoomContentsScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import AddMaterielScreen from '../screens/AddMaterielScreen';
import ChatAubeScreen from '../screens/ChatAubeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BlocDetails" component={BlocDetailsScreen} />
      <Stack.Screen name="SubBlocLevels" component={SubBlocLevelsScreen} />
      <Stack.Screen name="RoomProfiles" component={RoomProfilesScreen} />
      <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
      <Stack.Screen name="RoomContents" component={RoomContentsScreen} />
      <Stack.Screen name="AddRoom" component={AddRoomScreen} />
      <Stack.Screen name="AddMateriel" component={AddMaterielScreen} />
      <Stack.Screen name="ChatAube" component={ChatAubeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
