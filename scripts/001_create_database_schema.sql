-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create roadmap templates table
CREATE TABLE IF NOT EXISTS public.roadmap_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  milestones JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on roadmap templates (public read, admin write)
ALTER TABLE public.roadmap_templates ENABLE ROW LEVEL SECURITY;

-- Templates policies - everyone can read, but only admins can write (for now, allow all reads)
CREATE POLICY "templates_select_all" ON public.roadmap_templates FOR SELECT TO authenticated USING (true);

-- Create user roadmaps table
CREATE TABLE IF NOT EXISTS public.user_roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.roadmap_templates(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  milestones JSONB DEFAULT '[]'::jsonb,
  progress JSONB DEFAULT '{"completed_milestones": [], "current_milestone": 0, "completion_percentage": 0}'::jsonb,
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'paused')),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user roadmaps
ALTER TABLE public.user_roadmaps ENABLE ROW LEVEL SECURITY;

-- User roadmaps policies
CREATE POLICY "user_roadmaps_select_own" ON public.user_roadmaps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_roadmaps_insert_own" ON public.user_roadmaps FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_roadmaps_update_own" ON public.user_roadmaps FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "user_roadmaps_delete_own" ON public.user_roadmaps FOR DELETE USING (auth.uid() = user_id);

-- Create mentor sessions table
CREATE TABLE IF NOT EXISTS public.mentor_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES public.user_roadmaps(id) ON DELETE SET NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  session_summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on mentor sessions
ALTER TABLE public.mentor_sessions ENABLE ROW LEVEL SECURITY;

-- Mentor sessions policies
CREATE POLICY "mentor_sessions_select_own" ON public.mentor_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mentor_sessions_insert_own" ON public.mentor_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mentor_sessions_update_own" ON public.mentor_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "mentor_sessions_delete_own" ON public.mentor_sessions FOR DELETE USING (auth.uid() = user_id);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id UUID REFERENCES public.user_roadmaps(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('bug_report', 'feature_request', 'general')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on feedback
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Feedback policies
CREATE POLICY "feedback_select_own" ON public.feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "feedback_insert_own" ON public.feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "feedback_update_own" ON public.feedback FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "feedback_delete_own" ON public.feedback FOR DELETE USING (auth.uid() = user_id);
