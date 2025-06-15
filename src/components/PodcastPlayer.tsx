
import React from 'react';
import { X, ExternalLink, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PodcastPlayerProps {
  podcast: any;
  isOpen: boolean;
  onClose: () => void;
}

const PodcastPlayer = ({ podcast, isOpen, onClose }: PodcastPlayerProps) => {
  if (!podcast) return null;

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(podcast.youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="bg-gradient-to-br from-background to-background/80 h-full">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <DialogTitle className="text-xl font-bold mb-2">{podcast.title}</DialogTitle>
                <p className="text-muted-foreground text-sm">by {podcast.creator}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => window.open(podcast.youtubeUrl, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink size={16} className="mr-1" />
                  YouTube
                </Button>
                <Button onClick={onClose} variant="ghost" size="sm">
                  <X size={16} />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6">
            {embedUrl ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={podcast.title}
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <Play size={48} className="mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Unable to load video player</p>
                  <Button
                    onClick={() => window.open(podcast.youtubeUrl, '_blank')}
                    className="mt-4"
                    variant="outline"
                  >
                    Open in YouTube
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {podcast.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
                <div>
                  <span className="text-xs text-muted-foreground block">Topic</span>
                  <span className="text-sm font-medium">{podcast.topic}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Language</span>
                  <span className="text-sm font-medium">{podcast.language}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Duration</span>
                  <span className="text-sm font-medium">
                    {Math.floor(podcast.duration / 60)}h {podcast.duration % 60}m
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">Subtitles</span>
                  <span className="text-sm font-medium">
                    {podcast.hasSubtitles ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PodcastPlayer;
