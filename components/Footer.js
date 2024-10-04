import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerNote}>
        Disclaimer: This project is a proprietary creation of Hellavor. The information, content, and design are the exclusive property of Hellavor and are intended for the use of its authorized users and partners only. Any unauthorized distribution or modification of this content is strictly prohibited.
      </Text>
      <View style={styles.links}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity>
          <Text style={styles.linkText}>Support</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>© 2024 Hellavor. All rights reserved.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerNote: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  linkText: {
    color: '#007BFF',
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 14,
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});
