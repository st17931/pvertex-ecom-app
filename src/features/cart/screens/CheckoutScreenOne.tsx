import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ShippingOption from '../components/ShippingOption';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';

export default function CheckoutScreenOne() {
  const [selectedShipping, setSelectedShipping] = useState(0);
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
            <Text style={{ color: '#fff', fontSize: 18 }}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check out</Text>
        </View>

        {/* STEP INDICATOR */}
        <View style={styles.stepContainer}>
          <View style={styles.stepDotActive} />
          <View style={styles.stepLine} />
          <View style={styles.stepDot} />
          <View style={styles.stepLine} />
          <View style={styles.stepDot} />
        </View>

        <Text style={styles.stepLabel}>STEP 1</Text>
        <Text style={styles.sectionMainTitle}>Shipping</Text>

        {/* FORM */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Pham"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last name *</Text>
          <TextInput style={[styles.input, styles.inputError]} />
          <Text style={styles.errorText}>Field is required</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country *</Text>
          <View style={styles.dropdown}>
            <Text style={{ color: '#aaa' }}>Select country</Text>
            <Text style={{ color: '#aaa' }}>⌄</Text>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street name *</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>City *</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>State / Province</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Zip-code *</Text>
          <TextInput style={styles.input} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone number *</Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />
        </View>

        {/* SHIPPING METHODS */}
        <Text style={styles.sectionTitle}>Shipping method</Text>

        <ShippingOption
          index={0}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          price="Free"
          title="Delivery to home"
          subtitle="Delivery from 3 to 7 business days"
        />
        <ShippingOption
          index={1}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          price="$ 9.90"
          title="Delivery to home"
          subtitle="Delivery from 4 to 6 business days"
        />
        <ShippingOption
          index={2}
          selectedShipping={selectedShipping}
          setSelectedShipping={setSelectedShipping}
          price="$ 9.90"
          title="Fast Delivery"
          subtitle="Delivery from 2 to 3 business days"
        />

        {/* COUPON */}
        <Text style={styles.sectionTitle}>Coupon Code</Text>
        <View style={styles.couponBox}>
          <Text style={{ color: '#aaa' }}>Have a code? type it here...</Text>
          <Text style={{ color: '#5de0c0', fontWeight: '600' }}>Validate</Text>
        </View>

        {/* BILLING */}
        <Text style={styles.sectionTitle}>Billing Address</Text>
        <View style={styles.billingRow}>
          <View style={styles.checkbox} />
          <Text style={{ color: '#aaa' }}>Copy address data from shipping</Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CONTINUE BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.continueBtn}>
          <Link
            style={styles.continueText}
            screen="CheckoutScreenTwo"
            params={{ userName: 'Guest' }}
          >
            Continue to payment
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
    padding: 20,
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1c1e2e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  stepDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5de0c0',
  },
  stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#444' },
  stepLine: { width: 40, height: 2, backgroundColor: '#444' },

  stepLabel: { color: '#777', marginLeft: 20, marginTop: 10 },
  sectionMainTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 20,
    marginBottom: 10,
  },

  inputGroup: { marginHorizontal: 20, marginBottom: 15 },
  label: { color: '#aaa', marginBottom: 6 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingVertical: 8,
    color: '#fff',
  },
  inputError: { borderBottomColor: '#e74c3c' },
  errorText: { color: '#e74c3c', marginTop: 5, fontSize: 12 },

  dropdown: {
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 10,
  },

  couponBox: {
    marginHorizontal: 20,
    backgroundColor: '#1a1c2b',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  billingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 10,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: '#0e0f1a',
  },
  continueBtn: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 40,
    alignItems: 'center',
  },
  continueText: { color: '#000', fontSize: 16, fontWeight: '700' },
});
