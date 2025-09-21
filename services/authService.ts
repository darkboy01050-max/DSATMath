export interface Student {
  id: string;
  name: string;
  code: string;
  age: number;
  sessionsCompleted: number;
}

export interface AuthResult {
  success: boolean;
  student?: Student;
  error?: string;
}

class AuthService {
  async loginWithCode(code: string): Promise<AuthResult> {
    try {
      // Check if Supabase is properly configured
      const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'https://your-project.supabase.co' || 
          supabaseKey === 'your-anon-key-here') {
        return {
          success: false,
          error: 'Database not configured. Please set up Supabase credentials.'
        };
      }

      // For now, simulate authentication with mock data
      // In a real app, this would query your Supabase database
      if (code === '144' || code === '144') {
        return {
          success: true,
          student: {
            id: '1',
            name: 'John Doe',
            code: '144',
            age: 16,
            sessionsCompleted: 12
          }
        };
      } else {
        return {
          success: false,
          error: 'Invalid code. Please check your student code and try again.'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Login failed. Please try again.'
      };
    }
  }
}

export const authService = new AuthService();