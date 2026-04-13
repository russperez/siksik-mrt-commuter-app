import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '../constants/colors';
import { Station, DAYS } from '../constants/stations';

type Props = {
  station: Station | null;
  visible: boolean;
  onClose: () => void;
  onContinue: (day: string, hour: number) => void;
};

export default function PopupPicker({ station, visible, onClose, onContinue }: Props) {
  const [dayIndex, setDayIndex] = useState(0);
  const [hour, setHour] = useState(6);

  useEffect(() => {
    if (visible) {
      setDayIndex(0);
      setHour(6);
    }
  }, [visible]);

  const formatHour = (h: number) => {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const display = h > 12 ? h - 12 : h;
    return `${display}:00 ${suffix}`;
  };

  if (!station) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.popup} activeOpacity={1} onPress={() => {}}>
          <Text style={styles.stationName}>{station.name}</Text>
          <Text style={styles.stationCity}>{station.city}</Text>

          <Text style={styles.pickerLabel}>Select day</Text>
          <Text style={styles.dayDisplay}>{DAYS[dayIndex]}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={6}
            step={1}
            value={dayIndex}
            onValueChange={(val) => setDayIndex(Math.round(val))}
            minimumTrackTintColor={Colors.primary}
            maximumTrackTintColor={Colors.road}
            thumbTintColor={Colors.primary}
          />

          <Text style={styles.pickerLabel}>Select time</Text>
          <View style={styles.timeRow}>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => setHour(Math.max(6, hour - 1))}
            >
              <Text style={styles.arrowText}>-</Text>
            </TouchableOpacity>
            <View style={styles.timeDisplay}>
              <Text style={styles.timeText}>{formatHour(hour)}</Text>
            </View>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => setHour(Math.min(22, hour + 1))}
            >
              <Text style={styles.arrowText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => onContinue(DAYS[dayIndex], hour)}
          >
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    width: 280,
  },
  stationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  stationCity: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  dayDisplay: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  slider: {
    width: 240,
    height: 40,
    alignSelf: 'center',
    marginBottom: 14,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  arrowText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
  },
  timeDisplay: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  continueBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  continueBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
});