import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';

const BlocDetailsScreen = ({ route, navigation }: any) => {
  const { blocId } = route.params;

  // Mock data based on the HTML
  const subBlocs: any = {
    A: [
      { id: 'A1', title: 'A1', imageTitle: '· Salles de classe ·', image: 'https://placehold.co/400x220/3b82f6/ffffff?text=Salles+A1' },
      { id: 'A2', title: 'A2', imageTitle: '· Bureaux ·', image: 'https://placehold.co/400x220/3b82f6/ffffff?text=Bureaux+A2' }
    ],
    B: [
      { id: 'B1', title: 'B1', imageTitle: '· Salles de classe ·', image: 'https://placehold.co/400x220/16a34a/ffffff?text=Salles+B1' },
      { id: 'B2', title: 'B2', imageTitle: '· Bureaux ·', image: 'https://placehold.co/400x220/16a34a/ffffff?text=Bureaux+B2' }
    ],
    // Add more as needed
  };

  const currentSubBlocs = subBlocs[blocId] || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> </Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.blocBadge}>
        <Text style={styles.blocBadgeText}>Bloc {blocId}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageCard}>
          <Image 
            source={{ uri: 'https://placehold.co/400x220/6b7280/ffffff?text=Vue+A%C3%A9rienne+Bloc+' + blocId }} 
            style={styles.mainImage} 
          />
          <Text style={styles.imageCaption}>· Bloc {blocId} vu de dessus ·</Text>
        </View>

        {currentSubBlocs.map((sub: any) => (
          <View key={sub.id}>
            <Text style={styles.subTitle}>{sub.title}</Text>
            <TouchableOpacity 
              style={styles.imageCard}
              onPress={() => navigation.navigate('SubBlocLevels', { subBlocId: sub.id })}
            >
              <Image source={{ uri: sub.image }} style={styles.mainImage} />
              <Text style={styles.imageCaption}>{sub.imageTitle}</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  blocBadge: {
    backgroundColor: Colors.primary,
    margin: 16,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
  },
  blocBadgeText: {
    color: Colors.white,
    fontFamily: Fonts.algerian,
    fontSize: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
  },
  mainImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  imageCaption: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: 14,
    padding: 8,
    fontFamily: Fonts.monotypeCorsiva,
  },
  subTitle: {
    textAlign: 'center',
    fontFamily: Fonts.algerian,
    color: Colors.secondary,
    fontSize: 20,
    marginBottom: 8,
  },
});

export default BlocDetailsScreen;
