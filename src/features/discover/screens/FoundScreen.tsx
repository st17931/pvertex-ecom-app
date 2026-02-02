import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductsByFilters } from '../../../api/endpointFunction';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isFavorite: boolean;
};

export default function ProductListScreen({ route }: any) {
  const { categoryName = 'Dresses' } = route?.params || {};
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const filters = useSelector(state => state.filterSlice);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Mock data since we don't have a products endpoint
      const products = await getProductsByFilters(filters || {});

      setProducts(products);
      const favSet = new Set(products.filter(p => p.isFavorite).map(p => p.id));
      setFavorites(favSet);
    } catch (err) {
      console.log('Products fetch error', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= Math.floor(rating) ? '★' : i - rating < 1 ? '☆' : '☆'}
        </Text>,
      );
    }
    return stars;
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => {
    const isLeft = index % 2 === 0;

    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          isLeft ? styles.cardLeft : styles.cardRight,
        ]}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            productId: item.id,
          })
        }
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.images[0] }} style={styles.productImage} />
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={() => {
              toggleFavorite(item.id);
            }}
          >
            <Text style={styles.heartIcon}>
              {favorites.has(item.id) ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              ${item.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.stars}>{renderStars(item.rating)}</View>
          <Text style={styles.reviews}>({item.reviews})</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <View>
          <Text style={styles.foundText}>Found</Text>
          <Text style={styles.resultsCount}>152 Results</Text>
        </View>

        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Filter</Text>
          <Text style={styles.filterIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0F1115',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1F26',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backIcon: {
    color: '#fff',
    fontSize: 20,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  placeholder: {
    width: 40,
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  foundText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  resultsCount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1F26',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },

  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  filterIcon: {
    color: '#fff',
    fontSize: 12,
  },

  productList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  productCard: {
    flex: 1,
    marginBottom: 24,
  },

  cardLeft: {
    marginRight: 8,
  },

  cardRight: {
    marginLeft: 8,
  },

  imageContainer: {
    position: 'relative',
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    overflow: 'hidden',
    aspectRatio: 0.7,
    marginBottom: 10,
  },

  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartIcon: {
    fontSize: 18,
  },

  productTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },

  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  originalPrice: {
    color: '#6B7280',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  stars: {
    flexDirection: 'row',
  },

  star: {
    color: '#10B981',
    fontSize: 12,
  },

  reviews: {
    color: '#9CA3AF',
    fontSize: 12,
  },
});
