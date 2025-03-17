import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ContactItemProps {
  name: string;
  cell: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default function ContactItem({
  name,
  cell,
  onDelete,
  onEdit,
}: ContactItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{name} </Text>
        <Text>{cell}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Remove" onPress={onDelete} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Update" onPress={onEdit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ocupa toda a largura disponível
    padding: 10,
  },
  textContainer: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonWrapper: {
    flex: 1, // Faz os botões ocuparem a largura disponível
  },
});
