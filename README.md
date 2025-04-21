# [CNAPP Dashboard](https://cnapp-sample.netlify.app/)

CNAPP Dashboard is a ReactJS-based application designed for personalized dashboard experiences. Users can dynamically add or remove widgets, offering flexibility and customization. The application is built with a responsive design, ensuring a smooth experience on any device. State management is efficiently handled with Zustand, and Material UI is used to create a modern, intuitive interface.

## Features

- **Dynamic Widgets:** Easily add and remove widgets to personalize your dashboard.
- **Responsive Design:** Optimized for all screen sizes, ensuring a seamless experience.
- **State Management:** Efficiently managed state using Zustand.
- **Material UI:** Provides a sleek and modern interface with ready-to-use components.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) as a package manager

## Getting Started

Follow these detailed steps to clone the repository and run the project locally:

### 1. Clone the Repository

Begin by cloning the project repository to your local machine:

```bash
git clone https://github.com/prashantkumar182000/CNAPP-Dashboard---Sample.git
cd CNAPP-Dashboard---Sample
```

### 2. Install Dependencies

After navigating to the project directory, install the necessary dependencies. Choose either npm or Yarn, depending on your preference:

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. Start the Development Server

To launch the application locally, start the development server with the following command:

Using npm:

```bash
npm start
```

Or using Yarn:

```bash
yarn start
```

The application should automatically open in your default web browser. If it doesn’t, manually open your browser and navigate to `http://localhost:3000`.

### 4. Explore the Application

- **Adding a Widget:** Click the "+ Add Widget" button within any category to open the widget selection drawer. Choose your desired widgets and click "Confirm" to add them to the dashboard.
- **Removing a Widget:** Easily remove widgets by clicking the "X" button on any widget.

### 5. Build the Application

To create a production-ready build of the application, use the following command:

Using npm:

```bash
npm run build
```

Or using Yarn:

```bash
yarn build
```

This will generate a `build` directory containing all the static files needed for deployment.

## Project Structure

Understanding the project structure will help in navigating and making contributions:

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

## Deployment

The project is deployed and live. You can access it [here](https://cnapp-sample.netlify.app/).

## License

This project is licensed under the MIT License. Please refer to the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are always welcome! If you wish to contribute, please fork the repository, create a new branch, and submit a pull request. If you encounter any issues, feel free to open an issue in the repository.

## Contact

For any inquiries, suggestions, or feedback, please reach out via email: [prashantkumar18.pk@gmail.com](mailto:prashantkumar18.pk@gmail.com) or my website: [https://prashantkumar60099.netlify.app/](https://prashantkumar60099.netlify.app/).
