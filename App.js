import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data);
        console.log(data[0]);
      }
    }
  }

  return (
    <View style={styles.container}>

      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text>{item.name} </Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 ? <Text>{item.phoneNumbers[0].number}</Text> : null}
          </View>
        )}
        data={contacts}
      />

      <View style={styles.buttonContainer}>
        <Button onPress={getContacts} title="Get contacts" />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    height: 40,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});