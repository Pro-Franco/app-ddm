import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

type Usuario = {
  id: number;
  name: string;
  email: string;
};

const DadosUsuariosMap = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Lista de usuários

  useEffect(() => {
    const bUsuarios = async () => {
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

    bUsuarios();
  }, []); // A requisição será feita uma vez quando o componente for montado

  return (
    <View style={styles.container}>
      {usuarios.map((usuario) => (
        <View key={usuario.id} style={styles.item}>
          <Text style={styles.texto}>Nome: {usuario.name}</Text>
          <Text style={styles.texto}>Email: {usuario.email}</Text>
        </View>
      ))}
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

export default DadosUsuariosMap;
