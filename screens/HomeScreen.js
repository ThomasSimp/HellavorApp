import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation, route }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true); // State for modal visibility

  // Check if user is logged in via cookies on component mount
  useEffect(() => {
    const loggedInCookie = Cookies.get('isLoggedIn');
    if (loggedInCookie === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Update login status if the LoginScreen passes back a successful login
  useEffect(() => {
    if (route.params?.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [route.params?.isLoggedIn]);

  // Function to accept cookies and hide the modal
  const acceptCookies = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hellavor</Text>
      {isLoggedIn ? (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.buttonText}>Start the Quiz</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
      <Footer />

      {/* Modal for Cookie Consent */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              This site uses cookies to enhance user experience. By continuing to use this site, you agree to our use of cookies.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={acceptCookies}>
              <Text style={styles.modalButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  titleText: {
    color: '#000',
    fontSize: 32,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '150px',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
});
