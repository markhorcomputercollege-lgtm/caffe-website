import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, BookOpen, Clock } from 'lucide-react';
import { FEATURED_VIDEOS } from '../data/yogaData';
import { YogaTutorial } from '../types';

interface FeaturedVideosProps {
  onSelectTutorial: (tutorial: YogaTutorial) => void;
  onViewAll: () => void;
}

export const FeaturedVideos: React.FC<FeaturedVideosProps> = ({
  onSelectTutorial,
  onViewAll
}) => {
  const [startIndex, setStartIndex] = useState(0);

  // We have 4 featured items in yogaData, so we can slide between them smoothly
  const totalItems = FEATURED_VIDEOS.length;
  const visibleCount = 3;

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? totalItems - visibleCount : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount >= totalItems ? 0 : prev + 1));
  };

  // Get current 3 visible items
  const visibleItems = FEATURED_VIDEOS.slice(startIndex, startIndex + visibleCount);
  // If wrapped around
  if (visibleItems.length < visibleCount) {
    visibleItems.push(...FEATURED_VIDEOS.slice(0, visibleCount - visibleItems.length));
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Health':
        return 'bg-[#285A48] text-white';
      case 'Tutorial':
        return 'bg-[#E07A5F] text-white';
      case 'Meditation':
        return 'bg-[#3D8B7A] text-white';
      case 'Lifestyle':
        return 'bg-[#2B6E62] text-white';
      case 'Pain Relief':
        return 'bg-[#C85A32] text-white';
      default:
        return 'bg-[#285A48] text-white';
    }
  };

  return (
    <section id="featured" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="font-serif-heading text-3xl sm:text-4xl font-semibold text-[#A8482A] dark:text-[#E76F51] tracking-tight">
          Featured Yoga Videos
        </h2>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-24 sm:w-48 h-[1px] bg-[#D7CCBC] dark:bg-[#3D4C44]" />
          <button
            id="featured-view-more-btn"
            onClick={onViewAll}
            className="px-6 py-2 rounded-full border border-[#967E6B] dark:border-[#52635B] text-xs font-semibold uppercase tracking-wider text-[#544336] dark:text-[#D1DDD6] hover:bg-[#285A48] hover:text-white hover:border-[#285A48] transition-all"
          >
            View More
          </button>
        </div>
      </div>

      {/* Cards Container with Floating Arrows */}
      <div className="relative">
        {/* Previous Button */}
        <button
          id="featured-prev-btn"
          onClick={handlePrev}
          aria-label="Previous featured videos"
          className="absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#252F2A] border border-black/10 dark:border-white/10 shadow-lg flex items-center justify-center text-[#2C302E] dark:text-[#E8EFEA] hover:bg-[#285A48] hover:text-white dark:hover:bg-[#285A48] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          id="featured-next-btn"
          onClick={handleNext}
          aria-label="Next featured videos"
          className="absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#252F2A] border border-black/10 dark:border-white/10 shadow-lg flex items-center justify-center text-[#2C302E] dark:text-[#E8EFEA] hover:bg-[#285A48] hover:text-white dark:hover:bg-[#285A48] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {visibleItems.map((item, idx) => (
            <article
              key={`${item.id}-${idx}`}
              id={`featured-card-${item.id}`}
              onClick={() => onSelectTutorial(item)}
              className="cursor-pointer group flex flex-col bg-[#F5EFE6]/60 dark:bg-[#1E2622]/70 rounded-xl overflow-hidden border border-[#E8DFC8]/60 dark:border-[#2F3C35] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle overlay badge for video duration / read */}
                <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white flex items-center space-x-1">
                  {item.type === 'video' ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <BookOpen className="w-3 h-3" />
                  )}
                  <span>{item.duration}</span>
                </div>

                {/* Hover Play icon cue */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#285A48] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    {item.type === 'video' ? (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col items-center text-center flex-1 justify-between">
                {/* Category Pill Tag */}
                <div className="mb-3">
                  <span
                    className={`inline-block text-[11px] font-semibold px-3 py-0.5 rounded-full tracking-wide uppercase shadow-xs ${getCategoryBadgeClass(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="font-serif-heading text-xl sm:text-2xl font-semibold text-[#212724] dark:text-[#F0F5F2] leading-snug group-hover:text-[#285A48] dark:group-hover:text-[#52B788] transition-colors line-clamp-2 mb-4">
                  {item.title}
                </h3>

                {/* Date with surrounding lines */}
                <div className="w-full flex items-center justify-center space-x-3 text-[11px] text-[#7C8880] dark:text-[#9AA8A0] font-medium tracking-wider">
                  <span className="w-8 h-[1px] bg-[#D7CCBC] dark:bg-[#3D4C44]" />
                  <span className="uppercase">{item.date}</span>
                  <span className="w-8 h-[1px] bg-[#D7CCBC] dark:bg-[#3D4C44]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
