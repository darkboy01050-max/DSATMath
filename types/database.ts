export interface Student {
  id: string;
  name: string;
  age: number;
  code: string;
  sessions: number;
  scores: number[];
  notes?: string;
  created_at?: string;
}