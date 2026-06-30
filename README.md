# JoyAtWork

> **Celebrate People. Inspire Teams.**

JoyAtWork is a modern React SDK for building beautiful employee celebration, recognition, and workplace engagement experiences.

Whether it's birthdays, work anniversaries, promotions, awards, festivals, or employee milestones, JoyAtWork helps organizations create meaningful moments inside employee portals, HRMS platforms, intranets, and digital workplace applications.

---

## ✨ Why JoyAtWork?

Most employee portals are functional.

JoyAtWork makes them memorable.

Instead of static employee lists and plain notifications, JoyAtWork transforms workplace events into premium, interactive experiences that employees genuinely enjoy.

Designed with modern UX, elegant animations, and enterprise customization in mind.

---

## 🎯 Use Cases

- 🎂 Employee Birthdays
- ⭐ Work Anniversaries
- 🏆 Employee Awards
- 🚀 Promotions
- 👋 New Joiners
- 🎉 Festival Greetings
- ❤️ Employee Recognition
- 🖥 Office TV Displays
- 📺 Reception Kiosks
- 🏢 Corporate Intranets
- 📊 Employee Dashboards

---

## 🚀 Features

### Celebration Experiences

- Beautiful animated celebration cards
- Multiple celebration types
- Responsive carousel
- Spotlight mode
- Recognition wall
- TV display mode *(Coming Soon)*

### Employee Engagement

- Emoji reactions
- Appreciation messages *(Coming Soon)*
- Recognition badges
- Years of service
- Department labels
- Achievement highlights

### Customization

- Multiple premium themes
- Corporate branding
- Company logo support
- Custom color palette
- Localization support
- Responsive layouts

### Developer Experience

- React + TypeScript
- Lightweight
- SSR compatible
- Tree-shakable
- Framework friendly
- Easy integration

---

# Installation

```bash
npm install @joyatwork/react
```

or

```bash
yarn add @joyatwork/react
```

---

# Quick Start

```tsx
import { CelebrationCarousel } from "@joyatwork/react";

const events = [
  {
    id: "1",
    type: "birthday",
    name: "Marcus Vance",
    designation: "Principal Engineer",
    department: "Engineering",
    image: "/avatar.jpg"
  }
];

export default function App() {
  return (
    <CelebrationCarousel
      events={events}
      theme="executive-dark"
      allowReactions
    />
  );
}
```

---

# Current Components

| Component | Status |
|-----------|--------|
| Celebration Carousel | ✅ |
| Celebration Card | ✅ |
| Theme System | ✅ |
| Corporate Branding | ✅ |
| Reactions | ✅ |
| Multiple Event Types | 🚧 |
| Spotlight Mode | 🚧 |
| Wall Mode | 🚧 |
| TV Mode | 🚧 |
| Localization | 🚧 |

---

# Roadmap

## Version 1.x

- [x] Celebration Carousel
- [x] Multiple templates
- [x] Theme engine
- [x] Corporate branding
- [x] Emoji reactions

---

## Version 2.x

- [ ] Spotlight Mode
- [ ] Wall Mode
- [ ] TV Presentation Mode
- [ ] Wishes & Appreciation
- [ ] Localization
- [ ] Plugin System
- [ ] Motion Presets

---

## Version 3.x

- [ ] AI-powered celebration messages
- [ ] Custom rendering API
- [ ] Enterprise template packs
- [ ] Interactive recognition experiences

---

# Design Principles

JoyAtWork follows a few simple principles:

- Elegant over flashy
- Premium over playful
- Accessible by default
- Lightweight by design
- Enterprise ready
- Beautiful out of the box

---

# Vision

JoyAtWork aims to become the **open-source standard for workplace celebration and employee recognition experiences**.

Not another component library.

An **Employee Experience SDK**.

---

# Contributing

Contributions, feature ideas, design improvements, and bug reports are always welcome.

If you have ideas to make workplace experiences more engaging, we'd love to hear from you.

---

# License

MIT License.

---

## ⭐ Support

If JoyAtWork helps your team create better workplace experiences, consider giving the repository a ⭐.

It helps the project grow and reach more developers.

---

Built with ❤️ for happier workplaces.
