import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PlacarFutebol = () => {
  // Estados para os gols dos dois times
  const [golsTimeA, setGolsTimeA] = useState(0);
  const [golsTimeB, setGolsTimeB] = useState(0);

  // Funções para marcar gols
  const marcarGolTimeA = () => setGolsTimeA(golsTimeA + 1);
  const marcarGolTimeB = () => setGolsTimeB(golsTimeB + 1);

  // Função para zerar o placar
  const zerarPlacar = () => {
    setGolsTimeA(0);
    setGolsTimeB(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚽ Placar de Futebol</Text>

      {/* Placar dos Times */}
      <View style={styles.scoreContainer}>
        <View style={styles.team}>
          <Text style={styles.teamName}>🏆 Time A</Text>
          <Text style={styles.score}>{golsTimeA}</Text>
          <Button title="Gol Time A" onPress={marcarGolTimeA} />
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.team}>
          <Text style={styles.teamName}>🔥 Time B</Text>
          <Text style={styles.score}>{golsTimeB}</Text>
          <Button title="Gol Time B" onPress={marcarGolTimeB} />
        </View>
      </View>

      {/* Botão para zerar o placar */}
      <Button title="Zerar Placar" onPress={zerarPlacar} color="red" />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32', // Verde campo de futebol
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  team: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  score: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFD700', // Dourado
    marginBottom: 10,
  },
  vs: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginHorizontal: 20,
  },
});

export default PlacarFutebol;
