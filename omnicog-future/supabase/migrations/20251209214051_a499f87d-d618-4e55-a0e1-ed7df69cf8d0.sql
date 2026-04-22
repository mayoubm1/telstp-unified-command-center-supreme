-- Drop the triggers that reference non-existent public.users table
DROP TRIGGER IF EXISTS auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the problematic functions
DROP FUNCTION IF EXISTS public.handle_new_auth_user();
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Keep only the working triggers:
-- auth_create_profile_trigger -> creates profile in profiles table (working)
-- sync_auth_user_trigger -> syncs to auth_user_sync_queue (working)