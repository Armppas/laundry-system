# UI Analysis - Kapee Dashboard Style

## 🎨 Key Design Elements

### Color Scheme
- **Primary Blue**: #5B7FFF (Bright blue for buttons and active states)
- **Light Blue**: #E8EEFF (Light background for cards)
- **Neutral Gray**: #6B7280 (Text and borders)
- **White**: #FFFFFF (Card backgrounds)
- **Purple Gradient**: Background gradient (Light purple to lavender)

### Layout Structure
1. **Sidebar** (Left)
   - White background
   - Logo at top
   - Menu items with icons
   - Active menu item: Blue background with rounded corners
   - Bottom: Dark mode toggle, Settings, Help center

2. **Top Navigation** (Right)
   - Search bar in center (light gray background)
   - Bell icon for notifications
   - User profile section with avatar and name
   - Three-dot menu

3. **Main Content Area**
   - Greeting section: "Hello, Rishi!"
   - Filter and Export buttons
   - KPI Cards (4 cards in 2x2 grid)
   - Charts section (Revenue bar chart + Traffic pie chart)
   - Recent Activity table

### KPI Cards Style
- White background with subtle shadow
- Title + Value + Growth percentage
- Green/Red indicators for positive/negative growth
- "View Report" link with arrow
- Compact and clean design

### Charts
- **Revenue Chart**: Bar chart with blue bars, light gray background
- **Traffic Channel**: Donut/pie chart with blue gradient
- Legend below with Direct, Organic, Referral

### Typography
- Bold headings for section titles
- Regular weight for body text
- Smaller text for descriptions
- Consistent spacing

### Spacing & Padding
- Generous padding in cards (16-24px)
- Clear separation between sections
- Breathing room between elements

### Interactive Elements
- Buttons: Blue background with white text
- Hover states: Darker blue or slight shadow
- Icons: Consistent size and color
- Badges/Tags: Colored backgrounds with text

## 🔄 Implementation Plan

1. Update Tailwind config with new color palette
2. Redesign Sidebar with better spacing and styling
3. Improve Navbar with search bar and better layout
4. Update Card components with new shadow and padding
5. Add Chart components (using Recharts or Chart.js)
6. Redesign Dashboard page with new layout
7. Update all UI components to match new style
