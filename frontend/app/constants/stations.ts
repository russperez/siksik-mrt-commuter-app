export type Station = {
  id: string;
  name: string;
  city: string;
  position: number;
};

export const STATIONS: Station[] = [
  { id: 'north_avenue', name: 'North Avenue', city: 'Quezon City', position: 0 },
  { id: 'quezon_avenue', name: 'Quezon Avenue', city: 'Quezon City', position: 1 },
  { id: 'kamuning', name: 'Kamuning', city: 'Quezon City', position: 2 },
  { id: 'araneta_center_cubao', name: 'Araneta Center-Cubao', city: 'Quezon City', position: 3 },
  { id: 'santolan_annapolis', name: 'Santolan-Annapolis', city: 'San Juan', position: 4 },
  { id: 'ortigas', name: 'Ortigas', city: 'Mandaluyong', position: 5 },
  { id: 'shaw_boulevard', name: 'Shaw Boulevard', city: 'Mandaluyong', position: 6 },
  { id: 'boni', name: 'Boni', city: 'Mandaluyong', position: 7 },
  { id: 'guadalupe', name: 'Guadalupe', city: 'Makati', position: 8 },
  { id: 'buendia', name: 'Buendia', city: 'Makati', position: 9 },
  { id: 'ayala', name: 'Ayala', city: 'Makati', position: 10 },
  { id: 'magallanes', name: 'Magallanes', city: 'Makati', position: 11 },
  { id: 'taft_avenue', name: 'Taft Avenue', city: 'Pasay', position: 12 },
];

export const DAYS = [
  'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const MOCK_BUSYNESS: Record<number, number> = {
  6: 15, 7: 65, 8: 87, 9: 70, 10: 35,
  11: 30, 12: 50, 13: 42, 14: 38, 15: 28,
  16: 55, 17: 80, 18: 90, 19: 75, 20: 40,
  21: 20, 22: 10,
};