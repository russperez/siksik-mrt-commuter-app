export const Colors = {
  primary: '#1D9E75',
  primaryLight: '#E1F5EE',
  primaryDark: '#085041',

  busy_low: '#1D9E75',
  busy_low_bg: '#E1F5EE',
  busy_low_text: '#085041',

  busy_medium: '#EF9F27',
  busy_medium_bg: '#FAEEDA',
  busy_medium_text: '#633806',

  busy_high: '#E24B4A',
  busy_high_bg: '#FCEBEB',
  busy_high_text: '#A32D2D',

  busy_peak: '#A32D2D',
  busy_peak_bg: '#FCEBEB',
  busy_peak_text: '#791F1F',

  background: '#F5F5F0',
  card: '#FFFFFF',
  mapBg: '#EAE8E0',
  road: '#D4D0C4',
  trainLine: '#1D9E75',

  textPrimary: '#2C2C2A',
  textSecondary: '#888780',
  textLight: '#FFFFFF',
};

export const getBusynessInfo = (pct: number) => {
  if (pct <= 30) return {
    label: 'Sakay na!',
    color: Colors.busy_low,
    bg: Colors.busy_low_bg,
    textColor: Colors.busy_low_text,
  };
  if (pct <= 60) return {
    label: 'Medyo siksik',
    color: Colors.busy_medium,
    bg: Colors.busy_medium_bg,
    textColor: Colors.busy_medium_text,
  };
  if (pct <= 85) return {
    label: 'Siksik',
    color: Colors.busy_high,
    bg: Colors.busy_high_bg,
    textColor: Colors.busy_high_text,
  };
  return {
    label: 'Siksik na!',
    color: Colors.busy_peak,
    bg: Colors.busy_peak_bg,
    textColor: Colors.busy_peak_text,
  };
};