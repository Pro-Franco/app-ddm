import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Usuario = {
  id: number;
  name: string;
  email: string;
};

const DadosUsuariosFlat = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Lista de usuários

  useEffect(() => {
    const usuarios = async () => {
      try {
        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const dados: Usuario[] = await resposta.json();
        setUsuarios(dados); // Atualizando o estado com os usuários
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    usuarios();
  }, []); // A requisição será feita uma vez quando o componente for montado

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios} // Dados a serem exibidos
        keyExtractor={(item) => item.id.toString()} // Chave única para cada item
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>Nome: {item.name}</Text>
            <Text style={styles.texto}>Email: {item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  texto: {
    fontSize: 18,
  },
});

export default DadosUsuariosFlat;
