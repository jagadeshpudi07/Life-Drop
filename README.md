# 🩸 LifeDrop: Real-Time Blood Donation Platform

**LifeDrop** is a modern, high-performance web application designed to bridge the gap between voluntary blood donors and those in urgent need. Built with a focus on speed, reliability, and premium user experience, the platform enables real-time connectivity to save lives when every second counts.

### 🚀 Core Features
*   **Emergency Blood Requests**: Users can post urgent requests for specific blood types, which are immediately visible to the local donor community.
*   **Real-Time Donor Discovery**: A searchable directory that allows users to find and contact compatible donors based on location and blood group.
*   **Secure Authentication**: Fully integrated **Supabase SSR** authentication supporting both **Google OAuth** and traditional Email/Password flows.
*   **Interactive Donor Dashboard**: Dedicated profiles for donors to manage their availability status, contact information, and active requests.
*   **Premium Glassmorphism UI**: A sleek, modern design featuring dynamic scroll-responsive navigation, smooth transitions, and high-quality micro-animations.

### 🛠️ Technology Stack
*   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Turbopack)
*   **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Auth SSR)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Components**: [Radix UI](https://www.radix-ui.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

### 📦 Installation & Setup
1. **Clone the repository**: `git clone https://github.com/your-username/life-drop.git`
2. **Install pnpm globally** (if you don't have it): `npm install -g pnpm`
3. **Install dependencies**: `pnpm install`
4. **Environment Setup**: Create a `.env.local` file with your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. **Run Dev Server**: `pnpm dev`

---

### 🛡️ License
This project is open-source and available under the **MIT License**.
