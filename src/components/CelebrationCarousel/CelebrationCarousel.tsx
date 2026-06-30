import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CelebrationCarouselProps, CelebrationEvent } from '../../types';
import { EmployeeMomentsProvider, useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
import { CelebrationCard } from '../CelebrationCard';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const CelebrationCarouselInner: React.FC<CelebrationCarouselProps & { mappedEvents: CelebrationEvent[] }> = ({
  mappedEvents,
  autoPlay = true,
  autoPlayDelay = 5000,
  activeIndex: controlledActiveIndex,
  onActiveIndexChange,
}) => {
  const { t, reducedMotion } = useEmployeeMoments();
  const [activeIndex, setActiveIndex] = useState(controlledActiveIndex ?? 0);
  const [isPaused, setIsPaused] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = mappedEvents.length;

  useEffect(() => {
    if (controlledActiveIndex !== undefined && controlledActiveIndex !== activeIndex) {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);

  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeIndex);
    }
  }, [activeIndex, onActiveIndexChange]);

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay effect
  useEffect(() => {
    if (total <= 1 || !autoPlay || isPaused || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayDelay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayDelay, isPaused, nextSlide, total, reducedMotion]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (total <= 1) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    }
  };

  // Screen-reader announcements for active slide changes
  useEffect(() => {
    if (total === 0 || !mappedEvents[activeIndex]) return;
    const currentEvent = mappedEvents[activeIndex];
    
    // Announce current slide for ARIA screen readers
    const text = t('slide_announcement', {
      current: activeIndex + 1,
      total: total,
      name: currentEvent.name,
      type: t(currentEvent.type, { name: currentEvent.name }),
    });
    setAnnouncement(text);
  }, [activeIndex, mappedEvents, total, t]);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center p-12 bg-white/5 rounded-2xl border border-dashed border-white/10 text-zinc-500 text-sm">
        No moments or events to display.
      </div>
    );
  }

  const currentEvent = mappedEvents[activeIndex];

  return (
    <div
      ref={containerRef}
      id="celebration-carousel-container"
      className="relative w-full max-w-xl mx-auto focus:outline-none select-none"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Employee moments celebration carousel"
    >
      {/* Screen Reader Announcements */}
      <div
        id="carousel-announcer"
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>

      {/* Main Slide Card view */}
      <div className="relative overflow-hidden py-4 px-1 flex items-center justify-center min-h-[420px]">
        <div className="w-full transition-transform duration-500 ease-out">
          <CelebrationCard
            event={currentEvent}
            isActive={true}
          />
        </div>
      </div>

      {/* Manual Navigation Controls */}
      {total > 1 && (
        <div className="flex items-center justify-between mt-4 px-4 w-full">
          {/* Previous Arrow */}
          <button
            id="carousel-prev-btn"
            onClick={prevSlide}
            className="p-2.5 rounded-full bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/40 text-zinc-300 transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label={t('prev')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator / Pagination Index */}
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" role="tablist" aria-label="Slides">
              {mappedEvents.map((_, idx) => (
                <button
                  key={idx}
                  id={`carousel-dot-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'bg-indigo-500 w-6'
                      : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  role="tab"
                  aria-selected={activeIndex === idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-controls={`celebration-card-${mappedEvents[idx].id}`}
                />
              ))}
            </div>

            {/* Pause/Play Button (A11y requirement) */}
            {autoPlay && !reducedMotion && (
              <button
                id="carousel-play-pause-btn"
                onClick={() => setIsPaused(!isPaused)}
                className="ml-2 p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                title={isPaused ? t('play') : t('pause')}
                aria-label={isPaused ? t('play') : t('pause')}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Next Arrow */}
          <button
            id="carousel-next-btn"
            onClick={nextSlide}
            className="p-2.5 rounded-full bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/40 text-zinc-300 transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            aria-label={t('next')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export const CelebrationCarousel: React.FC<CelebrationCarouselProps> = (props) => {
  const { events, theme, branding, effects, allowReactions, locale, activeIndex, onReaction, onActiveIndexChange, ...rest } = props;

  // Fully support people prop for backward compatibility
  const mappedEvents = useMemo(() => {
    if (events && events.length > 0) {
      return events;
    }
    const people = (props as any).people;
    if (people && Array.isArray(people)) {
      return people.map((person, index) => ({
        id: person.id || `bday-${index}`,
        type: 'birthday' as const,
        name: person.name,
        designation: person.designation,
        department: person.department,
        image: person.image,
        company: person.company,
        date: person.date || person.birthday,
        customMessage: person.customMessage || person.message,
      }));
    }
    return [];
  }, [events, (props as any).people]);

  // Wrap inside nested provider to allow local overrides of theme, branding, and locale
  return (
    <EmployeeMomentsProvider
      theme={theme}
      branding={branding}
      effects={effects}
      allowReactions={allowReactions}
      locale={locale}
      onReaction={onReaction}
    >
      <CelebrationCarouselInner mappedEvents={mappedEvents} activeIndex={activeIndex} onActiveIndexChange={onActiveIndexChange} {...rest} />
    </EmployeeMomentsProvider>
  );
};

// Backward compatibility wrapper as required by Section 22 / page 11 of PRD
export const BirthdayCarousel = CelebrationCarousel;

export default CelebrationCarousel;
