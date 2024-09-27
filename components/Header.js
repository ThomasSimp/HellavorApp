import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View style={{ height: 50, backgroundColor: '#f8f8f8', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Hellavor</Text>
    </View>
  );
}
