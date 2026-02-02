import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { incQuantity, decQuantity } from '../../../redux/cartSlice';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

export default function CartScreen() {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const cartItems = useSelector(state => state.cartSlice);
  const dispatch = useDispatch();

  const increaseQty = (id: number) => {
    dispatch(incQuantity(id));
  };

  const decreaseQty = (id: number) => {
    dispatch(decQuantity(id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImg} />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.meta}>
          Size: {item.size} | Color: {item.color}
        </Text>
      </View>

      <View style={styles.qtyBox}>
        <TouchableOpacity onPress={() => decreaseQty(item.id)}>
          <Text style={styles.qtyBtn}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.qty}</Text>
        <TouchableOpacity onPress={() => increaseQty(item.id)}>
          <Text style={styles.qtyBtn}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />

      {/* BOTTOM SUMMARY PANEL */}
      <View style={[styles.bottomPanel, { paddingBottom: tabBarHeight + 20 }]}>
        <View style={styles.rowBetween}>
          <Text style={styles.summaryLabel}>Product price</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>Free ship</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.rowBetween}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn}>
          <Link
            style={styles.checkoutText}
            screen="CheckoutScreenOne"
            params={{ userName: 'Guest' }}
          >
            Proceed to checkout
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backIcon: { color: '#fff', fontSize: 26 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  productImg: { width: 70, height: 70, borderRadius: 15, marginRight: 15 },
  title: { color: '#fff', fontSize: 16, fontWeight: '600' },
  price: { color: '#fff', fontSize: 16, marginVertical: 4 },
  meta: { color: '#aaa', fontSize: 13 },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyBtn: { color: '#fff', fontSize: 18, paddingHorizontal: 8 },
  qtyText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  bottomPanel: {
    backgroundColor: '#0d0d12',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  summaryLabel: { color: '#aaa', fontSize: 14 },
  summaryValue: { color: '#fff', fontSize: 14 },
  subtotalLabel: { color: '#fff', fontSize: 16, fontWeight: '700' },
  subtotalValue: { color: '#fff', fontSize: 16, fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#222', marginVertical: 10 },

  checkoutBtn: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutText: { color: '#000', fontSize: 16, fontWeight: '700' },
});
