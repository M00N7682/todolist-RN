import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Todo } from '../hooks/useTodoManager';

interface Props {
  item: Todo;
  onComplete: () => void;
  onDelete: () => void;
}

export default function TaskItem({ item, onComplete, onDelete }: Props) {
  const isCompleted = item.progress === 100;

  return (
    <TouchableOpacity
      onLongPress={onDelete}
      style={[styles.card, isCompleted && styles.completedCard]}
    >
      <View style={styles.topRow}>
        <Text style={styles.emoji}>{item.type === 'fun' ? '🎉' : '🧠'}</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.text, isCompleted && styles.completedText]}>
            {item.text}
          </Text>
          <Text style={styles.progressText}>진척도: {item.progress}%</Text>
        </View>

        {/* ✅ 버튼을 오른쪽 끝으로 */}
        {!isCompleted && (
          <View style={styles.completeButton}>
            <Button title="완료" onPress={onComplete} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#e6ffe6',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  completeButton: {
    marginLeft: 'auto', // ✅ 오른쪽 끝으로 밀어냄
  },
});
