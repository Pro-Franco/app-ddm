import React, { useReducer, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Switch,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { z, ZodError } from 'zod';

type FieldType = 'text' | 'password' | 'checkbox' | 'picker' | 'date';

interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

const resetForm = (fields: FormField[], dispatch: React.Dispatch<any>) => {
  fields.forEach((field) => {
    if (field.type === 'checkbox') {
      dispatch({ name: field.name, value: false });
    } else {
      dispatch({ name: field.name, value: '' });
    }
  });
};

const formReducer = (
  state: Record<string, any>,
  action: { name: string; value: any }
) => ({
  ...state,
  [action.name]: action.value,
});

const createValidationSchema = (fields: FormField[]) => {
  const schemaFields: Record<string, any> = {};

  fields.forEach((field) => {
    if (field.type === 'text' || field.type === 'password') {
      schemaFields[field.name] = z
        .string()
        .min(1, `${field.label} é obrigatório`)
        .optional();
    } else if (field.type === 'checkbox') {
      schemaFields[field.name] = z
        .boolean()
        .refine((val) => val === true, `Você precisa aceitar os termos`)
        .optional();
    } else if (field.type === 'picker') {
      schemaFields[field.name] = z
        .string()
        .refine((val) => !!val, `Selecione um ${field.label}`)
        .optional();
    }
  });

  return z.object(schemaFields);
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const [formData, dispatch] = useReducer(
    formReducer,
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === 'checkbox' ? false : '',
      }),
      {}
    )
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [currentField, setCurrentField] = useState<string | null>(null);
  //const [activeDateField, setActiveDateField] = useState<string | null>(null);
  const [activeDateField, setActiveDateField] = useState<string>('');
  const formSchema = createValidationSchema(fields);

  const handleInputChange = (name: string, value: any) => {
    dispatch({ name, value });
  };

  const handleDateChange = (date: Date) => {
    if (currentField) {
      dispatch({ name: currentField, value: date.toISOString().split('T')[0] }); // Define the date in ISO format
    }
    setIsDatePickerVisible(false);
    setCurrentField(null);
  };

  const handleDatePickerCancel = () => {
    setIsDatePickerVisible(false);
    setCurrentField(null);
  };

  const handleSubmit = () => {
    try {
      const result = formSchema.parse(formData);
      onSubmit(result);
      resetForm(fields, dispatch);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length) {
            formattedErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  const renderInput = (field: FormField, index: number) => {
    const errorMessage = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'password':
        return (
          <View key={index}>
            <TextInput
              style={[
                styles.input,
                ...(errorMessage ? [styles.inputError] : []),
              ]}
              placeholder={field.placeholder || field.label}
              value={formData[field.name]}
              onChangeText={(text) => handleInputChange(field.name, text)}
              keyboardType={field.keyboardType || 'default'}
              secureTextEntry={field.type === 'password'}
              accessibilityLabel={field.label}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        );
      case 'checkbox':
        return (
          <View key={index} style={styles.checkboxContainer}>
            <Text>{field.label}</Text>
            <Switch
              value={formData[field.name] || false}
              onValueChange={(value) => handleInputChange(field.name, value)}
              accessibilityLabel={field.label}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        );
      case 'picker':
        return (
          <View key={index} style={styles.input}>
            <Text>{field.label}</Text>
            <Picker
              selectedValue={formData[field.name]}
              onValueChange={(itemValue) =>
                handleInputChange(field.name, itemValue)
              }
              accessibilityLabel={field.label}
            >
              {field.options?.map((option, idx) => (
                <Picker.Item
                  key={idx}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        );
      case 'date':
        return (
          <View key={index} style={styles.input}>
            <Text>{field.label}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsDatePickerVisible(true);
                setActiveDateField(field.name);
              }}
              style={{
                padding: 12,
                backgroundColor: '#eee',
                borderRadius: 5,
              }}
            >
              <Text>
                {formData[field.name]
                  ? new Date(formData[field.name]).toLocaleDateString()
                  : 'Selecione a data'}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              date={
                formData[field.name]
                  ? new Date(formData[field.name])
                  : new Date()
              }
              onConfirm={(date) => {
                handleInputChange(activeDateField, date.toISOString());

                setIsDatePickerVisible(false);
                setActiveDateField('');
              }}
              onCancel={() => {
                setIsDatePickerVisible(false);
                setActiveDateField('');
              }}
            />
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View>
      <FlatList
        data={fields}
        renderItem={({ item, index }) => renderInput(item, index)}
        keyExtractor={(item) => item.name}
        ListFooterComponent={<Button title="Enviar" onPress={handleSubmit} />}
        contentContainerStyle={styles.container}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={handleDatePickerCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#051a35',
    padding: 20,
    gap: 10,
  },
  input: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  checkboxContainer: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default DynamicForm;
