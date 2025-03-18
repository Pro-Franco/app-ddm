import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import {
  setupDatabase,
  addContact,
  getContacts,
  removeContact,
  updateContact,
} from '../components/database/database';

export default function ListaContatosEspecializada() {
  const [listContact, setListContact] = useState<
    { name: string; cell: string }[]
  >([]);
  const [textInputName, setTextInputName] = useState<string>('');
  const [textInputCell, setTextInputCell] = useState<string>('');
  const [updateActive, setUpdateActive] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<string>('');

  async function handleSubmit() {
    if (textInputName === '' || textInputCell === '') return;

    if (updateActive) {
      await updateContact(updateName, textInputName, textInputCell);
      setUpdateActive(false);
    } else {
      await addContact(textInputName, textInputCell);
    }

    refreshList();
    setTextInputName('');
    setTextInputCell('');
  }

  async function refreshList() {
    const contacts = await getContacts();
    setListContact(contacts);
  }

  async function removeItem(name: string) {
    await removeContact(name);
    refreshList();
  }

  function editItem(name: string, cell: string) {
    setUpdateActive(true);
    setTextInputName(name);
    setTextInputCell(cell);
    setUpdateName(name);
  }

  useEffect(() => {
    setupDatabase();
    refreshList();
  }, []);

  return (
    <View style={styles.container}>
      <ContactForm
        textInputName={textInputName}
        setTextInputName={setTextInputName}
        textInputCell={textInputCell}
        setTextInputCell={setTextInputCell}
        updateActive={updateActive}
        handleSubmit={handleSubmit}
      />
      <ContactList
        contacts={listContact}
        removeContact={removeItem}
        editContact={editItem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
