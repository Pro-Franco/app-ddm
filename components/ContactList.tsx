import React from 'react';
import { View } from 'react-native';
import ContactItem from './ContactItem';

interface ContactListProps {
  contacts: { name: string; cell: string }[];
  removeContact: (name: string) => void;
  editContact: (name: string, cell: string) => void;
}

export default function ContactList({
  contacts,
  removeContact,
  editContact,
}: ContactListProps) {
  return (
    <View>
      {contacts.map((item, index) => (
        <ContactItem
          key={index}
          name={item.name}
          cell={item.cell}
          onDelete={() => removeContact(item.name)}
          onEdit={() => editContact(item.name, item.cell)}
        />
      ))}
    </View>
  );
}
