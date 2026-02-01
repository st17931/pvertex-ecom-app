// import { View, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function DiscoverScreen() {
//   return (
//     <SafeAreaView>
//       <View>
//         <Text>This is Discover Screen page</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export default function DiscoverScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await res.json();
      setCategories(data.slice(0, 5));
    } catch (err) {
      console.log('Category fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.icon}>☰</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Discover</Text>

          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search Row */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.icon}>≡</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Searches */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <Text style={styles.trash}>🗑️</Text>
        </View>

        <View style={styles.chipContainer}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Sunglasses</Text>
            <Text style={styles.chipClose}>✕</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Sweater</Text>
            <Text style={styles.chipClose}>✕</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Hoodie</Text>
            <Text style={styles.chipClose}>✕</Text>
          </View>
        </View>

        {/* Categories */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 30 }}
          />
        ) : (
          categories.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { backgroundColor: getCardColor(index) }]}
            >
              <Text style={styles.cardText}>{item.name.toUpperCase()}</Text>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const getCardColor = (index: number) => {
  const colors = ['#A3A89C', '#9C948C', '#5C6A70', '#6B5E5E', '#4A5D5F'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F1115',
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1C1F26',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#fff',
    fontSize: 18,
  },

  searchRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1F26',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
  },

  searchIcon: {
    color: '#9CA3AF',
    marginRight: 10,
  },

  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },

  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1C1F26',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },

  trash: {
    color: '#fff',
    fontSize: 18,
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },

  chip: {
    backgroundColor: '#1C1F26',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },

  chipText: {
    color: '#fff',
    marginRight: 8,
  },

  chipClose: {
    color: '#9CA3AF',
    fontSize: 14,
  },

  card: {
    height: 140,
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingLeft: 20,
  },

  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  cardImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
});
