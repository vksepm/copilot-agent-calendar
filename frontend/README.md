# Calendar Application Frontend

React-based frontend for the Calendar Application built with TypeScript, Vite, and FullCalendar.

## Component Architecture

### Calendar Component
The main calendar component (`Calendar.tsx`) handles:
- Calendar view rendering using FullCalendar
- Meeting state management
- API interactions
- Event color coding
- Meeting form interactions

### MeetingForm Component
Modal form component (`MeetingForm.tsx`) for:
- Creating new meetings
- Editing existing meetings
- Handling recurring meeting patterns
- Form validation and submission

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Styling

The application uses a combination of:
- Tailwind CSS for utility classes
- Custom CSS for FullCalendar overrides
- HeadlessUI for accessible components

### Theme Customization
Modify `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Breakpoints

## State Management

Currently using React's built-in state management with:
- useState for local component state
- useEffect for side effects and API calls
- Props for component communication

## TypeScript Types

Key type definitions in `types/meeting.ts`:
- Meeting interface
- MeetingFormData interface
- Event types

## API Integration

Axios is used for API calls with endpoints:
- GET /meetings/
- POST /meetings/
- PUT /meetings/{id}
- DELETE /meetings/{id}

## Calendar Views

FullCalendar provides:
- Month view (default)
- Week view
- Day view
- List view

## Event Handling

Supported interactions:
- Click and drag to create events
- Click events to edit
- Drag and drop to reschedule
- Resize to adjust duration

## Component Customization

### Event Display
Customize event rendering in `Calendar.tsx`:
- Color coding by meeting type
- Custom tooltips
- Location display
- Attendee information

### Form Fields
Modify `MeetingForm.tsx` to:
- Add new fields
- Customize validation
- Change field types
- Add new meeting types

## Browser Support

Tested and supported in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- Lazy loading of views
- Optimized re-renders
- Memoized event handlers
- Efficient date handling

## Future Enhancements

1. **Component Library**
   - Reusable button components
   - Custom form inputs
   - Loading skeletons
   - Toast notifications

2. **State Management**
   - Consider Redux/MobX for scaling
   - Implement caching
   - Optimize API calls

3. **Testing**
   - Unit tests with Jest
   - Integration tests
   - E2E tests with Cypress

4. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - High contrast mode

5. **Mobile Experience**
   - Touch interactions
   - Responsive modals
   - Mobile-specific views
