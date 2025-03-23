import { createClient } from '@supabase/supabase-js';
import { User } from '../interfaces/schemas'; 

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);


const mapSupabaseUser = (supabaseUser: any): User => {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata?.name || '',
  };
};

export const supabaseLogin = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return mapSupabaseUser(data.user);
};

export const supabaseRegister = async (email: string, password: string, name: string): Promise<User> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
  
  if (error) throw error;
  return mapSupabaseUser(data.user);
};

export const supabaseLogout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const supabaseForgotPassword = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void): (() => void) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user ? mapSupabaseUser(session.user) : null);
  });
  
  return () => {
    data.subscription.unsubscribe();
  };
};