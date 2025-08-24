# GreenMint Backend API

A robust Node.js backend API for the GreenMint plant marketplace, built with Express.js and MongoDB.

## 🚀 Features

- **Plant Management**: CRUD operations for plants with image uploads
- **Category Management**: Organize plants by categories (Indoor, Outdoor, Succulent, etc.)
- **Image Upload**: Cloudinary integration for efficient image storage
- **Search & Filtering**: Advanced search capabilities with text indexing
- **RESTful API**: Clean, well-structured API endpoints
- **Data Validation**: Input validation using express-validator
- **File Upload**: Multer middleware for handling multipart/form-data

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Image Storage**: Cloudinary
- **File Upload**: Multer + Multer-Storage-Cloudinary
- **Validation**: Express-validator
- **CORS**: Cross-origin resource sharing support
- **Environment**: Dotenv for configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image storage)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/plant-store
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Database Setup**
   ```bash
   npm run seed
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm run dev
```

Server will start with nodemon for auto-restart on file changes.

### Production Mode

```bash
npm start
```

### Seed Database

```bash
npm run seed
```

## API Endpoints

### Plants

- `GET /api/plants` - Get all plants with optional search and category filters
- `POST /api/plants` - Create a new plant
- `PUT /api/plants/:id` - Update a plant
- `DELETE /api/plants/:id` - Delete a plant

### Categories

- `GET /api/categories` - Get all available categories

### File Uploads

- Static file serving at `/uploads/` for uploaded images

## ️ Database Schema

### Plant Model

```javascript
{
  name: String (required, indexed),
  price: Number (required, min: 0),
  categories: [String] (enum values),
  availability: Boolean (default: true),
  image: String (default path),
  description: String,
  stockCount: Number (default: 0),
  timestamps: true
}
```

### Categories

- Indoor, Outdoor, Succulent, Air Purifying
- Home Decor, Low Maintenance, Flowering
- Medicinal, Hanging, Desktop

## Configuration

### Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### File Upload Limits

- Maximum file size: 10MB
- Supported formats: Images (jpg, png, gif, etc.)

## 📁 Project Structure

```
backend/
├── middleware/
│   └── upload.js          # File upload middleware
├── models/
│   └── Plant.js           # Plant data model
├── routes/
│   ├── plants.js          # Plant API routes
│   └── categories.js      # Category API routes
├── uploads/                # Local file storage
├── seedData.js            # Database seeding script
├── server.js              # Main server file
└── package.json           # Dependencies and scripts
```

## Testing

Currently, no test suite is configured. To add testing:

```bash
npm install --save-dev jest supertest
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests (not configured yet)

## 🔒 Security Features

- CORS enabled for cross-origin requests
- Input validation and sanitization
- File type and size restrictions
- Environment variable protection

## 🚀 Deployment

### Local Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License

## 🆘 Support

For issues and questions:

1. Check existing issues
2. Create a new issue with detailed description
3. Include error logs and reproduction steps

## Version History

- **v1.0.0** - Initial release with basic CRUD operations
- Plant management with image uploads
- Category-based organization
- Search and filtering capabilities

## Frontend README.md

````markdown:greenmintfrontend/README.md
# GreenMint Frontend

A modern, responsive React.js frontend for the GreenMint plant marketplace, featuring a beautiful UI built with Tailwind CSS and comprehensive plant management capabilities.

## 🌟 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Plant Marketplace**: Browse, search, and filter plants by categories
- **Shopping Cart**: Add plants to cart with persistent storage
- **Admin Dashboard**: Manage plants, categories, and inventory
- **Image Management**: Upload and display plant images
- **Search & Filtering**: Advanced search with category filters
- **Responsive Design**: Mobile-first approach with modern design patterns
- **Theme Support**: Light/dark theme switching
- **Authentication**: User login and admin access control

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Styling**: Tailwind CSS 4.1.12
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see backend README)
- Modern web browser

## 🚀 Installation

1. **Navigate to the frontend directory**
   ```bash
   cd greenmintfrontend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

### Eject (Advanced)

```bash
npm run eject
```

⚠️ **Warning**: This is a one-way operation. Only use if you need full control over the build configuration.

## ️ Project Structure

