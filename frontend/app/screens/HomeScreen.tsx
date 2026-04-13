import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Colors } from '../constants/colors';
import { STATIONS, Station } from '../constants/stations';
import StationDot from '../components/StationDot';
import PopupPicker from '../components/PopupPicker';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const CENTER = SCREEN_WIDTH / 2 - 13;
const HEADER_HEIGHT = 80;
const MAP_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT + 10;
const TOP_PADDING = 10;
const BOTTOM_PADDING = 35;
const USABLE = MAP_HEIGHT - TOP_PADDING - BOTTOM_PADDING;
const SPACING = USABLE / (STATIONS.length - 1);
const STATION_POSITIONS = STATIONS.map((_, i) =>
  Math.round(TOP_PADDING + i * SPACING)
);

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleStationPress = (station: Station) => {
    setSelectedStation(station);
    setPopupVisible(true);
  };

  const handleContinue = (day: string, hour: number) => {
    setPopupVisible(false);
    navigation.navigate('Result', {
      station: selectedStation,
      day,
      hour,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Siksik</Text>
        <Text style={styles.headerSub}>Tara, iwas tayo sa siksik</Text>
      </View>

      <View style={[styles.mapArea, { height: MAP_HEIGHT }]}>
        <View style={styles.roadH1} />
        <View style={styles.roadH2} />
        <View style={styles.roadH3} />
        <View style={styles.roadH4} />
        <View style={styles.roadH5} />
        <View style={styles.roadH6} />
        <View style={styles.roadV1} />
        <View style={styles.roadV2} />
        <View style={[styles.trainLine, {
           left: CENTER + 10,
           height: USABLE + 10,
           top: TOP_PADDING,
        }]} />

        {STATIONS.map((station, index) => (
          <StationDot
            key={station.id}
            station={station}
            top={STATION_POSITIONS[index]}
            alignLeft={index % 2 === 1}
            onPress={handleStationPress}
            centerX={CENTER}
          />
        ))}
      </View>

      <PopupPicker
        station={selectedStation}
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onContinue={handleContinue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mapBg,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textLight,
    marginBottom: 2,
  },
  headerSub: {
    fontSize: 11,
    color: Colors.primaryLight,
  },
  mapArea: {
    backgroundColor: Colors.mapBg,
    position: 'relative',
    width: '100%',
  },
  trainLine: {
    position: 'absolute',
    width: 6,
    backgroundColor: Colors.trainLine,
    borderRadius: 3,
  },
  roadH1: { position: 'absolute', left: 0, right: 0, top: '13%', height: 6, backgroundColor: Colors.road },
  roadH2: { position: 'absolute', left: 0, right: 0, top: '26%', height: 6, backgroundColor: Colors.road },
  roadH3: { position: 'absolute', left: 0, right: 0, top: '39%', height: 6, backgroundColor: Colors.road },
  roadH4: { position: 'absolute', left: 0, right: 0, top: '52%', height: 6, backgroundColor: Colors.road },
  roadH5: { position: 'absolute', left: 0, right: 0, top: '65%', height: 6, backgroundColor: Colors.road },
  roadH6: { position: 'absolute', left: 0, right: 0, top: '78%', height: 6, backgroundColor: Colors.road },
  roadH7: { position: 'absolute', left: 0, right: 0, top: '91%', height: 6, backgroundColor: Colors.road },
  roadV1: { position: 'absolute', top: 0, bottom: 0, left: 60, width: 6, backgroundColor: Colors.road },
  roadV2: { position: 'absolute', top: 0, bottom: 0, right: 60, width: 6, backgroundColor: Colors.road },
});