# Alternative Academy

Welcome to Alternative Academy, a mobile-first web application designed to empower Nigerian youth through AI-driven education, a decentralized freelance marketplace, and a vibrant community hub.

## Project Overview

Alternative Academy is a Next.js application built with TypeScript, Tailwind CSS, and ShadCN UI for a modern, responsive, and accessible user experience. It leverages Firebase Genkit for its powerful AI features, including personalized learning paths and content moderation.

Our mission is to provide an alternative and accessible educational and economic platform for the Nigerian youth, fostering skills development, entrepreneurship, and community engagement.

## Core Features

- **AI-Powered Learning:** Personalized learning paths tailored to individual student goals and interests.
- **Freelance Marketplace:** A decentralized platform for students to find freelance work and for businesses to hire skilled talent.
- **Community Hub:** A space for users to connect, collaborate, and share knowledge, with AI-powered moderation to ensure a safe environment.
- **Role-Based Dashboards:** Dedicated dashboards for Students, Instructors, Business Partners, and Administrators with role-specific functionalities.
- **Comprehensive Course Catalog:** A wide range of courses designed to equip users with in-demand skills.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd alternative-academy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables for Firebase and Genkit.
    ```
    # Firebase/Genkit Configuration
    GCLOUD_PROJECT=...
    GOOGLE_API_KEY=...
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will be available at `http://localhost:9002`.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Authentication:** Mocked using React Context for frontend development.

## Project Structure

The project follows a standard Next.js App Router structure:

-   `src/app/`: Contains all the pages and routes.
-   `src/components/`: Shared, reusable React components.
-   `src/context/`: React context providers (e.g., for authentication).
-   `src/lib/`: Utility functions, actions, and constants.
-   `src/ai/`: Genkit AI flow definitions.
-   `public/`: Static assets like images and fonts.

We hope you enjoy building with us!
