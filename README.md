# CampusLearn

A modern, Learning Management System designed for the future of education in IT.

---

## Overview

**CampusLearn** is a web based application that allows users such as tutors, students, and administrators to manage their respective dashboards and content. Allowing tutors to create topics and discussions as well as assessments where students can participate and add their resources, or comments. Administrators have access to info about the system and have the ability to manage content on the system.

## ⚒️ Key Features

- **Personalized Dashboards:** Tailored interfaces for Students, Tutors, and Admins.
- **Interactive Courses/Topics:** Tutors can create topics and add resources, Students can enroll and complete the assessments and provide their own resources and comments in a real-time chat.
- **Assignment Workflow:** End-to-end system for submitting, tracking, and grading assignments.
- **Topic Forum:** A Forum formatted page where tutors and students can participate in discussions.
- **Direct Messaging:** Users can interact within a controlled environment and message other users.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Backend & Services:** Firebase
  - **Hosting:** Vercel integrate with GitHub is used for live hosting
  - **Authentication:** Firebase Authentication
  - **Database:** Cloud Firestore
  - **Storage:** Cloud Storage for Firebase
- **UI & Styling:** UI, Tailwind CSS

## ⚙️ Getting Started

Set up a local copy of CampusLearn for development and testing with these steps.

### Prerequisites

- Node.js (v18 or higher)
- A Firebase Project created in firebase.google.com or "Firebase Console"

### Installation

Clone the repository and install dependencies:

```bash
mkdir campuslearn
git clone <add the github repository here>
cd campuslearn
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Access the CampusLearn app at `http://localhost:8080`.

## 🌐 Deployment

To Deploy CampusLearn, you can use Firebase's hosting services, or connect your Firebase project to a GitHub repository, then go to Vercel and create a new project, follow the creation steps and connect your created GitHub repository to Vercel. Add `npm install` to the installation sectino when creating the Vercel project. Deploy your build. After deployment you can access your application based on the provided URL.

## Access CampusLearn

`https://sen-371-prj.vercel.app/`

Above is the link to access our CampusLearn live deployment.