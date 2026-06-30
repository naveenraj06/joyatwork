import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Sparkles, Trophy, Award, Landmark, User, Heart, ThumbsUp, Send, 
  RefreshCw, Layers, Monitor, Tv, Smartphone, Tablet, Compass, HelpCircle, 
  ChevronRight, ChevronDown, Check, Upload, Calendar, Building, 
  MessageSquare, Copy, Sliders, Play, Pause, X, Search, ShieldCheck, 
  UserPlus, Volume2, Maximize2, Briefcase, Star, ArrowRight, BookOpen,
  Columns, Image, LayoutGrid
} from 'lucide-react';
import { CelebrationEvent } from './types';
import { FloatingReactions } from './components';

// Pre-defined premium Abstract Logos for branding
const PREMIUM_LOGOS = [
  { id: 'apex', name: 'APEX', icon: Landmark, desc: 'Geometric minimalist crest' },
  { id: 'zenith', name: 'ZENITH', icon: Compass, desc: 'Symmetrical stellar emblem' },
  { id: 'horizon', name: 'HORIZON', icon: Layers, desc: 'Overlapping structural arcs' },
  { id: 'vanguard', name: 'VANGUARD', icon: ShieldCheck, desc: 'Symmetrical executive shield' }
];

// Preset Premium Luxury Themes
interface PresetTheme {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  cardBorder: string;
  primary: string;
  accent: string;
  text: string;
  secondary: string;
  glow: string;
  ambient: string;
}

const THEME_PRESETS: PresetTheme[] = [
  {
    id: 'executive_dark',
    name: 'Executive Dark',
    bg: '#05070B',
    cardBg: '#0B1020',
    cardBorder: 'rgba(255, 255, 255, 0.06)',
    primary: '#7B61FF',
    accent: '#D4AF37',
    text: '#F8FAFC',
    secondary: '#94A3B8',
    glow: 'rgba(123, 97, 255, 0.15)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(123, 97, 255, 0.1), transparent 70%)'
  },
  {
    id: 'premium_black',
    name: 'Premium Black',
    bg: '#000000',
    cardBg: '#08080A',
    cardBorder: 'rgba(255, 255, 255, 0.04)',
    primary: '#E2E8F0',
    accent: '#FFFFFF',
    text: '#FFFFFF',
    secondary: '#71717A',
    glow: 'rgba(255, 255, 255, 0.08)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.05), transparent 70%)'
  },
  {
    id: 'corporate_luxury',
    name: 'Corporate Luxury',
    bg: '#040815',
    cardBg: '#0B132B',
    cardBorder: 'rgba(255, 255, 255, 0.06)',
    primary: '#3A86FF',
    accent: '#FF006E',
    text: '#F8FAFC',
    secondary: '#8D99AE',
    glow: 'rgba(58, 134, 255, 0.15)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(58, 134, 255, 0.08), transparent 70%)'
  },
  {
    id: 'midnight_gold',
    name: 'Midnight Gold',
    bg: '#090704',
    cardBg: '#141009',
    cardBorder: 'rgba(212, 175, 55, 0.08)',
    primary: '#D4AF37',
    accent: '#F3E5AB',
    text: '#FFFDF9',
    secondary: '#A39074',
    glow: 'rgba(212, 175, 55, 0.15)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(212, 175, 55, 0.08), transparent 70%)'
  },
  {
    id: 'minimal_white',
    name: 'Minimal White',
    bg: '#F4F4F6',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(0, 0, 0, 0.06)',
    primary: '#18181B',
    accent: '#09090B',
    text: '#09090B',
    secondary: '#71717A',
    glow: 'rgba(0, 0, 0, 0.04)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(24, 24, 27, 0.03), transparent 70%)'
  },
  {
    id: 'award_ceremony',
    name: 'Award Ceremony',
    bg: '#090514',
    cardBg: '#110B24',
    cardBorder: 'rgba(168, 85, 247, 0.12)',
    primary: '#9333EA',
    accent: '#FFD700',
    text: '#FAF5FF',
    secondary: '#C084FC',
    glow: 'rgba(168, 85, 247, 0.2)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(168, 85, 247, 0.15), transparent 70%)'
  },
  {
    id: 'aurora_dreamscape',
    name: 'Aurora Dreamscape',
    bg: '#020C1B',
    cardBg: '#061633',
    cardBorder: 'rgba(34, 211, 238, 0.15)',
    primary: '#0D9488',
    accent: '#22D3EE',
    text: '#ECFDF5',
    secondary: '#14B8A6',
    glow: 'rgba(34, 211, 238, 0.25)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(34, 211, 238, 0.18), transparent 70%)'
  },
  {
    id: 'rose_champagne',
    name: 'Rose Champagne',
    bg: '#140C12',
    cardBg: '#24141F',
    cardBorder: 'rgba(251, 113, 133, 0.15)',
    primary: '#DB2777',
    accent: '#FDA4AF',
    text: '#FFF5F7',
    secondary: '#F43F5E',
    glow: 'rgba(251, 113, 133, 0.2)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(251, 113, 133, 0.15), transparent 70%)'
  },
  {
    id: 'electric_pulse',
    name: 'Electric Neon Pulse',
    bg: '#0B011A',
    cardBg: '#15022E',
    cardBorder: 'rgba(217, 70, 239, 0.18)',
    primary: '#D946EF',
    accent: '#06B6D4',
    text: '#FDF4FF',
    secondary: '#F472B6',
    glow: 'rgba(217, 70, 239, 0.25)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(217, 70, 239, 0.2), transparent 70%)'
  },
  {
    id: 'emerald_prestige',
    name: 'Emerald Prestige',
    bg: '#021B15',
    cardBg: '#062D24',
    cardBorder: 'rgba(16, 185, 129, 0.15)',
    primary: '#10B981',
    accent: '#FBBF24',
    text: '#ECFDF5',
    secondary: '#34D399',
    glow: 'rgba(16, 185, 129, 0.25)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(16, 185, 129, 0.2), transparent 70%)'
  },
  {
    id: 'retro_sunset',
    name: 'Retro Sunset',
    bg: '#1A0B2E',
    cardBg: '#11052C',
    cardBorder: 'rgba(244, 63, 94, 0.18)',
    primary: '#F43F5E',
    accent: '#F59E0B',
    text: '#FFE4E6',
    secondary: '#EC4899',
    glow: 'rgba(244, 63, 94, 0.25)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(244, 63, 94, 0.2), transparent 70%)'
  },
  {
    id: 'cosmic_violet',
    name: 'Cosmic Violet',
    bg: '#0A051D',
    cardBg: '#12082D',
    cardBorder: 'rgba(139, 92, 246, 0.16)',
    primary: '#8B5CF6',
    accent: '#67E8F9',
    text: '#F5F3FF',
    secondary: '#A78BFA',
    glow: 'rgba(139, 92, 246, 0.25)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(139, 92, 246, 0.2), transparent 70%)'
  },
  {
    id: 'icy_platinum',
    name: 'Icy Platinum',
    bg: '#0B111E',
    cardBg: '#152033',
    cardBorder: 'rgba(148, 163, 184, 0.18)',
    primary: '#94A3B8',
    accent: '#38BDF8',
    text: '#F8FAFC',
    secondary: '#CBD5E1',
    glow: 'rgba(148, 163, 184, 0.2)',
    ambient: 'radial-gradient(circle at 50% -20%, rgba(56, 189, 248, 0.15), transparent 70%)'
  }
];

// Initial preloaded list of outstanding professional events
const INITIAL_RECOGNITIONS: CelebrationEvent[] = [
  {
    id: 'rec-1',
    type: 'award',
    name: 'Sarah Jenkins',
    designation: 'Senior Product Designer',
    department: 'UX Engineering',
    company: 'Nexus Corp',
    date: 'Today',
    achievement: 'Outstanding Leadership',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    customMessage: ' Sarah has spearheaded the design modernization program. Her work has established a premium industry benchmark for SaaS application visual flow and interactive motion storytelling.'
  },
  {
    id: 'rec-2',
    type: 'anniversary',
    name: 'Marcus Chen',
    designation: 'Principal Security Architect',
    department: 'Core Infrastructure',
    company: 'Nexus Corp',
    date: 'June 30',
    years: 5,
    achievement: '5 Years of Excellence',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    customMessage: 'Celebrating five exceptional years of engineering brilliance. Marcus secured our global high-traffic systems, architecting infrastructure that scales seamlessly without downtime.'
  },
  {
    id: 'rec-3',
    type: 'promotion',
    name: 'Elena Rostova',
    designation: 'VP of Global Technology',
    department: 'Executive Leadership',
    company: 'Nexus Corp',
    date: 'July 1',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    customMessage: 'Recognized for her stellar leadership and operational precision. Elena has guided sixty cross-functional technology teams to successfully deploy next-generation intelligent platforms.'
  },
  {
    id: 'rec-4',
    type: 'award',
    name: 'David K. Patel',
    designation: 'Principal Advocate',
    department: 'Developer Relations',
    company: 'Nexus Corp',
    date: 'July 5',
    achievement: 'Value Pioneer Award',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    customMessage: 'David represents the highest ideals of mentorship, guiding hundreds of engineers globally and fostering a high-performance culture of transparent, collaborative creation.'
  },
  {
    id: 'rec-5',
    type: 'new_joiner',
    name: 'Aisha Patel',
    designation: 'Staff AI Engineer',
    department: 'Intelligent Systems',
    company: 'Nexus Corp',
    date: 'July 10',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    customMessage: 'Welcoming Aisha to our research division. Aisha joins us with a decade of expertise in large-scale multi-agent distributed routing, set to expand our server-side platform capability.'
  }
];

export default function App() {
  // Main State
  const [recognitions, setRecognitions] = useState<CelebrationEvent[]>(INITIAL_RECOGNITIONS);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Customization & Branding State
  const [companyName, setCompanyName] = useState<string>('Nexus Corp');
  const [selectedLogoId, setSelectedLogoId] = useState<string>('vanguard');
  const [customAccent, setCustomAccent] = useState<string>('#D4AF37'); // Gold default
  
  // Theme State
  const [activeThemeId, setActiveThemeId] = useState<string>('executive_dark');
  
  // Card Template State: 'executive_crest' | 'horizontal_split' | 'polaroid_spotlight' | 'minimalist_editorial'
  const [cardTemplate, setCardTemplate] = useState<'executive_crest' | 'horizontal_split' | 'polaroid_spotlight' | 'minimalist_editorial'>('executive_crest');
  
  // Device Mode State: 'desktop' | 'tv' | 'presentation' | 'mobile' | 'tablet' | 'billboard'
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tv' | 'presentation' | 'mobile' | 'tablet' | 'billboard'>('desktop');
  
  // Accordion Sections State
  const [expandedSection, setExpandedSection] = useState<string | null>('experience');

  // Developer Integration State
  const [devTab, setDevTab] = useState<'react' | 'webcomponent' | 'props'>('react');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyCode = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Motion Parameters
  const [tiltLimit, setTiltLimit] = useState<number>(6); // Default 6 degrees maximum tilt
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);
  const [balloonsEnabled, setBalloonsEnabled] = useState<boolean>(true);
  const [artifactsEnabled, setArtifactsEnabled] = useState<boolean>(true);
  const [spotlightSpeed, setSpotlightSpeed] = useState<'slow' | 'normal' | 'static'>('normal');
  const [parallaxIntensity, setParallaxIntensity] = useState<number>(6); // Max px movement of layers

  // Navigation Autoplay State for TV/Presentation
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [autoplayDelay] = useState<number>(6000); // 6s per slide

  // Dynamic state for reaction counters
  const [reactionsState, setReactionsState] = useState<Record<string, Record<string, number>>>(() => {
    const counts: Record<string, Record<string, number>> = {};
    INITIAL_RECOGNITIONS.forEach(e => {
      counts[e.id] = {
        '🏆': Math.floor(Math.random() * 15) + 12,
        '👏': Math.floor(Math.random() * 24) + 18,
        '❤️': Math.floor(Math.random() * 32) + 24
      };
    });
    return counts;
  });

  // Dynamic user reactions trace
  const [userHasReacted, setUserHasReacted] = useState<Record<string, Record<string, boolean>>>({});

  // Form states to add new Custom Employees
  const [newEmployeeName, setNewEmployeeName] = useState<string>('');
  const [newEmployeeDesignation, setNewEmployeeDesignation] = useState<string>('');
  const [newEmployeeDept, setNewEmployeeDept] = useState<string>('');
  const [newEmployeeMsg, setNewEmployeeMsg] = useState<string>('');
  const [newEmployeeType, setNewEmployeeType] = useState<'award' | 'anniversary' | 'promotion' | 'new_joiner'>('award');
  const [newEmployeeImage, setNewEmployeeImage] = useState<string>('');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Active theme calculation
  const currentTheme = useMemo(() => {
    return THEME_PRESETS.find(t => t.id === activeThemeId) || THEME_PRESETS[0];
  }, [activeThemeId]);

  // Active event calculation
  const activeEvent = useMemo(() => {
    if (recognitions.length === 0) return INITIAL_RECOGNITIONS[0];
    return recognitions[activeIdx] || recognitions[0];
  }, [recognitions, activeIdx]);

  // Filtered employees list based on search query
  const filteredEvents = useMemo(() => {
    return recognitions.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [recognitions, searchQuery]);

  // Handle Autoplay logic
  useEffect(() => {
    if (!isAutoplay || deviceMode === 'mobile') return;
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % recognitions.length);
    }, autoplayDelay);
    return () => clearInterval(interval);
  }, [isAutoplay, autoplayDelay, recognitions.length, deviceMode]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveIdx(prev => (prev + 1) % recognitions.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx(prev => (prev - 1 + recognitions.length) % recognitions.length);
      } else if (e.key === 'Escape' && deviceMode === 'tv') {
        setDeviceMode('desktop');
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [recognitions.length, deviceMode]);

  // Handle reaction updates
  const handleToggleReaction = (eventId: string, emoji: string) => {
    const hasReactedBefore = userHasReacted[eventId]?.[emoji];
    
    setReactionsState(prev => {
      const currentEventReactions = prev[eventId] || {};
      const delta = hasReactedBefore ? -1 : 1;
      return {
        ...prev,
        [eventId]: {
          ...currentEventReactions,
          [emoji]: Math.max(0, (currentEventReactions[emoji] || 0) + delta)
        }
      };
    });

    setUserHasReacted(prev => {
      const eventState = prev[eventId] || {};
      return {
        ...prev,
        [eventId]: {
          ...eventState,
          [emoji]: !hasReactedBefore
        }
      };
    });

    // Trigger celebratory burst on active card!
    window.dispatchEvent(new CustomEvent('celebration-trigger', {
      detail: { x: 230, y: 385 }
    }));

    // Trigger Instagram floating reactions
    window.dispatchEvent(new CustomEvent('reaction-trigger', {
      detail: { emoji, eventId }
    }));
  };

  // Trigger celebration burst when employee changes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('celebration-trigger', {
        detail: { x: 230, y: 240 }
      }));
    }, 250);
    return () => clearTimeout(timer);
  }, [activeIdx]);

  // Predefined Appreciation presets to automatically fill the appreciation message box beautifully
  const handleAutoFillMessage = (type: string, name: string, designation: string) => {
    const firstName = name.split(' ')[0];
    let msg = '';
    if (type === 'award') {
      msg = `${firstName} has demonstrated outstanding craftsmanship and absolute ownership. Their leadership has pushed our core platforms to establish new standards of premium quality and robust elegance.`;
    } else if (type === 'anniversary') {
      msg = `Honoring ${firstName} for an exceptional milestone of dedication. Their technical mastery and professional composure continue to inspire colleagues globally. Thank you for building our future.`;
    } else if (type === 'promotion') {
      msg = `Congratulations to ${firstName} on their promotion to ${designation || 'this senior role'}. Well deserved recognition for consistent execution, elegant solutions, and architectural leadership.`;
    } else {
      msg = `A warm welcome to ${firstName} as they join our ${newEmployeeDept || 'technology'} team. We are excited to collaborate, create, and launch pioneering platforms together.`;
    }
    setNewEmployeeMsg(msg);
  };

  // Add custom employee handler
  const handleAddCustomEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmployeeName.trim()) return;

    const fallbackImages = [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300'
    ];

    const newEvent: CelebrationEvent = {
      id: `custom-rec-${Date.now()}`,
      type: newEmployeeType,
      name: newEmployeeName,
      designation: newEmployeeDesignation || 'Technology Expert',
      department: newEmployeeDept || 'Platform Core',
      company: companyName,
      date: 'Today',
      achievement: newEmployeeType === 'award' ? 'Excellence Honor' : undefined,
      years: newEmployeeType === 'anniversary' ? 3 : undefined,
      image: newEmployeeImage.trim() || fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
      customMessage: newEmployeeMsg.trim() || `${newEmployeeName} is recognized for outstanding professional contributions and absolute dedication to execution standards.`
    };

    setRecognitions(prev => [...prev, newEvent]);
    setReactionsState(prev => ({
      ...prev,
      [newEvent.id]: { '🏆': 0, '👏': 0, '❤️': 0 }
    }));
    setActiveIdx(recognitions.length); // switch to newly created
    
    // Reset Form
    setNewEmployeeName('');
    setNewEmployeeDesignation('');
    setNewEmployeeDept('');
    setNewEmployeeMsg('');
    setNewEmployeeImage('');
    setIsAddingNew(false);
  };

  const activeLogo = PREMIUM_LOGOS.find(l => l.id === selectedLogoId) || PREMIUM_LOGOS[3];
  const LogoIcon = activeLogo.icon;

  return (
    <div 
      className="flex h-screen w-screen overflow-hidden text-slate-100 select-none transition-colors duration-500"
      style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}
    >
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-30 blur-[130px] transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${currentTheme.primary}4D 0%, transparent 75%)` }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-10 blur-[120px] transition-all duration-700"
          style={{ background: currentTheme.primary }}
        />
      </div>

      {/* SIDEBAR (25%) */}
      {deviceMode !== 'tv' && (
        <aside 
          className="w-1/4 min-w-[320px] max-w-[380px] h-full border-r flex flex-col overflow-hidden z-10 transition-all duration-300"
          style={{ 
            backgroundColor: currentTheme.cardBg, 
            borderColor: currentTheme.cardBorder 
          }}
        >
          {/* SIDEBAR HEADER */}
          <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: currentTheme.cardBorder }}>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-md"
                style={{ 
                  backgroundColor: currentTheme.bg, 
                  borderColor: currentTheme.cardBorder,
                  color: customAccent 
                }}
              >
                <LogoIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-wide font-display text-white">RECOGNITION</h2>
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-50">Employee Moments V3</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v3.0.0
            </div>
          </div>

          {/* ACCORDION WRAPPER (Independently Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            
            {/* 1. EXPERIENCE ACCORDION */}
            <div className="border rounded-xl overflow-hidden transition-all duration-300" style={{ borderColor: currentTheme.cardBorder, backgroundColor: currentTheme.bg }}>
              <button 
                className="w-full px-4 py-3.5 flex items-center justify-between font-display text-xs font-semibold text-white hover:bg-white/5 transition-all"
                onClick={() => setExpandedSection(expandedSection === 'experience' ? null : 'experience')}
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: customAccent }} />
                  Experience Catalog
                </span>
                {expandedSection === 'experience' ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
              
              {expandedSection === 'experience' && (
                <div className="p-3.5 border-t space-y-3" style={{ borderColor: currentTheme.cardBorder }}>
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 opacity-50" />
                    <input 
                      type="text"
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-1 bg-black/25 text-white transition-all"
                      style={{ borderColor: currentTheme.cardBorder, focusRingColor: customAccent }}
                    />
                  </div>

                  {/* Employees List */}
                  <div className="max-h-[170px] overflow-y-auto space-y-1.5 pr-1">
                    {filteredEvents.map((rec, idx) => {
                      const isActive = idx === activeIdx;
                      return (
                        <div 
                          key={rec.id}
                          onClick={() => {
                            setActiveIdx(idx);
                            setIsAutoplay(false);
                          }}
                          className={`group p-2 rounded-lg cursor-pointer flex items-center gap-3 transition-all border ${
                            isActive 
                              ? 'border-white/10 shadow-lg' 
                              : 'border-transparent hover:bg-white/5'
                          }`}
                          style={isActive ? { backgroundColor: currentTheme.cardBg } : {}}
                        >
                          <img 
                            src={rec.image} 
                            alt={rec.name} 
                            className="w-8 h-8 rounded-full object-cover border transition-transform group-hover:scale-105"
                            style={{ borderColor: isActive ? customAccent : 'transparent' }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold truncate text-white">{rec.name}</h4>
                            <p className="text-[10px] truncate opacity-60 font-medium">{rec.designation}</p>
                          </div>
                          {isActive && <Check className="w-3.5 h-3.5" style={{ color: customAccent }} />}
                        </div>
                      );
                    })}
                    {filteredEvents.length === 0 && (
                      <p className="text-[11px] text-center py-4 opacity-50">No employees found.</p>
                    )}
                  </div>

                  {/* Button to show custom creation drawer */}
                  {!isAddingNew ? (
                    <button 
                      onClick={() => {
                        setIsAddingNew(true);
                        setIsAutoplay(false);
                      }}
                      className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-center rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Add Custom Employee
                    </button>
                  ) : (
                    <div className="border rounded-xl p-3 bg-black/25 relative space-y-3.5" style={{ borderColor: currentTheme.cardBorder }}>
                      <div className="flex items-center justify-between border-b pb-1.5" style={{ borderColor: currentTheme.cardBorder }}>
                        <span className="text-[11px] uppercase font-bold tracking-wider text-white">New Recognition Card</span>
                        <button onClick={() => setIsAddingNew(false)} className="text-white hover:opacity-100 opacity-60">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <form onSubmit={handleAddCustomEmployee} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold block">Full Name *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Sarah Jenkins"
                            value={newEmployeeName}
                            onChange={(e) => setNewEmployeeName(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                            style={{ borderColor: currentTheme.cardBorder }}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-semibold block">Role Designation</label>
                            <input 
                              type="text" 
                              placeholder="Senior Designer"
                              value={newEmployeeDesignation}
                              onChange={(e) => setNewEmployeeDesignation(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                              style={{ borderColor: currentTheme.cardBorder }}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-semibold block">Department</label>
                            <input 
                              type="text" 
                              placeholder="UX Engineering"
                              value={newEmployeeDept}
                              onChange={(e) => setNewEmployeeDept(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                              style={{ borderColor: currentTheme.cardBorder }}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold block">Event Milestone Type</label>
                          <select 
                            value={newEmployeeType}
                            onChange={(e) => setNewEmployeeType(e.target.value as any)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border bg-zinc-900 text-white focus:outline-none border-white/10"
                          >
                            <option value="award">🏆 Special Award Ceremony</option>
                            <option value="anniversary">🎖️ Years of Service Anniversary</option>
                            <option value="promotion">🚀 Core Promotion Callout</option>
                            <option value="new_joiner">👋 Professional Team Welcome</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] text-slate-400 font-semibold block">Appreciation Message</label>
                            <button 
                              type="button" 
                              onClick={() => handleAutoFillMessage(newEmployeeType, newEmployeeName || 'Sarah Jenkins', newEmployeeDesignation)}
                              className="text-[9px] text-purple-400 font-bold hover:underline"
                            >
                              ✨ Auto-Craft Premium Copy
                            </button>
                          </div>
                          <textarea 
                            placeholder="Craft a highly emotional, executive recognition message..."
                            value={newEmployeeMsg}
                            onChange={(e) => setNewEmployeeMsg(e.target.value)}
                            rows={3}
                            className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none resize-none leading-relaxed"
                            style={{ borderColor: currentTheme.cardBorder }}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-semibold block">Unsplash Portrait URL (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="https://images.unsplash.com/..."
                            value={newEmployeeImage}
                            onChange={(e) => setNewEmployeeImage(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                            style={{ borderColor: currentTheme.cardBorder }}
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-2 rounded-lg text-xs font-bold text-center text-black shadow transition-all hover:opacity-90 cursor-pointer"
                          style={{ backgroundColor: customAccent }}
                        >
                          Commit Recognition to System
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. BRANDING ACCORDION */}
            <div className="border rounded-xl overflow-hidden transition-all duration-300" style={{ borderColor: currentTheme.cardBorder, backgroundColor: currentTheme.bg }}>
              <button 
                className="w-full px-4 py-3.5 flex items-center justify-between font-display text-xs font-semibold text-white hover:bg-white/5 transition-all"
                onClick={() => setExpandedSection(expandedSection === 'branding' ? null : 'branding')}
              >
                <span className="flex items-center gap-2">
                  <Landmark className="w-4 h-4" style={{ color: customAccent }} />
                  Corporate Identity
                </span>
                {expandedSection === 'branding' ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
              
              {expandedSection === 'branding' && (
                <div className="p-3.5 border-t space-y-4" style={{ borderColor: currentTheme.cardBorder }}>
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Organization Name</label>
                    <input 
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                      style={{ borderColor: currentTheme.cardBorder }}
                    />
                  </div>

                  {/* Corporate Logos Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Abstract Corporate Crest</label>
                    <div className="grid grid-cols-2 gap-2">
                      {PREMIUM_LOGOS.map((logo) => {
                        const LogoItemIcon = logo.icon;
                        const isSel = selectedLogoId === logo.id;
                        return (
                          <button 
                            key={logo.id}
                            onClick={() => setSelectedLogoId(logo.id)}
                            className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                              isSel 
                                ? 'bg-white/5 border-white/20' 
                                : 'border-transparent hover:bg-white/5'
                            }`}
                          >
                            <LogoItemIcon className="w-4 h-4" style={isSel ? { color: customAccent } : {}} />
                            <span className={`text-[10px] font-bold tracking-wide ${isSel ? 'text-white' : 'text-slate-400'}`}>{logo.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accent Color Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Ceremonial Accent Highlight</label>
                    <div className="flex items-center gap-2">
                      {[
                        { hex: '#D4AF37', name: 'Imperial Gold' },
                        { hex: '#7B61FF', name: 'Royal Indigo' },
                        { hex: '#10B981', name: 'Jade Emerald' },
                        { hex: '#EF4444', name: 'Crimson Rose' },
                        { hex: '#FFFFFF', name: 'Obsidian Silver' }
                      ].map((pal) => {
                        const isS = customAccent === pal.hex;
                        return (
                          <button 
                            key={pal.hex}
                            onClick={() => setCustomAccent(pal.hex)}
                            title={pal.name}
                            className={`w-7 h-7 rounded-full border transition-all cursor-pointer relative ${
                              isS ? 'scale-110 ring-2 ring-white/25' : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: pal.hex, borderColor: 'rgba(255,255,255,0.1)' }}
                          >
                            {isS && <Check className="w-3.5 h-3.5 absolute inset-0 m-auto" style={{ color: pal.hex === '#FFFFFF' ? '#000000' : '#FFFFFF' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. RECOGNITION ACCORDION */}
            <div className="border rounded-xl overflow-hidden transition-all duration-300" style={{ borderColor: currentTheme.cardBorder, backgroundColor: currentTheme.bg }}>
              <button 
                className="w-full px-4 py-3.5 flex items-center justify-between font-display text-xs font-semibold text-white hover:bg-white/5 transition-all"
                onClick={() => setExpandedSection(expandedSection === 'recognition' ? null : 'recognition')}
              >
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" style={{ color: customAccent }} />
                  Ceremonial Metadata
                </span>
                {expandedSection === 'recognition' ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
              
              {expandedSection === 'recognition' && (
                <div className="p-3.5 border-t space-y-3.5" style={{ borderColor: currentTheme.cardBorder }}>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Award / Milestone Title</label>
                    <input 
                      type="text"
                      value={activeEvent.achievement || (activeEvent.type === 'anniversary' ? `${activeEvent.years} Years of Dedication` : 'Outstanding Contributor')}
                      onChange={(e) => {
                        const updatedVal = e.target.value;
                        setRecognitions(prev => prev.map((item, idx) => 
                          idx === activeIdx 
                            ? { ...item, achievement: updatedVal, years: item.type === 'anniversary' ? parseInt(updatedVal) || item.years : undefined } 
                            : item
                        ));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                      style={{ borderColor: currentTheme.cardBorder }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Role & Designation</label>
                    <input 
                      type="text"
                      value={activeEvent.designation || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRecognitions(prev => prev.map((item, idx) => 
                          idx === activeIdx ? { ...item, designation: val } : item
                        ));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                      style={{ borderColor: currentTheme.cardBorder }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Department</label>
                    <input 
                      type="text"
                      value={activeEvent.department || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRecognitions(prev => prev.map((item, idx) => 
                          idx === activeIdx ? { ...item, department: val } : item
                        ));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none"
                      style={{ borderColor: currentTheme.cardBorder }}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Appreciation Message Statement</label>
                    <textarea 
                      value={activeEvent.customMessage || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRecognitions(prev => prev.map((item, idx) => 
                          idx === activeIdx ? { ...item, customMessage: val } : item
                        ));
                      }}
                      rows={4}
                      className="w-full px-2.5 py-1.5 text-xs rounded border bg-black/20 text-white focus:outline-none resize-none leading-relaxed"
                      style={{ borderColor: currentTheme.cardBorder }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 4. MOTION ACCORDION */}
            <div className="border rounded-xl overflow-hidden transition-all duration-300" style={{ borderColor: currentTheme.cardBorder, backgroundColor: currentTheme.bg }}>
              <button 
                className="w-full px-4 py-3.5 flex items-center justify-between font-display text-xs font-semibold text-white hover:bg-white/5 transition-all"
                onClick={() => setExpandedSection(expandedSection === 'motion' ? null : 'motion')}
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4" style={{ color: customAccent }} />
                  Motion & Physics (3D)
                </span>
                {expandedSection === 'motion' ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
              
              {expandedSection === 'motion' && (
                <div className="p-3.5 border-t space-y-4" style={{ borderColor: currentTheme.cardBorder }}>
                  
                  {/* Tilt Angle slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>Maximum 3D Tilt</span>
                      <span className="font-mono text-white">{tiltLimit}°</span>
                    </div>
                    <input 
                      type="range"
                      min={2}
                      max={12}
                      value={tiltLimit}
                      onChange={(e) => setTiltLimit(parseInt(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <span className="text-[9px] opacity-40 block text-slate-400">Maximum perspective rotation applied on mouse-based hover.</span>
                  </div>

                  {/* Parallax depth slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
                      <span>Parallax Depth Layering</span>
                      <span className="font-mono text-white">{parallaxIntensity}px</span>
                    </div>
                    <input 
                      type="range"
                      min={0}
                      max={15}
                      value={parallaxIntensity}
                      onChange={(e) => setParallaxIntensity(parseInt(e.target.value))}
                      className="w-full accent-purple-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                    <span className="text-[9px] opacity-40 block text-slate-400">Offset separation applied to image and text layers in 3D.</span>
                  </div>

                  {/* Gold dust particles */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ambient Gold Dust</span>
                    <button 
                      onClick={() => setParticlesEnabled(!particlesEnabled)}
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 cursor-pointer ${
                        particlesEnabled ? 'bg-purple-600' : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-300 ${
                        particlesEnabled ? 'left-5.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Floating Balloons */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Ambient Card Balloons</span>
                    <button 
                      onClick={() => setBalloonsEnabled(!balloonsEnabled)}
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 cursor-pointer ${
                        balloonsEnabled ? 'bg-purple-600' : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-300 ${
                        balloonsEnabled ? 'left-5.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Floating Geometric Artifacts */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Floating Card Artifacts</span>
                    <button 
                      onClick={() => setArtifactsEnabled(!artifactsEnabled)}
                      className={`relative w-10 h-5 rounded-full transition-all duration-300 cursor-pointer ${
                        artifactsEnabled ? 'bg-purple-600' : 'bg-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all duration-300 ${
                        artifactsEnabled ? 'left-5.5' : 'left-0.5'
                      }`} />
                    </button>
                  </div>

                  {/* Dynamic sweeping lighting */}
                  <div className="space-y-1.5 pb-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Spotlight Movement Rate</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['static', 'slow', 'normal'].map((speed) => {
                        const isAct = spotlightSpeed === speed;
                        return (
                          <button 
                            key={speed}
                            onClick={() => setSpotlightSpeed(speed as any)}
                            className={`py-1 text-[9px] font-bold uppercase rounded border transition-all cursor-pointer ${
                              isAct 
                                ? 'bg-white/5 border-white/20 text-white' 
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {speed}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Celebration Trigger */}
                  <div className="space-y-1.5 pt-1.5 border-t" style={{ borderColor: currentTheme.cardBorder }}>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Ceremonial Effects</label>
                    <button
                      type="button"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('celebration-trigger', {
                          detail: { x: 170, y: 240 }
                        }));
                      }}
                      className="w-full py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 rounded-lg text-[10px] font-bold text-black uppercase tracking-wider shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      <span>✨ Trigger Starburst</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 5. DISPLAY ACCORDION */}
            <div className="border rounded-xl overflow-hidden transition-all duration-300" style={{ borderColor: currentTheme.cardBorder, backgroundColor: currentTheme.bg }}>
              <button 
                className="w-full px-4 py-3.5 flex items-center justify-between font-display text-xs font-semibold text-white hover:bg-white/5 transition-all"
                onClick={() => setExpandedSection(expandedSection === 'display' ? null : 'display')}
              >
                <span className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" style={{ color: customAccent }} />
                  Theme presets & Screens
                </span>
                {expandedSection === 'display' ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
              
              {expandedSection === 'display' && (
                <div className="p-3.5 border-t space-y-4" style={{ borderColor: currentTheme.cardBorder }}>
                  
                  {/* Luxury Theme Presets List */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Luxury Material Preset</label>
                    <div className="space-y-1.5">
                      {THEME_PRESETS.map((t) => {
                        const isT = activeThemeId === t.id;
                        return (
                          <button 
                            key={t.id}
                            onClick={() => setActiveThemeId(t.id)}
                            className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                              isT 
                                ? 'border-white/20 bg-white/5 text-white shadow-lg' 
                                : 'border-transparent text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-xs font-bold font-display">{t.name}</span>
                            <div className="flex items-center gap-1">
                              <div className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: t.bg }} />
                              <div className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: t.cardBg }} />
                              <div className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ backgroundColor: t.accent }} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Template Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Card Layout Template</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'executive_crest', name: 'Executive Crest', icon: Trophy, desc: 'Centered ceremonial look' },
                        { id: 'horizontal_split', name: 'Horizontal Split', icon: Columns, desc: 'Left portrait, right info' },
                        { id: 'polaroid_spotlight', name: 'Hero Polaroid', icon: Image, desc: 'Handcrafted tactile borders' },
                        { id: 'minimalist_editorial', name: 'Minimal Editorial', icon: LayoutGrid, desc: 'Asymmetric bold layout' }
                      ].map((tpl) => {
                        const isS = cardTemplate === tpl.id;
                        const TplIcon = tpl.icon;
                        return (
                          <button 
                            key={tpl.id}
                            onClick={() => setCardTemplate(tpl.id as any)}
                            className={`p-2 rounded-lg border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                              isS 
                                ? 'bg-white/5 border-white/20 text-white shadow-lg' 
                                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 font-bold">
                              <TplIcon className="w-3.5 h-3.5" style={isS ? { color: customAccent } : {}} />
                              <span className="text-[10px]">{tpl.name}</span>
                            </div>
                            <span className="text-[8px] opacity-50 block leading-tight">{tpl.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Device Modes Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Device Layout Viewport</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'desktop', name: 'Desktop Workspace', icon: Monitor },
                        { id: 'tv', name: 'TV / Event Stage', icon: Tv },
                        { id: 'presentation', name: '16:9 Presentation', icon: Maximize2 },
                        { id: 'mobile', name: 'Mobile Handset', icon: Smartphone },
                        { id: 'tablet', name: 'iPad / Tablet', icon: Tablet },
                        { id: 'billboard', name: 'Lobby Billboard (9:16)', icon: Award }
                      ].map((dev) => {
                        const isD = deviceMode === dev.id;
                        const DevIcon = dev.icon;
                        return (
                          <button 
                            key={dev.id}
                            onClick={() => {
                              setDeviceMode(dev.id as any);
                              if (dev.id === 'tv') {
                                setIsAutoplay(true);
                              }
                            }}
                            className={`p-2 rounded-lg border flex items-center gap-2 transition-all cursor-pointer ${
                              isD 
                                ? 'bg-white/5 border-white/20 text-white' 
                                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                            }`}
                          >
                            <DevIcon className="w-3.5 h-3.5" style={isD ? { color: customAccent } : {}} />
                            <span className="text-[10px] font-bold">{dev.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 6. DEVELOPER SDK INTEGRATION ACCORDION */}
            <div className="border rounded-xl overflow-hidden transition-all duration-300" style={{ borderColor: currentTheme.cardBorder, backgroundColor: currentTheme.bg }}>
              <button 
                className="w-full px-4 py-3.5 flex items-center justify-between font-display text-xs font-semibold text-white hover:bg-white/5 transition-all"
                onClick={() => setExpandedSection(expandedSection === 'developer' ? null : 'developer')}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" style={{ color: customAccent }} />
                  Developer SDK Integration
                </span>
                {expandedSection === 'developer' ? <ChevronDown className="w-4 h-4 opacity-70" /> : <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
              
              {expandedSection === 'developer' && (
                <div className="p-3.5 border-t space-y-3.5" style={{ borderColor: currentTheme.cardBorder }}>
                  <p className="text-[10px] leading-relaxed text-slate-400">
                    Embed these premium cards, carousels, or recognition walls directly in your portal using our React modules or Custom Web Elements.
                  </p>

                  {/* Dev Tabs */}
                  <div className="flex border-b border-white/5 pb-1">
                    {(['react', 'webcomponent', 'props'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setDevTab(tab)}
                        className={`flex-1 pb-1 text-[9px] uppercase font-black tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                          devTab === tab
                            ? 'text-white border-purple-500'
                            : 'text-slate-500 border-transparent hover:text-slate-300'
                        }`}
                      >
                        {tab === 'react' ? 'React Component' : tab === 'webcomponent' ? 'Web Component' : 'SDK Schema'}
                      </button>
                    ))}
                  </div>

                  {/* Code Snippet Displays */}
                  <div className="space-y-2">
                    {devTab === 'react' && (
                      <div className="relative group">
                        <button
                          onClick={() => handleCopyCode(
`import { CelebrationCard } from 'employee-moments-sdk';

// Render the 3D-tilt award card:
<CelebrationCard
  event={{
    name: "${activeEvent.name}",
    designation: "${activeEvent.designation}",
    department: "${activeEvent.department}",
    achievement: "${activeEvent.achievement || ''}"
  }}
  theme="${activeThemeId}"
  cardTemplate="${cardTemplate}"
  isActive={true}
  particlesEnabled={${particlesEnabled}}
  customAccent="${customAccent}"
/>`, 'react'
                          )}
                          className="absolute right-2 top-2 p-1.5 rounded bg-zinc-900/80 hover:bg-zinc-800 text-[9px] font-bold text-slate-300 flex items-center gap-1 border border-white/5 transition-all cursor-pointer z-10"
                        >
                          {copiedText === 'react' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          <span>{copiedText === 'react' ? 'Copied' : 'Copy'}</span>
                        </button>
                        <pre className="text-[10px] font-mono text-slate-300 p-2.5 bg-black/40 rounded-lg overflow-x-auto select-text leading-normal max-h-[190px]">
{`import { CelebrationCard } from 'employee-moments-sdk';

<CelebrationCard
  event={{
    name: "${activeEvent.name}",
    designation: "${activeEvent.designation}",
    department: "${activeEvent.department}",
    achievement: "${activeEvent.achievement || ''}"
  }}
  theme="${activeThemeId}"
  cardTemplate="${cardTemplate}"
  isActive={true}
  particlesEnabled={${particlesEnabled}}
  customAccent="${customAccent}"
/>`}
                        </pre>
                      </div>
                    )}

                    {devTab === 'webcomponent' && (
                      <div className="relative group">
                        <button
                          onClick={() => handleCopyCode(
`<!-- 1. Include script -->
<script src="dist/index.js"></script>

<!-- 2. Declare element with attributes -->
<employee-moments-card
  theme="${activeThemeId}"
  card-template="${cardTemplate}"
  locale="en"
  event='{
    "name": "${activeEvent.name}",
    "designation": "${activeEvent.designation}",
    "department": "${activeEvent.department}",
    "achievement": "${activeEvent.achievement || ''}"
  }'
></employee-moments-card>`, 'webcomp'
                          )}
                          className="absolute right-2 top-2 p-1.5 rounded bg-zinc-900/80 hover:bg-zinc-800 text-[9px] font-bold text-slate-300 flex items-center gap-1 border border-white/5 transition-all cursor-pointer z-10"
                        >
                          {copiedText === 'webcomp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          <span>{copiedText === 'webcomp' ? 'Copied' : 'Copy'}</span>
                        </button>
                        <pre className="text-[10px] font-mono text-slate-300 p-2.5 bg-black/40 rounded-lg overflow-x-auto select-text leading-normal max-h-[190px]">
{`<!-- 1. Include script -->
<script src="dist/index.js"></script>

<!-- 2. Declare element with attributes -->
<employee-moments-card
  theme="${activeThemeId}"
  card-template="${cardTemplate}"
  locale="en"
  event='{
    "name": "${activeEvent.name}",
    "designation": "${activeEvent.designation}",
    "department": "${activeEvent.department}",
    "achievement": "${activeEvent.achievement || ''}"
  }'
></employee-moments-card>`}
                        </pre>
                      </div>
                    )}

                    {devTab === 'props' && (
                      <div className="relative group">
                        <button
                          onClick={() => handleCopyCode(
`interface CardProps {
  event: {
    id: string;          // Identifier
    name: string;        // Full Name
    designation: string; // Job Title
    department: string;  // Department Name
    achievement: string; // Honors/Awards
    image?: string;      // Profile portrait
  };
  theme: 'executive_dark' | 'corporate' | 'golden_jubilee';
  tiltLimit: number;     // 3D tilt degree (2-12)
  particlesEnabled: boolean; // Gold dust overlay
  spotlightSpeed: 'slow' | 'normal' | 'static';
}`, 'props'
                          )}
                          className="absolute right-2 top-2 p-1.5 rounded bg-zinc-900/80 hover:bg-zinc-800 text-[9px] font-bold text-slate-300 flex items-center gap-1 border border-white/5 transition-all cursor-pointer z-10"
                        >
                          {copiedText === 'props' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                          <span>{copiedText === 'props' ? 'Copied' : 'Copy'}</span>
                        </button>
                        <pre className="text-[10px] font-mono text-slate-300 p-2.5 bg-black/40 rounded-lg overflow-x-auto select-text leading-normal max-h-[190px]">
{`interface CardProps {
  event: {
    id: string;          // Identifier
    name: string;        // Full Name
    designation: string; // Job Title
    department: string;  // Department Name
    achievement: string; // Honors/Awards
    image?: string;      // Profile portrait
  };
  theme: 'executive_dark' | 'corporate' | 'golden_jubilee';
  tiltLimit: number;     // 3D tilt degree (2-12)
  particlesEnabled: boolean; // Gold dust overlay
  spotlightSpeed: 'slow' | 'normal' | 'static';
}`}
                        </pre>
                      </div>
                    )}
                  </div>

                  <div className="p-2 rounded bg-purple-500/10 border border-purple-500/15 text-[9px] text-purple-200 leading-normal">
                    💡 <strong>Custom Elements registered:</strong> elements auto-register globally for vanilla applications when including <code>web-components.js</code>.
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* SIDEBAR FOOTER CARD */}
          <div className="p-4 border-t flex flex-col gap-2" style={{ borderColor: currentTheme.cardBorder }}>
            <div className="flex items-center gap-2.5 opacity-60 text-slate-400">
              <Star className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider font-display">Executive System Panel</span>
            </div>
            <p className="text-[10px] leading-relaxed text-slate-400 opacity-50">
              The employee recognition experience dominates the stage layout. Designed for award walls, annual presentation ceremonies, and TV lobbies.
            </p>
          </div>
        </aside>
      )}

      {/* RECOGNITION STAGE (75%) */}
      <main className="flex-1 h-full overflow-hidden flex flex-col relative z-10">
        
        {/* TOPBAR OVERLAY */}
        {deviceMode !== 'tv' && (
          <header 
            className="px-6 py-4 border-b flex items-center justify-between z-10 transition-colors duration-500"
            style={{ 
              backgroundColor: currentTheme.cardBg, 
              borderColor: currentTheme.cardBorder 
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono tracking-widest uppercase opacity-40">System Dashboard</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-white font-display">Currently Honoring:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-white/5 border border-white/5 text-purple-300 shadow-sm">
                  {activeEvent.name}
                </span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 transition-all cursor-pointer"
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5 text-purple-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isAutoplay ? 'Autoplay Active' : 'Autoplay Paused'}</span>
              </button>

              <div className="flex items-center gap-1 bg-black/25 p-1 rounded-lg border border-white/5 text-xs text-slate-400 font-bold">
                <button 
                  onClick={() => {
                    setActiveIdx(prev => (prev - 1 + recognitions.length) % recognitions.length);
                    setIsAutoplay(false);
                  }}
                  className="px-2 py-1 hover:text-white rounded transition-all cursor-pointer"
                >
                  Prev
                </button>
                <span className="px-1 text-[10px] font-mono text-slate-300">
                  {activeIdx + 1} / {recognitions.length}
                </span>
                <button 
                  onClick={() => {
                    setActiveIdx(prev => (prev + 1) % recognitions.length);
                    setIsAutoplay(false);
                  }}
                  className="px-2 py-1 hover:text-white rounded transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>

              {/* Quick TV Launch trigger */}
              <button 
                onClick={() => {
                  setDeviceMode('tv');
                  setIsAutoplay(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-black text-white shadow-lg transition-all cursor-pointer"
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Launch TV Ceremony</span>
              </button>
            </div>
          </header>
        )}

        {/* FLOATING EXIT OPTION FOR TV MODE */}
        {deviceMode === 'tv' && (
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
            <div className="flex items-center gap-3.5">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-2xl bg-black/40 backdrop-blur-md"
                style={{ borderColor: 'rgba(212, 175, 55, 0.2)', color: customAccent }}
              >
                <LogoIcon className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold tracking-widest text-white font-display uppercase">Nexus Recognition Ceremony</h2>
                <p className="text-[10px] font-mono tracking-wider opacity-60 uppercase text-amber-200">Broadcast TV Stream Node</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setDeviceMode('desktop');
                setIsAutoplay(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-black/60 hover:bg-black/80 border border-white/10 rounded-xl text-xs font-black text-white shadow-2xl transition-all pointer-events-auto cursor-pointer hover:scale-105"
            >
              <Monitor className="w-4 h-4 text-purple-400" />
              <span>Exit Ceremonial Mode (ESC)</span>
            </button>
          </div>
        )}

        {/* ACTIVE STAGE VIEWPORT (Min height: 700px, centering our gorgeous 3D card) */}
        <div 
          className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 min-h-[700px] overflow-hidden relative"
          style={{ cursor: deviceMode === 'tv' ? 'none' : 'default' }}
        >
          {/* STAGE LIGHTING OVERLAYS */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Soft background subtle sweeps */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%]"
              style={{
                height: '100%',
                background: `radial-gradient(circle 500px at 50% 50%, ${currentTheme.glow}, transparent 85%)`,
                opacity: 0.85
              }}
            />
            {/* Cinematic light beam */}
            {deviceMode === 'tv' && (
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[900px] pointer-events-none opacity-40 blur-[90px]"
                style={{
                  background: `conic-gradient(from 180deg at 50% 0deg, transparent 40%, ${currentTheme.primary}88 48%, #ffffffAA 50%, ${currentTheme.primary}88 52%, transparent 60%)`,
                  animation: 'spin 40s linear infinite'
                }}
              />
            )}
          </div>

          {/* DEVICE FRAME EMULATOR WRAPPERS */}
          <div className="w-full h-full max-w-6xl mx-auto flex flex-col items-center justify-center z-10">
            
            {/* EMBEDDED PHONE DEVICE FRAME */}
            {deviceMode === 'mobile' ? (
              <div className="w-[340px] h-[670px] rounded-[48px] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col overflow-hidden relative ring-4 ring-purple-600/10">
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                  <div className="w-8 h-1 rounded bg-zinc-900 ml-4" />
                </div>
                {/* Embedded Stage Content for Mobile */}
                <div className="flex-1 p-4 pt-10 flex flex-col justify-between overflow-y-auto" style={{ backgroundColor: currentTheme.bg }}>
                  <div className="flex items-center justify-between opacity-50 mb-3 text-[9px] font-mono uppercase tracking-widest">
                    <span>{companyName}</span>
                    <span>{activeEvent.date}</span>
                  </div>
                  
                  {/* Reduced compact card rendering */}
                  <div className="flex-1 flex flex-col justify-center relative">
                    <PremiumAwardCard 
                      event={activeEvent}
                      currentTheme={currentTheme}
                      logoIcon={LogoIcon}
                      companyName={companyName}
                      customAccent={customAccent}
                      tiltLimit={0} // No tilt in mobile frame for viewport stability
                      particlesEnabled={particlesEnabled}
                      balloonsEnabled={balloonsEnabled}
                      artifactsEnabled={artifactsEnabled}
                      spotlightSpeed={spotlightSpeed}
                      parallaxIntensity={0}
                      cardTemplate={cardTemplate}
                    />
                    <FloatingReactions eventId={activeEvent.id} />
                  </div>

                  {/* Reaction counters for Mobile */}
                  <div className="mt-4">
                    <PremiumReactionPills 
                      eventId={activeEvent.id}
                      reactions={reactionsState[activeEvent.id] || {}}
                      userHasReacted={userHasReacted[activeEvent.id] || {}}
                      onReact={(emoji) => handleToggleReaction(activeEvent.id, emoji)}
                      currentTheme={currentTheme}
                      customAccent={customAccent}
                    />
                  </div>
                </div>
              </div>
            ) : deviceMode === 'presentation' ? (
              /* widescreen slide layout (16:9) */
              <div 
                className="w-full max-w-5xl aspect-video rounded-2xl border flex flex-col overflow-hidden shadow-2xl relative"
                style={{ 
                  backgroundColor: currentTheme.cardBg, 
                  borderColor: currentTheme.cardBorder 
                }}
              >
                {/* Slide Top Details */}
                <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: currentTheme.cardBorder }}>
                  <div className="flex items-center gap-3">
                    <LogoIcon className="w-4 h-4" style={{ color: customAccent }} />
                    <span className="text-xs font-mono font-extrabold tracking-widest text-white uppercase">{companyName} Presentations</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Milestone Slide {activeIdx + 1} of {recognitions.length}</span>
                </div>

                <div className="flex-1 flex items-center p-8 gap-8">
                  {/* Left Half: Card Design */}
                  <div className="w-1/2 flex items-center justify-center">
                    <div className="w-full max-w-sm relative">
                      <PremiumAwardCard 
                        event={activeEvent}
                        currentTheme={currentTheme}
                        logoIcon={LogoIcon}
                        companyName={companyName}
                        customAccent={customAccent}
                        tiltLimit={tiltLimit}
                        particlesEnabled={particlesEnabled}
                        balloonsEnabled={balloonsEnabled}
                        artifactsEnabled={artifactsEnabled}
                        spotlightSpeed={spotlightSpeed}
                        parallaxIntensity={parallaxIntensity}
                        hideMessage={true}
                        cardTemplate={cardTemplate}
                      />
                      <FloatingReactions eventId={activeEvent.id} />
                    </div>
                  </div>

                  {/* Right Half: Details Presentation */}
                  <div className="w-1/2 flex flex-col justify-center space-y-6 text-left">
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono font-extrabold tracking-widest text-amber-400 uppercase">
                        {activeEvent.type === 'award' ? '🏆 Outstanding Honor' : activeEvent.type === 'anniversary' ? '🎖️ Work Milestone' : activeEvent.type === 'promotion' ? '🚀 Strategic Promotion' : '👋 Welcome Team Member'}
                      </span>
                      <h1 className="text-4xl font-extrabold tracking-tight font-display text-white">
                        {activeEvent.name}
                      </h1>
                      <p className="text-md uppercase font-bold tracking-wider opacity-75" style={{ color: customAccent }}>
                        {activeEvent.designation} <span className="opacity-40 text-slate-400 font-medium">•</span> {activeEvent.department}
                      </p>
                    </div>

                    <p className="text-lg leading-relaxed text-slate-300 font-light italic">
                      "{activeEvent.customMessage || activeEvent.achievement}"
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <PremiumReactionPills 
                        eventId={activeEvent.id}
                        reactions={reactionsState[activeEvent.id] || {}}
                        userHasReacted={userHasReacted[activeEvent.id] || {}}
                        onReact={(emoji) => handleToggleReaction(activeEvent.id, emoji)}
                        currentTheme={currentTheme}
                        customAccent={customAccent}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : deviceMode === 'tablet' ? (
              /* Sleek iPad / Tablet Portrait Frame */
              <div className="w-[480px] h-[640px] rounded-[36px] border-[12px] border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col overflow-hidden relative ring-4 ring-purple-600/10">
                {/* Status Bar */}
                <div className="px-6 py-2 bg-zinc-900 flex items-center justify-between text-white/50 text-[10px] font-mono border-b border-zinc-800">
                  <span>9:41 AM</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[8px] bg-white/20 px-1 rounded">iPadOS</span>
                    <div className="w-4 h-2 bg-white/30 rounded-sm" />
                  </div>
                </div>
                {/* Embedded Stage Content for Tablet */}
                <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto" style={{ backgroundColor: currentTheme.bg }}>
                  <div className="flex items-center justify-between opacity-50 mb-3 text-[10px] font-mono uppercase tracking-widest text-white">
                    <span>{companyName} Interactive Tablet</span>
                    <span>{activeEvent.date}</span>
                  </div>
                  
                  {/* Compact card rendering */}
                  <div className="flex-1 flex flex-col justify-center max-w-[340px] mx-auto w-full relative">
                    <PremiumAwardCard 
                      event={activeEvent}
                      currentTheme={currentTheme}
                      logoIcon={LogoIcon}
                      companyName={companyName}
                      customAccent={customAccent}
                      tiltLimit={tiltLimit * 0.8}
                      particlesEnabled={particlesEnabled}
                      balloonsEnabled={balloonsEnabled}
                      artifactsEnabled={artifactsEnabled}
                      spotlightSpeed={spotlightSpeed}
                      parallaxIntensity={parallaxIntensity * 0.8}
                      cardTemplate={cardTemplate}
                    />
                    <FloatingReactions eventId={activeEvent.id} />
                  </div>

                  {/* Reaction counters for Tablet */}
                  <div className="mt-4">
                    <PremiumReactionPills 
                      eventId={activeEvent.id}
                      reactions={reactionsState[activeEvent.id] || {}}
                      userHasReacted={userHasReacted[activeEvent.id] || {}}
                      onReact={(emoji) => handleToggleReaction(activeEvent.id, emoji)}
                      currentTheme={currentTheme}
                      customAccent={customAccent}
                    />
                  </div>
                </div>
              </div>
            ) : deviceMode === 'billboard' ? (
              /* Freestanding Corporate Lobby Signage / Billboard (9:16) */
              <div className="w-[360px] h-[640px] bg-black border-[6px] border-zinc-800 shadow-3xl flex flex-col relative rounded-xl overflow-hidden ring-4 ring-amber-500/10">
                {/* Lobby Signage Header */}
                <div className="px-4 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between z-20">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-300">LOBBY BROADCAST LIVE</span>
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 font-bold">Portrait Signage</span>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-5 flex flex-col justify-between relative overflow-hidden text-center" style={{ backgroundColor: currentTheme.bg }}>
                  {/* Subtle Grid Backdrop for Signage */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between opacity-50 text-[9px] font-mono uppercase tracking-widest text-white relative z-10">
                    <span>{companyName} HQ</span>
                    <span>{activeEvent.date}</span>
                  </div>

                  {/* Card Centering */}
                  <div className="flex-1 flex flex-col justify-center relative z-10 max-w-[300px] mx-auto w-full">
                    <PremiumAwardCard 
                      event={activeEvent}
                      currentTheme={currentTheme}
                      logoIcon={LogoIcon}
                      companyName={companyName}
                      customAccent={customAccent}
                      tiltLimit={tiltLimit}
                      particlesEnabled={particlesEnabled}
                      balloonsEnabled={balloonsEnabled}
                      artifactsEnabled={artifactsEnabled}
                      spotlightSpeed={spotlightSpeed}
                      parallaxIntensity={parallaxIntensity}
                      cardTemplate={cardTemplate}
                    />
                    <FloatingReactions eventId={activeEvent.id} />
                  </div>

                  {/* Bottom Stats Banner */}
                  <div className="p-3.5 rounded-xl border relative z-10 backdrop-blur-md text-left space-y-2 mt-3" style={{ backgroundColor: `${currentTheme.cardBg}CC`, borderColor: currentTheme.cardBorder }}>
                    <p className="text-[10px] font-mono font-extrabold tracking-widest text-amber-400 uppercase">
                      🎉 LOBBY CELEBRATION
                    </p>
                    <p className="text-xs text-white leading-relaxed font-light">
                      Join us in honoring <strong className="font-bold">{activeEvent.name}</strong> for their outstanding contributions and milestone achievements!
                    </p>
                    <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-t pt-1.5 mt-1" style={{ borderColor: currentTheme.cardBorder }}>
                      <span>HQ Display Node</span>
                      <span className="text-white font-bold">Tap screen to applaud</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* STANDARD DESKTOP OR FULL SCREEN TV CEREMONY CARDS */
              <div className="w-full flex flex-col items-center justify-center space-y-6">
                
                {/* TV Mode Ceremony Tagline */}
                {deviceMode === 'tv' && (
                  <div className="mb-4 text-center space-y-1.5 animate-pulse">
                    <span className="text-xs font-mono font-black tracking-[0.3em] text-amber-400 uppercase">
                      EXECUTIVE EMPLOYEE RECOGNITION CEREMONY
                    </span>
                    <p className="text-xs text-slate-400 font-light">Honoring leadership, consistent performance, and corporate values.</p>
                  </div>
                )}

                {/* THE MAIN PREMIUM 3D TILT CARD */}
                <div className="w-full max-w-[460px] relative">
                  <PremiumAwardCard 
                    event={activeEvent}
                    currentTheme={currentTheme}
                    logoIcon={LogoIcon}
                    companyName={companyName}
                    customAccent={customAccent}
                    tiltLimit={tiltLimit}
                    particlesEnabled={particlesEnabled}
                    balloonsEnabled={balloonsEnabled}
                    artifactsEnabled={artifactsEnabled}
                    spotlightSpeed={spotlightSpeed}
                    parallaxIntensity={parallaxIntensity}
                    cardTemplate={cardTemplate}
                  />
                  <FloatingReactions eventId={activeEvent.id} />
                </div>

                {/* REACTIONS PILLS & SYSTEM TIMELINE FEED */}
                {deviceMode !== 'tv' ? (
                  <div className="w-full max-w-[460px] space-y-4 pt-2">
                    {/* Reaction Bar */}
                    <PremiumReactionPills 
                      eventId={activeEvent.id}
                      reactions={reactionsState[activeEvent.id] || {}}
                      userHasReacted={userHasReacted[activeEvent.id] || {}}
                      onReact={(emoji) => handleToggleReaction(activeEvent.id, emoji)}
                      currentTheme={currentTheme}
                      customAccent={customAccent}
                    />

                    {/* Timeline Feed Logs (Convert logs into a minimal executive activity feed) */}
                    <div 
                      className="rounded-xl border p-4 text-left space-y-3 shadow-md"
                      style={{ 
                        backgroundColor: currentTheme.cardBg, 
                        borderColor: currentTheme.cardBorder 
                      }}
                    >
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block border-b pb-1.5" style={{ borderColor: currentTheme.cardBorder }}>
                        Ceremonial System Timeline
                      </span>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Employee Award Published</p>
                            <p className="text-[10px] text-slate-400">Committed to organizational ledger and distributed to global dashboards.</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                            <Heart className="w-3.5 h-3.5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">
                              {Object.values(reactionsState[activeEvent.id] || {}).reduce((a: number, b: any) => a + (Number(b) || 0), 0)} Colleagues Appreciated
                            </p>
                            <p className="text-[10px] text-slate-400">Direct executive feedback logged via platform counters.</p>
                          </div>
                        </div>

                        {activeEvent.type === 'anniversary' && (
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Star className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">{activeEvent.years} Years of Service</p>
                              <p className="text-[10px] text-slate-400">Milestone completed and added to legacy wall.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Floating footer for TV Mode */
                  <div className="text-center pt-4 animate-bounce">
                    <p className="text-[11px] font-mono tracking-widest text-slate-500">SYSTEM ROTATING AUTOMATICALLY • NEXT SLIDE IN 6S</p>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}

// ==========================================
// THE ULTRA-PREMIUM 3D PARALLAX AWARD CARD
// ==========================================
interface CardProps {
  event: CelebrationEvent;
  currentTheme: PresetTheme;
  logoIcon: React.ComponentType<{ className?: string }>;
  companyName: string;
  customAccent: string;
  tiltLimit: number;
  particlesEnabled: boolean;
  balloonsEnabled?: boolean;
  artifactsEnabled?: boolean;
  spotlightSpeed: 'slow' | 'normal' | 'static';
  parallaxIntensity: number;
  hideMessage?: boolean;
  cardTemplate?: 'executive_crest' | 'horizontal_split' | 'polaroid_spotlight' | 'minimalist_editorial';
}

function PremiumAwardCard({
  event,
  currentTheme,
  logoIcon: LogoIcon,
  companyName,
  customAccent,
  tiltLimit,
  particlesEnabled,
  balloonsEnabled = true,
  artifactsEnabled = true,
  spotlightSpeed,
  parallaxIntensity,
  hideMessage = false,
  cardTemplate = 'executive_crest'
}: CardProps) {
  
  const cardRef = useRef<HTMLDivElement | null>(null);
  
  // Local state for tracking mouse positions for real-time card tilt & light spotlight glow
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Handle Mouse movement on card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!cardRef.current || tiltLimit === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Position of mouse inside card bounds
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percent coordinates
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    setCoords({ x: px, y: py });

    // Rotate bounds: max tiltLimit degrees
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * tiltLimit;
    const rx = -((y - rect.height / 2) / (rect.height / 2)) * tiltLimit;
    setRot({ x: rx, y: ry });
  };

  // Reset positions on Mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 50, y: 50 });
    setRot({ x: 0, y: 0 });
  };

  // Generate initials fallback if no photo
  const initials = useMemo(() => {
    return event.name
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [event.name]);

  // Translate vectors for 3D parallax layers
  const translationVector = useMemo(() => {
    if (rot.x === 0 && rot.y === 0) return { x: 0, y: 0 };
    // calculate layer shift relative to rotation
    return {
      x: (rot.y / tiltLimit) * parallaxIntensity,
      y: -(rot.x / tiltLimit) * parallaxIntensity
    };
  }, [rot, tiltLimit, parallaxIntensity]);

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full aspect-[3/4.2] rounded-[24px] border relative overflow-hidden"
      style={{
        backgroundColor: currentTheme.cardBg,
        borderColor: currentTheme.cardBorder,
        boxShadow: `0 30px 65px -15px rgba(0, 0, 0, 0.65), 0 0 45px -5px ${currentTheme.glow}`,
        transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: isHovered 
          ? 'transform 0.08s cubic-bezier(0.1, 0.8, 0.3, 1), border-color 0.4s, box-shadow 0.4s' 
          : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s, box-shadow 0.4s'
      }}
    >
      {/* 1. CUSTOM CANVAS LAYER (PARTICLES, BALLOONS, ARTIFACTS) */}
      {(particlesEnabled || balloonsEnabled || artifactsEnabled) && (
        <GoldDustCanvas 
          event={event} 
          customAccent={customAccent} 
          particlesEnabled={particlesEnabled}
          balloonsEnabled={balloonsEnabled}
          artifactsEnabled={artifactsEnabled}
        />
      )}

      {/* 2. DYNAMIC SPOTLIGHT OVERLAY LIGHTING */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300 z-10"
        style={{
          background: `radial-gradient(circle 320px at ${coords.x}% ${coords.y}%, ${customAccent}15, transparent 75%)`
        }}
      />

      {/* Ambient static lighting beam */}
      <div 
        className={`absolute inset-0 pointer-events-none opacity-40 mix-blend-screen z-0 ${
          spotlightSpeed === 'slow' 
            ? 'animate-pulse duration-10000' 
            : spotlightSpeed === 'normal' 
            ? 'animate-pulse duration-[6000ms]' 
            : ''
        }`}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${customAccent}1A, transparent 65%)`
        }}
      />

      {/* 3. CARD CONTAINER (LAYERS WITH PERSPECTIVE SHIFT) */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10 select-none">
        {cardTemplate === 'executive_crest' && (
          <>
            {/* CARD HEADER */}
            <div 
              className="flex items-center justify-between transition-all duration-300"
              style={{ transform: `translate3d(${translationVector.x * -0.5}px, ${translationVector.y * -0.5}px, 0)` }}
            >
              {/* Logo Crest */}
              <div className="flex items-center gap-2.5">
                <LogoIcon className="w-4 h-4" style={{ color: customAccent }} />
                <span className="text-[10px] font-mono font-black tracking-[0.2em] uppercase text-white opacity-80">
                  {companyName}
                </span>
              </div>

              {/* Date Label */}
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 opacity-60">
                <Calendar className="w-3.5 h-3.5" />
                <span>{event.date}</span>
              </div>
            </div>

            {/* MIDDLE LAYER: DOMINANT LARGE AVATAR */}
            <div 
              className="flex-1 flex flex-col items-center justify-center my-4 relative transition-transform duration-300"
              style={{ transform: `translate3d(${translationVector.x * 1.2}px, ${translationVector.y * 1.2}px, 0)` }}
            >
              {/* Professional High contrast Glow ring */}
              <div className="relative group select-none">
                {/* Pulsing ring */}
                <div 
                  className="absolute -inset-1.5 rounded-full opacity-35 blur-xl transition-opacity duration-500 animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${customAccent} 0%, transparent 70%)`
                  }}
                />
                
                {/* Card Portrait boundary */}
                <div 
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[3.5px] shadow-2xl bg-zinc-900 select-none"
                  style={{ borderColor: currentTheme.cardBg }}
                >
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="w-full h-full object-cover select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center font-extrabold text-4xl select-none"
                      style={{ color: customAccent, backgroundColor: '#111827' }}
                    >
                      {initials}
                    </div>
                  )}
                </div>

                {/* Float badge overlay indicating event category */}
                <div 
                  className="absolute bottom-1 right-1 p-2 rounded-full border shadow-xl z-20 flex items-center justify-center"
                  style={{ 
                    backgroundColor: currentTheme.cardBg, 
                    borderColor: currentTheme.cardBorder,
                    color: customAccent 
                  }}
                >
                  {event.type === 'award' ? (
                    <Trophy className="w-4 h-4" />
                  ) : event.type === 'anniversary' ? (
                    <Award className="w-4 h-4" />
                  ) : event.type === 'promotion' ? (
                    <Star className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>

            {/* BOTTOM LAYER: MAJESTIC EXECUTIVE TYPOGRAPHY */}
            <div 
              className="text-center space-y-3 transition-transform duration-300"
              style={{ transform: `translate3d(${translationVector.x * -0.8}px, ${translationVector.y * -0.8}px, 0)` }}
            >
              <div className="space-y-1">
                <p 
                  className="text-[10px] md:text-xs font-bold tracking-[0.22em] uppercase"
                  style={{ color: customAccent }}
                >
                  {event.designation || 'Technology Expert'}
                </p>

                <h1 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-tight font-display">
                  {event.name}
                </h1>

                <p className="text-[10px] font-medium opacity-50 uppercase tracking-widest text-slate-400">
                  {event.department || 'Platform Engineering Core'}
                </p>
              </div>

              {!hideMessage && (
                <>
                  <div 
                    className="w-12 h-[2px] mx-auto rounded-full shadow" 
                    style={{ backgroundColor: customAccent }}
                  />
                  <p className="text-[11px] md:text-xs leading-relaxed text-slate-300 font-light max-w-sm mx-auto select-none">
                    "{event.customMessage || event.achievement}"
                  </p>
                </>
              )}
            </div>
          </>
        )}

        {cardTemplate === 'horizontal_split' && (
          <div className="flex flex-col h-full justify-between">
            {/* Top row: Side-by-Side Logo & Date */}
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: currentTheme.cardBorder }}>
              <div className="flex items-center gap-2">
                <LogoIcon className="w-4 h-4" style={{ color: customAccent }} />
                <span className="text-[10px] font-mono font-black tracking-wider uppercase text-white opacity-80">
                  {companyName}
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 opacity-60">{event.date}</span>
            </div>

            {/* Middle row: Left Portrait, Right Quick Info */}
            <div className="flex items-center gap-4 my-auto py-2">
              {/* Left Column: Portrait */}
              <div className="relative shrink-0 select-none">
                <div 
                  className="absolute -inset-1 rounded-full opacity-35 blur-md"
                  style={{
                    background: `radial-gradient(circle, ${customAccent} 0%, transparent 75%)`
                  }}
                />
                <div 
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 shadow-xl bg-zinc-900"
                  style={{ borderColor: currentTheme.cardBorder }}
                >
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center font-extrabold text-2xl"
                      style={{ color: customAccent, backgroundColor: '#111827' }}
                    >
                      {initials}
                    </div>
                  )}
                </div>

                <div 
                  className="absolute bottom-0 right-0 p-1.5 rounded-full border shadow-md z-20 flex items-center justify-center"
                  style={{ 
                    backgroundColor: currentTheme.cardBg, 
                    borderColor: currentTheme.cardBorder,
                    color: customAccent 
                  }}
                >
                  {event.type === 'award' ? (
                    <Trophy className="w-3.5 h-3.5" />
                  ) : event.type === 'anniversary' ? (
                    <Award className="w-3.5 h-3.5" />
                  ) : event.type === 'promotion' ? (
                    <Star className="w-3.5 h-3.5" />
                  ) : (
                    <UserPlus className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              {/* Right Column: Metadata stack left-aligned */}
              <div className="flex-1 text-left space-y-1.5 min-w-0">
                <span 
                  className="text-[9px] font-bold tracking-[0.15em] uppercase truncate block"
                  style={{ color: customAccent }}
                >
                  {event.designation || 'Technology Expert'}
                </span>
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight font-display truncate">
                  {event.name}
                </h1>
                <p className="text-[9px] font-medium opacity-50 uppercase tracking-widest text-slate-400 truncate">
                  {event.department || 'Platform Engineering Core'}
                </p>
              </div>
            </div>

            {/* Bottom blockquote: Accent line highlight */}
            <div className="space-y-2 border-t pt-3 text-left" style={{ borderColor: currentTheme.cardBorder }}>
              {!hideMessage && (
                <div className="pl-3 border-l-2" style={{ borderColor: customAccent }}>
                  <p className="text-[11px] leading-relaxed text-slate-300 font-light italic">
                    "{event.customMessage || event.achievement}"
                  </p>
                </div>
              )}
              <div className="flex justify-between items-center text-[8px] font-mono opacity-40">
                <span>VERIFIED RECORD</span>
                <span>SECURE ID: #{event.id}</span>
              </div>
            </div>
          </div>
        )}

        {cardTemplate === 'polaroid_spotlight' && (
          <div className="flex flex-col h-full justify-between items-center">
            {/* Compact Header */}
            <div className="w-full flex items-center justify-between text-[8px] font-mono opacity-50">
              <span className="uppercase tracking-widest">{companyName} MEMORY</span>
              <span>{event.date}</span>
            </div>

            {/* The Polaroid block */}
            <div className="relative group select-none my-auto rotate-[-1.5deg] hover:rotate-[0deg] transition-transform duration-300">
              {/* Polaroid Frame */}
              <div 
                className="p-3 pb-6 rounded-md shadow-2xl flex flex-col items-center bg-zinc-900 border"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                {/* Mount tape */}
                <div 
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/10 backdrop-blur-md rounded border border-white/10 rotate-[3deg] shadow-sm z-20"
                />

                {/* Photo Square */}
                <div className="w-28 h-28 md:w-34 md:h-34 overflow-hidden border border-black shadow-inner bg-black select-none">
                  {event.image ? (
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center font-extrabold text-2xl text-zinc-700"
                    >
                      {initials}
                    </div>
                  )}
                </div>

                {/* Caption space in the frame */}
                <span className="mt-3 text-[10px] font-display font-medium text-slate-300 tracking-wider">
                  {event.name}
                </span>
              </div>

              {/* Float Category Badge */}
              <div 
                className="absolute -bottom-2 -right-2 p-1.5 rounded-full border shadow-md z-20 flex items-center justify-center"
                style={{ 
                  backgroundColor: currentTheme.cardBg, 
                  borderColor: currentTheme.cardBorder,
                  color: customAccent 
                }}
              >
                {event.type === 'award' ? (
                  <Trophy className="w-3.5 h-3.5" />
                ) : event.type === 'anniversary' ? (
                  <Award className="w-3.5 h-3.5" />
                ) : event.type === 'promotion' ? (
                  <Star className="w-3.5 h-3.5" />
                ) : (
                  <UserPlus className="w-3.5 h-3.5" />
                )}
              </div>
            </div>

            {/* Text description under frame */}
            <div className="w-full text-center space-y-2 mt-1">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold uppercase tracking-widest block" style={{ color: customAccent }}>
                  {event.designation}
                </span>
                <span className="text-[8px] font-medium uppercase tracking-wider text-slate-500 block">
                  {event.department}
                </span>
              </div>
              {!hideMessage && (
                <p className="text-[10px] text-slate-400 font-light max-w-xs mx-auto line-clamp-2 italic">
                  "{event.customMessage || event.achievement}"
                </p>
              )}
            </div>
          </div>
        )}

        {cardTemplate === 'minimalist_editorial' && (
          <div className="flex flex-col h-full justify-between relative overflow-hidden text-left">
            {/* Large Category Watermark in Background */}
            <div className="absolute -bottom-10 -right-10 text-[90px] md:text-[110px] font-black tracking-tighter opacity-[0.03] select-none pointer-events-none uppercase leading-none text-white">
              {event.type}
            </div>

            {/* Header row */}
            <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.25em] text-slate-500 border-b pb-2" style={{ borderColor: currentTheme.cardBorder }}>
              <span>{companyName}</span>
              <span>{event.date}</span>
            </div>

            {/* Asymmetrical Frame & Details Row */}
            <div className="flex-1 flex flex-col justify-center space-y-4 my-2">
              {/* Off-center Portrait */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden border border-white/20 shadow-xl bg-zinc-950 shrink-0">
                {event.image ? (
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center font-extrabold text-2xl text-slate-400 bg-zinc-900"
                  >
                    {initials}
                  </div>
                )}
                {/* Minimal Overlay Badge */}
                <div 
                  className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-widest uppercase text-black"
                  style={{ backgroundColor: customAccent }}
                >
                  {event.type === 'award' ? 'HONOR' : event.type === 'anniversary' ? 'ANNIV' : event.type === 'promotion' ? 'PROM' : 'TEAM'}
                </div>
              </div>

              {/* Left-Aligned Bold Typography */}
              <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black font-display text-white leading-tight uppercase tracking-tight">
                  {event.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 text-[10px] uppercase font-bold tracking-wider">
                  <span style={{ color: customAccent }}>{event.designation}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{event.department}</span>
                </div>
              </div>
            </div>

            {/* Elegant Minimal Message */}
            <div className="border-t pt-3" style={{ borderColor: currentTheme.cardBorder }}>
              {!hideMessage && (
                <p className="text-[11px] leading-relaxed text-slate-300 font-light mb-2">
                  "{event.customMessage || event.achievement}"
                </p>
              )}
              <div className="w-6 h-1 rounded" style={{ backgroundColor: customAccent }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// ELEGANT CANVAS-BASED FLOATING EVENT-THEMED CELEBRATION OBJECTS
// ==========================================
interface CanvasProps {
  event: CelebrationEvent;
  customAccent: string;
  particlesEnabled?: boolean;
  balloonsEnabled?: boolean;
  artifactsEnabled?: boolean;
}

interface CelebrationObject {
  x: number;
  y: number;
  size: number;
  vy: number;
  swaySpeed: number;
  swayRange: number;
  swayOffset: number;
  color: string;
  type: 'balloon' | 'star' | 'rocket' | 'trophy' | 'cupcake' | 'heart' | 'welcome_bubble' | 'lantern' | 'milestone_shield' | 'crown' | 'arrow_up';
  yearsText?: string;
  angle: number;
  angularVelocity: number;
  opacity: number;
}

function GoldDustCanvas({ 
  event, 
  customAccent,
  particlesEnabled = true,
  balloonsEnabled = true,
  artifactsEnabled = true
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 340);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 480);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 340;
      height = canvas.height = canvas.parentElement?.clientHeight || 480;
    };
    window.addEventListener('resize', handleResize);

    // Create 45 ambient slow gold dust particles
    interface DustParticle {
      x: number;
      y: number;
      size: number;
      vy: number;
      vx: number;
      alpha: number;
      fadeRate: number;
      sway: number;
    }

    const particles: DustParticle[] = [];
    if (particlesEnabled) {
      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.6,
          vy: -Math.random() * 0.45 - 0.15,
          vx: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.7 + 0.1,
          fadeRate: Math.random() * 0.003 + 0.001,
          sway: Math.random() * Math.PI * 2
        });
      }
    }

    // Dynamic Context-Aware Celebration Objects Pool
    const celebrationObjects: CelebrationObject[] = [];
    if (balloonsEnabled || artifactsEnabled) {
      const type = event.type || 'award';
      let colors: string[] = [];
      let availableTypes: CelebrationObject['type'][] = [];
      
      if (type === 'birthday') {
        colors = ['#ef4444', '#f43f5e', '#ec4899', '#f59e0b', '#3b82f6', '#10b981', '#a78bfa'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('balloon');
        if (artifactsEnabled) availableTypes.push('cupcake', 'heart', 'star');
        if (availableTypes.length === 0) availableTypes.push('star');
      } else if (type === 'anniversary') {
        colors = ['#FFD700', '#F59E0B', '#a78bfa', '#ec4899', '#f43f5e', '#ffffff'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('balloon');
        if (artifactsEnabled) availableTypes.push('milestone_shield', 'heart', 'star');
        if (availableTypes.length === 0) availableTypes.push('star');
      } else if (type === 'promotion') {
        colors = ['#10b981', '#34d399', '#38bdf8', '#3b82f6', '#FFD700', '#F59E0B'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('balloon');
        if (artifactsEnabled) availableTypes.push('rocket', 'arrow_up', 'star');
        if (availableTypes.length === 0) availableTypes.push('star');
      } else if (type === 'award') {
        colors = ['#FFD700', '#F59E0B', '#ffffff', '#38bdf8', '#a78bfa'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('balloon');
        if (artifactsEnabled) availableTypes.push('trophy', 'crown', 'star');
        if (availableTypes.length === 0) availableTypes.push('star');
      } else if (type === 'new_joiner') {
        colors = ['#3b82f6', '#10b981', '#38bdf8', '#a78bfa', '#f59e0b'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('welcome_bubble', 'balloon');
        if (artifactsEnabled) availableTypes.push('star', 'heart');
        if (availableTypes.length === 0) availableTypes.push('star');
      } else if (type === 'festival') {
        colors = ['#ef4444', '#f59e0b', '#fbbf24', '#ec4899', '#10b981'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('balloon');
        if (artifactsEnabled) availableTypes.push('lantern', 'star');
        if (availableTypes.length === 0) availableTypes.push('star');
      } else {
        colors = ['#FFD700', '#ffffff', '#38bdf8', '#f43f5e'];
        availableTypes = [];
        if (balloonsEnabled) availableTypes.push('balloon');
        if (artifactsEnabled) availableTypes.push('star');
        if (availableTypes.length === 0) availableTypes.push('star');
      }

      // Spawn 12 responsive slow floating celebration objects
      const count = 12;
      for (let i = 0; i < count; i++) {
        const objType = availableTypes[i % availableTypes.length];
        
        let size = Math.random() * 5 + 9;
        let vy = -Math.random() * 0.45 - 0.25; 
        
        if (objType === 'balloon') {
          size = Math.random() * 6 + 11;
          vy = -Math.random() * 0.5 - 0.35;
        } else if (objType === 'rocket') {
          size = Math.random() * 5 + 10;
          vy = -Math.random() * 0.85 - 0.55; 
        } else if (objType === 'trophy' || objType === 'crown') {
          size = Math.random() * 4 + 10;
          vy = -Math.random() * 0.35 - 0.2; 
        } else if (objType === 'arrow_up') {
          size = Math.random() * 4 + 8;
          vy = -Math.random() * 0.7 - 0.4;
        } else if (objType === 'lantern') {
          size = Math.random() * 5 + 12;
          vy = -Math.random() * 0.35 - 0.15; 
        }

        celebrationObjects.push({
          x: Math.random() * width,
          y: Math.random() * height * 1.5 + height * 0.1,
          size: size,
          vy: vy,
          swaySpeed: Math.random() * 0.01 + 0.005,
          swayRange: Math.random() * 12 + 6,
          swayOffset: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: objType,
          yearsText: event.years ? String(event.years) : undefined,
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.035,
          opacity: Math.random() * 0.35 + 0.5
        });
      }
    }

    // Interactive Star and Diamond burst particles
    interface BurstParticle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      fadeRate: number;
      color: string;
      isStar: boolean;
      rotation: number;
      rotationSpeed: number;
    }

    const burstParticles: BurstParticle[] = [];

    // Trigger burst on click inside the card boundary
    const handleParentClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        burstParticles.push({
          x: clickX,
          y: clickY,
          size: Math.random() * 3.5 + 1.5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // upward bias
          alpha: 1.0,
          fadeRate: Math.random() * 0.02 + 0.01,
          color: Math.random() > 0.4 ? customAccent : (Math.random() > 0.5 ? '#FFD700' : '#FFFFFF'),
          isStar: Math.random() > 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15
        });
      }
    };

    // Trigger burst on central celebration events
    const handleCelebrateEvent = (e: Event) => {
      const customEv = e as CustomEvent<{ x?: number; y?: number }>;
      const targetX = (customEv.detail && customEv.detail.x !== undefined) ? customEv.detail.x : width / 2;
      const targetY = (customEv.detail && customEv.detail.y !== undefined) ? customEv.detail.y : height / 2;

      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 2.0;
        burstParticles.push({
          x: targetX,
          y: targetY,
          size: Math.random() * 4.5 + 1.8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.8,
          alpha: 1.0,
          fadeRate: Math.random() * 0.015 + 0.008,
          color: Math.random() > 0.4 ? customAccent : (Math.random() > 0.5 ? '#FFD700' : '#FFFFFF'),
          isStar: Math.random() > 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('click', handleParentClick);
    }
    window.addEventListener('celebration-trigger', handleCelebrateEvent);

    // High fidelity drawing methods
    const drawBalloon = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, offset: number) => {
      c.save();
      const gradient = c.createRadialGradient(x - s * 0.3, y - s * 0.3, s * 0.1, x, y, s);
      gradient.addColorStop(0, '#ffffff80');
      gradient.addColorStop(0.2, color);
      gradient.addColorStop(1, '#00000060');

      c.fillStyle = gradient;
      c.beginPath();
      c.ellipse(x, y, s * 0.85, s * 1.1, 0, 0, Math.PI * 2);
      c.fill();

      // Tie
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(x, y + s * 1.1);
      c.lineTo(x - 3, y + s * 1.1 + 5);
      c.lineTo(x + 3, y + s * 1.1 + 5);
      c.closePath();
      c.fill();

      // String
      c.beginPath();
      c.moveTo(x, y + s * 1.1 + 5);
      const swayStr = Math.sin(offset * 2) * 4;
      c.bezierCurveTo(x + swayStr, y + s * 1.1 + 15, x - swayStr, y + s * 1.1 + 30, x, y + s * 1.1 + 45);
      c.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      c.lineWidth = 1;
      c.stroke();
      c.restore();
    };

    const drawStarObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, rot: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.fillStyle = color;
      c.shadowColor = color;
      c.shadowBlur = 4;
      c.beginPath();
      for (let j = 0; j < 5; j++) {
        c.lineTo(Math.cos(((18 + j * 72) * Math.PI) / 180) * s, Math.sin(((18 + j * 72) * Math.PI) / 180) * s);
        c.lineTo(Math.cos(((54 + j * 72) * Math.PI) / 180) * (s * 0.4), Math.sin(((54 + j * 72) * Math.PI) / 180) * (s * 0.4));
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawRocketObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.translate(x, y);
      
      const flameH = s * 0.45 * (Math.random() * 0.5 + 0.8);
      const flameGrad = c.createLinearGradient(0, s * 0.4, 0, s * 0.4 + flameH);
      flameGrad.addColorStop(0, '#f97316');
      flameGrad.addColorStop(0.5, '#ef4444');
      flameGrad.addColorStop(1, 'transparent');
      c.fillStyle = flameGrad;
      c.beginPath();
      c.moveTo(-s * 0.15, s * 0.4);
      c.lineTo(0, s * 0.4 + flameH);
      c.lineTo(s * 0.15, s * 0.4);
      c.closePath();
      c.fill();

      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, -s * 0.6);
      c.quadraticCurveTo(s * 0.25, -s * 0.1, s * 0.22, s * 0.4);
      c.lineTo(-s * 0.22, s * 0.4);
      c.quadraticCurveTo(-s * 0.25, -s * 0.1, 0, -s * 0.6);
      c.closePath();
      c.fill();
      
      c.fillStyle = '#ef4444';
      c.beginPath();
      c.moveTo(-s * 0.2, s * 0.1);
      c.lineTo(-s * 0.42, s * 0.4);
      c.lineTo(-s * 0.2, s * 0.4);
      c.closePath();
      c.fill();
      
      c.beginPath();
      c.moveTo(s * 0.2, s * 0.1);
      c.lineTo(s * 0.42, s * 0.4);
      c.lineTo(s * 0.2, s * 0.4);
      c.closePath();
      c.fill();

      c.fillStyle = '#38bdf8';
      c.beginPath();
      c.arc(0, -s * 0.1, s * 0.1, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const drawArrowUpObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.translate(x, y);
      c.strokeStyle = color;
      c.lineWidth = s * 0.22;
      c.lineCap = 'round';
      c.lineJoin = 'round';
      
      c.beginPath();
      c.moveTo(-s * 0.5, s * 0.1);
      c.lineTo(0, -s * 0.4);
      c.lineTo(s * 0.5, s * 0.1);
      c.stroke();

      c.beginPath();
      c.moveTo(-s * 0.5, s * 0.5);
      c.lineTo(0, 0);
      c.lineTo(s * 0.5, s * 0.5);
      c.stroke();
      c.restore();
    };

    const drawTrophyObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.fillStyle = color;
      c.strokeStyle = color;
      c.lineWidth = s * 0.08;
      c.translate(x, y);
      
      c.beginPath();
      c.arc(0, -s * 0.25, s * 0.35, 0, Math.PI, false);
      c.lineTo(0, 0);
      c.closePath();
      c.fill();
      
      c.beginPath();
      c.arc(-s * 0.38, -s * 0.25, s * 0.18, Math.PI * 0.5, Math.PI * 1.5, false);
      c.stroke();
      
      c.beginPath();
      c.arc(s * 0.38, -s * 0.25, s * 0.18, Math.PI * 1.5, Math.PI * 0.5, false);
      c.stroke();
      
      c.fillRect(-s * 0.07, 0, s * 0.14, s * 0.25);
      c.fillRect(-s * 0.26, s * 0.25, s * 0.52, s * 0.12);
      c.restore();
    };

    const drawCrownObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.translate(x, y);
      c.fillStyle = color;
      
      c.beginPath();
      c.moveTo(-s * 0.5, s * 0.35);
      c.lineTo(-s * 0.5, -s * 0.15);
      c.lineTo(-s * 0.25, s * 0.1);
      c.lineTo(0, -s * 0.4);
      c.lineTo(s * 0.25, s * 0.1);
      c.lineTo(s * 0.5, -s * 0.15);
      c.lineTo(s * 0.5, s * 0.35);
      c.closePath();
      c.fill();
      
      c.fillStyle = 'rgba(255, 255, 255, 0.3)';
      c.fillRect(-s * 0.5, s * 0.24, s, s * 0.08);
      
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(-s * 0.5, -s * 0.18, s * 0.07, 0, Math.PI * 2);
      c.arc(0, -s * 0.44, s * 0.07, 0, Math.PI * 2);
      c.arc(s * 0.5, -s * 0.18, s * 0.07, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const drawCupcakeObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number) => {
      c.save();
      c.translate(x, y);
      
      c.fillStyle = '#f472b6';
      c.beginPath();
      c.moveTo(-s * 0.35, s * 0.35);
      c.lineTo(s * 0.35, s * 0.35);
      c.lineTo(s * 0.45, 0);
      c.lineTo(-s * 0.45, 0);
      c.closePath();
      c.fill();
      
      c.strokeStyle = '#db2777';
      c.lineWidth = 1.2;
      for (let offset = -0.3; offset <= 0.3; offset += 0.2) {
        c.beginPath();
        c.moveTo(s * offset, s * 0.35);
        c.lineTo(s * offset * 1.2, 0);
        c.stroke();
      }
      
      c.fillStyle = '#ffffff';
      c.beginPath();
      c.arc(-s * 0.22, -s * 0.08, s * 0.22, 0, Math.PI * 2);
      c.arc(s * 0.22, -s * 0.08, s * 0.22, 0, Math.PI * 2);
      c.arc(0, -s * 0.2, s * 0.26, 0, Math.PI * 2);
      c.fill();
      
      c.fillStyle = '#dc2626';
      c.beginPath();
      c.arc(0, -s * 0.44, s * 0.11, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const drawHeartObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.translate(x, y);
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(0, s * 0.45);
      c.bezierCurveTo(-s * 0.6, -s * 0.1, -s * 0.6, -s * 0.7, 0, -s * 0.4);
      c.bezierCurveTo(s * 0.6, -s * 0.7, s * 0.6, -s * 0.1, 0, s * 0.45);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawWelcomeBubbleObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.translate(x, y);
      
      c.fillStyle = color;
      c.beginPath();
      c.arc(0, -s * 0.1, s * 0.5, 0, Math.PI * 2);
      c.fill();
      
      c.beginPath();
      c.moveTo(-s * 0.1, s * 0.4);
      c.lineTo(-s * 0.35, s * 0.62);
      c.lineTo(-s * 0.3, s * 0.32);
      c.closePath();
      c.fill();
      
      c.fillStyle = '#ffffff';
      c.font = `bold ${s * 0.28}px sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText("HI!", 0, -s * 0.1);
      c.restore();
    };

    const drawMilestoneShieldObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string, years?: string) => {
      c.save();
      c.translate(x, y);
      
      c.fillStyle = color;
      c.strokeStyle = '#ffffff';
      c.lineWidth = 1.2;
      c.beginPath();
      c.moveTo(0, -s * 0.55);
      c.lineTo(s * 0.45, -s * 0.25);
      c.lineTo(s * 0.45, s * 0.2);
      c.quadraticCurveTo(s * 0.45, s * 0.55, 0, s * 0.8);
      c.quadraticCurveTo(-s * 0.45, s * 0.55, -s * 0.45, s * 0.2);
      c.lineTo(-s * 0.45, -s * 0.25);
      c.closePath();
      c.fill();
      c.stroke();
      
      if (years) {
        c.fillStyle = '#000000';
        c.font = `bold ${s * 0.48}px monospace`;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(years, 0, 0);
      } else {
        c.fillStyle = '#ffffff';
        c.beginPath();
        for (let j = 0; j < 5; j++) {
          c.lineTo(Math.cos(((18 + j * 72) * Math.PI) / 180) * (s * 0.24), Math.sin(((18 + j * 72) * Math.PI) / 180) * (s * 0.24));
          c.lineTo(Math.cos(((54 + j * 72) * Math.PI) / 180) * (s * 0.1), Math.sin(((54 + j * 72) * Math.PI) / 180) * (s * 0.1));
        }
        c.closePath();
        c.fill();
      }
      c.restore();
    };

    const drawLanternObj = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
      c.save();
      c.translate(x, y);
      
      c.fillStyle = '#b45309';
      c.fillRect(-s * 0.35, -s * 0.55, s * 0.7, s * 0.1);
      c.fillRect(-s * 0.35, s * 0.45, s * 0.7, s * 0.1);
      
      c.fillStyle = color;
      c.beginPath();
      c.ellipse(0, 0, s * 0.42, s * 0.48, 0, 0, Math.PI * 2);
      c.fill();
      
      c.strokeStyle = 'rgba(0, 0, 0, 0.25)';
      c.lineWidth = 1.2;
      c.beginPath();
      c.moveTo(0, -s * 0.48);
      c.lineTo(0, s * 0.48);
      c.stroke();
      
      c.strokeStyle = '#ef4444';
      c.lineWidth = 1.8;
      c.beginPath();
      c.moveTo(0, s * 0.55);
      c.lineTo(0, s * 0.88);
      c.stroke();
      c.restore();
    };

    let animFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render static background slow gold dust
      if (particlesEnabled) {
        particles.forEach((p) => {
          p.alpha -= p.fadeRate;
          if (p.alpha <= 0) {
            p.alpha = Math.random() * 0.7 + 0.1;
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          p.sway += 0.01;
          p.x += Math.sin(p.sway) * 0.15 + p.vx;
          p.y += p.vy;

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = customAccent;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // Render floating custom celebration objects
      if (balloonsEnabled || artifactsEnabled) {
        celebrationObjects.forEach((obj) => {
          obj.y += obj.vy;
          obj.swayOffset += obj.swaySpeed;
          obj.angle += obj.angularVelocity;
          const currentX = obj.x + Math.sin(obj.swayOffset) * obj.swayRange;
          
          if (obj.y < -35) {
            obj.y = height + 35;
            obj.x = Math.random() * width;
          }

          ctx.save();
          ctx.globalAlpha = obj.opacity;

          if (obj.type === 'balloon') {
            drawBalloon(ctx, currentX, obj.y, obj.size, obj.color, obj.swayOffset);
          } else if (obj.type === 'star') {
            drawStarObj(ctx, currentX, obj.y, obj.size, obj.color, obj.angle);
          } else if (obj.type === 'rocket') {
            drawRocketObj(ctx, currentX, obj.y, obj.size, obj.color);
          } else if (obj.type === 'arrow_up') {
            drawArrowUpObj(ctx, currentX, obj.y, obj.size, obj.color);
          } else if (obj.type === 'trophy') {
            drawTrophyObj(ctx, currentX, obj.y, obj.size, obj.color);
          } else if (obj.type === 'crown') {
            drawCrownObj(ctx, currentX, obj.y, obj.size, obj.color);
          } else if (obj.type === 'cupcake') {
            drawCupcakeObj(ctx, currentX, obj.y, obj.size);
          } else if (obj.type === 'heart') {
            drawHeartObj(ctx, currentX, obj.y, obj.size, obj.color);
          } else if (obj.type === 'welcome_bubble') {
            drawWelcomeBubbleObj(ctx, currentX, obj.y, obj.size, obj.color);
          } else if (obj.type === 'milestone_shield') {
            drawMilestoneShieldObj(ctx, currentX, obj.y, obj.size, obj.color, obj.yearsText);
          } else if (obj.type === 'lantern') {
            drawLanternObj(ctx, currentX, obj.y, obj.size, obj.color);
          }

          ctx.restore();
        });
      }

      // Update & Draw burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += 0.06; 
        bp.vx *= 0.98; 
        bp.alpha -= bp.fadeRate;
        bp.rotation += bp.rotationSpeed;

        if (bp.alpha <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = bp.alpha;
        ctx.translate(bp.x, bp.y);
        ctx.rotate(bp.rotation);
        ctx.fillStyle = bp.color;

        if (bp.isStar) {
          ctx.beginPath();
          for (let j = 0; j < 5; j++) {
            ctx.lineTo(Math.cos(((18 + j * 72) * Math.PI) / 180) * bp.size, Math.sin(((18 + j * 72) * Math.PI) / 180) * bp.size);
            ctx.lineTo(Math.cos(((54 + j * 72) * Math.PI) / 180) * (bp.size * 0.4), Math.sin(((54 + j * 72) * Math.PI) / 180) * (bp.size * 0.4));
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -bp.size);
          ctx.lineTo(bp.size * 0.7, 0);
          ctx.lineTo(0, bp.size);
          ctx.lineTo(-bp.size * 0.7, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('celebration-trigger', handleCelebrateEvent);
      if (parent) {
        parent.removeEventListener('click', handleParentClick);
      }
      cancelAnimationFrame(animFrameId);
    };
  }, [event.id, event.type, event.years, customAccent, particlesEnabled, balloonsEnabled, artifactsEnabled]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-85"
    />
  );
}

// ==========================================
// ELEGANT REACTION PILLS SYSTEM
// ==========================================
interface ReactionProps {
  eventId: string;
  reactions: Record<string, number>;
  userHasReacted: Record<string, boolean>;
  onReact: (emoji: string) => void;
  currentTheme: PresetTheme;
  customAccent: string;
}

function PremiumReactionPills({
  eventId,
  reactions,
  userHasReacted,
  onReact,
  currentTheme,
  customAccent
}: ReactionProps) {
  return (
    <div 
      className="flex items-center justify-center gap-3.5 p-2 px-4 rounded-full border shadow-inner max-w-max mx-auto transition-all"
      style={{ 
        backgroundColor: currentTheme.cardBg, 
        borderColor: currentTheme.cardBorder 
      }}
    >
      {['🏆', '👏', '❤️'].map((emoji) => {
        const count = reactions[emoji] || 0;
        const active = userHasReacted[emoji];
        return (
          <button
            key={emoji}
            onClick={() => onReact(emoji)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold select-none transition-all cursor-pointer hover:scale-105 active:scale-95"
            style={{
              backgroundColor: active ? `${customAccent}1A` : 'transparent',
              borderColor: active ? customAccent : currentTheme.cardBorder,
              color: active ? '#FFFFFF' : currentTheme.secondary,
              boxShadow: active ? `0 0 10px ${customAccent}20` : 'none'
            }}
          >
            <span className="text-[13px]">{emoji}</span>
            <span className={active ? 'text-white' : ''}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}
