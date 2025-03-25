/*
 * Objetivo do programa: Cadastro e edição de contatos é ensinar a usar o FlatList,
 * o useState, useEffect, Pressable, Type, Interface, TextInput entre outros
 * em uma aplicação React Native com uma operação de crud de memoria.
 * Autor: Roginaldo Franco
 */
import { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; // Usando ícones do Expo

// Definição do tipo 'Contato' para garantir que cada contato tenha um id único, nome e e-mail
type Contato = {
  id: string; // ID único de cada contato
  contato: string; // Nome do contato
  email: string; // E-mail do contato
};

// Componente principal de cadastro e edição de contatos
const PrgContatos = () => {
  // Estados locais para armazenar os dados e informações da interface
  const [dados, setDados] = useState<Contato[]>([]); // Armazena a lista de contatos
  const [contato, setContato] = useState(''); // Armazena o nome do contato a ser adicionado ou editado
  const [email, setEmail] = useState(''); // Armazena o e-mail do contato a ser adicionado ou editado
  const [idEditando, setIdEditando] = useState<string | null>(null); // Estado para saber se estamos editando um contato ou não

  /*
    O useEffect abaixo foi comentado, pois ele era uma maneira de depuração para observar os dados. 
    Porém, neste código ele não é necessário, pois a lista de dados já está sendo atualizada corretamente.
  */
  // useEffect(() => {
  //   console.log('Dados atualizados:', dados);
  // }, [dados]);

  // Função para adicionar um novo contato à lista
  function Adicionar1() {
    // Verifica se tanto o nome quanto o e-mail foram informados
    if (contato && email) {
      // Cria um novo objeto contato com um id único gerado pela hora atual
      const novoContato = { id: Date.now().toString(), contato, email };
      // Cria uma nova lista de contatos, adicionando o novo contato
      const novaLista = [...dados, novoContato];
      // Atualiza o estado com a nova lista de contatos
      setDados(novaLista);
      // Limpa os campos de input
      setContato('');
      setEmail('');
      // Exibe um alerta informando que o contato foi adicionado com sucesso
      console.log(novaLista);
      Alert.alert('Contato adicionado com sucesso!');
    }
  }

  // Função para adicionar um novo contato, usada no botão principal
  const Adicionar = () => {
    if (contato && email) {
      // Cria um novo contato com um id único gerado pela hora atual
      const novoContato = { id: Date.now().toString(), contato, email };
      // Atualiza a lista de dados com o novo contato
      setDados([...dados, novoContato]);
      // Não estamos limpando os campos neste caso, então deixamos eles como estão
      console.log(dados);
      // O alerta foi removido para não aparecer toda vez que adiciona um contato
      // Alert.alert('Contato adicionado com sucesso!');
    }
  };

  // Função para editar um contato existente
  const EditarItem = () => {
    if (contato && email && idEditando) {
      // Mapeia a lista de contatos e atualiza o contato que está sendo editado
      const novaLista = dados.map((item) =>
        item.id === idEditando ? { ...item, contato, email } : item
      );
      // Atualiza a lista de contatos com o item editado
      setDados(novaLista);
      // Reseta o estado de edição
      setIdEditando(null);
      setContato('');
      setEmail('');
      // Exibe um alerta informando que o contato foi editado com sucesso
      Alert.alert('Contato editado com sucesso!');
    }
  };

  // Função chamada ao clicar no ícone de edição de um contato
  const Editar = (item: Contato) => {
    // Preenche os campos de input com as informações do contato selecionado para edição
    setContato(item.contato);
    setEmail(item.email);
    setIdEditando(item.id); // Define o id do contato a ser editado
  };

  // Função para remover um contato da lista
  const removerItem = (id: string) => {
    // Filtra a lista de contatos removendo o item com o id correspondente
    setDados(dados.filter((item) => item.id !== id));
    // Exibe um alerta informando que o contato foi removido
    Alert.alert('Contato removido!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {idEditando ? 'Editar Contato' : 'Cadastro de Contatos'}
      </Text>

      {/* Campo de entrada para o nome do contato */}
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        value={contato}
        onChangeText={setContato} // Atualiza o estado 'contato' sempre que o texto mudar
        placeholder="Digite o nome do contato"
      />

      {/* Campo de entrada para o e-mail do contato */}
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        value={email}
        onChangeText={setEmail} // Atualiza o estado 'email' sempre que o texto mudar
        placeholder="Digite o email"
      />

      {/* Botão para adicionar ou editar o contato */}
      <Button
        title={idEditando ? 'Salvar Alterações' : 'Adicionar'} // Define o texto do botão dependendo do estado
        onPress={idEditando ? EditarItem : Adicionar} // Chama a função de editar ou adicionar dependendo do estado
      />

      {/* Lista de contatos */}
      <FlatList
        data={dados} // Passa a lista de dados (contatos)
        keyExtractor={(item) => item.id} // Define o id como chave única para cada item
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.contato} - </Text>
            <Text style={styles.text}>{item.email}</Text>
            <View style={styles.itemPress}>
              {/* Botão para editar o contato */}
              <Pressable onPress={() => Editar(item)}>
                <MaterialIcons
                  style={styles.iconButton}
                  name="edit"
                  size={14}
                  color="blue"
                />
              </Pressable>
              {/* Botão para remover o contato */}
              <Pressable onPress={() => removerItem(item.id)}>
                <MaterialIcons
                  style={styles.iconButton}
                  name="delete"
                  size={14}
                  color="red"
                />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// Estilos para o layout do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  }, // Container com padding
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
    // backgroundColor: '#e0e0e0',
    //width: 45,
    //height: 45,
    borderWidth: 1,
    borderColor: '#301455',
    borderRadius: 14, // Círculo perfeito
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrgContatos;
