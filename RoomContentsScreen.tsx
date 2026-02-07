import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { ArrowLeft, Trash2, Edit } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';
import { getDBConnection } from '../database/db';

const RoomContentsScreen = ({ route, navigation }: any) => {
  const { roomId, roomName } = route.params;
  const [materiel, setMateriel] = useState<any[]>([]);

  useEffect(() => {
    fetchMateriel();
  }, [roomId]);

  const fetchMateriel = async () => {
    const db = await getDBConnection();
    const results = await db.executeSql('SELECT * FROM materiel WHERE salleId = ?', [roomId]);
    const rows = results[0].rows;
    const fetchedItems = [];
    for (let i = 0; i < rows.length; i++) {
      fetchedItems.push(rows.item(i));
    }
    setMateriel(fetchedItems);
  };

  const deleteItem = async (id: string) => {
    const db = await getDBConnection();
    await db.executeSql('DELETE FROM materiel WHERE id = ?', [id]);
    fetchMateriel();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contenu de: {roomName}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {materiel.length === 0 ? (
          <Text style={styles.emptyText}>Aucun matériel n'a été ajouté à cette salle.</Text>
        ) : (
          materiel.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemCategory}>{item.categorie}</Text>
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => navigation.navigate('AddMateriel', { roomId, item })}>
                    <Edit color="#4b5563" size={20} style={styles.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Trash2 color="#ef4444" size={20} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.itemBody}>
                {item.photoId && <Image source={{ uri: item.photoId }} style={styles.itemImage} />}
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.nom}</Text>
                  <Text style={styles.itemSubText}>Marque: {item.marque}</Text>
                  <Text style={styles.itemSubText}>Etat: {item.etat}</Text>
                  {item.dateRen && <Text style={[styles.itemSubText, { color: '#ef4444' }]}>Renouvellement: {item.dateRen}</Text>}
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: Fonts.interBold,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
    fontFamily: Fonts.inter,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 8,
  },
  itemCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.secondary,
    fontFamily: Fonts.interBold,
  },
  actions: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginRight: 12,
  },
  itemBody: {
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    fontFamily: Fonts.interSemiBold,
  },
  itemSubText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: Fonts.inter,
  },
});

export default RoomContentsScreen;
