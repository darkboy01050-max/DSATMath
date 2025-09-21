import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Modal,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width * 0.8));

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false);
    });
  };

  const handleMenuItemPress = (item: string) => {
    closeSidebar();
    // TODO: Navigate to respective screens
    console.log(`Navigate to: ${item}`);
  };

  const menuItems = [
    'Recorded Sessions',
    'Sessions Materials', 
    'Student Track',
    'Contact Us'
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.logoContainer} onPress={openSidebar}>
          <Image 
            source={require('@/assets/images/dsat-logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>DSAT Math Prep Academy</Text>
          <Text style={styles.subtitle}>Mr. Mohamed Elewa</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.studentCard}>
          <Text style={styles.cardTitle}>Student Information</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoValue}>John Doe</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age:</Text>
            <Text style={styles.infoValue}>16 years old</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Grade:</Text>
            <Text style={styles.infoValue}>11th Grade</Text>
          </View>
        </View>
      </View>

      {/* Sidebar Modal */}
      <Modal
        visible={sidebarVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground} 
            onPress={closeSidebar}
            activeOpacity={1}
          />
          
          <Animated.View 
            style={[
              styles.sidebar,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            {/* Sidebar Header */}
            <View style={styles.sidebarHeader}>
              <Image 
                source={require('@/assets/images/dsat-logo.png')} 
                style={styles.sidebarLogo}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleMenuItemPress(item)}
                >
                  <Text style={styles.menuItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 40,
    height: 40,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sidebarLogo: {
    width: 50,
    height: 50,
  },
  closeButton: {
    padding: 8,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});