import React from 'react';
import { createRoot } from 'react-dom/client';
import { CelebrationCarousel } from './components/CelebrationCarousel';
import { CelebrationWall } from './components/CelebrationWall';
import { CelebrationCard } from './components/CelebrationCard';
import { EmployeeMomentsProvider } from './providers/EmployeeMomentsProvider';
import { CelebrationEvent, ThemeName, EffectType } from './types';

const SafeHTMLElement = typeof HTMLElement !== 'undefined' ? HTMLElement : (class {} as typeof HTMLElement);

// Helper to parse JSON attributes safely
function parseJsonAttribute<T>(attrValue: string | null, fallback: T): T {
  if (!attrValue) return fallback;
  try {
    return JSON.parse(attrValue) as T;
  } catch (e) {
    // If it's a comma-separated list and we expect an array, try that
    if (Array.isArray(fallback)) {
      return attrValue.split(',').map(s => s.trim()) as unknown as T;
    }
    return fallback;
  }
}

/**
 * <employee-moments-carousel>
 */
export class EmployeeMomentsCarouselElement extends SafeHTMLElement {
  private _root: any = null;
  private _container: HTMLDivElement | null = null;
  private _events: CelebrationEvent[] = [];
  private _theme: ThemeName = 'corporate';
  private _effects: EffectType[] = ['confetti'];
  private _allowReactions = true;
  private _autoPlay = true;
  private _autoPlayDelay = 5000;
  private _locale = 'en';

  static get observedAttributes() {
    return ['events', 'theme', 'effects', 'allow-reactions', 'autoplay', 'autoplay-delay', 'locale'];
  }

  // Getters/Setters for easy JS usage (e.g. element.events = [...])
  get events() { return this._events; }
  set events(val: CelebrationEvent[]) {
    this._events = val;
    this.render();
  }

  get theme() { return this._theme; }
  set theme(val: ThemeName) {
    this._theme = val;
    this.render();
  }

  get effects() { return this._effects; }
  set effects(val: EffectType[]) {
    this._effects = val;
    this.render();
  }

  get allowReactions() { return this._allowReactions; }
  set allowReactions(val: boolean) {
    this._allowReactions = val;
    this.render();
  }

  get autoPlay() { return this._autoPlay; }
  set autoPlay(val: boolean) {
    this._autoPlay = val;
    this.render();
  }

  get autoPlayDelay() { return this._autoPlayDelay; }
  set autoPlayDelay(val: number) {
    this._autoPlayDelay = val;
    this.render();
  }

  get locale() { return this._locale; }
  set locale(val: string) {
    this._locale = val;
    this.render();
  }

  connectedCallback() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'employee-moments-carousel-wrapper w-full h-full';
      this.appendChild(this._container);
      this._root = createRoot(this._container);
    }
    this.syncAttributes();
    this.render();
  }

  attributeChangedCallback() {
    this.syncAttributes();
    this.render();
  }

  disconnectedCallback() {
    if (this._root) {
      // Small timeout to prevent unmounting during rapid updates
      const r = this._root;
      setTimeout(() => {
        try { r.unmount(); } catch (e) {}
      }, 50);
      this._root = null;
      this._container = null;
    }
  }

  private syncAttributes() {
    if (this.hasAttribute('events')) {
      this._events = parseJsonAttribute(this.getAttribute('events'), [] as CelebrationEvent[]);
    }
    if (this.hasAttribute('theme')) {
      this._theme = (this.getAttribute('theme') || 'corporate') as ThemeName;
    }
    if (this.hasAttribute('effects')) {
      this._effects = parseJsonAttribute(this.getAttribute('effects'), ['confetti'] as EffectType[]);
    }
    if (this.hasAttribute('allow-reactions')) {
      this._allowReactions = this.getAttribute('allow-reactions') !== 'false';
    }
    if (this.hasAttribute('autoplay')) {
      this._autoPlay = this.getAttribute('autoplay') !== 'false';
    }
    if (this.hasAttribute('autoplay-delay')) {
      this._autoPlayDelay = parseInt(this.getAttribute('autoplay-delay') || '5000', 10);
    }
    if (this.hasAttribute('locale')) {
      this._locale = this.getAttribute('locale') || 'en';
    }
  }

  private render() {
    if (!this._root) return;

    const handleReaction = (eventId: string, emoji: string) => {
      this.dispatchEvent(new CustomEvent('reaction', {
        detail: { eventId, emoji },
        bubbles: true,
        composed: true
      }));
    };

    const handleActiveIndexChange = (index: number) => {
      this.dispatchEvent(new CustomEvent('activeIndexChange', {
        detail: { index },
        bubbles: true,
        composed: true
      }));
    };

    this._root.render(
      <EmployeeMomentsProvider
        theme={this._theme}
        locale={this._locale}
        effects={this._effects}
        allowReactions={this._allowReactions}
        onReaction={handleReaction}
      >
        <CelebrationCarousel
          events={this._events}
          theme={this._theme}
          effects={this._effects}
          allowReactions={this._allowReactions}
          autoPlay={this._autoPlay}
          autoPlayDelay={this._autoPlayDelay}
          locale={this._locale}
          onReaction={handleReaction}
          onActiveIndexChange={handleActiveIndexChange}
        />
      </EmployeeMomentsProvider>
    );
  }
}

/**
 * <employee-moments-wall>
 */
export class EmployeeMomentsWallElement extends SafeHTMLElement {
  private _root: any = null;
  private _container: HTMLDivElement | null = null;
  private _events: CelebrationEvent[] = [];
  private _theme: ThemeName = 'corporate';
  private _effects: EffectType[] = ['confetti'];
  private _allowReactions = true;
  private _gridCols: number | undefined = undefined;
  private _locale = 'en';

  static get observedAttributes() {
    return ['events', 'theme', 'effects', 'allow-reactions', 'grid-cols', 'locale'];
  }

  get events() { return this._events; }
  set events(val: CelebrationEvent[]) {
    this._events = val;
    this.render();
  }

  get theme() { return this._theme; }
  set theme(val: ThemeName) {
    this._theme = val;
    this.render();
  }

  get effects() { return this._effects; }
  set effects(val: EffectType[]) {
    this._effects = val;
    this.render();
  }

  get allowReactions() { return this._allowReactions; }
  set allowReactions(val: boolean) {
    this._allowReactions = val;
    this.render();
  }

  get gridCols() { return this._gridCols; }
  set gridCols(val: number | undefined) {
    this._gridCols = val;
    this.render();
  }

  get locale() { return this._locale; }
  set locale(val: string) {
    this._locale = val;
    this.render();
  }

  connectedCallback() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'employee-moments-wall-wrapper w-full h-full';
      this.appendChild(this._container);
      this._root = createRoot(this._container);
    }
    this.syncAttributes();
    this.render();
  }

  attributeChangedCallback() {
    this.syncAttributes();
    this.render();
  }

  disconnectedCallback() {
    if (this._root) {
      const r = this._root;
      setTimeout(() => {
        try { r.unmount(); } catch (e) {}
      }, 50);
      this._root = null;
      this._container = null;
    }
  }

  private syncAttributes() {
    if (this.hasAttribute('events')) {
      this._events = parseJsonAttribute(this.getAttribute('events'), [] as CelebrationEvent[]);
    }
    if (this.hasAttribute('theme')) {
      this._theme = (this.getAttribute('theme') || 'corporate') as ThemeName;
    }
    if (this.hasAttribute('effects')) {
      this._effects = parseJsonAttribute(this.getAttribute('effects'), ['confetti'] as EffectType[]);
    }
    if (this.hasAttribute('allow-reactions')) {
      this._allowReactions = this.getAttribute('allow-reactions') !== 'false';
    }
    if (this.hasAttribute('grid-cols')) {
      const parsed = parseInt(this.getAttribute('grid-cols') || '', 10);
      this._gridCols = isNaN(parsed) ? undefined : parsed;
    }
    if (this.hasAttribute('locale')) {
      this._locale = this.getAttribute('locale') || 'en';
    }
  }

  private render() {
    if (!this._root) return;

    const handleReaction = (eventId: string, emoji: string) => {
      this.dispatchEvent(new CustomEvent('reaction', {
        detail: { eventId, emoji },
        bubbles: true,
        composed: true
      }));
    };

    this._root.render(
      <EmployeeMomentsProvider
        theme={this._theme}
        locale={this._locale}
        effects={this._effects}
        allowReactions={this._allowReactions}
        onReaction={handleReaction}
      >
        <CelebrationWall
          events={this._events}
          gridCols={this._gridCols}
        />
      </EmployeeMomentsProvider>
    );
  }
}

