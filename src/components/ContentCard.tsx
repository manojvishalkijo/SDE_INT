'use client';

import { Heart, ExternalLink, Play, Share2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBookmark } from '@/store/userSlice';
import { RootState } from '@/store/store';
import { ContentItem } from '@/store/apiSlice';
import clsx from 'clsx';
import { Draggable } from '@hello-pangea/dnd';

interface ContentCardProps {
  item: ContentItem;
  index: number;
}

export default function ContentCard({ item, index }: ContentCardProps) {
  const dispatch = useDispatch();
  const bookmarkedItems = useSelector((state: RootState) => state.user.bookmarkedItems);
  const isBookmarked = bookmarkedItems.includes(item.id);

  const getIcon = () => {
    switch (item.type) {
      case 'news': return <ExternalLink className="w-4 h-4" />;
      case 'recommendation': return <Play className="w-4 h-4" />;
      case 'social': return <Share2 className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={clsx(
            "group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300",
            snapshot.isDragging && "shadow-2xl ring-2 ring-indigo-500 scale-[1.02] z-50",
            !snapshot.isDragging && "hover:shadow-md hover:-translate-y-1"
          )}
          style={provided.draggableProps.style}
        >
          <div className="h-48 bg-slate-100 dark:bg-slate-800 relative overflow-hidden border-b border-slate-100 dark:border-slate-700">
            {item.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/50">
                {getIcon()}
                <span className="mt-2 text-sm font-medium opacity-60">No Image</span>
              </div>
            )}
            <div className="absolute top-3 right-3 flex gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/95 dark:bg-slate-900/95 text-indigo-600 dark:text-indigo-400 shadow-sm backdrop-blur-md uppercase tracking-wider">
                {item.category}
              </span>
            </div>
          </div>
          
          <div className="p-5 flex flex-col h-52">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {item.source}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(item.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {item.title}
            </h3>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 flex-1 mb-4">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700/80 mt-auto">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                {item.type === 'news' ? 'Read Article' : item.type === 'recommendation' ? 'Play Now' : 'View Post'}
                {getIcon()}
              </a>
              
              <button 
                onClick={() => dispatch(toggleBookmark(item.id))}
                className={clsx(
                  "p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95",
                  isBookmarked 
                    ? "bg-rose-50 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400" 
                    : "bg-slate-50 text-slate-400 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                )}
                aria-label={isBookmarked ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
