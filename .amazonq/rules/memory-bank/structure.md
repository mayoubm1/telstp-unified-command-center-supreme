# Project Structure

## Directory Organization

### Root Level Components
- **App.jsx/tsx**: Main application entry points with multiple versions for different configurations
- **main.tsx**: Primary application bootstrap file
- **index.html/css**: Web application entry points and styling
- **vite.config.js/ts**: Build configuration for Vite bundler

### Core Application Components
- **AutomationDashboard.tsx**: Main dashboard interface for automation controls
- **MainChatInterface.tsx**: Primary chat communication component
- **App.css**: Global application styling

### Backend Services
- **command_center.py**: Core Python backend service for system operations
- **main.py**: Python application entry point
- **m2_3m_backend_connection.py**: Backend connectivity layer

### Database Layer
- **db.ts**: Database configuration and connection management
- **storage.ts**: Data storage and persistence layer
- **supabase.js/ts**: Supabase client configuration and utilities
- **supabaseclient.ts**: Typed Supabase client implementation
- **inspect_database_schema.py**: Database schema inspection utilities
- **inspect_schema.py**: Schema analysis tools

### Configuration Files
- **package.json**: Node.js dependencies and scripts
- **app.json**: Expo application configuration
- **tsconfig.json**: TypeScript compiler configuration
- **firebase.json**: Firebase deployment settings
- **expo-env.d.ts**: Expo environment type definitions

### Routing and Navigation
- **routes.ts**: Application routing configuration
- **index.ts**: Module exports and routing setup

## Architectural Patterns

### Frontend Architecture
- **Component-Based**: React/React Native components for modular UI development
- **TypeScript Integration**: Strong typing throughout the application
- **Cross-Platform**: Expo framework for unified web/mobile deployment

### Backend Architecture
- **Microservices**: Separate Python services for different functionalities
- **Database Abstraction**: Supabase for real-time data synchronization
- **API Layer**: RESTful services connecting frontend and backend

### Development Workflow
- **Multi-Environment**: Support for web, iOS, and Android platforms
- **Hot Reload**: Vite and Expo development servers for rapid iteration
- **Type Safety**: TypeScript configuration for compile-time error checking