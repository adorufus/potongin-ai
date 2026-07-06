export type ActivePage = 'dashboard' | 'processing' | 'workspace' | 'export' | 'pricing';

export interface Project {
  id: string;
  title: string;
  editedTime: string;
  status: 'PROCESSING' | 'READY' | 'DRAFT';
  thumbnailUrl?: string;
  progressPercent?: number; // e.g. 42
  viralScore?: number; // e.g. 94
}

export interface Clip {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  score: number;
  thumbnailUrl: string;
  tags: string[];
  type: 'viral' | 'explainer' | 'action';
  startSec: number;
  endSec: number;
  videoUrl?: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'highlight';
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
