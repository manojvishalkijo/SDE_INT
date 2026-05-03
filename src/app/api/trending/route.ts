import { NextResponse } from 'next/server';

const TRENDING_DATA = [
  { id: 't1', type: 'social', title: 'Top 10 Frontend Frameworks in 2026', description: 'Next.js still leads the pack, but some new contenders are making waves...', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', url: '#', source: 'Dev Community', publishedAt: '2026-05-02T10:00:00Z', category: 'Trending' },
  { id: 't2', type: 'news', title: 'Global Tech Summit 2026 Highlights', description: 'Major announcements from Apple, Google, and Microsoft.', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', url: '#', source: 'Tech Daily', publishedAt: '2026-05-01T15:30:00Z', category: 'Trending' },
  { id: 't3', type: 'recommendation', title: 'Cyberpunk: Edgerunners Season 2', description: 'The highly anticipated sequel is finally here and it is breaking records.', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', url: '#', source: 'Netflix', publishedAt: '2026-04-28T00:00:00Z', category: 'Trending' },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(TRENDING_DATA);
}
