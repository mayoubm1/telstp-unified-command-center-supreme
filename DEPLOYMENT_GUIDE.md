# TELsTP Unified Command Center - Deployment Guide

## Overview

This project now supports dual database configuration:
- **Firebase**: Current main database for TELsTP operations
- **Supabase**: For OmniCog Hub integration and Vercel deployment
- **Mock Data**: Development fallback

## Fixed Issues

### 1. Chairman Name Correction ✅
- **Fixed**: Changed from "Dr. Ahmed Hassan Al-Mansouri" to "Dr Mohamed Hassan Amin"
- **Files Updated**:
  - `TAWASOLLandingPage.tsx`
  - `TAWASOL_Chairman_Message.md`
  - `telstp-showcase/js/chairman-message.js`

### 2. Dual Database Integration ✅
- **Added**: Supabase client configuration (`lib/supabase-client.ts`)
- **Added**: Dual database manager (`lib/database-config.ts`)
- **Updated**: Enhanced mock client with OmniCog data
- **Created**: Environment configuration template

## Database Architecture

```
TELsTP Ecosystem
├── Firebase (Main Database)
│   ├── TELsTP Projects
│   ├── Research Data
│   └── User Management
├── Supabase (OmniCog Hub)
│   ├── OmniCog Agents
│   ├── Cross-Platform Tasks
│   └── Real-time Coordination
└── Mock Data (Development)
    ├── Local Development
    └── Testing Environment
```

## Deployment Options

### Option 1: Current Setup (Firebase + Mock)
```bash
# Use existing Firebase setup with enhanced mock data
npm run dev
```

### Option 2: Firebase + Supabase Integration
```bash
# 1. Set up Supabase project
# 2. Configure environment variables
cp .env.example .env.local

# 3. Add Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Deploy
npm run build
npm run start
```

### Option 3: Vercel Deployment (OmniCog Hub)
```bash
# 1. Connect to Vercel
vercel login
vercel link

# 2. Set environment variables in Vercel dashboard
# 3. Deploy
vercel --prod
```

## Environment Configuration

### Required Environment Variables

```env
# Firebase (Current Main Database)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Supabase (OmniCog Hub Integration)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration
DATABASE_PROVIDER=mock # Options: firebase, supabase, mock
ENABLE_REALTIME=false
FALLBACK_TO_MOCK=true
```

## Supabase Schema Setup

If you want to use real Supabase integration, create these tables:

```sql
-- OmniCog Agents Table
CREATE TABLE omnicog_agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('research', 'analysis', 'coordination', 'communication')),
  status TEXT CHECK (status IN ('active', 'idle', 'processing', 'offline')),
  capabilities TEXT[],
  current_task TEXT,
  performance_metrics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OmniCog Projects Table
CREATE TABLE omnicog_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('active', 'completed', 'paused', 'planning')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assigned_agents UUID[],
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  milestones JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- OmniCog Tasks Table
CREATE TABLE omnicog_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES omnicog_projects(id),
  agent_id UUID REFERENCES omnicog_agents(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_duration INTEGER,
  actual_duration INTEGER,
  dependencies UUID[],
  results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Usage Examples

### Using Mock Data (Current Default)
```javascript
import { supabase } from './lib/supabase'

// This will use mock data
const { data: agents } = await supabase.from('ai_agents').select('*')
```

### Using Dual Database Manager
```javascript
import { databaseManager } from './lib/database-config'

// Get unified data from both databases
const allProjects = await databaseManager.getAllProjects()
console.log(allProjects.telstp) // Firebase data
console.log(allProjects.omnicog) // Supabase data

// Switch database providers
databaseManager.switchToSupabase()
const omnicogAgents = await databaseManager.getOmniCogAgents()
```

### Using Real Supabase Client
```javascript
import { omniCogHub } from './lib/supabase-client'

// Create new OmniCog agent
const newAgent = await omniCogHub.createAgent({
  name: 'New Research Agent',
  type: 'research',
  status: 'active',
  capabilities: ['data_analysis', 'report_generation'],
  performance_metrics: {
    tasks_completed: 0,
    success_rate: 1.0,
    avg_response_time: 0
  }
})
```

## Benefits of This Setup

1. **Backward Compatibility**: Existing Firebase setup continues to work
2. **Flexible Integration**: Can add Supabase when ready
3. **Development Friendly**: Mock data for local development
4. **Scalable**: Easy to switch between database providers
5. **Real-time Capable**: Supabase provides real-time subscriptions
6. **Vercel Ready**: Optimized for Vercel deployment

## Next Steps

1. **Immediate**: Use current setup with corrected chairman name
2. **Short-term**: Set up Supabase project for OmniCog Hub
3. **Long-term**: Migrate to full dual database integration
4. **Future**: Deploy OmniCog Hub to Vercel with Supabase backend

## Troubleshooting

### Database Connection Issues
```javascript
import { databaseManager } from './lib/database-config'

// Check database status
const status = databaseManager.getStatus()
console.log('Database Status:', status)

// Force fallback to mock data
databaseManager.switchToMock()
```

### Environment Variable Issues
```bash
# Check if environment variables are loaded
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_FIREBASE_PROJECT_ID

# Restart development server after adding variables
npm run dev
```

## Support

The dual database setup ensures that:
- Your current Firebase setup remains untouched
- OmniCog Hub can be deployed to Vercel with Supabase
- Development continues with reliable mock data
- Future integration is seamless and flexible