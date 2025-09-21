import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ScrollView,
  Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Upload, User } from 'lucide-react-native';

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to upload photos.'
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploading(true);
        // Simulate upload delay
        setTimeout(() => {
          setProfileImage(result.assets[0].uri);
          setUploading(false);
          Alert.alert('Success', 'Profile photo updated successfully!');
        }, 1500);
      }
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setUploading(true);
        // Simulate upload delay
        setTimeout(() => {
          setProfileImage(result.assets[0].uri);
          setUploading(false);
          Alert.alert('Success', 'Profile photo updated successfully!');
        }, 1500);
      }
    } catch (error) {
      setUploading(false);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      'Select Photo',
      'Choose how you want to add your profile photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Student Profile</Text>
        <Text style={styles.subtitle}>Manage your account</Text>
      </View>

      {/* Profile Photo Section */}
      <View style={styles.photoSection}>
        <View style={styles.photoContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <User size={40} color="#9CA3AF" />
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.photoButton} 
            onPress={showImageOptions}
            disabled={uploading}
          >
            <Camera size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]} 
          onPress={showImageOptions}
          disabled={uploading}
        >
          <Upload size={20} color="#000000" />
          <Text style={styles.uploadButtonText}>
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Student Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Student Name</Text>
          <Text style={styles.infoValue}>John Doe</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Student Code</Text>
          <Text style={styles.infoValue}>144</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Age</Text>
          <Text style={styles.infoValue}>16 years old</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Sessions Completed</Text>
          <Text style={styles.infoValue}>12 sessions</Text>
        </View>
      </View>

      {/* Upload Instructions */}
      <View style={styles.instructionsCard}>
        <Text style={styles.instructionsTitle}>Photo Guidelines</Text>
        <Text style={styles.instructionsText}>
          • Use a clear, recent photo of yourself{'\n'}
          • Make sure your face is clearly visible{'\n'}
          • Avoid group photos or photos with filters{'\n'}
          • Square photos work best for profile pictures
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  uploadButtonDisabled: {
    opacity: 0.7,
  },
  uploadButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  infoSection: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  instructionsCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});