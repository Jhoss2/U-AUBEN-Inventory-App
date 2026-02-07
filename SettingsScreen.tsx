import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { ArrowLeft, Database, Info, FileText, Settings } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';

const SettingsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Général</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Settings color={Colors.secondary} size={24} />
            <Text style={styles.menuItemText}>Configuration de l'application</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Database color={Colors.secondary} size={24} />
            <Text style={styles.menuItemText}>Exporter les données (CSV)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aide & À propos</Text>
          <TouchableOpacity style={styles.menuItem}>
            <FileText color={Colors.secondary} size={24} />
            <Text style={styles.menuItemText}>Guide d'utilisation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Info color={Colors.secondary} size={24} />
            <Text style={styles.menuItemText}>À propos du développeur</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.1.1</Text>
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
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    fontFamily: Fonts.interBold,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: 16,
    fontFamily: Fonts.interBold,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1f2937',
    fontFamily: Fonts.inter,
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  versionText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: Fonts.inter,
  },
});

export default SettingsScreen;
