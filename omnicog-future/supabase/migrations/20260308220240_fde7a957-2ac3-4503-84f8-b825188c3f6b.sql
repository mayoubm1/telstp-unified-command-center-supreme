
-- Enable RLS on all public tables that currently have it disabled

-- Tables with existing policies but RLS disabled (policy_exists_rls_disabled)
ALTER TABLE public.global_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- Tables with sensitive data and no RLS
ALTER TABLE public.mistral_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_token_usage ENABLE ROW LEVEL SECURITY;

-- Reference/lookup tables - enable RLS with public read
ALTER TABLE public.dietary_supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vaccination_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veterinary_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mcp_request_logs ENABLE ROW LEVEL SECURITY;

-- Policies for reference/lookup tables (authenticated read)
CREATE POLICY "authenticated_read_dietary_supplements" ON public.dietary_supplements FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_medications" ON public.medications FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_pet_foods" ON public.pet_foods FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_vaccination_protocols" ON public.vaccination_protocols FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_veterinary_knowledge" ON public.veterinary_knowledge FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_service_health" ON public.service_health FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_research_data" ON public.research_data FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_research_outputs" ON public.research_outputs FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_read_research_projects" ON public.research_projects FOR SELECT TO authenticated USING (true);

-- Pet owners: owner can see their own records
CREATE POLICY "pet_owners_select_own" ON public.pet_owners FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "pet_owners_insert_own" ON public.pet_owners FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "pet_owners_delete_own" ON public.pet_owners FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Mistral agents: admin-only access (contains api_key)
CREATE POLICY "mistral_agents_admin_only" ON public.mistral_agents FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- API tokens: admin-only
CREATE POLICY "api_tokens_admin_only" ON public.api_tokens FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- API token usage: admin-only
CREATE POLICY "api_token_usage_admin_only" ON public.api_token_usage FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- MCP request logs: admin-only
CREATE POLICY "mcp_request_logs_admin_only" ON public.mcp_request_logs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
