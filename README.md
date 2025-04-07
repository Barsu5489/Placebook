# Placebook

Placebook is a sophisticated web application built with modern technologies that enables users to create, manage, and explore locations on an interactive map. With a robust authentication system and seamless user experience.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Admin Functionality](#admin-functionality)
- [Development Workflow](#development-workflow)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)


## Features

### Core Functionality
- **Interactive Map**: Built with Leaflet.js, allowing users to view, add, and interact with locations globally.
- **Location Management**: Create and manage locations with custom names and geographic coordinates.
- **Responsive Design**: Modern UI built with Tailwind CSS, ensuring a great experience across all devices.

### Authentication System
- **Secure User Sessions**: Browser-specific sessions with proper expiration handling.
- **Session Management**: Security features include user agent and IP address validation.
- **User Registration & Login**: Clean, intuitive authentication flow with error handling.

### User Experience
- **Guided Interface**: Step-by-step instructions for adding locations make the application intuitive.
- **Dynamic Navigation**: Context-aware navbar that changes based on authentication status.
- **Feedback System**: Clear success/error messages for all user interactions.

## Architecture

Placebook follows a modern architecture combining Rails backend with React frontend:

### Backend (Rails)
- MVC pattern with RESTful controllers
- Concerns for cross-cutting functionality like authentication
- Models with proper validations and relationships
- Inertia.js integration for seamless frontend communication

### Frontend (React)
- Component-based architecture
- JSX templates rendered via Inertia.js
- Leaflet.js integration for map functionality
- Tailwind CSS for styling

## Technologies

### Backend
- **Ruby on Rails**: v8.0.2 - Core framework
- **Ruby**: v3.3.0 - Programming language
- **SQLite3**: Database for development
- **BCrypt**: Secure password hashing
- **Inertia Rails**: Server-side adapter for Inertia.js

### Frontend
- **React**: v19.1.0 - UI framework
- **Inertia.js**: v2.0.6 - JavaScript framework for server-driven SPA
- **Leaflet.js**: Interactive mapping library
- **Tailwind CSS**: v4.1.3 - Utility-first CSS framework
- **Vite**: v5.4.17 - Build tool and development server

### Development & Testing
- **RSpec**: Testing framework
- **Faker**: Realistic test data generation
- **Rubocop**: Code style enforcement

## Setup and Installation

### Prerequisites
- Ruby 3.3.0
- Node.js verson 20 and above
- npm
- SQLite3
- Git

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/placebook.git
   cd placebook
   ```

2. **Install dependencies**:
   ```bash
   # Install Ruby dependencies
   bundle install
   
   # Install JavaScript dependencies
   npm install
   ```

3. **Set up the database**:
   ```bash
   rails db:create
   rails db:migrate
  
   ```

4. **Start the development servers**:
   ```bash
   bin/dev

   ```

5. **Access the application**:
   Open your browser and navigate to `http://127.0.0.1:3100`

## Development Workflow

### Running Tests
```bash
# Run all tests
bundle exec rspec

# Run specific tests
bundle exec rspec spec/models/user_spec.rb
```

### Code Quality
```bash
# Run Rubocop
bundle exec rubocop

# Auto-fix issues
bundle exec rubocop -A
```

### Database Management
```bash
# Create new migration
rails generate migration AddFieldToModel field:type

# Roll back last migration
rails db:rollback

# Reset database (CAUTION: destroys all data)
rails db:reset
```

## Admin Functionality

Placebook includes an admin dashboard that allows administrators to manage users.

### Admin Features

- User Management: View all users and delete user accounts
- Secure Authentication: Only users with admin privileges can access the admin dashboard
- Protected Routes: Admin-only routes with proper authorization checks

### Setting Up an Admin User

There are several ways to create an admin user:

#### Method 1: Using Seeds (Recommended for Development)

The application includes a seed file that creates an admin user with secure credentials:

```bash
# Run the seed file
rails db:seed

# With custom admin credentials
ADMIN_EMAIL=your-email@example.com ADMIN_PASSWORD=your-secure-password rails db:seed
```

The seed file will output the admin credentials in the console. If you don't provide an email and password via environment variables, it will use a default email ('admin@example.com') and generate a secure random password for you.

#### Method 2: Using Rails Console

You can also create or promote a user to admin using the Rails console:

```bash
rails c
user = User.find_by(email_address: "user@example.com")  # Find existing user
user.update(admin: true)                                # Make them an admin
exit
```

### Accessing Admin Features

1. Log in with an admin account
2. You'll see an "Admin" button in the navigation bar
3. Click the button to access the admin dashboard
4. From the dashboard, you can:
   - View all users in the system
   - Delete user accounts (warning: this action cannot be undone!)



## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /login   | Display login form |
| POST   | /login   | Authenticate user |
| GET    | /signup  | Display registration form |
| POST   | /signup  | Create new user |

### Location Endpoints

| Method | Endpoint   | Description |
|--------|------------|-------------|
| GET    | /locations | List user's locations |
| POST   | /locations | Create new location |

## Testing

Placebook uses RSpec for testing. The test suite includes:

- **Model Tests**: Validations, associations, and business logic


### Key Test Files
- `spec/models/user_spec.rb`: User model tests
- `spec/models/location_spec.rb`: Location model tests

## Security

Placebook implements several security measures:

- **Password Security**: BCrypt hashing for secure password storage
- **Session Management**: Browser-specific sessions with proper timeouts
- **CSRF Protection**: Rails built-in cross-site request forgery protection
- **Input Validation**: Strong parameters and model validations
- **Rate Limiting**: Protection against brute force attempts

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our style guidelines and includes appropriate tests.

## License

This project is licensed under the MIT License

