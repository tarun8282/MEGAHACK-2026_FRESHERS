# NagarSetu Setup Guide

Follow these steps to get **NagarSetu** up and running on your local machine and connect it to your Supabase backend.

## 1. Supabase Backend Setup

1.  **Create a Supabase Project:** Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Database Migrations:**
    - Go to the **SQL Editor** in your Supabase dashboard.
    - Copy the contents of `backend/supabase/migrations/20240313000000_initial_schema.sql` and run it. This will create all your tables and RLS policies.
    - Copy the contents of `backend/supabase/seed.sql` and run it to add initial states, jurisdictions, and departments.
3. **Edge Functions (Optional):**
    - You can still use Supabase Edge Functions for custom logic, but AI classification is now handled directly via the Next.js API route for a simpler workflow.

## 2. Frontend Configuration

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Create a `.env.local` file in the `frontend` directory:
    ```bash
    # frontend/.env.local
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_actual_google_ai_key_here
    ```
    *You can find these in your Supabase Project Settings > API.*

3.  Install dependencies (if not already done):
    ```bash
    npm install
    ```

## 3. Running the Project

1.  **Start the Frontend:**
    ```bash
    npm run dev
    ```
2.  The app will be available at [http://localhost:3000](http://localhost:3000).

## 4. Role-Based Access Demo
Since this is a skeleton:
- **Citizen:** Accessible by default or after creating a citizen account.
- **Dept Admin:** Go to `/dept-dashboard` (In a real app, this is restricted by Supabase Auth metadata).
- **Super Admin:** Go to `/super-dashboard`.

## 5. Gemini AI Integration
The code is **fully integrated** in `frontend/src/app/(citizen)/submit-complaint/page.tsx`. It calls the direct API route at `/api/analyze-complaint`. 
- Ensure `GEMINI_API_KEY` is set in your `.env.local`.
