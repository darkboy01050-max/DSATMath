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