import { NextResponse } from 'next/server';

const MOCK_DATA = [
  { id: '1', type: 'news', title: 'The Future of AI in Web Development', description: 'Exploring how AI tools are reshaping the way developers write and maintain code...', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', url: '#', source: 'Tech Daily', publishedAt: '2026-05-01T10:00:00Z', category: 'Technology' },
  { id: '2', type: 'recommendation', title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology...', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800', url: '#', source: 'TMDB', publishedAt: '2010-07-16T00:00:00Z', category: 'Movies' },
  { id: '3', type: 'social', title: 'Just deployed my first Next.js App!', description: 'Loving the App Router and Tailwind CSS integration. So smooth! #webdev', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', url: '#', source: '@dev_ninja', publishedAt: '2026-05-02T08:30:00Z', category: 'Trending' },
  { id: '4', type: 'news', title: 'Global Markets Rally Amid Tech Boom', description: 'Stocks hit record highs as technology sector continues to drive unprecedented growth.', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800', url: '#', source: 'Finance Today', publishedAt: '2026-04-30T14:15:00Z', category: 'Finance' },
  { id: '5', type: 'recommendation', title: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge...', imageUrl: 'https://images.unsplash.com/photo-1547700055-b61cacebece9?auto=format&fit=crop&q=80&w=800', url: '#', source: 'TMDB', publishedAt: '2024-03-01T00:00:00Z', category: 'Movies' },
  { id: '6', type: 'social', title: 'Championship Finals Tonight', description: 'Who is taking home the trophy? Predictions below! 🏆⚽', imageUrl: 'https://images.unsplash.com/photo-1518605368461-1ee120d536c4?auto=format&fit=crop&q=80&w=800', url: '#', source: '@sports_fanatic', publishedAt: '2026-05-02T12:00:00Z', category: 'Sports' },
  { id: '7', type: 'news', title: 'New Next.js Version Released', description: 'Vercel just dropped the latest update featuring massive performance gains.', imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800', url: '#', source: 'Next.js Blog', publishedAt: '2026-05-01T16:20:00Z', category: 'Technology' },
  { id: '8', type: 'social', title: 'Beautiful sunset at the beach', description: 'Nothing beats a relaxing weekend by the ocean. 🌅', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', url: '#', source: '@traveler_joe', publishedAt: '2026-05-01T18:00:00Z', category: 'Trending' }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.getAll('category');
  const search = searchParams.get('search')?.toLowerCase();

  let filteredData = MOCK_DATA;

  if (categories.length > 0) {
    filteredData = filteredData.filter(item => categories.includes(item.category));
  }

  if (search) {
    filteredData = filteredData.filter(item => 
      item.title.toLowerCase().includes(search) || 
      item.description.toLowerCase().includes(search)
    );
  }

  // Simulate network delay for a realistic feel
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(filteredData);
}
