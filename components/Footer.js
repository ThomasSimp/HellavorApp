import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';

export default function Footer() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent('');
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.footerNote}>
        Disclaimer: This project is a proprietary creation of Hellavor. The information, content, and design are the exclusive property of Hellavor and are intended for the use of its authorized users and partners only. Any unauthorized distribution or modification of this content is strictly prohibited.
      </Text>

      <View style={styles.links}>
        <TouchableOpacity onPress={() => openModal('Privacy Policy')}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => openModal('Terms of Service')}>
          <Text style={styles.linkText}>Terms of Service</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => openModal('Support')}>
          <Text style={styles.linkText}>Support</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>© 2024 Hellavor. All rights reserved.</Text>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalContent}</Text>
              <Text style={styles.modalText}>
                {modalContent === 'Privacy Policy' && (
                  `At Hellavor, we value your privacy and are committed to safeguarding your personal information. This Privacy Policy outlines how we collect, use, and protect the data you provide while using our services. We only collect personal information necessary for the provision of our services and will never share your data with third parties without your consent, except as required by law. You have the right to access, modify, or request deletion of your personal data at any time. For detailed information on how we manage and protect your data, please review the full Privacy Policy on our website.`
                )}
                {modalContent === 'Terms of Service' && (
                  `Welcome to Hellavor. By accessing or using our services, you agree to comply with the following Terms of Service. These terms govern your use of Hellavor's services, ensuring a safe and respectful environment for all users. You agree not to misuse our services, attempt unauthorized access, or engage in any activities that violate local, national, or international laws. Hellavor reserves the right to suspend or terminate your account if we determine, in our sole discretion, that you have violated these terms. Please review the full Terms of Service on our website for additional details regarding acceptable use, limitations of liability, and your responsibilities as a user.`
                )}
                {modalContent === 'Support' && (
                  `For support, please contact us at support@hellavor.com. Our team is here to assist you with any issues or questions you may have about our services. We aim to respond to all inquiries within 24-48 hours.`
                )}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
