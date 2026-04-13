import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ActivityIndicator
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Colors, getBusynessInfo } from '../constants/colors';
import { MOCK_BUSYNESS } from '../constants/stations';

type Props = {
  navigation: any;
  route: any;
};

export default function ResultScreen({ navigation, route }: Props) {
  const { station, day, hour } = route.params;
  const [busyness, setBusyness] = useState<number>(MOCK_BUSYNESS[hour] ?? 30);
  const [altTimes, setAltTimes] = useState<{ hour: number; pct: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusyness = async () => {
      try {
        const docRef = doc(db, 'crowd_patterns', station.id);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const stationData = snapshot.data();

          // Current hour busyness
          const hourlyData = stationData?.days?.[day]?.[String(hour)]?.busyness;
          setBusyness(hourlyData ?? MOCK_BUSYNESS[hour] ?? 30);

          // Better times from Firestore
          const dayData = stationData?.days?.[day];
          if (dayData) {
            const hours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
            const alts = hours
              .filter(h => h !== hour)
              .map(h => ({ hour: h, pct: dayData[String(h)]?.busyness ?? MOCK_BUSYNESS[h] ?? 30 }))
              .sort((a, b) => a.pct - b.pct)
              .slice(0, 3);
            setAltTimes(alts);
          } else {
            setAltTimes(getFallbackAltTimes());
          }
        } else {
          setAltTimes(getFallbackAltTimes());
        }
      } catch (e) {
        setAltTimes(getFallbackAltTimes());
      } finally {
        setLoading(false);
      }
    };
    fetchBusyness();
  }, []);

  const getFallbackAltTimes = () => {
    const hours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
    return hours
      .filter(h => h !== hour)
      .map(h => ({ hour: h, pct: MOCK_BUSYNESS[h] ?? 30 }))
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 3);
  };

  const info = getBusynessInfo(busyness);

  const formatHour = (h: number) => {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const display = h > 12 ? h - 12 : h;
    return `${display}:00 ${suffix}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stationName}>{station.name}</Text>
        <Text style={styles.meta}>{day} · {formatHour(hour)}</Text>
      </View>

      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            <View style={styles.gaugeWrap}>
              <Text style={[styles.bigPct, { color: info.color }]}>{busyness}%</Text>
              <View style={[styles.pill, { backgroundColor: info.bg }]}>
                <Text style={[styles.pillText, { color: info.textColor }]}>{info.label}</Text>
              </View>
            </View>

            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${busyness}%`, backgroundColor: info.color }]} />
            </View>
            <View style={styles.barLabels}>
              <Text style={styles.barLabel}>0%</Text>
              <Text style={styles.barLabel}>50%</Text>
              <Text style={styles.barLabel}>100%</Text>
            </View>

            <View style={styles.altSection}>
              <Text style={styles.altTitle}>Siksikan? Better times today:</Text>
              <View style={styles.altRow}>
                {altTimes.map((alt) => {
                  const altInfo = getBusynessInfo(alt.pct);
                  return (
                    <View key={alt.hour} style={styles.altChip}>
                      <Text style={styles.altTimeLabel}>{formatHour(alt.hour)}</Text>
                      <Text style={[styles.altPct, { color: altInfo.color }]}>{alt.pct}%</Text>
                      <Text style={[styles.altLevel, { color: altInfo.color }]}>{altInfo.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <TouchableOpacity
              style={styles.pickAnotherBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.pickAnotherText}>Pick another station</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.card },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  stationName: { fontSize: 20, fontWeight: '600', color: Colors.textLight },
  meta: { fontSize: 11, color: Colors.primaryLight },
  body: { flex: 1, padding: 20, alignItems: 'center' },
  gaugeWrap: { alignItems: 'center', marginBottom: 8, width: '100%' },
  bigPct: { fontSize: 80, fontWeight: '600', lineHeight: 88 },
  pill: { paddingHorizontal: 18, paddingVertical: 5, borderRadius: 20, marginTop: 6 },
  pillText: { fontSize: 14, fontWeight: '500' },
  barTrack: {
    width: '100%', height: 12, borderRadius: 6,
    backgroundColor: Colors.background, marginTop: 16, marginBottom: 6, overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 6 },
  barLabels: {
    flexDirection: 'row', justifyContent: 'space-between',
    width: '100%', marginBottom: 24,
  },
  barLabel: { fontSize: 10, color: Colors.textSecondary },
  altSection: { width: '100%' },
  altTitle: { fontSize: 12, fontWeight: '500', color: Colors.textSecondary, marginBottom: 8 },
  altRow: { flexDirection: 'row' },
  altChip: {
    flex: 1, backgroundColor: Colors.background, borderRadius: 10,
    padding: 10, alignItems: 'center', borderWidth: 1,
    borderColor: '#E8E5DE', marginHorizontal: 4,
  },
  altTimeLabel: { fontSize: 10, color: Colors.textSecondary, marginBottom: 2 },
  altPct: { fontSize: 16, fontWeight: '600' },
  altLevel: { fontSize: 9, marginTop: 1 },
  pickAnotherBtn: {
    marginTop: 20, borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: 12, padding: 12, alignItems: 'center', width: '100%',
  },
  pickAnotherText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
});