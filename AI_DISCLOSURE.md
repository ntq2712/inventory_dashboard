## AI-Assisted Development Declaration

This project was developed with assistance from GitHub Copilot Agent as a productivity tool.

### How AI Was Used

To improve the effectiveness of AI-assisted development, I created a dedicated design document that serves as a reference for the AI agent throughout the project. The document describes the intended architecture, project structure, data flow, business requirements, and the responsibilities of each folder and module. This helps the AI better understand the project's context and align its suggestions with the established design decisions rather than generating isolated code snippets without architectural awareness.

GitHub Copilot Agent was primarily used to:

* Accelerate boilerplate code generation
* Suggest TypeScript typings and component scaffolding
* Generate repetitive CRUD-related code
* Assist with documentation

### Development Approach

All AI-generated code was reviewed, validated, and refined before being incorporated into the codebase.

The final implementation, architectural decisions, and coding standards remained under my full control throughout the development process. Every generated code segment was evaluated for:

* Correctness
* Maintainability
* Readability
* Consistency with project architecture
* Clean Code principles

No AI-generated code was merged without manual review and verification.

### Areas Implemented Manually

The core business logic and critical application behaviors were designed and implemented manually, including:

* Inventory filtering logic
* Aging stock identification logic
* Table rendering architecture using TanStack Table
* Data transformation and mapping strategies
* State management integration
* API interaction patterns
* Component composition and application structure
* Testing integration

These areas were intentionally implemented and controlled directly to ensure correctness, maintainability, and alignment with the project requirements.

### Philosophy

AI was treated as an engineering assistant rather than an autonomous developer. The goal was to improve development efficiency while maintaining full ownership of the application's design, implementation quality, and technical decisions.
