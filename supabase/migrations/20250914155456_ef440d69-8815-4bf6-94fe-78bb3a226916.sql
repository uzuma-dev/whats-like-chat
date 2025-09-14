-- Create ai_settings table for managing AI status per chat session
CREATE TABLE public.ai_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  active_ai BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_settings access
CREATE POLICY "AI settings are viewable by everyone" 
ON public.ai_settings 
FOR SELECT 
USING (true);

CREATE POLICY "AI settings can be created by everyone" 
ON public.ai_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "AI settings can be updated by everyone" 
ON public.ai_settings 
FOR UPDATE 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ai_settings_updated_at
BEFORE UPDATE ON public.ai_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();