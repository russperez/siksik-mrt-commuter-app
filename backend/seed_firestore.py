import json
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase with service account key
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Load JSON dataset
with open('notebooks/mrt3_crowd_patterns.json', 'r') as f:
    data = json.load(f)

# Seed into Firestore
print("Seeding Firestore...")
for station, days in data.items():
    station_id = station.lower().replace(' ', '_').replace('-', '_')
    doc_ref = db.collection('crowd_patterns').document(station_id)
    doc_ref.set({
        'name': station,
        'days': days
    })
    print(f"Seeded: {station}")

print()
print(f"Done. {len(data)} stations seeded into Firestore.")