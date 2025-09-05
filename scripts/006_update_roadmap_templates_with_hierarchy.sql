-- Update existing roadmap templates with hierarchical structure
UPDATE roadmap_templates SET structure = '{
  "subjects": [
    {
      "id": "html-css",
      "name": "HTML & CSS Fundamentals",
      "description": "Master the building blocks of web development",
      "color": "bg-blue-500",
      "topics": [
        {
          "id": "html-basics",
          "name": "HTML Basics",
          "steps": [
            {"id": "html-elements", "name": "HTML Elements & Tags", "estimated_hours": 4},
            {"id": "html-structure", "name": "Document Structure", "estimated_hours": 3},
            {"id": "html-forms", "name": "Forms & Input Elements", "estimated_hours": 5}
          ]
        },
        {
          "id": "css-basics",
          "name": "CSS Styling",
          "steps": [
            {"id": "css-selectors", "name": "CSS Selectors", "estimated_hours": 4},
            {"id": "css-layout", "name": "Layout & Positioning", "estimated_hours": 6},
            {"id": "css-responsive", "name": "Responsive Design", "estimated_hours": 8}
          ]
        }
      ]
    },
    {
      "id": "javascript",
      "name": "JavaScript Programming",
      "description": "Learn dynamic web programming",
      "color": "bg-yellow-500",
      "topics": [
        {
          "id": "js-fundamentals",
          "name": "JavaScript Fundamentals",
          "steps": [
            {"id": "js-variables", "name": "Variables & Data Types", "estimated_hours": 4},
            {"id": "js-functions", "name": "Functions & Scope", "estimated_hours": 6},
            {"id": "js-objects", "name": "Objects & Arrays", "estimated_hours": 5}
          ]
        },
        {
          "id": "dom-manipulation",
          "name": "DOM Manipulation",
          "steps": [
            {"id": "dom-selection", "name": "Element Selection", "estimated_hours": 3},
            {"id": "dom-events", "name": "Event Handling", "estimated_hours": 5},
            {"id": "dom-dynamic", "name": "Dynamic Content", "estimated_hours": 6}
          ]
        }
      ]
    }
  ]
}' WHERE title = 'Frontend Developer';

UPDATE roadmap_templates SET structure = '{
  "subjects": [
    {
      "id": "server-fundamentals",
      "name": "Server-Side Fundamentals",
      "description": "Understanding backend architecture",
      "color": "bg-green-500",
      "topics": [
        {
          "id": "nodejs-basics",
          "name": "Node.js Basics",
          "steps": [
            {"id": "nodejs-setup", "name": "Node.js Setup & NPM", "estimated_hours": 3},
            {"id": "nodejs-modules", "name": "Modules & Packages", "estimated_hours": 4},
            {"id": "nodejs-async", "name": "Asynchronous Programming", "estimated_hours": 6}
          ]
        },
        {
          "id": "express-framework",
          "name": "Express.js Framework",
          "steps": [
            {"id": "express-setup", "name": "Express Setup & Routing", "estimated_hours": 4},
            {"id": "express-middleware", "name": "Middleware & Authentication", "estimated_hours": 6},
            {"id": "express-apis", "name": "RESTful APIs", "estimated_hours": 8}
          ]
        }
      ]
    },
    {
      "id": "databases",
      "name": "Database Management",
      "description": "Data storage and retrieval",
      "color": "bg-purple-500",
      "topics": [
        {
          "id": "sql-basics",
          "name": "SQL Fundamentals",
          "steps": [
            {"id": "sql-queries", "name": "Basic Queries", "estimated_hours": 5},
            {"id": "sql-joins", "name": "Joins & Relations", "estimated_hours": 6},
            {"id": "sql-optimization", "name": "Query Optimization", "estimated_hours": 4}
          ]
        }
      ]
    }
  ]
}' WHERE title = 'Backend Developer';

-- Add more structured templates for other career paths
UPDATE roadmap_templates SET structure = '{
  "subjects": [
    {
      "id": "mobile-fundamentals",
      "name": "Mobile Development Basics",
      "description": "Core concepts for mobile apps",
      "color": "bg-indigo-500",
      "topics": [
        {
          "id": "react-native",
          "name": "React Native",
          "steps": [
            {"id": "rn-setup", "name": "Environment Setup", "estimated_hours": 4},
            {"id": "rn-components", "name": "Components & Navigation", "estimated_hours": 8},
            {"id": "rn-state", "name": "State Management", "estimated_hours": 6}
          ]
        }
      ]
    }
  ]
}' WHERE title = 'Mobile Developer';
