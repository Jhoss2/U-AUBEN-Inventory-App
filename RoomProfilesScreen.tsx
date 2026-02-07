import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';
import { getDBConnection } from '../database/db';

const RoomProfilesScreen = ({ route, navigation }: any) => {
  const { subBlocId, level } = route.params;
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const db = await getDBConnection();
      const results = await db.executeSql('SELECT * FROM salles WHERE emplacement = ? AND niveau = ?', [subBlocId, level]);
      const rows = results[0].rows;
      const fetchedRooms = [];
      for (let i = 0; i < rows.length; i++) {
        fetchedRooms.push(rows.item(i));
      }
      setRooms(fetchedRooms);
    };

    fetchRooms();
  }, [subBlocId, level]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.titleBadge}>
        <Text style={styles.titleBadgeText}>{level}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Profils des salles</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.roomsContainer}>
          {rooms.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>Aucune salle ajoutée</Text>
            </View>
          ) : (
            rooms.map((room) => (
              <TouchableOpacity 
                key={room.id} 
                style={styles.roomCard}
                onPress={() => navigation.navigate('RoomDetails', { roomId: room.id, roomName: room.nom })}
              >
                {room.photoId ? (
                   <Image source={{ uri: room.photoId }} style={styles.roomImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>{room.nom}</Text>
                  </View>
                )}
                <Text style={styles.roomName}>{room.nom}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddRoom', { subBlocId, level })}
      >
        <Plus color={Colors.white} size={32} />
      </TouchableOpacity>
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
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.monotypeCorsiva,
    color: '#1f2937',
    fontWeight: '600',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  roomsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyCard: {
    width: 100,
    height: 100,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 10,
    textAlign: 'center',
  },
  roomCard: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
  },
  roomImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  roomName: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: Fonts.inter,
    color: '#1f2937',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    backgroundColor: '#ef4444',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default RoomProfilesScreen;
