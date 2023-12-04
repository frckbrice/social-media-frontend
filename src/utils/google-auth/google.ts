import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY = 'SUPABASE_CLIENT_API_KEY'

const SUPABASE_URL = "https://xkwspfurbsmpwwazlkmu.supabase.co"
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const logInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
  
}

const logOut = async () => {
  const { error } = await supabase.auth.signOut()
}
