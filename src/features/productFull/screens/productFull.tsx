import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getProductByID } from '../../../api/endpointFunction';

type RootStackParamList = {
  ProductDetails: { productId: number };
};

type ProductRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const { width } = Dimensions.get('window');

const RatingBar = ({ stars, percent }: { stars: number; percent: number }) => (
  <View style={styles.ratingBarRow}>
    <Text style={styles.ratingStarLabel}>{stars}</Text>
    <Text style={styles.ratingStarIcon}>★</Text>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${percent}%` }]} />
    </View>
    <Text style={styles.percentText}>{percent}%</Text>
  </View>
);

export default function ProductDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<ProductRouteProp>();
  const { productId } = route.params;

  const [activeIndex, setActiveIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProduct = async (id: number) => {
    try {
      setLoading(true);
      const response = await getProductByID(id);
      setProduct(response || {});
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE GALLERY */}
        <View style={styles.imageContainer}>
          <View style={styles.sliderWrapper}>
            <FlatList
              data={product.images || []}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={[styles.productImage, { width }]}
                />
              )}
              onMomentumScrollEnd={ev => {
                const index = Math.round(
                  ev.nativeEvent.contentOffset.x / width,
                );
                setActiveIndex(index);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.iconText}>‹</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.heartBtn}>
            <Text style={{ fontSize: 16 }}>❤</Text>
          </TouchableOpacity>

          <View style={styles.imageDots}>
            {product.images?.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, activeIndex === i && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* DETAILS */}
        <View style={styles.detailsCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{product?.title || ''}</Text>
            <Text style={styles.price}>$ {product?.price || ''}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.ratingCount}>(83)</Text>
          </View>

          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Color</Text>
              <View style={styles.colorRow}>
                <View
                  style={[styles.colorCircle, { backgroundColor: '#e6d2c4' }]}
                />
                <View
                  style={[styles.colorCircle, { backgroundColor: '#000' }]}
                />
                <View
                  style={[styles.colorCircle, { backgroundColor: '#e57373' }]}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Size</Text>
              <View style={styles.sizeRow}>
                <View style={styles.sizeBtn}>
                  <Text style={styles.sizeText}>S</Text>
                </View>
                <View style={styles.sizeBtn}>
                  <Text style={styles.sizeText}>M</Text>
                </View>
                <View style={[styles.sizeBtn, styles.sizeActive]}>
                  <Text style={[styles.sizeText, { color: '#000' }]}>L</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.chevron}>⌄</Text>
          </View>
          <Text style={styles.description}>{product?.description || ''}</Text>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Text style={styles.chevron}>⌄</Text>
          </View>

          <View style={styles.ratingSummaryRow}>
            <View>
              <Text style={styles.bigRating}>4.9</Text>
              <Text style={styles.outOf}>OUT OF 5</Text>
            </View>
            <View style={styles.summaryStars}>
              <Text style={styles.summaryStar}>★★★★★</Text>
              <Text style={styles.totalRatings}>83 ratings</Text>
            </View>
          </View>

          <RatingBar stars={5} percent={89} />
          <RatingBar stars={4} percent={12} />
          <RatingBar stars={3} percent={5} />
          <RatingBar stars={2} percent={3} />
          <RatingBar stars={1} percent={0} />

          <View style={styles.reviewHeaderRow}>
            <Text style={styles.reviewCount}>47 Reviews</Text>
            <Text style={styles.writeReview}>WRITE A REVIEW</Text>
          </View>
        </View>

        <View style={styles.reviewCard}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.reviewName}>Jennifer Rose</Text>
              <Text style={styles.reviewTime}>5m ago</Text>
            </View>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.reviewText}>
              Love it. Awesome customer service!! Helped me out with adding an
              additional item to my order. Thanks again!!
            </Text>
          </View>
        </View>

        <View style={styles.reviewCard}>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/55.jpg',
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.reviewName}>Kelly Rihanna</Text>
              <Text style={styles.reviewTime}>9m ago</Text>
            </View>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.reviewText}>
              I'm very happy with order. It was delivered on and good quality.
              Recommended!
            </Text>
          </View>
        </View>

        {/* SIMILAR */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Similar Product</Text>
          <Text style={styles.chevron}>⌄</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.similarCard}>
            <Image
              source={{
                uri: 'https://i.imgur.com/1twoaDy.jpeg',
              }}
              style={styles.similarImg}
            />
            <Text style={styles.similarTitle}>Rise Crop Hoodie</Text>
            <Text style={styles.similarPrice}>$ 43.00</Text>
          </View>

          <View style={styles.similarCard}>
            <Image
              source={{
                uri: 'https://i.imgur.com/FDwQgLy.jpeg',
              }}
              style={styles.similarImg}
            />
            <Text style={styles.similarTitle}>Gym Crop Top</Text>
            <Text style={styles.similarPrice}>$ 39.99</Text>
          </View>
        </ScrollView>
      </ScrollView>

      <View style={styles.cartBar}>
        <TouchableOpacity style={styles.cartBtn}>
          <Text style={styles.cartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },

  imageContainer: {
    height: 420,
    backgroundColor: '#fff',
    position: 'relative',
  },
  productImage: { height: '100%', resizeMode: 'cover' },

  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: { color: '#fff', fontSize: 22 },

  imageDots: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    zIndex: 999, // iOS
    elevation: 10, // Android
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#4F4F4F',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#000',
    width: 15,
    height: 15,
  },

  sliderWrapper: {
    flex: 1,
  },

  detailsCard: {
    backgroundColor: '#1f2235',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -30,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  price: { color: '#fff', fontSize: 20, fontWeight: '700' },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  stars: { color: '#5de0c0', fontSize: 14 },
  ratingCount: { color: '#aaa', marginLeft: 6 },

  label: { color: '#aaa', marginBottom: 8 },
  colorRow: { flexDirection: 'row', marginTop: 6 },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },

  sizeRow: { flexDirection: 'row', marginTop: 6 },
  sizeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2b2f45',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sizeActive: { backgroundColor: '#fff' },
  sizeText: { color: '#fff', fontWeight: '600' },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    padding: 20,
  },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  chevron: { color: '#aaa' },

  description: { color: '#bbb', marginTop: 10, lineHeight: 20 },

  ratingSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  bigRating: { fontSize: 40, color: '#fff', fontWeight: '700' },
  outOf: { color: '#aaa' },
  summaryStars: { alignItems: 'flex-end' },
  summaryStar: { color: '#5de0c0', fontSize: 16 },
  totalRatings: { color: '#aaa', marginTop: 4 },

  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingStarLabel: { color: '#fff', width: 12 },
  ratingStarIcon: { color: '#5de0c0', marginHorizontal: 4 },
  progressBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#2b2f45',
    borderRadius: 3,
    marginHorizontal: 6,
  },
  progressFill: { height: 6, backgroundColor: '#5de0c0', borderRadius: 3 },
  percentText: { color: '#aaa', width: 35, textAlign: 'right' },

  reviewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  reviewCount: { color: '#aaa' },
  writeReview: { color: '#5de0c0', fontWeight: '600' },

  cartBar: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cartBtn: {
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  cartText: { color: 'black', fontSize: 16, fontWeight: '700' },
  reviewCard: { flexDirection: 'row', marginTop: 18, padding: 20 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  reviewName: { color: '#fff', fontWeight: '600' },
  reviewTime: { color: '#777', fontSize: 12 },
  reviewText: { color: '#bbb', marginTop: 6 },

  similarCard: { width: 140, marginRight: 15, marginTop: 10, padding: 20 },
  similarImg: { width: 140, height: 160, borderRadius: 12 },
  similarTitle: { color: '#fff', marginTop: 6 },
  similarPrice: { color: '#fff', fontWeight: '700', marginTop: 4 },
});
