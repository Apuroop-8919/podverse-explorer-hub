
import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface FilterPanelProps {
  searchQuery: string;
  selectedTopics: string[];
  selectedLanguages: string[];
  selectedDuration: string;
  hasSubtitles: boolean | null;
  sortBy: string;
  onSearchChange: (query: string) => void;
  onTopicToggle: (topic: string) => void;
  onLanguageToggle: (language: string) => void;
  onDurationChange: (duration: string) => void;
  onSubtitlesToggle: () => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
}

const FilterPanel = ({
  searchQuery, selectedTopics, selectedLanguages, selectedDuration,
  hasSubtitles, sortBy, onSearchChange, onTopicToggle, onLanguageToggle,
  onDurationChange, onSubtitlesToggle, onSortChange, onClearFilters
}: FilterPanelProps) => {
  const topics = [
    'Technology', 'Health & Wellness', 'Business', 'Education', 
    'Entertainment', 'News & Politics', 'Sports', 'Science'
  ];

  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];
  const durations = ['Any', 'Short (< 30 min)', 'Medium (30-60 min)', 'Long (> 60 min)'];
  const sortOptions = ['Popularity', 'Duration', 'Recent', 'Title A-Z'];

  const activeFiltersCount = selectedTopics.length + selectedLanguages.length + 
    (selectedDuration !== 'Any' ? 1 : 0) + (hasSubtitles !== null ? 1 : 0);

  return (
    <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-primary" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={16} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
        <Input
          placeholder="Search podcasts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={selectedDuration} onValueChange={onDurationChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map(duration => (
                <SelectItem key={duration} value={duration}>{duration}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => onTopicToggle(topic)}
              className={`filter-chip ${
                selectedTopics.includes(topic) ? 'filter-chip-active' : 'filter-chip-inactive'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {languages.map(language => (
            <button
              key={language}
              onClick={() => onLanguageToggle(language)}
              className={`filter-chip ${
                selectedLanguages.includes(language) ? 'filter-chip-active' : 'filter-chip-inactive'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-3">Accessibility</h3>
        <button
          onClick={onSubtitlesToggle}
          className={`filter-chip ${
            hasSubtitles === true ? 'filter-chip-active' : 'filter-chip-inactive'
          }`}
        >
          Has Subtitles
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
