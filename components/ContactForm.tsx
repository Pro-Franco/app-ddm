import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface ContactFormProps {
  textInputName: string;
  setTextInputName: (text: string) => void;
  textInputCell: string;
  setTextInputCell: (text: string) => void;
  updateActive: boolean;
  handleSubmit: () => void;
}

export default function ContactForm({
  textInputName,
  setTextInputName,
  textInputCell,
  setTextInputCell,
  updateActive,
  handleSubmit,
}: ContactFormProps) {
  return (
    <View>
      <Text style={styles.title}>Cadastro de Contatos</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={textInputName}
        style={styles.input}
        onChangeText={setTextInputName}
      />
      <Text style={styles.label}>Cell</Text>
      <TextInput
        value={textInputCell}
        style={styles.input}
        onChangeText={setTextInputCell}
      />
      <View style={{ marginHorizontal: 20 }}>
        <Button
          title={updateActive ? 'Update' : 'Add'}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    //width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
});
