import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Send } from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';
import { Colors, Fonts } from '../theme';
import { getDBConnection } from '../database/db';

const ChatAubeScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: "Bonjour ! Je suis Aube, votre assistant logistique. Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Process with "AI" logic
    const response = await processAIQuery(inputText);
    const botMessage = { id: (Date.now() + 1).toString(), text: response, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
  };

  const processAIQuery = async (query: string) => {
    const db = await getDBConnection();
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('combien') && (lowerQuery.includes('salle') || lowerQuery.includes('chambre'))) {
      const results = await db.executeSql('SELECT COUNT(*) as count FROM salles');
      const count = results[0].rows.item(0).count;
      return \`Il y a actuellement **\${count}** salles enregistrées dans la base de données.\`;
    }

    if (lowerQuery.includes('combien') && (lowerQuery.includes('matériel') || lowerQuery.includes('equipement'))) {
      const results = await db.executeSql('SELECT COUNT(*) as count FROM materiel');
      const count = results[0].rows.item(0).count;
      return \`Il y a actuellement **\${count}** articles de matériel répertoriés.\`;
    }

    if (lowerQuery.includes('alerte') || lowerQuery.includes('attention')) {
      const results = await db.executeSql('SELECT COUNT(*) as count FROM alerts WHERE read = 0');
      const count = results[0].rows.item(0).count;
      return \`Vous avez **\${count}** alertes non lues concernant le renouvellement du matériel.\`;
    }

    return "Je suis désolé, je ne peux répondre qu'à des questions spécifiques sur l'inventaire pour le moment. Essayez de me demander le nombre de salles ou de matériels.";
  };

  const renderMessage = ({ item }: any) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
      {item.sender === 'bot' ? (
        <Markdown style={markdownStyles}>{item.text}</Markdown>
      ) : (
        <Text style={styles.userMessageText}>{item.text}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#4b5563" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assistant Aube</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Posez votre question..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Send color={Colors.white} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  messagesList: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.secondary,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    elevation: 1,
  },
  userMessageText: {
    color: Colors.white,
    fontFamily: Fonts.inter,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontFamily: Fonts.inter,
  },
  sendButton: {
    backgroundColor: Colors.secondary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const markdownStyles = {
  body: {
    fontFamily: Fonts.inter,
    color: '#1f2937',
  },
  strong: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
};

export default ChatAubeScreen;
