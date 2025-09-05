-- Insert sample roadmap templates
INSERT INTO public.roadmap_templates (title, description, category, difficulty_level, estimated_duration, skills, milestones, is_featured) VALUES
(
  'Full-Stack Web Developer',
  'Complete roadmap to become a full-stack web developer with modern technologies',
  'Web Development',
  'beginner',
  '6-12 months',
  '["HTML", "CSS", "JavaScript", "React", "Node.js", "Database Design", "Git"]'::jsonb,
  '[
    {"title": "Frontend Fundamentals", "description": "Learn HTML, CSS, and JavaScript basics", "estimated_weeks": 4},
    {"title": "React Development", "description": "Master React and component-based architecture", "estimated_weeks": 6},
    {"title": "Backend with Node.js", "description": "Build APIs and server-side applications", "estimated_weeks": 6},
    {"title": "Database Integration", "description": "Learn SQL and database design", "estimated_weeks": 4},
    {"title": "Full-Stack Project", "description": "Build and deploy a complete application", "estimated_weeks": 6}
  ]'::jsonb,
  true
),
(
  'Data Science Specialist',
  'Comprehensive path to becoming a data scientist with Python and machine learning',
  'Data Science',
  'intermediate',
  '8-15 months',
  '["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL", "Pandas", "NumPy"]'::jsonb,
  '[
    {"title": "Python Programming", "description": "Master Python fundamentals and libraries", "estimated_weeks": 6},
    {"title": "Statistics & Math", "description": "Learn statistical concepts and linear algebra", "estimated_weeks": 8},
    {"title": "Data Analysis", "description": "Work with Pandas, NumPy, and data manipulation", "estimated_weeks": 6},
    {"title": "Machine Learning", "description": "Understand ML algorithms and implementations", "estimated_weeks": 10},
    {"title": "Data Visualization", "description": "Create insights with Matplotlib, Seaborn, Plotly", "estimated_weeks": 4},
    {"title": "Capstone Project", "description": "Complete end-to-end data science project", "estimated_weeks": 8}
  ]'::jsonb,
  true
),
(
  'Mobile App Developer (React Native)',
  'Build cross-platform mobile applications with React Native',
  'Mobile Development',
  'intermediate',
  '4-8 months',
  '["React", "React Native", "JavaScript", "Mobile UI/UX", "API Integration", "App Store Deployment"]'::jsonb,
  '[
    {"title": "React Fundamentals", "description": "Solid understanding of React concepts", "estimated_weeks": 4},
    {"title": "React Native Basics", "description": "Learn mobile development with React Native", "estimated_weeks": 6},
    {"title": "Navigation & State", "description": "Implement navigation and state management", "estimated_weeks": 4},
    {"title": "Native Features", "description": "Access device features and native modules", "estimated_weeks": 4},
    {"title": "App Deployment", "description": "Deploy to App Store and Google Play", "estimated_weeks": 2}
  ]'::jsonb,
  true
),
(
  'DevOps Engineer',
  'Learn infrastructure, automation, and deployment practices',
  'DevOps',
  'advanced',
  '6-12 months',
  '["Linux", "Docker", "Kubernetes", "CI/CD", "AWS/Azure", "Terraform", "Monitoring"]'::jsonb,
  '[
    {"title": "Linux Administration", "description": "Master Linux command line and system administration", "estimated_weeks": 6},
    {"title": "Containerization", "description": "Learn Docker and container orchestration", "estimated_weeks": 4},
    {"title": "Cloud Platforms", "description": "Work with AWS, Azure, or Google Cloud", "estimated_weeks": 8},
    {"title": "Infrastructure as Code", "description": "Automate infrastructure with Terraform", "estimated_weeks": 4},
    {"title": "CI/CD Pipelines", "description": "Set up automated deployment pipelines", "estimated_weeks": 4},
    {"title": "Monitoring & Logging", "description": "Implement observability and monitoring", "estimated_weeks": 4}
  ]'::jsonb,
  false
),
(
  'UI/UX Designer',
  'Design user-centered digital experiences and interfaces',
  'Design',
  'beginner',
  '4-8 months',
  '["Design Principles", "Figma", "User Research", "Prototyping", "Usability Testing", "Design Systems"]'::jsonb,
  '[
    {"title": "Design Fundamentals", "description": "Learn color theory, typography, and layout", "estimated_weeks": 4},
    {"title": "User Research", "description": "Understand user needs and behavior", "estimated_weeks": 3},
    {"title": "Wireframing & Prototyping", "description": "Create low and high-fidelity prototypes", "estimated_weeks": 4},
    {"title": "Design Tools Mastery", "description": "Master Figma and design workflows", "estimated_weeks": 4},
    {"title": "Usability Testing", "description": "Test and iterate on designs", "estimated_weeks": 3},
    {"title": "Portfolio Development", "description": "Build a professional design portfolio", "estimated_weeks": 4}
  ]'::jsonb,
  true
);
