import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation, route }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // State for logout confirmation modal

  useEffect(() => {
    const loggedInCookie = Cookies.get('isLoggedIn');
    if (loggedInCookie === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (route.params?.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [route.params?.isLoggedIn]);

  const acceptCookies = () => {
    setIsModalVisible(false);
  };

  // Function to log out the user
  const logout = () => {
    Cookies.remove('isLoggedIn'); // Remove the cookie
    setIsLoggedIn(false); // Update login state
    setIsLogoutModalVisible(false); // Close the confirmation modal
  };

  const confirmLogout = () => {
    setIsLogoutModalVisible(true); // Open confirmation modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hellavor</Text>
      {isLoggedIn ? (
        <>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
            <Text style={styles.buttonText}>Start the Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
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

      {/* Modal for Logout Confirmation */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={logout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsLogoutModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
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
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 77, 77, 0.8)', // Semi-transparent red background for logout button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: 150,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  modalButtonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    alignItems: 'center', // Center the buttons horizontally
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
