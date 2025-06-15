
import React from 'react';
import { Play, ExternalLink, Clock, Subtitles, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PodcastCardProps {
  id: string;
  title: string;
  creator: string;
  topic: string;
  language: string;
  duration: number;
  hasSubtitles: boolean;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
  views: number;
  onPlay: (podcast: any) => void;
}

const PodcastCard = ({ 
  id, title, creator, topic, language, duration, hasSubtitles, 
  thumbnail, youtubeUrl, description, views, onPlay 
}: PodcastCardProps) => {
  const getTopicGradient = (topic: string) => {
    const gradients: { [key: string]: string } = {
      'Technology': 'gradient-tech',
      'Health & Wellness': 'gradient-health',
      'Business': 'gradient-business',
      'Education': 'gradient-education',
      'Entertainment': 'gradient-entertainment',
      'News & Politics': 'gradient-news',
      'Sports': 'gradient-sports',
      'Science': 'gradient-science'
    };
    return gradients[topic] || 'gradient-tech';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const podcast = {
    id, title, creator, topic, language, duration, hasSubtitles,
    thumbnail, youtubeUrl, description, views
  };

  return (
    <div className="podcast-card group">
      <div className="relative">
        <div className={`h-48 ${getTopicGradient(topic)} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="text-white text-6xl font-bold opacity-20 absolute">
            {topic.charAt(0)}
          </div>
          <div className="relative z-10 text-center text-white p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
            <div className="flex items-center justify-center gap-2 text-sm opacity-90">
              <User size={14} />
              <span>{creator}</span>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/50 text-white text-xs">
              {topic}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{formatDuration(duration)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{language}</span>
            </div>
            {hasSubtitles && (
              <div className="flex items-center gap-1">
                <Subtitles size={12} />
                <span>CC</span>
              </div>
            )}
            <div className="ml-auto">
              {formatViews(views)} views
            </div>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={() => onPlay(podcast)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              <Play size={14} className="mr-1" />
              Play
            </Button>
            <Button 
              onClick={() => window.open(youtubeUrl, '_blank')}
              variant="outline" 
              size="sm"
              className="px-3"
            >
              <ExternalLink size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastCard;
