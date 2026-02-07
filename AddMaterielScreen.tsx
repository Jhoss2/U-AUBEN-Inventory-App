import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';
import { getDBConnection } from '../database/db';

const AddMaterielScreen = ({ route, navigation }: any) => {
  const { roomId, item } = route.params;
  const [nom, setNom] = useState(item?.nom || '');
  const [marque, setMarque] = useState(item?.marque || '');
  const [categorie, setCategorie] = useState(item?.categorie || '');
  const [etat, setEtat] = useState(item?.etat || 'Neuf');
  const [dateAcq, setDateAcq] = useState(item?.dateAcq || '');
  const [dateRen, setDateRen] = useState(item?.dateRen || '');

  const saveMateriel = async () => {
    if (!nom || !categorie) return;

    const db = await getDBConnection();
    if (item) {
      // Update
      await db.executeSql(
        'UPDATE materiel SET nom=?, marque=?, categorie=?, etat=?, dateAcq=?, dateRen=? WHERE id=?',
        [nom, marque, categorie, etat, dateAcq, dateRen, item.id]
      );
    } else {
      // Insert
      const id = \`mat-\${Date.now()}\`;
      await db.executeSql(
        'INSERT INTO materiel (id, salleId, nom, marque, categorie, etat, dateAcq, dateRen, photoId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, roomId, nom, marque, categorie, etat, dateAcq, dateRen, null]
      );
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item ? 'Modifier' : 'Ajouter'} du matériel</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
           <View style={styles.inputGroup}>
            <Text style={styles.label}>Catégorie</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Ordinateur, Chaise..."
              value={categorie}
              onChangeText={setCategorie}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom / Modèle</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom précis du matériel"
              value={nom}
              onChangeText={setNom}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Marque</Text>
            <TextInput
              style={styles.input}
              placeholder="Marque"
              value={marque}
              onChangeText={setMarque}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>État</Text>
            <TextInput
              style={styles.input}
              placeholder="Neuf, Bon, Moyen..."
              value={etat}
              onChangeText={setEtat}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date d'acquisition</Text>
            <TextInput
              style={styles.input}
              placeholder="AAAA-MM-JJ"
              value={dateAcq}
              onChangeText={setDateAcq}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date de renouvellement</Text>
            <TextInput
              style={styles.input}
              placeholder="AAAA-MM-JJ"
              value={dateRen}
              onChangeText={setDateRen}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveMateriel}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    fontFamily: Fonts.interSemiBold,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontFamily: Fonts.inter,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.interBold,
  },
});

export default AddMaterielScreen;
