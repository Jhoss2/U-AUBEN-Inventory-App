import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';

const RoomDetailsScreen = ({ route, navigation }: any) => {
  const { roomId, roomName } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{roomName}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.titleBadge}>
        <Text style={styles.titleBadgeText}>Détails du {roomName}</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('RoomContents', { roomId, roomName })}
        >
          <Text style={styles.navButtonText}>Afficher la salle</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('AddMateriel', { roomId })}
        >
          <Text style={styles.navButtonText}>Ajouter du matériel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: Fonts.interBold,
  },
  titleBadge: {
    backgroundColor: Colors.primary,
    margin: 16,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
  },
  titleBadgeText: {
    color: Colors.white,
    fontFamily: Fonts.algerian,
    fontSize: 18,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 24,
  },
  navButton: {
    backgroundColor: Colors.secondary,
    width: '75%',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.interMedium,
  },
});

export default RoomDetailsScreen;
