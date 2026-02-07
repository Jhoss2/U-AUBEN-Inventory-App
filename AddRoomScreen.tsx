import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';
import { getDBConnection } from '../database/db';

const AddRoomScreen = ({ route, navigation }: any) => {
  const { subBlocId, level } = route.params;
  const [nom, setNom] = useState('');
  const [emplacement, setEmplacement] = useState(subBlocId || '');
  const [niveau, setNiveau] = useState(level || '');

  const saveRoom = async () => {
    if (!nom || !emplacement || !niveau) return;

    const db = await getDBConnection();
    const id = \`salle-\${Date.now()}\`;
    await db.executeSql(
      'INSERT INTO salles (id, nom, emplacement, niveau, photoId) VALUES (?, ?, ?, ?, ?)',
      [id, nom, emplacement.toUpperCase(), niveau, null]
    );
    navigation.goBack();
  };

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
        <Text style={styles.titleBadgeText}>Ajouter une salle</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Camera color={Colors.white} size={64} />
          <Text style={styles.imagePlaceholderText}>Insérer des images de la salle</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Text style={styles.labelText}>Nom</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nom de la salle"
              value={nom}
              onChangeText={setNom}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={[styles.inputLabel, { backgroundColor: Colors.secondary }]}>
              <Text style={styles.labelText}>Emplacement</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Ex: A1, D1, E2..."
              value={emplacement}
              onChangeText={setEmplacement}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={[styles.inputLabel, { backgroundColor: Colors.primary }]}>
              <Text style={styles.labelText}>Niveau</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Ex: Sous-sol, RDC..."
              value={niveau}
              onChangeText={setNiveau}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveRoom}>
            <Text style={styles.saveButtonText}>Enregistrer la salle</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  imagePlaceholder: {
    backgroundColor: Colors.secondary,
    height: 200,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
  },
  imagePlaceholderText: {
    color: Colors.white,
    marginTop: 8,
    fontWeight: '500',
    fontFamily: Fonts.inter,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputLabel: {
    backgroundColor: '#b91c1c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    width: 120,
    alignItems: 'center',
  },
  labelText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Fonts.interSemiBold,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    fontFamily: Fonts.inter,
  },
  saveButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 24,
    elevation: 4,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.interBold,
  },
});

export default AddRoomScreen;
