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