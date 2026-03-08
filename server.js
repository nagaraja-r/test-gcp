const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Placeholder data for the talks
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

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API endpoint to get the talk data
app.get('/api/talks', (req, res) => {
  res.json(talks);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
