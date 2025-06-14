import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Linking 
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Sample branch data
const branchLocations = [
  {
    id: 1,
    name: "Downtown Lagos",
    address: "123 Victoria Island, Lagos State",
    phone: "+234 901 234 5678",
    hours: "Mon-Sun: 8:00 AM - 10:00 PM",
    distance: "2.5 km",
    availableCars: 28,
    coordinates: { lat: 6.4281, lng: 3.4219 },
    features: ["24/7 Support", "Car Wash", "Premium Cars"]
  },
  {
    id: 2,
    name: "Airport Branch",
    address: "Murtala Muhammed Airport, Ikeja",
    phone: "+234 901 234 5679",
    hours: "24/7 Service",
    distance: "15.2 km",
    availableCars: 45,
    coordinates: { lat: 6.5774, lng: 3.3211 },
    features: ["Airport Pickup", "24/7 Service", "Express Rental"]
  },
  {
    id: 3,
    name: "Ikeja City Mall",
    address: "Obafemi Awolowo Way, Ikeja",
    phone: "+234 901 234 5680",
    hours: "Mon-Sun: 9:00 AM - 9:00 PM",
    distance: "8.7 km",
    availableCars: 22,
    coordinates: { lat: 6.6018, lng: 3.3515 },
    features: ["Mall Parking", "Quick Pickup", "Family Cars"]
  },
  {
    id: 4,
    name: "Lekki Phase 1",
    address: "Admiralty Way, Lekki Phase 1",
    phone: "+234 901 234 5681",
    hours: "Mon-Sun: 7:00 AM - 11:00 PM",
    distance: "12.1 km",
    availableCars: 35,
    coordinates: { lat: 6.4328, lng: 3.4536 },
    features: ["Luxury Cars", "Valet Service", "Premium Location"]
  }
];

export default function BranchesScreen() {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);

  const handleCallBranch = (phoneNumber: string) => {
    Alert.alert(
      'Call Branch',
      `Do you want to call ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Linking.openURL(`tel:${phoneNumber}`)
        }
      ]
    );
  };

  const handleDirections = (branch: typeof branchLocations[number]) => {
    const { lat, lng } = branch.coordinates;
    const url = `https://maps.google.com/?q=${lat},${lng}`;
    Linking.openURL(url);
  };

  const handleReserveBranch = (branch: typeof branchLocations[number]) => {
    Alert.alert(
      'Reserve at Branch',
      `Would you like to reserve a car at ${branch.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reserve', 
          onPress: () => Alert.alert('Success', 'Reservation request sent!') 
        }
      ]
    );
  };

  const getBranchStatusColor = (availableCars: number) => {
    if (availableCars > 30) return '#10B981'; // Green
    if (availableCars > 15) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Our Branches</Text>
          <Text style={styles.headerSubtitle}>Find the nearest DriveIt location</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FontAwesome name="map-marker" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Locations</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="car" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>130</Text>
            <Text style={styles.statLabel}>Total Cars</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="clock-o" size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Branch List */}
        <View style={styles.branchList}>
          {branchLocations.map((branch) => (
            <TouchableOpacity
              key={branch.id}
              style={[
                styles.branchCard,
                selectedBranch === branch.id && styles.selectedBranchCard
              ]}
              onPress={() => setSelectedBranch(branch.id)}
              activeOpacity={0.7}
            >
              <View style={styles.branchHeader}>
                <View style={styles.branchTitleContainer}>
                  <Text style={styles.branchName}>{branch.name}</Text>
                  <View style={styles.distanceContainer}>
                    <FontAwesome name="location-arrow" size={12} color="#9CA3AF" />
                    <Text style={styles.distance}>{branch.distance}</Text>
                  </View>
                </View>
                <View style={[
                  styles.availabilityBadge,
                  { backgroundColor: getBranchStatusColor(branch.availableCars) }
                ]}>
                  <Text style={styles.availabilityText}>{branch.availableCars} cars</Text>
                </View>
              </View>

              <Text style={styles.branchAddress}>{branch.address}</Text>
              <Text style={styles.branchHours}>{branch.hours}</Text>

              {/* Features */}
              <View style={styles.featuresContainer}>
                {branch.features.map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCallBranch(branch.phone)}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="phone" size={16} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDirections(branch)}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="map" size={16} color="#3B82F6" />
                  <Text style={styles.actionButtonText}>Directions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryActionButton]}
                  onPress={() => handleReserveBranch(branch)}
                  activeOpacity={0.7}
                >
                  <FontAwesome name="calendar" size={16} color="#FFFFFF" />
                  <Text style={[styles.actionButtonText, styles.primaryActionText]}>Reserve</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
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
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  branchList: {
    paddingHorizontal: 20,
  },
  branchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  selectedBranchCard: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  branchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  branchTitleContainer: {
    flex: 1,
  },
  branchName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availabilityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  branchAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  branchHours: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  featureTag: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  primaryActionButton: {
    backgroundColor: '#3B82F6',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 6,
  },
  primaryActionText: {
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 20,
  },
});