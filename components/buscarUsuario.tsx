import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Usuario = {
  id: number;
  name: string;
  email: string;
};

const Usuario = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const BuscarUsuario = async () => {
      try {
        const resposta = await fetch(
          'https://jsonplaceholder.typicode.com/users/1'
        );
        const dados = await resposta.json();
        setUsuario(dados);
      } catch (erro) {
        console.error('Erro ao buscar dados:', erro);
      }
    };

    BuscarUsuario();
  }, []);

  return (
    <View>
      {usuario ? (
        <Text style={styles.text}>Nome: {usuario.name}</Text>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Usuario;
