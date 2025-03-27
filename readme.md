# Angular Registration Form

This project is an Angular application that implements a dynamic registration form using Angular Material and JSON Forms. The form allows users to input their personal information, role, and institution details.

## Features

- Dynamic form generation based on JSON schema
- Responsive design with Angular Material components
- Progress bar indicating form completion
- Validation for required fields
- User-friendly interface with modern styling

## Technologies Used

- Angular
- Angular Material
- JSON Forms
- TypeScript
- HTML/CSS

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd angular-registration-form
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Serve the application:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## JSON Structure Explanation

The form is generated based on a JSON schema defined in the `DynamicFormComponent`. Below is the structure of the JSON schema used:

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 3,
      "title": "Full Name",
      "description": "Enter your full name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "title": "Email Address",
      "description": "Enter a valid email"
    },
    "role": {
      "type": "string",
      "enum": ["Student", "Teacher", "Administrator"],
      "title": "Role",
      "description": "Select your role"
    },
    "school": {
      "type": "string",
      "title": "School Name",
      "description": "Enter school name"
    },
    "grade": {
      "type": "string",
      "enum": ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"],
      "title": "Grade Level",
      "description": "Select your grade"
    }
  },
  "required": ["name", "email", "role"]
}
```

### Explanation of Fields

- **name**: A string field that requires a minimum length of 3 characters.
- **email**: A string field that must be a valid email format.
- **role**: A dropdown selection with options for Student, Teacher, or Administrator.
- **school**: A string field for entering the name of the school.
- **grade**: A dropdown selection for the grade level, available only for students.

## Assumptions Made

- The application assumes that users will have a stable internet connection to load Angular Material components and Google Fonts.
- The form is designed for educational institutions, and the roles provided are specific to that context.
- The application does not handle backend integration; it only logs the form data to the console upon submission.
- The form is designed to be responsive and should work on various screen sizes, but specific mobile optimizations may be required based on user feedback.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.