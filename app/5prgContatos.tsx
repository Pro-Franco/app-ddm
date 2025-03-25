import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList
} from 'react-native';
import { set } from 'zod';

type Contato = {
  id: number;
  nome: string;
  email: string;
};

const PrgContatos = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [idEditando, setIdEditando] = useState<string | null>(null);
  /*
  useEffect(() => {
    console.log(contatos);
  });
*/
  const adicionarContato = () => {
    if (nome && email) {
      setContatos([...contatos, { id: Date.now(), nome, email }]);
      setNome('');
      setEmail('');
      //console.log(contatos);
      Alert.alert('Contato adicionado com sucesso!');
    } else {
      Alert.alert('Preencha todos os campos!');
    }
  };

  const editarItem = () => {
    if (idEditando && nome && email) {
      const novaLista = contatos.map((item) =>
        item.id === Number(idEditando) ? { ...item, nome, email } : item
      );
      setContatos(novaLista);
      setIdEditando(null);
      setNome('');
      setEmail('');
    }
  };

  const editar = (item: Contato) => {
    setNome(item.nome);
    setEmail(item.email);
    setIdEditando(item.id.toString());
  };

  return (
    <View>
      <Text style={styles.titulo}>
        {idEditando ? 'Editar Contato' : 'Cadastro de Contatos'}
      </Text>
      <View style={styles.texto}>
        <TextInput
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholder="Digite seu Nome"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Digite seu Email"
        />
      </View>
      <View style={styles.button}>
        <Button
          title={idEditando ? 'Salvar Alterações' : 'Adicionar'}
          onPress={idEditando ? editarItem : adicionarContato}
        />
      </View>

      <FlatList
        style={styles.flatlist}
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.flatlist}>
            <Text>{item.nome}</Text>
            <Text>{item.email}</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Button title="E" onPress={() => editar(item)} />
              <Button
                title="D"
                onPress={() =>
                  setContatos(contatos.filter((c) => c.id !== item.id))
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
    //alignContent: 'center',
  },
  titulo: {
    fontSize: 24,
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10
    //padding: 10,
    //marginRight: 10
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  texto: {
    marginTop: 10,
    marginBottom: 10
    //  marginLeft: 10,
    //  marginRight: 10
  },
  flatlist: {
    flexDirection: 'row',
    textAlign: 'center',
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    gap: 10
  }
});

export default PrgContatos;
