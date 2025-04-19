export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  duration: string;
  skills: string[];
  company_id: string;
  status: 'open' | 'in_progress' | 'completed';
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  project_id?: string;
}

export interface Contract {
  id: string;
  project_id: string;
  freelancer_id: string;
  company_id: string;
  terms: string;
  status: 'pending' | 'active' | 'completed';
  amount: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'freelancer' | 'company';
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  created_at: string;
}

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  address: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  wallet_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'payment';
  status: 'pending' | 'completed';
  created_at: string;
}