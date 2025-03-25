import { useState } from 'react';
import { Text, View, Button, TextInput, Alert, StyleSheet } from 'react-native';

const PrgContatos = () => {
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [idEditando, setIdEditando] = useState('');
  const [dados, setDados] = useState([]);

  function adicionar() {
    Alert.alert('Contato adicionado');
    console.log(dados);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Castro de Contatos</Text>

      <TextInput
        style={styles.input}
        value={contato}
        onChangeText={setContato}
        placeholder="Digite o nome do contato"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o e-mail do contato"
      />

      <Button title="Adicionar" onPress={adicionar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#1a79f5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

//*

//

export default PrgContatos;

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#301455',
    marginBottom: 20,
    textAlign: 'center', // Título centralizado
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#301455',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between', // Itens alinhados de forma que um fica à esquerda e o outro à direita
    backgroundColor: '#fff',
  },
  itemPress: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8, // Estilo do botão com bordas arredondadas
    gap: 4,
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#301455',
    borderRadius: 14, // Círculo perfeito
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrgContatos;
*/
