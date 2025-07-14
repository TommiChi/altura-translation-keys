# Altura Translation Keys Viewer

This project is a Nuxt 3 application for viewing and managing translation keys used in the Altura project. It provides a user-friendly interface to search, filter, and paginate translation keys and their values across multiple languages.

## Features
- Search translation keys and values
- Filter results by date
- Pagination for large result sets
- View translations in multiple languages
- Modern UI built with Nuxt 3, Pinia, and Vue 3

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application
To start the development server:
```sh
npm run dev
```
The app will be available at `http://localhost:3000` by default.

### Building for Production
```sh
npm run build
npm run preview
```

## Project Structure
```
altura-translation-keys/
├── assets/           # CSS tokens and static assets
├── components/       # Vue components (filters, tables, search, etc.)
├── pages/            # Nuxt pages
├── public/           # Public static files (favicon, images)
├── server/           # API routes (e.g., /api/search)
├── services/         # HTTP client abstraction
├── stores/           # Pinia stores (state management)
├── types.d.ts        # TypeScript types for translations
├── nuxt.config.ts    # Nuxt configuration
├── package.json      # Project metadata and scripts
└── ...
```

## API
- The app uses a Nuxt server route (`/api/search`) to fetch translation keys and values.
- See `server/api/search.ts` for implementation details.

## State Management
- Uses [Pinia](https://pinia.vuejs.org/) for state management.
- Main store: `stores/searchStore.ts`

## Testing
- Unit tests are located in the `__tests__` folders next to components and stores.
- To run tests (after installing a test runner like `vitest`):
  ```sh
  npm run test
  ```

## License
This project is for assessment purposes only.
