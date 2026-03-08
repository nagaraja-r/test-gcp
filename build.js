const fs = require('fs');
const path = require('path');

// Placeholder data for the talks (same as in server.js)
const talks = [
  {
    "title": "The Quantum Leap in Machine Learning",
    "speakers": ["Dr. Evelyn Reed"],
    "category": ["AI", "Quantum Computing"],
    "duration": 60,
    "description": "Exploring the synergy between quantum mechanics and machine learning algorithms."
  },
  {
    "title": "Next-Gen Web UIs with WASM",
    "speakers": ["Chris Patel"],
    "category": ["Web Development", "WASM"],
    "duration": 60,
    "description": "A deep dive into using WebAssembly for high-performance web applications."
  },
  {
    "title": "Securing the Cloud-Native Landscape",
    "speakers": ["Maria Garcia", "John Doe"],
    "category": ["Security", "Cloud"],
    "duration": 60,
    "description": "Best practices for securing containerized applications in a cloud-native environment."
  },
  {
    "title": "The Art of Data Storytelling",
    "speakers": ["Ben Carter"],
    "category": ["Data Science", "Visualization"],
    "duration": 60,
    "description": "How to effectively communicate insights from data through compelling narratives."
  },
  {
    "title": "Building Scalable APIs with GraphQL",
    "speakers": ["Aisha Khan"],
    "category": ["APIs", "GraphQL", "Web Development"],
    "duration": 60,
    "description": "A practical guide to designing and building scalable APIs with GraphQL."
  },
  {
    "title": "Ethical AI: Navigating the Future",
    "speakers": ["Dr. Samuel Jones", "Dr. Lena Petrova"],
    "category": ["AI", "Ethics"],
    "duration": 60,
    "description": "A discussion on the ethical considerations and societal impact of artificial intelligence."
  }
];

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)){
    fs.mkdirSync(distDir);
}

let htmlContent = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf-8');
let jsContent = fs.readFileSync(path.join(__dirname, 'public', 'script.js'), 'utf-8');
const cssContent = fs.readFileSync(path.join(__dirname, 'public', 'styles.css'), 'utf-8');

// Embed CSS into HTML
htmlContent = htmlContent.replace('<link rel="stylesheet" href="styles.css">', `<style>${cssContent}</style>`);

// Embed talks data into JS and modify the script to not fetch
jsContent = `
const talksData = ${JSON.stringify(talks, null, 2)};
` + jsContent.replace(`fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talksData = data;
      createSchedule(talksData);
    });`, `createSchedule(talksData);`);

// Embed JS into HTML
htmlContent = htmlContent.replace('<script src="script.js"></script>', `<script>${jsContent}</script>`);

fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);

console.log('Serverless website created at dist/index.html');
