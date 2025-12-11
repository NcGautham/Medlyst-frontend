# Medlyst - Doctor Appointment Booking Platform

Medlyst is a modern, responsive web application for booking doctor appointments. It connects patients with top-rated medical professionals, allowing for seamless searching, viewing of detailed profiles, and real-time appointment scheduling.

## Features

-   **Browse Doctors**: View a curated list of doctors with specialties, ratings, and experience.
-   **Detailed Profiles**: comprehensive doctor profiles including bios, hospital affiliations, and photos.
-   **Real-time Booking**: Check available time slots and book appointments instantly.
-   **Admin Dashboard**: comprehensive admin panel to manage doctors and time slots.
    -   Secure Login (`admin` / `medlyst`)
    -   Create and Delete Doctors
    -   Manage Time Slots with bulk selection
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: Tailwind CSS, Shadcn UI, Framer Motion
-   **State Management**: React Context API, TanStack Query
-   **Icons**: Lucide React, Heroicons

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

-   `src/components`: Reusable UI components
-   `src/pages`: Main application pages
-   `src/admin`: Admin dashboard and management tools
-   `src/context`: Global state management (Doctors, Booking)
-   `src/api`: API integration helpers

---

&copy; 2025 Medlyst. All rights reserved.
