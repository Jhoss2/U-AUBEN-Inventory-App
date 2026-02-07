import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';

const SubBlocLevelsScreen = ({ route, navigation }: any) => {
  const { subBlocId } = route.params;

  const levels = [
    'Sous-sol',
    'Rez-de-chaussée',
    'Premier Niveau',
    'Deuxième Niveau',
    'Troisième Niveau',
    'Quatrième Niveau',
  ];

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
        <Text style={styles.titleBadgeText}>Bloc {subBlocId}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>· NIVEAUX DE SUBDIVISION ·</Text>
        </View>

        <View style={styles.levelsContainer}>
          {levels.map((level) => (
            <TouchableOpacity 
              key={level} 
              style={styles.levelButton}
              onPress={() => navigation.navigate('RoomProfiles', { subBlocId, level })}
            >
              <Text style={styles.levelButtonText}>· {level} ·</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
  },
  sectionHeader: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
  },
  sectionHeaderText: {
    color: Colors.secondary,
    fontFamily: Fonts.monotypeCorsiva,
    fontSize: 18,
    fontWeight: '600',
  },
  levelsContainer: {
    gap: 12,
  },
  levelButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
  },
  levelButtonText: {
    color: Colors.white,
    fontFamily: Fonts.monotypeCorsiva,
    fontSize: 18,
  },
});

export default SubBlocLevelsScreen;
