import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Função para validar e habilitar o botão
  const validateForm = () => {
    const emailValid = email.includes('@');
    const senhaValid = senha.length >= 6;
    const nomeValid = nome.length > 0;

    if (emailValid && senhaValid && nomeValid) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Função para lidar com o cadastro
  const handleCadastro = () => {
    Alert.alert(
      'Cadastro realizado com sucesso!',
      `Nome: ${nome}, E-mail: ${email}`
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          validateForm();
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        keyboardType="email-address"
        onChangeText={(text) => {
          setEmail(text);
          validateForm();
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(text) => {
          setSenha(text);
          validateForm();
        }}
      />
      <Button
        title="Cadastrar"
        onPress={handleCadastro}
        disabled={isButtonDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
