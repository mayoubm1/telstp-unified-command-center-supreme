# Development Guidelines

## Code Quality Standards

### TypeScript Usage
- **Strict Type Checking**: All TypeScript files use strict mode with comprehensive type definitions
- **Interface Definitions**: Complex objects use proper TypeScript interfaces (e.g., `Workspace`, `MessageChain`, `ScheduledTask`)
- **Null Safety**: Consistent null checking with `|| null` and `?? false` patterns for optional properties
- **Generic Types**: Proper use of generics for reusable components and functions

### Import Organization
- **Structured Imports**: Group imports by category - React hooks first, then external libraries, then internal components
- **Consistent Paths**: Use absolute imports with `@/` prefix for internal components
- **Icon Libraries**: Centralized icon imports from `lucide-react` for consistency

### Component Structure
- **Functional Components**: All React components use functional component pattern with hooks
- **Props Typing**: Components have proper TypeScript interfaces for props
- **Default Props**: Use nullish coalescing (`??`) for default values in component props

## Architectural Patterns

### State Management
- **React Hooks**: Primary state management using `useState` and `useEffect`
- **Real-time Updates**: Interval-based data fetching (30-second intervals) for live dashboard updates
- **Error Handling**: Consistent try-catch blocks with proper error state management
- **Loading States**: Dedicated loading states for async operations

### Data Layer Patterns
- **In-Memory Storage**: Custom `MemStorage` class using Map collections for data persistence
- **CRUD Operations**: Standardized create, read, update, delete patterns across all entities
- **UUID Generation**: Consistent use of `randomUUID()` for entity identification
- **Timestamp Management**: Automatic `createdAt` and `updatedAt` timestamp handling

### API Design
- **Flask Blueprints**: Backend services organized using Flask blueprints for modularity
- **CORS Support**: All API endpoints include `@cross_origin()` decorator
- **RESTful Endpoints**: Standard REST patterns with proper HTTP methods
- **JSON Responses**: Consistent JSON response format with timestamps

## UI/UX Conventions

### Component Library Usage
- **Shadcn/UI Components**: Consistent use of Card, Button, Badge, Tabs, and other UI primitives
- **Form Handling**: React Hook Form with Zod validation for form management
- **Dialog Patterns**: Modal dialogs for create/edit operations with proper form validation

### Styling Patterns
- **Tailwind CSS**: Utility-first CSS with consistent spacing and color schemes
- **Dark Theme**: Built-in dark mode support with appropriate color variants
- **Responsive Design**: Grid layouts with responsive breakpoints (`md:grid-cols-2`, `lg:grid-cols-3`)
- **Glass Morphism**: Backdrop blur effects (`backdrop-blur-sm`) for modern UI aesthetics

### Icon Usage
- **Lucide React**: Primary icon library with semantic icon selection
- **FontAwesome**: Secondary icon library for specific UI elements (spinning indicators, file types)
- **Contextual Icons**: Icons match their functional context (Shield for security, Clock for time-based features)

## Data Handling Patterns

### Database Operations
- **Async/Await**: Consistent async patterns for all database operations
- **Error Propagation**: Proper error throwing with descriptive messages
- **Filtering Patterns**: Array filtering for data queries with proper null checks
- **Batch Operations**: Support for bulk operations and wildcard queries

### Real-time Features
- **WebSocket Integration**: Live message streaming with proper connection management
- **Polling Strategies**: Interval-based updates for dashboard metrics
- **Status Tracking**: Connection status indicators with visual feedback

### Form Validation
- **Zod Schemas**: Type-safe form validation with proper error handling
- **Required Fields**: Clear marking of required vs optional fields
- **Input Sanitization**: Proper handling of user input with validation

## Testing Conventions

### Test Attributes
- **Data Test IDs**: Comprehensive `data-testid` attributes on interactive elements
- **Semantic Naming**: Test IDs follow component-action pattern (`button-send`, `input-message`)
- **Form Testing**: Specific test IDs for form elements and validation states

## Performance Optimization

### Component Optimization
- **Conditional Rendering**: Efficient conditional rendering with proper loading states
- **Event Handling**: Debounced input handling and optimized event listeners
- **Memory Management**: Proper cleanup of intervals and event listeners in useEffect

### Data Optimization
- **Lazy Loading**: Components load data on demand rather than upfront
- **Caching Strategies**: In-memory caching for frequently accessed data
- **Batch Updates**: Grouped state updates to minimize re-renders

## Security Practices

### Input Validation
- **Type Safety**: TypeScript interfaces prevent invalid data structures
- **Sanitization**: Proper handling of user input in forms and API endpoints
- **CORS Configuration**: Proper cross-origin resource sharing setup

### Authentication Patterns
- **Supabase Integration**: Centralized authentication through Supabase client
- **Session Management**: Proper handling of user sessions and workspace access
- **Permission Checks**: Role-based access control for workspace operations