/**
 * <employee-moments-card>
 */
export class EmployeeMomentsCardElement extends SafeHTMLElement {
  private _root: any = null;
  private _container: HTMLDivElement | null = null;
  private _event: CelebrationEvent | null = null;
  private _theme: ThemeName = 'corporate';
  private _isActive = true;
  private _isFocused = false;
  private _locale = 'en';

  static get observedAttributes() {
    return ['event', 'theme', 'is-active', 'is-focused', 'locale'];
  }

  get event() { return this._event; }
  set event(val: CelebrationEvent | null) {
    this._event = val;
    this.render();
  }

  get theme() { return this._theme; }
  set theme(val: ThemeName) {
    this._theme = val;
    this.render();
  }

  get isActive() { return this._isActive; }
  set isActive(val: boolean) {
    this._isActive = val;
    this.render();
  }

  get isFocused() { return this._isFocused; }
  set isFocused(val: boolean) {
    this._isFocused = val;
    this.render();
  }

  get locale() { return this._locale; }
  set locale(val: string) {
    this._locale = val;
    this.render();
  }

  connectedCallback() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className = 'employee-moments-card-wrapper inline-block';
      this.appendChild(this._container);
      this._root = createRoot(this._container);
    }
    this.syncAttributes();
    this.render();
  }

  attributeChangedCallback() {
    this.syncAttributes();
    this.render();
  }

  disconnectedCallback() {
    if (this._root) {
      const r = this._root;
      setTimeout(() => {
        try { r.unmount(); } catch (e) {}
      }, 50);
      this._root = null;
      this._container = null;
    }
  }

  private syncAttributes() {
    if (this.hasAttribute('event')) {
      this._event = parseJsonAttribute(this.getAttribute('event'), null as CelebrationEvent | null);
    }
    if (this.hasAttribute('theme')) {
      this._theme = (this.getAttribute('theme') || 'corporate') as ThemeName;
    }
    if (this.hasAttribute('is-active')) {
      this._isActive = this.getAttribute('is-active') !== 'false';
    }
    if (this.hasAttribute('is-focused')) {
      this._isFocused = this.getAttribute('is-focused') === 'true';
    }
    if (this.hasAttribute('locale')) {
      this._locale = this.getAttribute('locale') || 'en';
    }
  }

  private render() {
    if (!this._root || !this._event) return;

    this._root.render(
      <EmployeeMomentsProvider theme={this._theme} locale={this._locale}>
        <CelebrationCard
          event={this._event}
          isActive={this._isActive}
          isFocused={this._isFocused}
        />
      </EmployeeMomentsProvider>
    );
  }
}

// Global Registration Helper
export function registerCustomElements() {
  if (typeof window !== 'undefined') {
    if (!customElements.get('employee-moments-carousel')) {
      customElements.define('employee-moments-carousel', EmployeeMomentsCarouselElement);
    }
    if (!customElements.get('employee-moments-wall')) {
      customElements.define('employee-moments-wall', EmployeeMomentsWallElement);
    }
    if (!customElements.get('employee-moments-card')) {
      customElements.define('employee-moments-card', EmployeeMomentsCardElement);
    }
  }
}

// Auto-register when imported in environments with window
if (typeof window !== 'undefined') {
  registerCustomElements();
}
