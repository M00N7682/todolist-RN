// screens/HomeScreen.tsx
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import TaskItem from '../components/TaskItem';
import useTodoManager from '../hooks/useTodoManager';

export default function HomeScreen() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoManager();
  const [text, setText] = useState('');
  const [type, setType] = useState<'todo' | 'fun'>('todo');

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text, type);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 일정</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="할 일을 입력하세요"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button title={type === 'todo' ? '할 일' : '놀 일'} onPress={() => setType(type === 'todo' ? 'fun' : 'todo')} />
        <Button title="추가" onPress={handleAdd} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => removeTodo(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  inputRow: { flexDirection: 'row', gap: 5, marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, padding: 10 },
  title: { fontSize: 20, marginBottom: 10 },
});
