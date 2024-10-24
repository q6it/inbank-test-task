# InBank Loan Application

This project is a Vue.js application that provides a loan application form. The form collects personal details and validates the input using VeeValidate and Yup. Based on the user's monthly income, the application navigates to either a confirmation or decline view.

## Features

- **Modal Form**: A modal form for collecting personal details such as first name, last name, mobile number, email, and monthly income.
- **Form Validation**: Uses VeeValidate and Yup for form validation to ensure data integrity.
- **State Management**: Utilizes a Pinia store to manage the state of the form data.
- **Conditional Navigation**: Redirects users to a confirmation or decline page based on their monthly income.

## Components

- **ModalForm.vue**: The main component for the form, handling user input and validation.
- **TextInput.vue**: A reusable component for text input fields.
- **BaseButton.vue**: A reusable button component.
- **LogoComponent.vue**: Displays the application's logo.
- **SelectInput.vue**: A component for rendering select input fields.
- **HeroCard.vue**: A component for displaying hero cards, likely used for highlighting key features or information.
- **CalculatorComponent.vue**: A component for performing calculations, possibly related to the loan application process.

## Views

- **ConfirmationView.vue**: Displayed when the user's monthly income is above a certain threshold.
- **DeclineView.vue**: Displayed when the user's monthly income is below a certain threshold.

## Setup

1. **Install Dependencies**: Run `npm install` to install all necessary dependencies.
2. **Run the Application**: Use `npm run serve` to start the development server.
3. **Build for Production**: Use `npm run build` to compile the application for production.

## Usage

1. Open the application in your browser.
2. Fill out the form with your personal details.
3. Submit the form to see the result based on your monthly income.

## Configuration

- **Tailwind CSS**: The application uses Tailwind CSS for styling. Configuration can be adjusted in `tailwind.config.js`.
- **Router**: The application uses Vue Router for navigation. Routes are defined in `src/router/index.ts`.
- **Vite**: The project is set up with Vite for fast development and build processes. Configuration can be adjusted in `vite.config.js`.
- **TypeScript**: The project uses TypeScript for type safety. TypeScript configurations can be adjusted in `tsconfig.json`.

## License

This project is licensed under the MIT License.
