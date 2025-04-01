import { useState } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  FlatList
} from 'react-native';

type Contato = {
  id: string;
  contato: string;
  email: string;
};

const PrgContatos = () => {
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [idEditando, setIdEditando] = useState('');
  const [dados, setDados] = useState<Contato[]>([]);

  function adicionar() {
    if (contato && email) {
      const novoContato = {
        id: Date.now().toString(),
        contato,
        email
      };
      const novaLista = [...dados, novoContato];
      setDados(novaLista);
      setContato('');
      setEmail('');
    }
  }
  const remover = (id: string) => {
    const novaLista = dados.filter((item) => item.id !== id);

    setDados(novaLista);
  };

  const editar = (item: Contato) => {
    setContato(item.contato);
    setEmail(item.email);
    setIdEditando(item.id);
  };

  const esditarItem = () => {
    if (idEditando && contato && email) {
      const novaLista = dados.map((item) =>
        item.id === idEditando ? { ...item, contato, email } : item
      );
      setDados(novaLista);
      setIdEditando('');
      setContato('');
      setEmail('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {idEditando ? 'Editar contato' : 'Adicionar contato'}
      </Text>

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

      <Button
        title={idEditando ? 'Salvar registro' : 'Adicionar'}
        onPress={idEditando ? esditarItem : adicionar}
      />

      <View>
        <FlatList
          data={dados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.flatList}>
              <Text style={styles.text}>{item.contato}</Text>
              <Text style={styles.text}>{item.email}</Text>
              <Button title="editar" onPress={() => editar(item)} />
              <Button title="excluir" onPress={() => remover(item.id)} />
            </View>
          )}
        />
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#1a79f5',
    fontSize: 16,
    fontWeight: 'bold'
  },
  flatList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 10,
    gap: 10
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
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
