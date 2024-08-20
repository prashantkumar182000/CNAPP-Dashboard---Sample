Here's your updated `README.md` file with your GitHub username, email address, and the deployed project link:


# Dynamic Dashboard

Dynamic Dashboard is a ReactJS-based application that allows users to personalize their dashboard by adding widgets. The application features a responsive design, supports dynamic widget management, and uses Zustand for state management.

## Features

- **Dynamic Widgets:** Add and remove widgets dynamically.
- **Responsive Design:** Works well on all screen sizes.
- **State Management:** Uses Zustand for efficient state management.
- **Material UI:** Leverages Material UI components for a sleek, modern interface.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/prashantkumar182000/dynamic-dashboard.git
cd dynamic-dashboard
```

### 2. Install Dependencies

If you're using npm:

```bash
npm install
```

Or if you're using Yarn:

```bash
yarn install
```

### 3. Start the Development Server

To run the application locally:

```bash
npm start
```

Or with Yarn:

```bash
yarn start
```

The app should automatically open in your default web browser. If it doesn't, navigate to `http://localhost:3000` in your browser.

### 4. Build the Application

To create a production build:

```bash
npm run build
```

Or with Yarn:

```bash
yarn build
```

This will output the static files to the `build` directory, ready for deployment.

## Project Structure

Here's an overview of the project structure:

```
src/
├── components/
│   ├── AddWidgetModal.js    // Component for adding widgets
│   ├── Category.js          // Category display component
│   ├── Dashboard.js         // Main dashboard component
│   ├── Widget.js            // Widget display component
│   └── Category.css         // CSS for Category component
├── store/
│   └── store.js             // Zustand state management
├── App.js                   // Main App component
├── index.js                 // Entry point of the application
├── index.css                // Global styles
└── App.css                  // Styles for the App component
```

## Usage

- **Adding a Widget:** Click the "+ Add Widget" button in any category to open the widget selection drawer. Choose your widgets and click "Confirm" to add them to the dashboard.
- **Removing a Widget:** Click the "X" button on any widget to remove it from the dashboard.

## Deployment

The project is deployed and can be accessed [here](https://cnapp-sample.netlify.app/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## Contact

For any inquiries, please contact [prashantkumar18.pk@gmail.com](mailto:prashantkumar18.pk@gmail.com).
```

You can save this text as `README.md` in your project directory.
