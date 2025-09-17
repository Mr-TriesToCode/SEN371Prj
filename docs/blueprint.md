# **App Name**: CampusLearn Lite

## Core Features:

- Role-Based Dashboard: Displays role-specific content (student, tutor, admin) on the dashboard. Demo token support with prefix 'demo-token:'.
- Courses Listing: Enables listing and browsing courses. Mock listing details will be available.
- Profile Management: Enables users to manage and view their profiles, updating basic information (excluding sensitive data).
- Tutor Topic Generation: AI tool to assist tutors with generating relevant and engaging topics. Incorporates reasoning to decide optimal topics based on current student interests.
- Forum Discussions: Implement basic forum discussions using UI components to display threaded messages.

## Style Guidelines:

- Primary color: Student Blue (#3B82F6), capturing an academic, reliable feel.
- Background color: Light gray (#F9FAFB), nearly white, to provide a clean and neutral backdrop, complementing the light color scheme.
- Accent color: Tutor Orange (#F59E0B), used sparingly to highlight interactive elements and tutor-related content.
- Font: 'Arial, sans-serif'. Note: currently only Google Fonts are supported.
- Main container uses 'min-h-screen bg-gray-50 w-full overflow-x-hidden'. The base font size will be set to 16px through the CSS variable --font-size.
- Follow specified breakpoints for responsiveness: base, sm (640px+), md (768px+), lg (1024px+).
- Icons from Lucide React (e.g., BookOpen, Menu, User) will be sized at w-4 h-4 standard and w-3 h-3 for compact mobile use.