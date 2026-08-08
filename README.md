# Intelligent Inventory Dashboard

A React-based Inventory Dashboard designed for dealership managers to monitor vehicle inventory, identify aging stock, and track proposed actions for vehicles that remain in inventory for extended periods.

## Features

### Inventory Visualization

* Display a list of vehicles currently available in inventory.
* Filter inventory by vehicle attributes such as make, model, and status.
* Responsive table layout for desktop and mobile devices.

### Aging Stock Identification

* Automatically identify vehicles that have remained in inventory for more than 90 days.
* Highlight aging vehicles to help managers prioritize inventory actions.

### Actionable Insights

* Allow managers to assign and persist an action status for aging vehicles.
* Example actions:

  * Price Reduction Planned
  * Marketing Campaign
  * Transfer to Another Dealership
  * Monitor for Additional Days

### User Experience

* Fast client-side filtering and rendering.
* Loading and error states handled consistently.
* Responsive UI built with reusable components.

---

# Technology Stack

## React 19

React was chosen as the primary UI library because it provides a component-based architecture that enables reusable, maintainable, and scalable frontend development.

Benefits:

* Component reusability
* Strong ecosystem
* Excellent TypeScript support
* Industry-standard for modern frontend applications

---

## TypeScript

TypeScript improves code reliability through static type checking.

Benefits:

* Better developer experience
* Early error detection
* Strongly typed API contracts
* Improved maintainability as the application grows

---

## Vite

Vite was selected as the build tool because of its fast development experience and optimized production builds.

Benefits:

* Instant development server startup
* Fast Hot Module Replacement (HMR)
* Lightweight configuration
* Excellent React and TypeScript integration

---

## TanStack Table

TanStack Table was chosen instead of traditional UI-library tables because it provides a powerful headless table architecture.

Benefits:

* Flexible table rendering
* Better separation between business logic and presentation
* Advanced sorting, filtering, and row management
* Suitable for future scalability and server-side integration
* Easily integrates with TanStack Virtual to support virtualization for large datasets
* Enables efficient lazy rendering and virtual scrolling, significantly improving performance for inventory   systems containing thousands of vehicles
* Provides a scalable foundation for future enterprise-level requirements without being tightly coupled to a specific UI framework

---

## TanStack React Query

React Query is responsible for server-state management and asynchronous data handling.

Benefits:

* Automatic caching
* Loading and error state management
* Reduced boilerplate code
* Easy migration from mocked APIs to real backend services

Example usage:

* Fetch vehicle inventory
* Update vehicle action status
* Cache inventory responses

---

## Redux Toolkit

Redux Toolkit was included for global client-side state management.

Benefits:

* Centralized application state
* Predictable state updates
* Simplified Redux configuration
* Suitable for managing UI-level shared states

Potential use cases:

* Filter persistence
* User preferences
* Application-wide settings

---

## Ant Design

Ant Design was selected for reusable UI components.

Benefits:

* Professional-looking components
* Consistent design language
* Accessibility support
* Faster development

Components used:

* Modal
* Form
* Select
* Button
* Notification

TanStack Table is used for table logic while Ant Design is used for surrounding UI components.

---

## Axios

Axios provides a centralized HTTP client abstraction.

Benefits:

* Request/response interceptors
* Consistent API layer
* Easier error handling
* Simplified migration to production APIs

---

## MSW (Mock Service Worker)

MSW was chosen to simulate backend APIs during development.

Benefits:

* Realistic API behavior
* No dependency on a backend service
* Supports future API replacement with minimal code changes
* Works seamlessly with React Query

The application interacts with mocked endpoints exactly as it would with real backend services.

---

## Moment Timezone

Moment Timezone is used for handling date calculations and timezone-aware processing.

Benefits:

* Reliable date calculations
* Consistent aging-stock evaluation
* UTC-based inventory age calculation

Example:

* Determine whether a vehicle has been in stock for more than 90 days.

---

## Vitest

Vitest is used as the testing framework because it integrates naturally with Vite.

Benefits:

* Fast execution
* Jest-like API
* Minimal configuration
* Excellent TypeScript support

---

## React Testing Library

React Testing Library focuses on testing application behavior from the user's perspective.

Benefits:

* Encourages better testing practices
* Tests actual user interactions
* Reduces implementation-coupled tests

Example:

* Verify inventory rendering
* Verify filtering functionality
* Verify action status updates

---

# Project Structure

```text
src/
├── apis/
├── components/
    ├── hooks/
├── pages/
├── mocks/
│   ├── data/
│   ├── handlers/
│   └── services/
├── store/
├── types/
├── utils/
```

### Folder Responsibilities

* **apis/**: API client configuration and endpoint definitions
* **components/**: Feature-based modules
* **mocks/**: Mock data and MSW handlers
* **store/**: Redux Toolkit store configuration
* **types/**: Shared TypeScript interfaces and types

### Note

The project structure has been intentionally kept lightweight and straightforward to support rapid development and evaluation within the scope of this coding challenge.

The primary goal was to maintain a clear separation of concerns while avoiding unnecessary complexity that would not provide additional value for a small demonstration project.

In a larger production-scale application, I would typically introduce additional architectural layers and feature-specific modules, such as:

* **features/** for domain-driven feature modules
* **shared/** for reusable assets and cross-cutting concerns

  * Shared UI components (Atomic Design)
  * Custom hooks
  * Shared types and constants
  * Utility libraries
* **services/** for application-wide services

  * Internationalization (i18n)
  * Authentication
  * Logging
  * Analytics
  * API abstractions
* **tests/** organized by feature and testing scope

  * Unit tests
  * Integration tests
  * End-to-end tests
* **layouts/** for application layouts and routing structures
* **providers/** for application-level providers and dependency initialization
* **config/** for environment and application configuration
* ...

For this challenge, a simplified structure was chosen to prioritize readability, development speed, and ease of review while still demonstrating scalable architectural principles.


---

# Installation

```bash
yarn install
```

---

# Running the Application

Start development server:

```bash
yarn dev
```

The application will be available at:

```text
http://localhost:5173
```

---

# Running Tests

Run all tests:

```bash
yarn test
```

Run tests in watch mode:

```bash
yarn test:watch
```

---

# Production Build

Create production build:

```bash
yarn build
```

Preview production build:

```bash
yarn preview
```

---

# Future Improvements

Given additional time, the following enhancements could be implemented:

* Server-side pagination
* Server-side filtering and sorting
* Advanced inventory analytics
* Vehicle detail page
* Audit history for action status changes
* Role-based access control
* End-to-end testing with Playwright
* CI/CD pipeline integration

---

# Design Considerations

The project was intentionally designed with clear separation between:

* Presentation layer (React Components)
* Business logic (Services and Utilities)
* State management (React Query and Redux Toolkit)
* API layer (Axios)
* Mock backend layer (MSW)

This architecture allows the application to evolve from a mocked environment to a production-ready backend integration with minimal changes.

## Additional Documentation

- [AI Usage Disclosure](./AI_DISCLOSURE.md)