```
greenmintfrontend/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   ├── favicon.ico        # Site icon
│   └── manifest.json      # PWA manifest
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── AddPlantModal.js      # Plant addition modal
│   │   ├── AdminDashboard.js     # Admin management interface
│   │   ├── Banner.js             # Hero banner component
│   │   ├── CartIcon.js           # Shopping cart icon
│   │   ├── CartSidebar.js        # Cart sidebar
│   │   ├── CustomDropdown.js     # Reusable dropdown
│   │   ├── ErrorMessage.js       # Error display component
│   │   ├── Header.js             # Navigation header
│   │   ├── LoadingSpinner.js     # Loading indicator
│   │   ├── LoginModal.js         # Authentication modal
│   │   ├── PlantCard.js          # Individual plant display
│   │   ├── PlantGrid.js          # Plant grid layout
│   │   └── SearchFilter.js       # Search and filter interface
│   ├── context/           # React Context providers
│   │   ├── AuthContext.js        # Authentication state
│   │   ├── CartContext.js        # Shopping cart state
│   │   └── ThemeContext.js       # Theme switching
│   ├── styles/            # Additional styles
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   └── index.js           # Application entry point
├── package.json           # Dependencies and scripts
└── postcss.config.mjs     # PostCSS configuration
```

## Component Overview

### Core Components

- **Header**: Navigation with search, cart, and theme toggle
- **PlantGrid**: Main plant display with responsive grid layout
- **PlantCard**: Individual plant information display
- **Banner**: Hero section with call-to-action

### Admin Components

- **AdminDashboard**: Plant management interface
- **AddPlantModal**: Form for adding new plants
- **LoginModal**: Admin authentication

### Utility Components

- **CartSidebar**: Shopping cart functionality
- **SearchFilter**: Advanced search and category filtering
- **LoadingSpinner**: Loading state indicators
- **ErrorMessage**: Error display and handling

## Configuration

### Environment Variables

- `REACT_APP_API_URL`: Backend API base URL (default: http://localhost:5000/api)

### API Configuration

- Base URL: Configurable via environment variables
- Timeout: 30 seconds for API requests
- Error handling: Comprehensive error handling with user-friendly messages

## 🎯 Key Features

### Plant Management

- Browse plants with pagination
- Search by name, category, or description
- Filter by plant categories
- Add plants to shopping cart

### Shopping Cart

- Persistent cart storage
- Add/remove plants
- Quantity management
- Checkout process

### Admin Features

- Plant CRUD operations
- Category management
- Image upload handling
- Inventory tracking

### User Experience

- Responsive design for all devices
- Smooth animations and transitions
- Intuitive navigation
- Theme switching (light/dark)

## 🚀 Performance Features

- **Lazy Loading**: Components load as needed
- **Image Optimization**: Efficient image handling
- **State Management**: Optimized React Context usage
- **Bundle Optimization**: Code splitting and tree shaking

## 🧪 Testing

The project includes testing setup with:

- Jest testing framework
- React Testing Library
- DOM testing utilities
- User event simulation

Run tests with:

```bash
npm test
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Features

- Input validation and sanitization
- XSS protection
- Secure API communication
- Environment variable protection

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel

1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy automatically on push

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to package.json:

```json
{
  "homepage": "https://username.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions:

1. Check existing issues
2. Create a new issue with detailed description
3. Include browser console logs and reproduction steps

## Version History

- **v0.1.0** - Initial release
  - Basic plant marketplace functionality
  - Shopping cart implementation
  - Admin dashboard
  - Responsive design with Tailwind CSS
  - Theme switching capabilities

## Design System

### Colors

- Primary: Green tones for plant theme
- Secondary: Neutral grays and whites
- Accent: Highlight colors for CTAs

### Typography

- Modern, readable font stack
- Consistent heading hierarchy
- Responsive text sizing

### Components

- Consistent spacing and sizing
- Smooth transitions and animations
- Accessible color contrasts
- Mobile-first responsive design

```

These README files provide comprehensive documentation for both your backend API and frontend React application. They include:

**Backend README features:**
- Complete setup instructions
- API endpoint documentation
- Database schema details
- Environment configuration
- Deployment guidelines

**Frontend README features:**
- Component architecture overview
- Feature descriptions
- Setup and deployment instructions
- Design system information
- Performance and testing details

Both READMEs are tailored to your specific project structure and include all the technologies and patterns I found in your codebase.
```
