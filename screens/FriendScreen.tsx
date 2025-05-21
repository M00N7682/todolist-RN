// screens/FriendScreen.tsx
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import TaskItem from '../components/TaskItem';
import { dummyUsers } from '../data/dummyUsers';
import { Todo } from '../hooks/useTodoManager';

export default function FriendScreen() {
  const [input, setInput] = useState('');
  const [friendTodos, setFriendTodos] = useState<Todo[]>([]); 

  const handleSearch = () => {
    const data = dummyUsers[input.toLowerCase()];
    setFriendTodos(data || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>친구 일정 보기</Text>
      <TextInput
        placeholder="친구 이름 입력 (예: alice)"
        value={input}
        onChangeText={setInput}
        style={styles.input}
      />
      <Button title="검색" onPress={handleSearch} />
      <FlatList
        data={friendTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onToggle={() => {}} onDelete={() => {}} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
