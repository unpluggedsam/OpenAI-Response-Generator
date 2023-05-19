# OpenAI Response Generator

This project is an application that leverages the OpenAI API to generate responses based on user prompts. It allows users to log in, retrieve their personalized information from a database, and incorporate that information into their queries to the OpenAI API.

## Features

- **User authentication**: Users can log in with their email and password to access the application.
- **User-specific data retrieval**: User information is fetched from a SQL database based on their UserID.
- **JSON formatting**: Retrieved user information is converted into JSON format to be used as parameters in API queries.
- **OpenAI API integration**: The application sends queries to the OpenAI API and generates responses based on the user's prompt and personalized information.
- **Frontend interface**: The application provides a user-friendly interface for interacting with the system.

## Prerequisites

- Node.js and npm installed
- SQL database (e.g., MySQL, PostgreSQL) set up with the required tables and columns

## Installation

1. Clone the repository:
- git clone [https://github.com/your-username/openai-response-generator.git](https://github.com/unpluggedsam/OpenAI-Response-Generator)

2. Install the dependencies:
- cd openai-response-generator
- npm install

3. Set up the database connection:
- Configure the database connection settings in the `.env` file.
- Make sure the SQL database is set up with the required tables and columns as described in the project documentation.

4. Start the application:
-npm start

5. Access the application in your web browser:
-http://localhost:3000


## Configuration

- The application requires a valid OpenAI API key. Set your API key in the `config.json` file as `"apiKey": "YOUR-API-KEY"`.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.



