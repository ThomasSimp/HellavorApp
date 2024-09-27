import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2024 Hellavor. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%', // Make the footer span the full width
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f1f1f1', // Light background color to separate it from the body
    paddingVertical: 10,
    borderTopWidth: 1, // Border to create a separation
    borderTopColor: '#ddd', // Light border color
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});
