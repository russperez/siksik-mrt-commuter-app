import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Station } from '../constants/stations';

type Props = {
  station: Station;
  top: number;
  alignLeft?: boolean;
  onPress: (station: Station) => void;
  centerX?: number;
};

export default function StationDot({ station, top, alignLeft, onPress, centerX = 139 }: Props) {
  return (
    <>
      <TouchableOpacity
        style={[styles.dot, { top, left: centerX }]}
        onPress={() => onPress(station)}
        activeOpacity={0.7}
      >
        <View style={styles.dotInner} />
      </TouchableOpacity>
      <Text
        style={[
          styles.label,
          { top: top + 5 },
          alignLeft
            ? { right: centerX + 34 }
            : { left: centerX + 34 },
        ]}
      >
        {station.name.replace('Araneta Center-', '')}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.card,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  label: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textPrimary,
    zIndex: 2,
  },
});