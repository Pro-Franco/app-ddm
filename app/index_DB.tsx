import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

type Contact = {
  name: string;
  number: number;
};

export default function App() {
  const [listContact, setListContact] = useState<Contact[]>([]);
  const [textInputName, setTextInputName] = useState<string>('');
  const [textInputNumber, setTextInputNumber] = useState<string>('');
  const [updateActive, setUpdateActive] = useState<boolean>(false);
  const [updateName, setUpdateName] = useState<string>('');

  async function addNew() {
    if (textInputName === '' || textInputNumber === '') return;

    const db = await SQLite.openDatabaseAsync('bancoContatos');

    await db.runAsync(
      'INSERT INTO contact (value, intValue) VALUES (?, ?)',
      textInputName,
      parseInt(textInputNumber)
    );

    getList();
    setTextInputName('');
    setTextInputNumber('');
  }

  async function getList() {
    const db = await SQLite.openDatabaseAsync('bancoContatos');

    const allRows = (await db.getAllAsync('SELECT * FROM contact')) as {
      value: string;
      intValue: number;
    }[];

    const newArray: Contact[] = allRows.map((row) => ({
      name: row.value,
      number: row.intValue,
    }));

    setListContact(newArray);
  }

  async function removeList(user: string) {
    const db = await SQLite.openDatabaseAsync('bancoContatos');

    await db.runAsync('DELETE FROM contact WHERE value = ?', [user]);

    getList();
  }

  function update(user: string, number: number) {
    setUpdateActive(true);
    setTextInputName(user);
    setTextInputNumber(number.toString());
    setUpdateName(user);
  }

  async function actionUpdate() {
    if (textInputName === '' || textInputNumber === '') return;

    const db = await SQLite.openDatabaseAsync('bancoContatos');

    await db.runAsync(
      'UPDATE contact SET value = ?, intValue = ? WHERE value = ?',
      textInputName,
      parseInt(textInputNumber),
      updateName
    );

    getList();
    setTextInputName('');
    setTextInputNumber('');
    setUpdateActive(false);
  }

  useEffect(() => {
    async function setup() {
      const db = await SQLite.openDatabaseAsync('bancoContatos');

      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
      `);

      getList();
    }
    setup();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput
        value={textInputName}
        style={styles.input}
        onChangeText={setTextInputName}
      />
      <Text>Number</Text>
      <TextInput
        value={textInputNumber}
        style={styles.input}
        onChangeText={setTextInputNumber}
        keyboardType="numeric"
      />
      {updateActive ? (
        <Button title="Update" onPress={actionUpdate} />
      ) : (
        <Button title="Add" onPress={addNew} />
      )}
      {listContact.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.number}</Text>
          <Button title="Remove" onPress={() => removeList(item.name)} />
          <Button
            title="Update"
            onPress={() => update(item.name, item.number)}
          />
        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
});
