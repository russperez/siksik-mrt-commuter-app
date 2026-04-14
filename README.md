# Siksik

**Author:** Dharl Russell C. Perez
**Date:** April 2026
**License:** MIT

A React Native app that helps Filipino MRT-3 commuters check crowd busyness by station, day, and time. Powered by a data-driven crowd pattern model built from official DOTr ridership data and documented MRT-3 peak hour research.

> "Tara, iwas tayo sa siksik."

---

## Demo

[Watch the demo on YouTube](https://www.youtube.com/shorts/mjgAK7CumM0)

---

## What it does

1. Open the app and see all 13 MRT-3 stations on a map view
2. Tap any station
3. Pick a day and time using the popup picker
4. See the busyness percentage and crowd level for that station

Crowd levels are labeled in Filipino:

| Level | Range |
|---|---|
| Sakay na! | 0 to 30% |
| Medyo siksik | 31 to 60% |
| Siksik | 61 to 85% |
| Siksik na! | 86 to 100% |

---

## Stations Covered

All 13 MRT-3 stations from North Avenue (Quezon City) to Taft Avenue (Pasay):

North Avenue, Quezon Avenue, Kamuning, Araneta Center-Cubao, Santolan-Annapolis, Ortigas, Shaw Boulevard, Boni, Guadalupe, Buendia, Ayala, Magallanes, Taft Avenue

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native, Expo |
| Language | TypeScript |
| Navigation | React Navigation (Stack) |
| Database | Firebase Firestore |
| Data | Custom crowd pattern dataset |

---

## Dataset

Busyness data comes from a custom dataset built specifically for this app. It covers all 13 stations across 7 days and 18 hours (5AM to 10PM), totaling 1,638 data points.

The methodology derives estimates from:
- Official DOTr-MRT3 ridership statistics (2024 to April 2026)
- Peak hour windows confirmed by MRT-3 GM Michael Capati (DZRH, March 26, 2026)
- Station-level weighting based on interchange status and commercial density
- April 2026 ridership adjustment reflecting the 50% fare discount

Dataset repo: [mrt3-crowd-patterns-dataset](https://github.com/russperez/mrt3-crowd-patterns-dataset)

---

## Disclaimer

This app uses a data-driven estimate, not real-time crowd data. All busyness figures are derived from cited public sources. The methodology is fully documented in the dataset repo.
