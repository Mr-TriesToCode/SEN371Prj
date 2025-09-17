

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Cybersecurity Fundamentals',
    description: 'Dive deep into cybersecurity concepts, including encryption, network security, ethical hacking, and threat analysis.',
    tutor: 'Neo Hacker',
    category: 'Tech',
    imageId: 'course-react',
  },
  {
    id: '2',
    title: 'AI and Machine Learning',
    description: 'Learn the fundamentals of AI and ML using Python, including neural networks, data preprocessing, model training, and deployment.',
    tutor: 'Byte Master',
    category: 'Tech',
    imageId: 'course-python',
  },
  {
    id: '3',
    title: 'Blockchain Technology',
    description: 'Explore the world of blockchain, from Bitcoin origins to smart contracts, decentralized applications, and future trends.',
    tutor: 'Crypto Queen',
    category: 'Tech',
    imageId: 'course-history',
  },
  {
    id: '4',
    title: 'Cloud Computing Essentials',
    description: 'Master the principles of cloud architecture, AWS/GCP/Azure services, scalability, and deploying applications in the cloud.',
    tutor: 'Cloud Warrior',
    category: 'Tech',
    imageId: 'course-design',
  },
];

export const MOCK_FORUM_THREADS: Array<{
    id: string;
    title: string;
    author: { name: string; avatarUrl: string };
    category: string;
    replies: number;
    views: number;
    lastActivity: { time: string; user: string; };
    content?: string;
    threadReplies?: Array<{
        id: string;
        author: { name: string; avatarUrl: string; };
        timestamp: string;
        content: string;
    }>;
}> = [
    {
        id: 'thread-1',
        title: 'Best practices for state management in React?',
        author: { name: 'Pixel Punk', avatarUrl: 'https://picsum.photos/seed/101/40/40' },
        category: 'React',
        replies: 12,
        views: 148,
        lastActivity: { time: '2h ago', user: 'Neo Hacker' },
        content: 'I\'m starting a new project and I\'m not sure what the best approach for state management is in 2024. Should I stick with Context API, or is it worth looking into libraries like Redux Toolkit, Zustand, or Jotai? What are the pros and cons for a medium-sized application?',
        threadReplies: [
            {
                id: 'reply-1-1',
                author: { name: 'Neo Hacker', avatarUrl: 'https://picsum.photos/seed/102/40/40' },
                timestamp: '2h ago',
                content: 'Great question, Pixel Punk! For medium-sized apps, Zustand offers a great balance of simplicity and power. It\'s less boilerplate than Redux but provides more structure than the standard Context API. The learning curve is also very gentle.'
            },
            {
                id: 'reply-1-2',
                author: { name: 'Code Ninja', avatarUrl: 'https://picsum.photos/seed/105/40/40' },
                timestamp: '1h ago',
                content: 'I second Zustand. We recently migrated a large project to it and the developer experience has been fantastic. Plus, the bundle size is tiny!'
            }
        ]
    },
    {
        id: 'thread-2',
        title: 'How to deploy a Python Flask app on Firebase?',
        author: { name: 'Code Ninja', avatarUrl: 'https://picsum.photos/seed/105/40/40' },
        category: 'Python',
        replies: 5,
        views: 89,
        lastActivity: { time: '5h ago', user: 'Byte Master' },
        content: 'I have a simple Python Flask API and I want to deploy it using Firebase. I\'ve looked into Cloud Functions and Cloud Run. What is the recommended way to do this? Are there any good tutorials you can recommend?',
        threadReplies: []
    },
    {
        id: 'thread-3',
        title: 'Discussion: The future of quantum computing',
        author: { name: 'Data Diva', avatarUrl: 'https://picsum.photos/seed/106/40/40' },
        category: 'Quantum',
        replies: 23,
        views: 212,
        lastActivity: { time: '1d ago', user: 'Crypto Queen' },
        content: 'Let\'s discuss the potential impact of quantum computing on cryptography and data security. How will it change the landscape of IT?',
        threadReplies: []
    }
];

export const MOCK_ASSIGNMENTS: Array<{
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  description: string;
  grade?: string;
  submittedOn?: string;
  submittedFile?: { name: string; url: string; };
  feedback?: string;
}> = [
  {
    id: 'asg-1',
    title: 'Blockchain Paper: Smart Contracts',
    course: 'Blockchain Technology',
    dueDate: 'Tomorrow',
    status: 'Pending',
    description: 'Write a 2000-word essay on smart contracts, their implementation in Ethereum, and potential applications in decentralized finance.',
  },
  {
    id: 'asg-2',
    title: 'Cybersecurity In-Depth',
    course: 'Cybersecurity Fundamentals',
    dueDate: 'In 3 days',
    status: 'Pending',
    description: 'Create a comprehensive security audit plan for a fictional web application, including vulnerability assessment and mitigation strategies.',
  },
  {
    id: 'asg-3',
    title: 'AI Model Training',
    course: 'AI and Machine Learning',
    dueDate: 'Last week',
    status: 'Submitted',
    description: 'Train a neural network model on a dataset of your choice and evaluate its performance. Submit your Python notebook with results.',
    submittedOn: '3 days ago',
    submittedFile: {
        name: 'ai-model-project.ipynb',
        url: '#',
    }
  },
  {
    id: 'asg-4',
    title: 'Cloud Architecture Design',
    course: 'Cloud Computing Essentials',
    dueDate: 'Last month',
    status: 'Graded',
    grade: 'A-',
    description: 'Design a scalable cloud architecture for a high-traffic e-commerce platform using AWS services. Include diagrams and cost estimates.',
    submittedOn: '4 weeks ago',
    submittedFile: {
        name: 'cloud-architecture.pdf',
        url: '#',
    },
    feedback: 'Excellent work on the architecture design! The scalability considerations are well thought out. For next time, include more details on security measures.'
  },
];

    