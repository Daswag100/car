import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  Animated,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Define data for car categories
const carCategories = [
  {
    id: 1,
    name: "Standard",
    count: 56,
    image: require('@/assets/images/image1.png'),
    isActive: true,
  },
  {
    id: 2,
    name: "Prestige",
    count: 22,
    image: require('@/assets/images/image2.png'),
    isActive: false,
  },
  {
    id: 3,
    name: "SUV",
    count: 34,
    image: require('@/assets/images/image3.png'),
    isActive: false,
  },
];

// Define data for available vehicles
const availableVehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Yaris iA",
    price: 350,
    engine: "4-Cyl 1.5 Liter",
    image: require('@/assets/images/image4.png'),
    hasEngine: true,
    hasImage: true,
    isCompact: false,
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "i20",
    price: 250,
    engine: null,
    image: require('@/assets/images/hyundai1.png'),
    hasEngine: false,
    hasImage: true,
    isCompact: true,
  },
];

export default function VehiclesScreen() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pressedCard, setPressedCard] = useState<number | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState({ categories: carCategories, vehicles: availableVehicles });

  const handleCategoryPress = (categoryId: number) => {
    console.log('Category pressed:', categoryId);
    // Handle category selection logic here
  };

  const handleVehiclePress = (vehicleId: number) => {
    console.log('Vehicle pressed:', vehicleId);
    // Navigate to vehicle details screen
    // router.push(`/vehicle/${vehicleId}`);
  };

  const handleSearchPress = () => {
    setSearchVisible(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchActive(false);
    setSearchResults({ categories: carCategories, vehicles: availableVehicles });
  };

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setIsSearchActive(false);
      setSearchResults({ categories: carCategories, vehicles: availableVehicles });
      return;
    }

    setIsSearchActive(true);
    const searchTerm = query.toLowerCase().trim();
    
    // Filter categories
    const matchedCategories = carCategories.filter(category =>
      category.name.toLowerCase().includes(searchTerm)
    );

    // Filter vehicles
    const matchedVehicles = availableVehicles.filter(vehicle =>
      vehicle.brand.toLowerCase().includes(searchTerm) ||
      vehicle.model.toLowerCase().includes(searchTerm)
    );

    setSearchResults({ categories: matchedCategories, vehicles: matchedVehicles });
  };

  const handleSearchSubmit = () => {
    console.log('Searching for:', searchQuery);
    performSearch(searchQuery);
    setSearchVisible(false);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    // Real-time search as user types
    performSearch(text);
  };

  const isItemHighlighted = (itemName: string) => {
    if (!searchQuery.trim()) return false;
    return itemName.toLowerCase().includes(searchQuery.toLowerCase().trim());
  };

  const handleCardPressIn = (id: number) => {
    setPressedCard(id);
  };

  const handleCardPressOut = () => {
    setPressedCard(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9fa" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearchPress} style={styles.searchBarContainer}>
            <View style={styles.searchShadow} />
            <View style={styles.searchBar}>
              <Text style={styles.searchText}>Search for a car</Text>
              <FontAwesome name="search" size={17} color="#6B7280" />
            </View>
          </TouchableOpacity>
          
          {/* Clear Search Button */}
          {isSearchActive && (
            <TouchableOpacity 
              style={styles.clearSearchButton}
              onPress={clearSearch}
              activeOpacity={0.7}
            >
              <FontAwesome name="times-circle" size={24} color="#3B82F6" />
            </TouchableOpacity>
          )}
        </View>

        {/* Car Categories */}
        <View style={styles.categoriesContainer}>
          {searchResults.categories.map((category, index) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryCard, { marginLeft: index > 0 ? 12 : 0 }]}
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(category.id)}
              onPressIn={() => handleCardPressIn(category.id)}
              onPressOut={handleCardPressOut}
            >
              <View style={styles.categoryShadow} />
              <Animated.View style={[
                styles.categoryContent,
                { 
                  backgroundColor: category.isActive || isItemHighlighted(category.name) ? '#3B82F6' : '#FFFFFF',
                  transform: [{ scale: pressedCard === category.id ? 0.95 : 1 }],
                  opacity: pressedCard === category.id ? 0.8 : 1,
                  borderWidth: isItemHighlighted(category.name) ? 2 : 0,
                  borderColor: isItemHighlighted(category.name) ? '#1D4ED8' : 'transparent',
                }
              ]}>
                <Image 
                  source={category.image} 
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.categoryName,
                  { color: (category.isActive || isItemHighlighted(category.name)) ? '#FFFFFF' : '#000000' }
                ]}>
                  {category.name}
                </Text>
                <Text style={[
                  styles.categoryCount,
                  { color: (category.isActive || isItemHighlighted(category.name)) ? '#FFFFFF' : '#9CA3AF' }
                ]}>
                  {category.count}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Available Vehicles Label */}
        {isSearchActive && searchResults.vehicles.length > 0 && (
          <Text style={styles.availableLabel}>
            Found {searchResults.vehicles.length} vehicle{searchResults.vehicles.length !== 1 ? 's' : ''}
          </Text>
        )}
        {!isSearchActive && (
          <Text style={styles.availableLabel}>Available vehicles</Text>
        )}

        {/* Only show vehicles section if there are vehicles OR if not searching */}
        {(!isSearchActive || searchResults.vehicles.length > 0) && (
          <>
            {/* Vehicle Cards */}
            {searchResults.vehicles.map((vehicle) => (
              <TouchableOpacity 
                key={vehicle.id} 
                style={[
                  styles.vehicleContainer,
                  vehicle.isCompact && styles.compactVehicleContainer
                ]}
                activeOpacity={0.7}
                onPress={() => handleVehiclePress(vehicle.id)}
                onPressIn={() => handleCardPressIn(vehicle.id + 100)}
                onPressOut={handleCardPressOut}
              >
                <View style={[
                  styles.vehicleShadow,
                  vehicle.isCompact && styles.compactVehicleShadow,
                  (isItemHighlighted(vehicle.brand) || isItemHighlighted(vehicle.model)) && styles.highlightedShadow
                ]} />
                <Animated.View style={[
                  styles.vehicleCard,
                  vehicle.isCompact && styles.compactVehicleCard,
                  {
                    transform: [{ scale: pressedCard === (vehicle.id + 100) ? 0.96 : 1 }],
                    opacity: pressedCard === (vehicle.id + 100) ? 0.8 : 1,
                    borderWidth: (isItemHighlighted(vehicle.brand) || isItemHighlighted(vehicle.model)) ? 3 : 0,
                    borderColor: (isItemHighlighted(vehicle.brand) || isItemHighlighted(vehicle.model)) ? '#3B82F6' : 'transparent',
                    backgroundColor: pressedCard === (vehicle.id + 100) ? '#F0F8FF' : '#FFFFFF',
                  }
                ]}>
                  <View style={styles.vehicleHeader}>
                    <Text style={[
                      styles.vehicleBrand,
                      { color: isItemHighlighted(vehicle.brand) ? '#3B82F6' : '#000000' }
                    ]}>
                      {vehicle.brand}
                    </Text>
                    <Text style={styles.vehiclePrice}>${vehicle.price}</Text>
                  </View>
                  
                  <View style={styles.vehicleSubHeader}>
                    <Text style={[
                      styles.vehicleModel,
                      { color: isItemHighlighted(vehicle.model) ? '#3B82F6' : '#9CA3AF' }
                    ]}>
                      {vehicle.model}
                    </Text>
                    <Text style={styles.vehiclePriceUnit}>/ month</Text>
                  </View>
                  
                  {vehicle.hasEngine && (
                    <View style={styles.vehicleEngineRow}>
                      <Text style={styles.engineLabel}>Engine</Text>
                      <Text style={styles.engineValue}>{vehicle.engine}</Text>
                    </View>
                  )}
                  
                  {vehicle.hasImage && vehicle.image && (
                    <TouchableOpacity
                      onPressIn={() => handleCardPressIn(vehicle.id + 200)}
                      onPressOut={handleCardPressOut}
                      style={{
                        backgroundColor: pressedCard === (vehicle.id + 200) ? '#3B82F6' : 'white',
                        marginTop: 10,
                        borderBottomLeftRadius: 35,
                        borderBottomRightRadius: 35,
                        overflow: 'hidden',
                      }}
                    >
                      <Image 
                        source={vehicle.image} 
                        style={{
                          width: '100%',
                          height: 100,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                </Animated.View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* No Vehicles Found - only show if searching AND no vehicles AND no categories found */}
        {isSearchActive && searchResults.vehicles.length === 0 && searchResults.categories.length === 0 && (
          <View style={styles.noResultsContainer}>
            <FontAwesome name="search" size={48} color="#E5E7EB" />
            <Text style={styles.noResultsText}>No results found for "{searchQuery}"</Text>
            <TouchableOpacity style={styles.clearSearchLink} onPress={clearSearch}>
              <Text style={styles.clearSearchLinkText}>Show all items</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Add bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Search Modal */}
      <Modal
        visible={searchVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSearchVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.searchModal}>
            <View style={styles.searchModalHeader}>
              <Text style={styles.searchTitle}>Search for a car</Text>
              <TouchableOpacity 
                onPress={() => setSearchVisible(false)}
                style={styles.closeButton}
              >
                <FontAwesome name="times" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchInputContainer}>
              <FontAwesome name="search" size={16} color="#9CA3AF" style={styles.searchInputIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Enter car brand, model, or type..."
                value={searchQuery}
                onChangeText={handleSearchChange}
                autoFocus={true}
                onSubmitEditing={handleSearchSubmit}
                returnKeyType="search"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.searchSubmitButton}
              onPress={handleSearchSubmit}
            >
              <Text style={styles.searchSubmitText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 30,
  },

  // Search Bar Styles
  searchContainer: {
    marginTop: 40,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchBarContainer: {
    flex: 1,
  },
  searchShadow: {
    position: 'absolute',
    width: 336,
    height: 48,
    top: 19,
    left: 9,
    backgroundColor: '#000000',
    borderRadius: 37,
    opacity: 0.1,
  },
  searchBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  clearSearchButton: {
    marginLeft: 15,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchText: {
    fontSize: 16,
    color: '#000000',
  },

  // Categories Styles
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    height: 161,
  },
  categoryCard: {
    flex: 1,
  },
  categoryShadow: {
    position: 'absolute',
    width: 100,
    height: 151,
    top: 10,
    left: 38,
    backgroundColor: '#000000',
    borderRadius: 20,
    opacity: 0.1,
  },
  categoryContent: {
    width: 120,
    height: 149,
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryImage: {
    width: 100,
    height: 60,
    marginBottom: 15,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Available Label
  availableLabel: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
  },

  // Vehicle Card Styles
  vehicleContainer: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  compactVehicleContainer: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  vehicleShadow: {
    position: 'absolute',
    width: 336,
    height: 350,
    top: 10,
    left: 9,
    backgroundColor: '#000000',
    borderRadius: 37,
    opacity: 0.1,
  },
  compactVehicleShadow: {
    width: 336,
    height: 200,
    top: 10,
    left: 9,
  },
  vehicleCard: {
    width: 354,
    height: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 0,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  compactVehicleCard: {
    height: 190,
    paddingBottom: 0,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 37,
    paddingTop: 35,
  },
  vehicleBrand: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
  },
  vehiclePrice: {
    fontSize: 34,
    fontWeight: '300',
    color: '#3B82F6',
  },
  vehicleSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 37,
  },
  vehicleModel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  vehiclePriceUnit: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  vehicleEngineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 37,
  },
  engineLabel: {
    fontSize: 14,
    color: '#000000',
  },
  engineValue: {
    fontSize: 14,
    color: '#000000',
  },
  vehicleImage: {
    width: '100%',
    height: 140,
    marginTop: 10,
  },
  bottomPadding: {
    height: 30,
  },

  // Search Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
  searchModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  closeButton: {
    padding: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInputIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  searchSubmitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  searchSubmitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // No Results Styles
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  clearSearchLink: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
  },
  clearSearchLinkText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 15,
  },
  highlightedShadow: {
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});