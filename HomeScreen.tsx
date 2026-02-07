import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, SafeAreaView } from 'react-native';
import { Menu, SlidersHorizontal, Search, Bot } from 'lucide-react-native';
import { Colors, Fonts } from '../theme';

const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const blocs = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => {}}>
            <Menu color={Colors.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}> </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <SlidersHorizontal color={Colors.white} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Search color="#9ca3af" size={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Que cherchez vous aujourd’hui ?"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ChatAube')}>
            <Bot color="#2563eb" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.blocsScroll}>
          {blocs.map((bloc) => (
            <TouchableOpacity 
              key={bloc} 
              style={styles.blocButton}
              onPress={() => navigation.navigate('BlocDetails', { blocId: bloc })}
            >
              <Text style={styles.blocButtonText}>Bloc {bloc}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.imageCard}>
          <Image 
            source={{ uri: 'https://placehold.co/400x220/3b82f6/ffffff?text=Universit%C3%A9' }} 
            style={styles.mainImage} 
          />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.titleBadge}>
            <Text style={styles.titleText}>UNIVERSITE AUBE NOUVELLE</Text>
          </View>
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
    padding: 16,
  },
  headerBar: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 30,
    elevation: 4,
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: Colors.gray,
    marginVertical: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontFamily: Fonts.inter,
  },
  blocsScroll: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
  },
  blocButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  blocButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    elevation: 4,
  },
  titleText: {
    color: Colors.white,
    fontFamily: Fonts.algerian,
    fontWeight: '600',
  },
});

export default HomeScreen;
