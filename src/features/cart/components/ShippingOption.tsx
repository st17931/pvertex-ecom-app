import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ShippingOptionProps = {
  index: number;
  selectedShipping: number;
  setSelectedShipping: (i: number) => void;
  price: string;
  title: string;
  subtitle: string;
};

export default function ShippingOption({
  index,
  selectedShipping,
  setSelectedShipping,
  price,
  title,
  subtitle,
}: ShippingOptionProps) {
  const active = selectedShipping === index;

  return (
    <TouchableOpacity
      style={[styles.shippingCard, active && styles.shippingCardActive]}
      onPress={() => setSelectedShipping(index)}
    >
      <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
        {active && <View style={styles.radioInner} />}
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.shippingPrice}>{price}</Text>
          <Text style={styles.shippingTitle}>{title}</Text>
        </View>
        <Text style={styles.shippingSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shippingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24263a',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  shippingCardActive: {
    borderColor: '#5de0c0',
    borderWidth: 1,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#aaa',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#5de0c0',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5de0c0',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shippingPrice: {
    color: '#fff',
    fontWeight: '700',
  },
  shippingTitle: {
    color: '#fff',
    fontWeight: '600',
  },
  shippingSubtitle: {
    color: '#aaa',
    marginTop: 4,
    fontSize: 12,
  },
});
