import { View, Text, StyleSheet } from 'react-native';

type Usuario = {
  name: string;
  age: number;
};

export const Welcome = (user: Usuario) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ola {user.name} eu sou um componente! Eu tenho {user.age} anos
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },
});
