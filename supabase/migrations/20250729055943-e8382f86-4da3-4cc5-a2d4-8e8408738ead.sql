-- Create scheduling projects table
CREATE TABLE public.scheduling_projects (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    scheduling_type TEXT NOT NULL CHECK (scheduling_type IN ('one_vs_one', 'one_vs_group', 'group_vs_group')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'collecting_availability', 'processing', 'completed', 'polling')),
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create participants table
CREATE TABLE public.participants (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.scheduling_projects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    group_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create availability table
CREATE TABLE public.availability (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    participant_id UUID REFERENCES public.participants(id) ON DELETE CASCADE NOT NULL,
    date_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create scheduled events table
CREATE TABLE public.scheduled_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.scheduling_projects(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    participants TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create polls table
CREATE TABLE public.polls (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES public.scheduling_projects(id) ON DELETE CASCADE NOT NULL,
    question TEXT NOT NULL DEFAULT 'Is this schedule acceptable for you?',
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create poll responses table
CREATE TABLE public.poll_responses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE NOT NULL,
    participant_id UUID REFERENCES public.participants(id) ON DELETE CASCADE NOT NULL,
    response TEXT NOT NULL CHECK (response IN ('accept', 'reject', 'suggest_change')),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(poll_id, participant_id)
);

-- Enable Row Level Security
ALTER TABLE public.scheduling_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheduled_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is implemented yet)
CREATE POLICY "Allow all operations on scheduling_projects" ON public.scheduling_projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on participants" ON public.participants FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on availability" ON public.availability FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on scheduled_events" ON public.scheduled_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on polls" ON public.polls FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on poll_responses" ON public.poll_responses FOR ALL USING (true) WITH CHECK (true);

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_scheduling_projects_updated_at
    BEFORE UPDATE ON public.scheduling_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();