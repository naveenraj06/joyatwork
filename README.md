# Employee Moments SDK 🚀

A highly customizable, high-fidelity card celebration system for employee birthdays, anniversaries, promotions, achievements, and milestones.

Designed with visual balance, elegant typography pairing, motion-safe transitions, and built-in support for any framework: **React**, **Angular**, **Vue**, or **Plain HTML/Vanilla JavaScript**.

---

## 📦 Package Distribution Features

This package compiles into multiple production-ready targets using **Vite Library Mode**:

1. **React SDK Module (ESM/UMD)**: Optimized for standard React/Next.js architectures, avoiding duplicate React runtime instantiations.
2. **Standalone Web Component Custom Element**: Bundles React internally. Perfect for non-React frameworks like Angular or pure HTML/JS drops.
3. **Responsive Grid & Slider Components**: Access the core celebration cards, full lists, search walls, or autoplaying carousels.

---

## 🛠️ Build and Compiling

To generate production-ready bundles, run:

```bash
# Clean previous builds and run all compiler pipelines
npm run build:all
```

This generates:
- `dist/react/`: Lightweight React-friendly library (externalized peer dependencies).
- `dist/wc/`: Standalone drop-in Custom Element (embedded React runtime).
- `dist/types/`: Complete `.d.ts` TypeScript definitions.
- `dist/react/index.css`: Compiled Tailwind utility styles.

---

## 💡 Quick Integration Guide

### 1. React / Next.js Integration

```tsx
import React from 'react';
import { EmployeeMomentsProvider, CelebrationCarousel } from 'employee-moments-sdk';
import 'employee-moments-sdk/dist/react/index.css';

const events = [
  {
    id: 'ev-1',
    type: 'birthday',
    name: 'Sophia Martinez',
    designation: 'Senior Product Designer',
    department: 'UX Engineering',
    company: 'Nexus Tech',
    date: 'Today',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
  }
];

export default function App() {
  return (
    <EmployeeMomentsProvider theme="premium" locale="en">
      <div style={{ maxWidth: '500px', margin: '40px auto' }}>
        <CelebrationCarousel events={events} autoPlay={true} />
      </div>
    </EmployeeMomentsProvider>
  );
}
```

### 2. Angular Core Integration

Enable HTML Custom Elements inside your module and load our Web Component bundle:

```typescript
// main.ts
import 'employee-moments-sdk/dist/react/index.js'; // imports the web-component auto-registration
```

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<employee-moments-carousel
  [events]="myEvents"
  theme="premium"
  allow-reactions="true"
  (reaction)="handleReaction($event)"
></employee-moments-carousel>
```

### 3. Vanilla JavaScript / Plain HTML

Drop the stylesheet and self-contained script tag directly onto your page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Company Portal</title>
  
  <!-- 1. Include compiled Tailwind styling -->
  <link rel="stylesheet" href="https://unpkg.com/employee-moments-sdk/dist/react/index.css">
  
  <!-- 2. Include self-contained Web Component bundle -->
  <script type="module" src="https://unpkg.com/employee-moments-sdk/dist/wc/index.umd.cjs"></script>
</head>
<body style="background: #f8fafc; padding: 40px;">

  <!-- 3. Embed the Custom Element tag -->
  <div style="max-width: 500px; margin: 0 auto;">
    <employee-moments-carousel id="moments-widget" theme="illustrated"></employee-moments-carousel>
  </div>

  <script>
    const widget = document.getElementById('moments-widget');
    
    // Assign dataset directly via property bindings
    widget.events = [
      {
        id: 'ev-1',
        type: 'anniversary',
        name: 'Liam Chen',
        designation: 'Lead Security Architect',
        department: 'Infrastructure',
        company: 'Nexus Tech',
        date: 'Jun 30',
        years: 5
      }
    ];

    // Listen to standard custom reaction events
    widget.addEventListener('reaction', (event) => {
      console.log('Reaction clicked:', event.detail);
      // { eventId: "ev-1", emoji: "🎉" }
    });
  </script>
</body>
</html>
```

---

## 🎨 Theme Configuration Values

Customize cards using the `theme` prop/attribute:
- `corporate`: Safe, high-contrast, professional, minimalist corporate palettes.
- `festive`: Vibrant, active, warm holiday and festival styling.
- `premium`: Luxury dark gradient backgrounds with rich card highlights.
- `retro`: Monospace font styling with vintage bordered terminals.

---

## 📜 License

MIT License. Designed with excellence for seamless enterprise portals.
