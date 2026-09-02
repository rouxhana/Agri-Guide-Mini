# AgriHelp - Farming Assistant

AgriHelp is a full-stack modern web application designed for beginner farmers in Tamil Nadu with small land holdings (< 1 acre). It provides farming advice, location-based crop suggestions, a comprehensive crop guide, and a community platform to share experiences.

## Features

- **Earthy, Modern UI**: Built with Next.js and Tailwind CSS (v4) for a clean, beginner-friendly experience.
- **Crop Guides**: Step-by-step guides for planting, watering, and fertilizing various crops.
- **Community Feed**: Connect with other farmers, ask questions, and share updates.
- **Responsive**: Mobile-first design that works seamlessly on all devices.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Lucide React (Icons).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose ODM).
- **AI**: OpenAI API.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URI)

### 1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd AGRIGUIDE
\`\`\`

### 2. Backend Setup
1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the \`backend\` directory and add your keys (optional, works in mock mode without them):
   \`\`\`env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   \`\`\`
4. Start the backend server (development mode):
   \`\`\`bash
   npm run dev
   \`\`\`
   *(Note: You may need to add `"dev": "nodemon server.js"` to your `package.json` scripts if not present)*

### 3. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the Next.js development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application!

## Project Structure

- \`/frontend\`: Next.js App Router application with Tailwind CSS styling (\`app/globals.css\`).
- \`/backend\`: Express.js server providing REST APIs and MongoDB models.

## Future Enhancements
- Real-time chat for the community feed using WebSockets.
- Real-world integration of Plant Disease Detection via image upload (OpenAI Vision).
- Full multi-language support (Tamil/Hindi) using \`next-intl\`.
