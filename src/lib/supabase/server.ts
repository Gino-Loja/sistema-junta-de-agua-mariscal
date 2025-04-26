import { Database } from '@/supabase'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createAdminClient } from "@supabase/supabase-js";
export async function createClient() {
  const cookieStore =  cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export async function createSupbaseAdmin() {
	return createAdminClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SERVICE_ROLE!,
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		}
	);
}