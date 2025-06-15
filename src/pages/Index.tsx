
import React, { useState, useMemo } from 'react';
import { Headphones, TrendingUp, Play } from 'lucide-react';
import PodcastCard from '@/components/PodcastCard';
import FilterPanel from '@/components/FilterPanel';
import PodcastPlayer from '@/components/PodcastPlayer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState('Any');
  const [hasSubtitles, setHasSubtitles] = useState<boolean | null>(null);
  const [sortBy, setSortBy] = useState('Popularity');
  const [selectedPodcast, setSelectedPodcast] = useState<any>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Sample podcast data
  const podcasts = [
    {
      id: '1',
      title: 'The Future of AI and Machine Learning',
      creator: 'Tech Innovators',
      topic: 'Technology',
      language: 'English',
      duration: 45,
      hasSubtitles: true,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Exploring the latest developments in artificial intelligence and machine learning technologies that are shaping our future.',
      views: 1200000
    },
    {
      id: '2',
      title: 'Mindfulness and Mental Health',
      creator: 'Wellness Guide',
      topic: 'Health & Wellness',
      language: 'English',
      duration: 30,
      hasSubtitles: true,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Learn practical mindfulness techniques to improve your mental health and overall well-being in daily life.',
      views: 850000
    },
    {
      id: '3',
      title: 'Startup Success Stories',
      creator: 'Business Leaders',
      topic: 'Business',
      language: 'English',
      duration: 60,
      hasSubtitles: false,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Inspiring stories from successful entrepreneurs who built their companies from scratch to billion-dollar valuations.',
      views: 650000
    },
    {
      id: '4',
      title: 'La Ciencia del Espacio',
      creator: 'Explorador Cósmico',
      topic: 'Science',
      language: 'Spanish',
      duration: 40,
      hasSubtitles: true,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Un fascinante viaje a través del cosmos, explorando los misterios del universo y los últimos descubrimientos espaciales.',
      views: 420000
    },
    {
      id: '5',
      title: 'Modern Education Revolution',
      creator: 'EduTech Pioneers',
      topic: 'Education',
      language: 'English',
      duration: 35,
      hasSubtitles: true,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'How technology is transforming education and creating new opportunities for learners worldwide.',
      views: 980000
    },
    {
      id: '6',
      title: 'Comedy Hour: Life Stories',
      creator: 'Laugh Masters',
      topic: 'Entertainment',
      language: 'English',
      duration: 50,
      hasSubtitles: false,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Hilarious personal stories and observations about modern life that will leave you in stitches.',
      views: 1500000
    },
    {
      id: '7',
      title: 'Sports Analytics Deep Dive',
      creator: 'Stats Guru',
      topic: 'Sports',
      language: 'English',
      duration: 45,
      hasSubtitles: true,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Advanced analytics and statistics that are revolutionizing how we understand and enjoy sports.',
      views: 720000
    },
    {
      id: '8',
      title: 'Actualités Tech Françaises',
      creator: 'Tech France',
      topic: 'News & Politics',
      language: 'French',
      duration: 25,
      hasSubtitles: true,
      thumbnail: '',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Les dernières nouvelles technologiques en France et leur impact sur la société française.',
      views: 340000
    }
  ];

  const filteredPodcasts = useMemo(() => {
    let filtered = podcasts.filter(podcast => {
      const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          podcast.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          podcast.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(podcast.topic);
      const matchesLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(podcast.language);
      
      let matchesDuration = true;
      if (selectedDuration === 'Short (< 30 min)') matchesDuration = podcast.duration < 30;
      else if (selectedDuration === 'Medium (30-60 min)') matchesDuration = podcast.duration >= 30 && podcast.duration <= 60;
      else if (selectedDuration === 'Long (> 60 min)') matchesDuration = podcast.duration > 60;
      
      const matchesSubtitles = hasSubtitles === null || podcast.hasSubtitles === hasSubtitles;
      
      return matchesSearch && matchesTopic && matchesLanguage && matchesDuration && matchesSubtitles;
    });

    // Sort podcasts
    switch (sortBy) {
      case 'Popularity':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'Duration':
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      case 'Title A-Z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [podcasts, searchQuery, selectedTopics, selectedLanguages, selectedDuration, hasSubtitles, sortBy]);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const handleSubtitlesToggle = () => {
    setHasSubtitles(prev => prev === true ? null : true);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTopics([]);
    setSelectedLanguages([]);
    setSelectedDuration('Any');
    setHasSubtitles(null);
    setSortBy('Popularity');
  };

  const handlePlayPodcast = (podcast: any) => {
    setSelectedPodcast(podcast);
    setIsPlayerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/20 rounded-2xl animate-pulse-glow">
                <Headphones size={32} className="text-primary" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                PodVerse Explorer
              </h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover amazing podcasts across all topics with advanced filtering, YouTube integration, and seamless playback experience.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <span>{podcasts.length} Premium Podcasts</span>
              </div>
              <div className="flex items-center gap-2">
                <Play size={16} className="text-primary" />
                <span>Instant YouTube Integration</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FilterPanel
                searchQuery={searchQuery}
                selectedTopics={selectedTopics}
                selectedLanguages={selectedLanguages}
                selectedDuration={selectedDuration}
                hasSubtitles={hasSubtitles}
                sortBy={sortBy}
                onSearchChange={setSearchQuery}
                onTopicToggle={handleTopicToggle}
                onLanguageToggle={handleLanguageToggle}
                onDurationChange={setSelectedDuration}
                onSubtitlesToggle={handleSubtitlesToggle}
                onSortChange={setSortBy}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Podcast Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredPodcasts.length} Podcast{filteredPodcasts.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredPodcasts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPodcasts.map((podcast) => (
                  <div key={podcast.id} className="animate-fade-in">
                    <PodcastCard
                      {...podcast}
                      onPlay={handlePlayPodcast}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="animate-float mb-8">
                  <Headphones size={64} className="mx-auto text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No podcasts found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms to discover more content.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="filter-chip filter-chip-active"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Podcast Player Modal */}
      <PodcastPlayer
        podcast={selectedPodcast}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
      />
    </div>
  );
};

export default Index;
