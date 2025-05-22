import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import TaskItem from '../components/TaskItem';
import useTodoManager from '../hooks/useTodoManager';

export default function HomeScreen() {
  const { todos, addTodo, removeTodo, markComplete  } = useTodoManager();
  const [text, setText] = useState('');
  const [type, setType] = useState<'todo' | 'fun'>('todo');

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text, type);
      setText('');
    }
  };

  const completedCount = todos.filter(todo => todo.progress === 100).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : completedCount / totalCount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 일정</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          완료: {completedCount} / {totalCount}
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="오늘의 할 일은 무엇인가요?"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button title={type === 'todo' ? 'Front' : 'Back'} onPress={() => setType(type === 'todo' ? 'fun' : 'todo')} />
        <Button title="추가" onPress={handleAdd} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onComplete={() => markComplete(item.id)}
            onDelete={() => removeTodo(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5A65EA',
    borderRadius: 5,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
  },
});
