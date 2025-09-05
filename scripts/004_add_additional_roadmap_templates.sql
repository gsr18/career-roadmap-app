-- Add additional roadmap templates as requested
INSERT INTO roadmap_templates (
  title,
  description,
  category,
  difficulty_level,
  estimated_duration,
  skills,
  milestones,
  is_featured,
  ai_generated,
  career_goal
) VALUES 
(
  'Full Stack Web Developer',
  'Master both frontend and backend development to build complete web applications from scratch.',
  'Web Development',
  'intermediate',
  '8-12 months',
  ARRAY['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Git', 'REST APIs', 'Authentication'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Frontend Fundamentals', 'description', 'Master HTML, CSS, and JavaScript basics', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'React Development', 'description', 'Build interactive UIs with React and modern tooling', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Backend with Node.js', 'description', 'Create server-side applications and APIs', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Database Integration', 'description', 'Work with SQL and NoSQL databases', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Full Stack Projects', 'description', 'Build and deploy complete applications', 'estimated_duration', '10 weeks')
  ),
  true,
  true,
  'Become a versatile developer capable of building end-to-end web applications'
),
(
  'AI/ML Engineer',
  'Develop expertise in artificial intelligence and machine learning to build intelligent systems.',
  'Data Science',
  'advanced',
  '10-15 months',
  ARRAY['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Python & Math Foundations', 'description', 'Master Python programming and mathematical concepts', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Machine Learning Basics', 'description', 'Learn supervised and unsupervised learning algorithms', 'estimated_duration', '10 weeks'),
    JSONB_BUILD_OBJECT('title', 'Deep Learning', 'description', 'Neural networks, CNNs, RNNs with TensorFlow/PyTorch', 'estimated_duration', '12 weeks'),
    JSONB_BUILD_OBJECT('title', 'Specialized AI Domains', 'description', 'Focus on NLP, Computer Vision, or Reinforcement Learning', 'estimated_duration', '10 weeks'),
    JSONB_BUILD_OBJECT('title', 'MLOps & Production', 'description', 'Deploy and maintain ML models in production', 'estimated_duration', '8 weeks')
  ),
  true,
  true,
  'Build and deploy intelligent systems using cutting-edge AI/ML technologies'
),
(
  'Cybersecurity Analyst',
  'Protect organizations from cyber threats through security analysis, monitoring, and incident response.',
  'Security',
  'intermediate',
  '6-9 months',
  ARRAY['Network Security', 'Penetration Testing', 'SIEM Tools', 'Incident Response', 'Risk Assessment', 'Compliance', 'Cryptography', 'Forensics'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Security Fundamentals', 'description', 'Learn core cybersecurity concepts and principles', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Network Security', 'description', 'Secure network infrastructure and protocols', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Threat Detection', 'description', 'Monitor and analyze security events using SIEM tools', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Incident Response', 'description', 'Handle security incidents and forensic analysis', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Compliance & Risk', 'description', 'Understand regulatory requirements and risk management', 'estimated_duration', '4 weeks')
  ),
  false,
  true,
  'Protect organizations from cyber threats and ensure security compliance'
),
(
  'Cloud Architect',
  'Design and implement scalable, secure cloud infrastructure solutions for modern applications.',
  'DevOps',
  'advanced',
  '8-12 months',
  ARRAY['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CloudFormation', 'Microservices', 'Serverless', 'Security'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Cloud Fundamentals', 'description', 'Understand cloud computing concepts and services', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Infrastructure as Code', 'description', 'Automate infrastructure with Terraform and CloudFormation', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Container Orchestration', 'description', 'Master Docker and Kubernetes for scalable deployments', 'estimated_duration', '10 weeks'),
    JSONB_BUILD_OBJECT('title', 'Microservices Architecture', 'description', 'Design distributed systems and service meshes', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Cloud Security & Governance', 'description', 'Implement security best practices and compliance', 'estimated_duration', '6 weeks')
  ),
  true,
  true,
  'Architect scalable and secure cloud solutions for enterprise applications'
),
(
  'Data Analyst',
  'Transform raw data into actionable insights through analysis, visualization, and reporting.',
  'Data Science',
  'beginner',
  '4-6 months',
  ARRAY['SQL', 'Excel', 'Python', 'R', 'Tableau', 'Power BI', 'Statistics', 'Data Visualization', 'Business Intelligence'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Data Fundamentals', 'description', 'Learn data concepts, types, and quality principles', 'estimated_duration', '4 weeks'),
    JSONB_BUILD_OBJECT('title', 'SQL Mastery', 'description', 'Query databases and manipulate data with SQL', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Statistical Analysis', 'description', 'Apply statistical methods using Python or R', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Data Visualization', 'description', 'Create compelling charts and dashboards', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Business Intelligence', 'description', 'Build reports and KPI dashboards for stakeholders', 'estimated_duration', '4 weeks')
  ),
  false,
  true,
  'Extract insights from data to drive business decisions and strategy'
),
(
  'Mobile App Developer',
  'Build native and cross-platform mobile applications for iOS and Android platforms.',
  'Mobile Development',
  'intermediate',
  '6-9 months',
  ARRAY['React Native', 'Flutter', 'Swift', 'Kotlin', 'JavaScript', 'Dart', 'Mobile UI/UX', 'App Store Optimization', 'Push Notifications'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Mobile Development Basics', 'description', 'Understand mobile platforms and development approaches', 'estimated_duration', '4 weeks'),
    JSONB_BUILD_OBJECT('title', 'Cross-Platform Framework', 'description', 'Master React Native or Flutter development', 'estimated_duration', '10 weeks'),
    JSONB_BUILD_OBJECT('title', 'Native Development', 'description', 'Learn platform-specific development (iOS/Android)', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'App Features & APIs', 'description', 'Integrate device features and external services', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Publishing & Optimization', 'description', 'Deploy apps and optimize for app stores', 'estimated_duration', '4 weeks')
  ),
  false,
  true,
  'Create engaging mobile applications for millions of users worldwide'
),
(
  'Product Manager',
  'Lead product development from conception to launch, balancing user needs with business objectives.',
  'Product Management',
  'intermediate',
  '5-8 months',
  ARRAY['Product Strategy', 'User Research', 'Agile/Scrum', 'Data Analysis', 'Roadmapping', 'Stakeholder Management', 'A/B Testing', 'Market Research'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Product Management Fundamentals', 'description', 'Learn core PM concepts and methodologies', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'User Research & Validation', 'description', 'Understand user needs through research and testing', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Product Strategy & Roadmapping', 'description', 'Define product vision and create strategic roadmaps', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Agile Product Development', 'description', 'Manage product development using Agile methodologies', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Product Analytics & Growth', 'description', 'Measure success and drive product growth', 'estimated_duration', '6 weeks')
  ),
  false,
  true,
  'Drive product success by connecting user needs with business value'
),
(
  'DevOps Engineer',
  'Streamline software development and deployment through automation, monitoring, and infrastructure management.',
  'DevOps',
  'intermediate',
  '6-10 months',
  ARRAY['Linux', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'AWS/Azure', 'Terraform', 'Monitoring', 'CI/CD', 'Scripting'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'DevOps Fundamentals', 'description', 'Understand DevOps culture, practices, and tools', 'estimated_duration', '4 weeks'),
    JSONB_BUILD_OBJECT('title', 'Infrastructure Automation', 'description', 'Automate infrastructure with Infrastructure as Code', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'CI/CD Pipelines', 'description', 'Build automated deployment and testing pipelines', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Container Orchestration', 'description', 'Deploy and manage applications with Docker and Kubernetes', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Monitoring & Observability', 'description', 'Implement comprehensive monitoring and alerting', 'estimated_duration', '6 weeks')
  ),
  false,
  true,
  'Bridge development and operations to deliver software faster and more reliably'
),
(
  'Blockchain Developer',
  'Build decentralized applications and smart contracts on blockchain platforms.',
  'Web Development',
  'advanced',
  '8-12 months',
  ARRAY['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts', 'DeFi', 'NFTs', 'Cryptography', 'Blockchain Architecture', 'dApps'],
  JSONB_BUILD_ARRAY(
    JSONB_BUILD_OBJECT('title', 'Blockchain Fundamentals', 'description', 'Understand blockchain technology and cryptocurrencies', 'estimated_duration', '6 weeks'),
    JSONB_BUILD_OBJECT('title', 'Smart Contract Development', 'description', 'Write and deploy smart contracts using Solidity', 'estimated_duration', '10 weeks'),
    JSONB_BUILD_OBJECT('title', 'DApp Development', 'description', 'Build decentralized applications with Web3 technologies', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'DeFi & NFT Projects', 'description', 'Create DeFi protocols and NFT marketplaces', 'estimated_duration', '8 weeks'),
    JSONB_BUILD_OBJECT('title', 'Advanced Blockchain', 'description', 'Explore Layer 2 solutions and cross-chain development', 'estimated_duration', '6 weeks')
  ),
  false,
  true,
  'Pioneer the future of decentralized technology and Web3 applications'
);
