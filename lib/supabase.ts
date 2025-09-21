import { createClient } from '@supabase/supabase-js';
import { Student } from '@/types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Database {
  public: {
    Tables: {
      students: {
        Row: Student;
        Insert: Omit<Student, 'id' | 'created_at'>;
        Update: Partial<Omit<Student, 'id' | 'created_at'>>;
      };
    };
  };
}