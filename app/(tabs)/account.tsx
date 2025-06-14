import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Navigate back to login screen
            router.replace('/login');
          },
        },
      ],
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings functionality coming soon!');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Help & support functionality coming soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('@/assets/images/shery.jpg')}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.profileName}>Sheriff Olanlokun</Text>
            <Text style={styles.profileEmail}>sheriffolanlokun@gmail.com</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          
          {/* Edit Profile */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleEditProfile}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome name="edit" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleSettings}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome name="cog" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={handleHelp}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <FontAwesome name="question-circle" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
          </TouchableOpacity>

        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <FontAwesome name="sign-out" size={20} color="#FFFFFF" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Text style={styles.appInfoText}>DriveIt v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Your trusted car rental companion</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#3B82F6',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appInfoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  appInfoText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});