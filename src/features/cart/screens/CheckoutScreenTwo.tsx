import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutScreenTwo() {
  const [selectedMethod, setSelectedMethod] = useState<
    'cash' | 'card' | 'more'
  >('card');
  const [agree, setAgree] = useState(true);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0e0f1a" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check out</Text>
        </View>

        {/* STEP INDICATOR */}
        <View style={styles.stepRow}>
          <View style={styles.stepDot} />
          <View style={styles.stepLine} />
          <View style={styles.stepDotActive} />
          <View style={styles.stepLine} />
          <View style={styles.stepDot} />
        </View>

        <Text style={styles.stepLabel}>STEP 2</Text>
        <Text style={styles.sectionTitle}>Payment</Text>

        {/* PAYMENT METHODS */}
        <View style={styles.methodRow}>
          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'cash' && styles.methodActive,
            ]}
            onPress={() => setSelectedMethod('cash')}
          >
            <Text style={styles.methodIcon}>💵</Text>
            <Text
              style={[
                styles.methodText,
                selectedMethod === 'cash' && styles.methodTextActive,
              ]}
            >
              Cash
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'card' && styles.methodActive,
            ]}
            onPress={() => setSelectedMethod('card')}
          >
            <Text style={styles.methodIcon}>💳</Text>
            <Text
              style={[
                styles.methodText,
                selectedMethod === 'card' && styles.methodTextActive,
              ]}
            >
              Credit Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              selectedMethod === 'more' && styles.methodActive,
            ]}
            onPress={() => setSelectedMethod('more')}
          >
            <Text style={styles.methodIcon}>•••</Text>
          </TouchableOpacity>
        </View>

        {/* CHOSEN CARD */}
        <View style={styles.rowBetween}>
          <Text style={styles.chooseCardText}>Choose your card</Text>
          <Text style={styles.addNewText}>Add new +</Text>
        </View>

        <View style={styles.cardBox}>
          <Text style={styles.cardType}>VISA</Text>
          <Text style={styles.cardNumber}>4364 1345 8932 8378</Text>

          <View style={styles.cardBottomRow}>
            <View>
              <Text style={styles.cardLabel}>CARDHOLDER NAME</Text>
              <Text style={styles.cardValue}>Susie Pham</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>VALID THRU</Text>
              <Text style={styles.cardValue}>05/24</Text>
            </View>
          </View>
        </View>

        {/* OTHER PAY OPTIONS */}
        <Text style={styles.orText}>or check out with</Text>

        <View style={styles.logoRow}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>PayPal</Text>
          </View>
          <View style={styles.logo}>
            <Text style={styles.logoText}>VISA</Text>
          </View>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Master</Text>
          </View>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Alipay</Text>
          </View>
          <View style={styles.logo}>
            <Text style={styles.logoText}>Amex</Text>
          </View>
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Product price</Text>
            <Text style={styles.summaryValue}>$110</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Freeship</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>$110</Text>
          </View>
        </View>

        {/* TERMS */}
        <TouchableOpacity
          style={styles.termsRow}
          onPress={() => setAgree(!agree)}
        >
          <View style={[styles.checkbox, agree && styles.checkboxActive]}>
            {agree && <Text style={{ color: '#000' }}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to <Text style={styles.link}>Terms and conditions</Text>
          </Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* PLACE ORDER BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.orderBtn}>
          <Link
            style={styles.orderText}
            screen="CheckoutScreenThree"
            params={{ userName: 'Guest' }}
          >
            Place my order
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0f1a' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    backgroundColor: '#1c1e2e',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: '#fff', fontSize: 18 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#444' },
  stepDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5de0c0',
  },
  stepLine: { width: 40, height: 2, backgroundColor: '#444' },

  stepLabel: { color: '#777', marginLeft: 20, marginTop: 10 },
  sectionTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 20,
  },

  methodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  methodCard: {
    width: 100,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#1a1c2b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodActive: { backgroundColor: '#fff' },
  methodIcon: { fontSize: 22 },
  methodText: { color: '#aaa', marginTop: 5 },
  methodTextActive: { color: '#000' },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  chooseCardText: { color: '#fff', fontWeight: '600' },
  addNewText: { color: '#e74c3c' },

  cardBox: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#3da6ff',
  },
  cardType: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 2,
    marginVertical: 20,
  },
  cardBottomRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: '#d6eaff', fontSize: 10 },
  cardValue: { color: '#fff', fontWeight: '600' },

  orText: { color: '#aaa', marginLeft: 20 },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  logo: { backgroundColor: '#1a1c2b', padding: 10, borderRadius: 10 },
  logoText: { color: '#fff', fontSize: 12 },

  summaryBox: { margin: 20 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  summaryLabel: { color: '#aaa' },
  summaryValue: { color: '#fff' },
  subtotalLabel: { color: '#fff', fontWeight: '700' },
  subtotalValue: { color: '#fff', fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#222', marginVertical: 10 },

  termsRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 20 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5de0c0',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: '#5de0c0' },
  termsText: { color: '#aaa' },
  link: { color: '#fff', textDecorationLine: 'underline' },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#0e0f1a',
  },
  orderBtn: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
  },
  orderText: { color: '#000', fontWeight: '700' },
});
