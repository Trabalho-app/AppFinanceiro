import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const FullScreenLoader = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenLoader;