import React, { useState, useMemo } from 'react';
import { CelebrationWallProps, EventType } from '../../types';
import { CelebrationCard } from '../CelebrationCard';
import { useEmployeeMoments } from '../../providers/EmployeeMomentsProvider';
import { Sparkles, Search, Filter } from 'lucide-react';

export const CelebrationWall: React.FC<CelebrationWallProps> = ({
  events,
  gridCols,
}) => {
  const { theme, t } = useEmployeeMoments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Search and filter logic
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch = evt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evt.designation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evt.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evt.achievement || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evt.company || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || evt.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [events, searchTerm, selectedType]);

  // Pagination logic to gracefully support 500+ events
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const gridClass = useMemo(() => {
    if (gridCols) {
      return `grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-${gridCols}`;
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
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-white/5 dark:bg-black/25 rounded-2xl border border-white/5">
        {/* Search input */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            id="wall-search"
            type="text"
            placeholder="Search employee or details..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page
            }}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-white/10 bg-white/5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all cursor-pointer select-none ${
                selectedType === type
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-white/5 text-zinc-300 border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {type === 'all' ? 'All Events' : type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid View */}
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-3xl border border-dashed border-white/10 bg-white/5">
          <Sparkles className="w-12 h-12 text-zinc-600 animate-pulse" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-300">No events found</h3>
            <p className="text-sm text-zinc-500 max-w-xs">Try adjusting your filters or search keywords.</p>
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
            <div className="flex items-center justify-between p-4 bg-white/5 dark:bg-black/25 rounded-2xl border border-white/5 mt-6">
              <span className="text-xs text-zinc-400">
                Showing {Math.min(filteredEvents.length, (currentPage - 1) * itemsPerPage + 1)}-
                {Math.min(filteredEvents.length, currentPage * itemsPerPage)} of {filteredEvents.length} events
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="wall-prev-page"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-zinc-300 border border-white/5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-all cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-zinc-300 font-mono">
                  {currentPage} / {totalPages}
                </span>
                <button
                  id="wall-next-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-zinc-300 border border-white/5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition-all cursor-pointer"
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
