import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  PanResponder,
  Modal,
} from 'react-native';
import { getAllCategory } from '../../../api/endpointFunction';
import { addFilter } from '../../../redux/filterSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const { width, height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function FilterDrawer({ visible, onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  /* ------------------ PRICE SLIDER ------------------ */
  const SLIDER_WIDTH = width * 0.88 - 48; // Adjust based on drawer width and padding
  const MIN = 20;
  const MAX = 80;

  const minPos = useRef(new Animated.Value(0)).current;
  const maxPos = useRef(new Animated.Value(SLIDER_WIDTH)).current;

  const [minPrice, setMinPrice] = useState(MIN);
  const [maxPrice, setMaxPrice] = useState(MAX);

  const posToPrice = (pos: number) =>
    Math.round(MIN + (pos / SLIDER_WIDTH) * (MAX - MIN));

  const minPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        (minPos as any).setOffset((minPos as any)._value);
      },
      onPanResponderMove: Animated.event([null, { dx: minPos }], {
        useNativeDriver: false,
        listener: (_, g) => {
          const currentPos = (minPos as any)._value + (minPos as any)._offset;
          const maxValue = (maxPos as any)._value + (maxPos as any)._offset;
          if (currentPos < 0) {
            minPos.setValue(-(minPos as any)._offset);
          } else if (currentPos > maxValue - 30) {
            minPos.setValue(maxValue - 30 - (minPos as any)._offset);
          }
          setMinPrice(
            posToPrice(Math.max(0, Math.min(currentPos, maxValue - 30))),
          );
        },
      }),
      onPanResponderRelease: () => {
        (minPos as any).flattenOffset();
      },
    }),
  ).current;

  const maxPan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        (maxPos as any).setOffset((maxPos as any)._value);
      },
      onPanResponderMove: Animated.event([null, { dx: maxPos }], {
        useNativeDriver: false,
        listener: (_, g) => {
          const currentPos = (maxPos as any)._value + (maxPos as any)._offset;
          const minValue = (minPos as any)._value + (minPos as any)._offset;
          if (currentPos > SLIDER_WIDTH) {
            maxPos.setValue(SLIDER_WIDTH - (maxPos as any)._offset);
          } else if (currentPos < minValue + 30) {
            maxPos.setValue(minValue + 30 - (maxPos as any)._offset);
          }
          setMaxPrice(
            posToPrice(
              Math.min(SLIDER_WIDTH, Math.max(currentPos, minValue + 30)),
            ),
          );
        },
      }),
      onPanResponderRelease: () => {
        (maxPos as any).flattenOffset();
      },
    }),
  ).current;

  /* ------------------ CATEGORY DROPDOWN ------------------ */
  const [categories, setCategories] = useState([]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [categoryIdMapper, setCategoryIdMapper] = useState({});

  //   const categories = ['Crop Tops', 'Dresses', 'Shoes', 'Accessories'];

  /* ------------------ OPEN / CLOSE ANIMATION ------------------ */

  const fetchAllCategories = async () => {
    try {
      let response = await getAllCategory();
      let categoriesType = response.map((category: any) => category.name);
      let categoryIdMap = response.reduce((acc, category) => {
        acc[category.name] = category.id;
        return acc;
      }, {});
      setCategories(categoriesType);
      setCategoryIdMapper(categoryIdMap);
    } catch (error) {
      console.error('Got error while fetching the categories', error);
    }
  };

  const handleApplyFilter = () => {
    console.log('categories', categories, 'selectedCategory', selectedCategory);
    const category = categories.find(value => value === selectedCategory);
    console.log(category, 'category');
    dispatch(
      addFilter({
        price_min: minPrice,
        price_max: maxPrice,
        categoryId: categoryIdMapper[category!],
      }),
    );
    navigation.navigate('FoundScreen');
    onClose();
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim, visible]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Background dim */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          >
            <View style={styles.headerRow}>
              <Text style={styles.title}>Filter</Text>
              <Text style={styles.icon}>⚙️</Text>
            </View>

            <View style={styles.divider} />

            {/* PRICE */}
            <Text style={styles.section}>Price</Text>

            <View style={styles.sliderArea}>
              <View style={styles.track} />
              <Animated.View
                style={[
                  styles.fill,
                  {
                    left: minPos,
                    width: Animated.subtract(maxPos, minPos),
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    left: minPos,
                  },
                ]}
                {...minPan.panHandlers}
              />
              <Animated.View
                style={[
                  styles.dot,
                  {
                    left: maxPos,
                  },
                ]}
                {...maxPan.panHandlers}
              />
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>${minPrice}</Text>
              <Text style={styles.priceText}>${maxPrice}</Text>
            </View>

            {/* COLOR */}
            <Text style={styles.section}>Color</Text>
            <View style={styles.colorRow}>
              {[
                '#C58B39',
                '#D9534F',
                '#0F172A',
                '#334155',
                '#F3F4F6',
                '#5C4B4B',
                '#E5B4B4',
              ].map(c => (
                <View
                  key={c}
                  style={[styles.colorDot, { backgroundColor: c }]}
                />
              ))}
            </View>

            {/* RATING */}
            <Text style={styles.section}>Star Rating</Text>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map(r => (
                <View
                  key={r}
                  style={[styles.ratingBtn, r === 5 && styles.activeRating]}
                >
                  <Text
                    style={[styles.ratingBtnText, r === 5 && { color: '#000' }]}
                  >
                    ★ {r}
                  </Text>
                </View>
              ))}
            </View>

            {/* CATEGORY */}
            <Text style={styles.section}>Category</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setCategoryOpen(!categoryOpen)}
            >
              <Text style={styles.dropdownText}>{selectedCategory}</Text>
              <Text style={styles.dropdownArrow}>▾</Text>
            </TouchableOpacity>

            {categoryOpen && (
              <View style={styles.dropdownMenu}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => {
                      setSelectedCategory(cat);
                      setCategoryOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItem}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* DISCOUNT */}
            <Text style={styles.section}>Discount</Text>
            <View style={styles.discountWrap}>
              {['50% off', '40% off', '30% off', '25% off'].map(d => (
                <View key={d} style={styles.discountChip}>
                  <Text style={styles.discountText}>{d}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* APPLY BUTTON FIXED */}
          <TouchableOpacity style={styles.applyBtn} onPress={handleApplyFilter}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },

  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: width * 0.88,
    backgroundColor: '#0F1115',
    paddingTop: 70,
    paddingHorizontal: 24,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 28, fontWeight: '700' },
  icon: { color: '#fff', fontSize: 20 },
  divider: { height: 1, backgroundColor: '#2A2F3A', marginVertical: 25 },

  section: { color: '#fff', fontSize: 18, marginTop: 20 },

  sliderArea: {
    marginTop: 25,
    marginBottom: 15,
    height: 26,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 4,
    backgroundColor: '#2A2F3A',
    borderRadius: 4,
    width: '100%',
  },
  fill: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  dot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#fff',
    position: 'absolute',
    marginLeft: -13,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  priceText: { color: '#fff', fontSize: 16 },

  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colorDot: { width: 40, height: 40, borderRadius: 20 },

  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  ratingBtn: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  activeRating: { backgroundColor: '#fff' },
  ratingBtnText: { color: '#fff', fontSize: 14 },

  dropdown: {
    borderWidth: 2,
    borderColor: '#2A2F3A',
    borderRadius: 40,
    padding: 15,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownText: { color: '#fff', fontSize: 16 },
  dropdownArrow: { color: '#fff', fontSize: 18 },
  dropdownMenu: { marginTop: 10, backgroundColor: '#1A1D24', borderRadius: 12 },
  dropdownItem: {
    color: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2F3A',
  },

  discountWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 },
  discountChip: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    marginBottom: 12,
  },
  discountText: { color: '#fff', fontSize: 14 },

  applyBtn: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
  },
  applyText: { color: '#000', fontWeight: '700', fontSize: 16 },
});
