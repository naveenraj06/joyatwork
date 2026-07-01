import React, { useState, useMemo, useDeferredValue } from 'react';
import { CelebrationWallProps, EventType } from '../../types';
import { CelebrationCard } from '../CelebrationCard';
import { useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
import { Sparkles, Search } from 'lucide-react';

export const CelebrationWall: React.FC<CelebrationWallProps> = ({
  events,
  gridCols,
}) => {
  const { theme, t } = useEmployeeMoments();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Search and filter logic
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch = evt.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        (evt.designation || '').toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        (evt.department || '').toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        (evt.achievement || '').toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        (evt.company || '').toLowerCase().includes(deferredSearchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || evt.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [events, deferredSearchTerm, selectedType]);

  // Pagination logic to gracefully support 500+ events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const gridClass = useMemo(() => {
    if (gridCols) {
      // Safely map known possible column counts to static classes to avoid dynamic tailwind interpolation issues
      const colsMap: Record<number, string> = {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
        5: 'md:grid-cols-5',
        6: 'md:grid-cols-6',
        7: 'md:grid-cols-7',
        8: 'md:grid-cols-8',
        9: 'md:grid-cols-9',
        10: 'md:grid-cols-10',
        11: 'md:grid-cols-11',
        12: 'md:grid-cols-12',
      };
      const mdCols = colsMap[gridCols] || 'md:grid-cols-3';
      return `grid gap-6 grid-cols-1 sm:grid-cols-2 ${mdCols}`;
    }
    return 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  }, [gridCols]);

  const eventTypes: (EventType | 'all')[] = ['all', 'birthday', 'anniversary', 'promotion', 'award', 'new_joiner', 'festival'];

  return (
    <div
      id="celebration-wall"
      className="space-y-6 w-full p-1"
    >
      {/* Search & Filtering Control Bar */}
      <div 
        className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl border"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.textSecondary + '1a',
        }}
      >
        {/* Search input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: theme.textSecondary }} />
          <input
            id="wall-search"
            type="text"
            placeholder="Search employee or details..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page
            }}
            aria-label="Search employee or details"
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            style={{
              backgroundColor: theme.background.startsWith('linear-gradient') ? 'rgba(255, 255, 255, 0.05)' : theme.background,
              color: theme.textPrimary,
              borderColor: theme.textSecondary + '25',
            }}
          />
        </div>

        {/* Event Type Filters */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto overflow-x-auto py-1 no-scrollbar">
          {eventTypes.map((type) => (
            <button
              key={type}
              id={`wall-filter-${type}`}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1); // Reset to first page
              }}
              aria-pressed={selectedType === type}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all cursor-pointer select-none"
              style={selectedType === type ? {
                backgroundColor: theme.accent,
                color: '#ffffff',
                borderColor: theme.accent,
              } : {
                backgroundColor: 'transparent',
                color: theme.textSecondary,
                borderColor: theme.textSecondary + '20',
              }}
            >
              {type === 'all' ? 'All Events' : type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {filteredEvents.length === 0 ? (
        <div 
          className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-3xl border border-dashed"
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.textSecondary + '25',
          }}
        >
          <Sparkles className="w-12 h-12 animate-pulse" style={{ color: theme.textSecondary }} />
          <div className="space-y-1">
            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>No events found</h3>
            <p className="text-sm max-w-xs" style={{ color: theme.textSecondary }}>Try adjusting your filters or search keywords.</p>
          </div>
        </div>
      ) : (
        <>
          <div className={gridClass} id="wall-grid">
            {paginatedEvents.map((evt) => (
              <CelebrationCard
                key={evt.id}
                event={evt}
                isActive={true}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div 
              className="flex items-center justify-between p-4 rounded-2xl border mt-6"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.textSecondary + '1a',
              }}
            >
              <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>
                Showing {Math.min(filteredEvents.length, (currentPage - 1) * itemsPerPage + 1)}-
                {Math.min(filteredEvents.length, currentPage * itemsPerPage)} of {filteredEvents.length} events
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="wall-prev-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-all cursor-pointer"
                  style={{
                    backgroundColor: theme.background.startsWith('linear-gradient') ? 'rgba(255, 255, 255, 0.05)' : theme.background,
                    color: theme.textPrimary,
                    borderColor: theme.textSecondary + '20',
                  }}
                >
                  Previous
                </button>
                <span className="text-xs font-mono font-bold" style={{ color: theme.textPrimary }}>
                  {currentPage} / {totalPages}
                </span>
                <button
                  id="wall-next-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-all cursor-pointer"
                  style={{
                    backgroundColor: theme.background.startsWith('linear-gradient') ? 'rgba(255, 255, 255, 0.05)' : theme.background,
                    color: theme.textPrimary,
                    borderColor: theme.textSecondary + '20',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CelebrationWall;
