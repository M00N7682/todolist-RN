// components/TaskItem.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Todo } from '../hooks/useTodoManager';

interface Props {
  item: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ item, onToggle, onDelete }: Props) {
  return (
    <TouchableOpacity onPress={onToggle} onLongPress={onDelete}>
      <View style={styles.container}>
        <Text style={[styles.icon, item.type === 'fun' ? styles.fun : styles.todo]}>
          {item.type === 'fun' ? '🎉' : '🧠'}
        </Text>
        <Text style={[styles.text, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  icon: { marginRight: 8, fontSize: 18 },
  text: { fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#aaa' },
  todo: {},
  fun: {},
});
