# Firebase Real Database Setup

## 🔥 Configure Real Firebase Connection

### Step 1: Get Firebase Credentials
1. Go to https://console.firebase.google.com
2. Select your project: **m2-3m-telstp** (or create new)
3. Go to Project Settings > General
4. Copy your Firebase configuration

### Step 2: Update .env File
Edit `.env` file with your real credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=m2-3m-telstp.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=m2-3m-telstp
VITE_FIREBASE_STORAGE_BUCKET=m2-3m-telstp.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 3: Initialize Firestore Database
Run this to create collections:

```bash
npm run init:firebase
```

Or manually create these collections in Firebase Console:
- `ai_agents`
- `projects`
- `research_projects`
- `datasets`
- `global_network`
- `omnicog_agents`
- `omnicog_projects`

### Step 4: Deploy Genkit Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### Step 5: Restart Application
```bash
# Kill current server
kill $(cat /tmp/vite.pid)

# Restart with real Firebase
npm run dev
```

## ✅ Verification

Test Firebase connection:
```javascript
import { db } from './lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

const projects = await getDocs(collection(db, 'projects'))
console.log('Projects:', projects.docs.map(d => d.data()))
```

## 🚀 No More Mock Data!

All data now comes from:
- **Firebase Firestore** - Real-time database
- **Firebase Functions** - Genkit AI flows
- **Supabase** - OmniCog Hub data (optional)