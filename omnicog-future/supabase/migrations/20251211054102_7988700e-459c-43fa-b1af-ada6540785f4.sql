-- Drop all problematic triggers on auth.users
DROP TRIGGER IF EXISTS auth_create_profile_trigger ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS sync_auth_user_trigger ON auth.users;
DROP TRIGGER IF EXISTS trigger_sync_auth_user_to_public ON auth.users;

-- Drop the problematic functions
DROP FUNCTION IF EXISTS public.create_profile_for_new_auth_user();
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simple working function that matches the actual profiles table schema
-- Profiles table has: id, username, full_name, avatar_url, created_at
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, created_at)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();