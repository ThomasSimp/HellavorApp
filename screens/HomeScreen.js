import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Cookies from 'js-cookie';
import Footer from '../components/Footer';

export default function HomeScreen({ navigation, route }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [email, setEmail] = useState(''); // State to store user's email
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle profile dropdown

  useEffect(() => {
    const loggedInCookie = Cookies.get('isLoggedIn');
    const userEmail = Cookies.get('email'); // Retrieve email from cookies
    if (loggedInCookie === 'true') {
      setIsLoggedIn(true);
      setEmail(userEmail); // Set email from cookie
    }
  }, []);

  useEffect(() => {
    if (route.params?.isLoggedIn) {
      setIsLoggedIn(true);
      setEmail(route.params.email); // Assume the email is passed via route params when logging in
    }
  }, [route.params?.isLoggedIn, route.params?.email]);

  const acceptCookies = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    Cookies.remove('isLoggedIn');
    Cookies.remove('email'); // Remove email cookie on logout
    setIsLoggedIn(false);
    setIsLogoutModalVisible(false);
    setShowDropdown(false); // Hide dropdown on logout
  };

  const confirmLogout = () => {
    setIsLogoutModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Hellavor</Text>
      {isLoggedIn ? (
        <>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.profileButton}>
              <Text style={styles.profileText}>👤 {email}</Text>
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity style={styles.dropdownItem} onPress={confirmLogout}>
                  <Text style={styles.dropdownText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
            <Text style={styles.buttonText}>Start the Quiz</Text>
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
  profileContainer: {
    position: 'absolute', // Set the position to absolute
    top: 50, // Adjust this value to position it from the top
    right: 20, // Align to the right
  },
  profileButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    top: 50,
    right: 0,
    width: 150,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#007bff',
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
