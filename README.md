# Gostertrust Task Full-Stack Application

## Documentation

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/<owner>/lacedriller.git
   cd lacedriller
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and include the required variables:
   ```
   DATABASE_URL="your_database_url"
   API_KEY="your_api_key"
   ```
4. Run the application:
   ```bash
   npm start
   ```

### Features
- User authentication
- Task creation and management
- Payment processing
- API integrations

### API Endpoints
- **POST** `/api/register` - User registration
- **POST** `/api/login` - User login
- **GET** `/api/tasks` - Get all tasks
- **POST** `/api/tasks` - Create a new task

### Payment Flow Documentation
1. Users must deposit a minimum of **1000** units to activate their account.
2. The cost to create a new task is **7000** units.
3. Payment processing is handled via the integrated payment gateway.

## Conclusion
This documentation serves as a quick reference for setting up and using the Gostertrust Task application. For more details, check the code and comments within the application!