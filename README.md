# 📰 React News Application  
A modern and responsive news application built with **React** that fetches real-time news using the **NewsAPI.org** service. The app displays categorized news, supports search functionality, and provides a clean user experience.

---

## 🚀 Features  
- 🔥 Live News fetched from NewsAPI  
- 📚 Category-wise news (Technology, Business, Sports, Entertainment, Health, Science, etc.)  
- 🔍 Search news articles  
- 📱 Responsive UI for all devices  
- ⚡ Built using React + Fetch/Axios  
- 🌙 Optional: Dark Mode (if implemented)

---

## 🛠️ Tech Stack  
- **React.js**  
- **NewsAPI.org**  
- **React Router**  
- **Axios / Fetch API**  
- **CSS / TailwindCSS / Bootstrap** (based on your project)

---

## 📦 Installation & Setup  

### 1. Clone the repository  
```bash
git clone https://github.com/your-username/react-news-app.git
cd react-news-app

2. Install dependencies
npm install

3. Add your News API Key

Create a .env file in the root folder:

REACT_APP_NEWS_API_KEY=your_api_key_here


Get a free API key from: https://newsapi.org/

4. Start the development server
npm start


App will run at:
👉 http://localhost:3000

🧩 Project Structure
src/
│── components/
│     ├── Navbar.js
│     ├── NewsItem.js
│     ├── NewsList.js
│── pages/
│     ├── Home.js
│     ├── Category.js
│── App.js
│── index.js
│── utils/
│     └── api.js

📡 API Usage Example
const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;

const response = await fetch(url);
const data = await response.json();

🖼️ Screenshots

(Add image files inside a /screenshots folder)

/screenshots/home.png  
/screenshots/category.png

🚀 Deployment

You can deploy to:

Vercel

Netlify

GitHub Pages

Example (Netlify):

npm run build
netlify deploy

🧑‍💻 Contributing

Feel free to fork the repo and submit pull requests.
Feature requests and suggestions are welcome!
