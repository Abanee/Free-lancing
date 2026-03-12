# Implementation Plan

- [x] 1. Set up theme system foundation


  - Extend existing CSS custom properties in style.css with dark theme variables
  - Create theme controller JavaScript class for managing theme switching
  - Implement localStorage persistence for theme preferences
  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [x] 2. Implement theme toggle component


  - Add theme toggle button HTML structure to desktop navigation
  - Style theme toggle button to match existing navigation elements
  - Implement emoji icon switching (🌙/☀️) based on current theme
  - Add proper ARIA labels and accessibility attributes
  - _Requirements: 3.1, 3.6_

- [x] 3. Create direction system foundation

  - Implement direction controller JavaScript class for RTL/LTR switching
  - Add CSS logical properties for automatic RTL layout support
  - Create RTL-specific styles using [dir="rtl"] selectors
  - Implement localStorage persistence for direction preferences
  - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 4. Implement direction toggle component

  - Add direction toggle button HTML structure to desktop navigation
  - Style direction toggle button to match existing navigation elements
  - Implement text switching (LTR/RTL) based on current direction
  - Add proper ARIA labels and accessibility attributes
  - _Requirements: 4.1_

- [x] 5. Integrate controls into mobile navigation

  - Add theme and direction controls to existing mobile menu structure
  - Style mobile controls with labels for better usability
  - Ensure mobile controls maintain existing mobile menu styling
  - Test touch interactions and mobile accessibility
  - _Requirements: 3.6, 5.4_

- [x] 6. Update navigation across all pages


  - Add "Home 2" link to desktop navigation in all HTML files
  - Add "Home 2" link to mobile menu in all HTML files
  - Update navigation active state logic to support Home 2 page
  - Ensure consistent navigation structure across all pages
  - _Requirements: 1.1, 1.3, 5.1_

- [x] 7. Create Home 2 page

  - Create home2.html with alternative homepage layout
  - Implement different hero section with alternative background and content
  - Rearrange content sections (featured layouts above stats bar)
  - Ensure responsive design matches existing pages
  - _Requirements: 1.2, 1.4_

- [x] 8. Implement footer visibility improvements

  - Update footer CSS variables for better contrast in both themes
  - Enhance footer link hover states and visual feedback
  - Ensure footer remains visible across all device sizes
  - Test contrast ratios to meet WCAG 2.1 AA standards
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 9. Add theme switching functionality

  - Implement theme application logic that updates CSS custom properties
  - Add smooth transitions for theme switching animations
  - Ensure all page elements update colors appropriately
  - Handle theme switching across different page types
  - _Requirements: 3.2, 3.5_


- [x] 10. Add direction switching functionality


  - Implement HTML dir attribute updates for RTL/LTR switching
  - Ensure proper mirroring of layouts and UI elements
  - Handle elements that should not be mirrored (logos, icons)
  - Test layout recalculation for proper RTL rendering
  - _Requirements: 4.2, 4.3, 4.4_

- [x] 11. Implement preference persistence system

  - Create unified preference management system for theme and direction
  - Add error handling for localStorage unavailability
  - Implement fallback to system preferences when needed
  - Add preference restoration on page load
  - _Requirements: 3.3, 3.4, 4.5, 4.6, 5.2, 5.3_





- [ ] 12. Add comprehensive error handling
  - Implement graceful degradation when JavaScript is disabled
  - Add fallbacks for unsupported CSS features
  - Handle corrupted localStorage data
  - Ensure controls work properly across different browsers
  - _Requirements: 5.5_


- [ ] 13. Write automated tests for theme functionality
  - Create unit tests for theme controller class
  - Test localStorage persistence and retrieval
  - Test CSS variable updates and theme application
  - Test theme toggle button interactions

  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [ ] 14. Write automated tests for direction functionality
  - Create unit tests for direction controller class
  - Test HTML dir attribute updates
  - Test RTL layout rendering and mirroring


  - Test direction toggle button interactions
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 15. Integrate and test complete system
  - Test cross-page navigation with preferences maintained
  - Verify mobile menu integration works properly
  - Test Home 2 page integration with navigation system
  - Ensure all controls remain functional across screen sizes
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_