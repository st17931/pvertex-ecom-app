import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllProducts } from '../../../api/endpointFunction';

type CategoryKey = 'Miscellaneous' | 'Electronics' | 'Furniture' | 'Shoes';

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: CategoryKey;
    image: string;
  };
};

export default function HomeScreen() {
  const [categoriesWiseProduct, setCategoryWiseProducts] = useState<
    Record<CategoryKey, Product[]>
  >({
    Miscellaneous: [],
    Electronics: [],
    Furniture: [],
    Shoes: [],
  });

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>('Miscellaneous');

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response: Product[] = await getAllProducts();

      const grouped: Record<CategoryKey, Product[]> = {
        Miscellaneous: [],
        Electronics: [],
        Furniture: [],
        Shoes: [],
      };

      response.forEach(item => {
        const key = item.category?.name as CategoryKey;
        if (grouped[key]) grouped[key].push(item);
      });

      setCategoryWiseProducts(grouped);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const products = categoriesWiseProduct[selectedCategory];
  const half = Math.floor(products?.length / 2);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuIcon}>
              <Text style={styles.icon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Stylinx</Text>

            <TouchableOpacity style={styles.notificationIcon}>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
          </View>

          {/* CATEGORIES */}
          <View style={styles.categoryContainer}>
            {(Object.keys(categoriesWiseProduct) as CategoryKey[]).map(
              categoryName => {
                const firstProduct = categoriesWiseProduct[categoryName][0];

                return (
                  <TouchableOpacity
                    key={categoryName}
                    style={styles.categoryItem}
                    onPress={() => setSelectedCategory(categoryName)}
                  >
                    <View
                      style={[
                        styles.categoryIcon,
                        selectedCategory === categoryName &&
                          styles.categoryIconActive,
                      ]}
                    >
                      {firstProduct && (
                        <Image
                          source={{ uri: firstProduct.category.image }}
                          style={styles.categoryImage}
                        />
                      )}
                    </View>
                    <Text style={styles.categoryText}>{categoryName}</Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>

          {/* MAIN BANNER */}
          <ImageBackground
            source={require('../../../assets/images/Banner1.jpeg')}
            style={styles.mainBanner}
            imageStyle={{ borderRadius: 22 }}
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerTextBox}>
              <Text style={styles.bannerTitle}>Autumn</Text>
              <Text style={styles.bannerTitle}>Collection</Text>
              <Text style={styles.bannerYear}>2021</Text>
            </View>
          </ImageBackground>

          {/* FEATURE PRODUCTS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Feature Products</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.slice(0, half).map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    productId: product.id,
                  })
                }
              >
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.productImage}
                />
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* HANG OUT BANNER */}
          <View style={styles.darkBanner}>
            <View>
              <Text style={styles.smallLabel}>NEW COLLECTION</Text>
              <Text style={styles.darkBannerTitle}>HANG OUT</Text>
              <Text style={styles.darkBannerTitle}>& PARTY</Text>
            </View>
            <Image
              source={require('../../../assets/images/Banner2.png')}
              style={styles.darkBannerImage}
            />
          </View>

          {/* RECOMMENDED */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products.slice(half).map(product => (
              <TouchableOpacity
                key={product.id}
                style={styles.recommendedCard}
                onPress={() =>
                  navigation.navigate('ProductDetails', {
                    productId: product.id,
                  })
                }
              >
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.recommendedImage}
                />
                <View style={styles.recommendedInfo}>
                  <Text
                    style={styles.recommendedTitle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {product.title}
                  </Text>
                  <Text style={styles.recommendedPrice}>
                    ${product.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* TOP COLLECTION */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Collection</Text>
          </View>

          <View style={styles.slimBanner}>
            <View>
              <Text style={styles.saleLabel}>Sale up to 40%</Text>
              <Text style={styles.slimTitle}>FOR SLIM</Text>
              <Text style={styles.slimTitle}>& BEAUTY</Text>
            </View>
            <Image
              source={require('../../../assets/images/Banner3.png')}
              style={styles.slimImage}
            />
          </View>

          <ImageBackground
            source={require('../../../assets/images/Banner4.png')}
            style={styles.summerBanner}
            imageStyle={{ borderRadius: 22 }}
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.summerTextBox}>
              <Text style={styles.smallLabel}>Summer Collection 2021</Text>
              <Text style={styles.summerTitle}>Most sexy</Text>
              <Text style={styles.summerTitle}>& fabulous</Text>
              <Text style={styles.summerTitle}>design</Text>
            </View>
          </ImageBackground>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a1a2e' },

  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '600' },
  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1C1F26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#1C1F26',
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryItem: { alignItems: 'center' },
  categoryIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#2a2a3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    color: '#fff',
    fontSize: 18,
  },
  categoryIconActive: { backgroundColor: '#ffffff' },
  categoryImage: { width: 26, height: 26 },
  categoryText: { color: '#8e8e93', fontSize: 12 },

  mainBanner: { height: 180, marginHorizontal: 20, marginBottom: 25 },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 22,
  },
  bannerTextBox: { position: 'absolute', right: 20, top: 40 },
  bannerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'right',
  },
  bannerYear: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'right',
  },

  sectionHeader: { paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },

  productCard: {
    width: 140,
    marginLeft: 20,
    backgroundColor: '#2a2a3e',
    borderRadius: 15,
    overflow: 'hidden',
  },
  productImage: { width: '100%', height: 160 },
  productTitle: { color: '#fff', fontSize: 13, padding: 10, minHeight: 40 },
  productPrice: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  darkBanner: {
    flexDirection: 'row',
    backgroundColor: '#23263a',
    marginHorizontal: 20,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 25,
  },
  darkBannerImage: { width: 120, height: 120, resizeMode: 'contain' },
  smallLabel: { color: '#8e8e93', fontSize: 12, marginBottom: 8 },
  darkBannerTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },

  recommendedCard: {
    flexDirection: 'row',
    width: 220,
    marginLeft: 20,
    backgroundColor: '#2a2a3e',
    borderRadius: 18,
    padding: 12,
    alignItems: 'center',
  },
  recommendedImage: { width: 60, height: 60, borderRadius: 12 },
  recommendedInfo: { flex: 1, marginLeft: 12 },
  recommendedTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  recommendedPrice: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 6,
  },

  slimBanner: {
    flexDirection: 'row',
    backgroundColor: '#23263a',
    marginHorizontal: 20,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    marginBottom: 25,
    justifyContent: 'space-between',
  },
  saleLabel: { color: '#8e8e93', fontSize: 12, marginBottom: 8 },
  slimTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  slimImage: { width: 110, height: 140, resizeMode: 'contain' },

  summerBanner: { height: 200, marginHorizontal: 20, marginBottom: 25 },
  summerTextBox: { position: 'absolute', left: 20, top: 40 },
  summerTitle: { color: '#fff', fontSize: 24, fontWeight: '700' },
});
