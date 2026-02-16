# Global Technology Innovations

Modern full-cycle construction company website built with Next.js 15 and TypeScript.

## 🚀 Features

- **Multilingual**: Support for 6 languages (Ukrainian, Slovak, Czech, English, German, French)
- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **SEO Optimized**: Automatic sitemap generation, meta tags, and JSON-LD schemas
- **Responsive Design**: Fully responsive interface for all devices
- **Animations**: Smooth animations with Framer Motion
- **Forms**: Interactive forms with validation and file uploads
- **Cookie Consent**: GDPR-compliant cookie consent banner

## 🛠 Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI, shadcn/ui
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Forms**: React Hook Form, React Dropzone
- **Media**: Lightgallery, Swiper, React Player
- **Icons**: Lucide React, React Icons
- **Fonts**: Google Fonts (Roboto Condensed)

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd global_technology_inovenshens
```

2. Install dependencies:

```bash
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Troubleshooting

### Dev Server Hangs / Project Does Not Start

If `yarn dev` hangs without showing:

```
Local: http://localhost:3000
```

or Next.js freezes silently — the issue is most likely **Node.js version incompatibility**.

**Cause:** Next.js (especially with Turbopack) may freeze on Node 22+. This project is tested and works correctly with **Node 20** (recommended).

**Solution:**

1. **Install and switch to Node 20**

   If you use nvm:

   ```bash
   nvm install 20
   nvm use 20
   ```

   Verify:

   ```bash
   node -v
   ```

   It should output something like: `v20.x.x`

2. **Clean install dependencies**

   ```bash
   rm -rf node_modules .next
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

   The server should now start normally.

## 🏗 Project Structure

```
src/
├── app/[locale]/          # Multilingual pages
├── components/            # React components
│   ├── about/            # About us section components
│   ├── careers/          # Careers section components
│   ├── contact/          # Contact section components
│   ├── hero/             # Main sections
│   ├── layout/           # Layout components
│   ├── our-services/     # Services components
│   ├── portfolio/        # Portfolio components
│   └── ui/               # UI components
├── i18n/                 # Internationalization configuration
├── lib/                  # Utilities and configuration
├── queries/              # React Query hooks
└── types/                # TypeScript types
```

## 🌐 Supported Languages

- 🇺🇦 Ukrainian (default)
- 🇸🇰 Slovak
- 🇨🇿 Czech
- 🇬🇧 English
- 🇩🇪 German
- 🇫🇷 French

## 📄 Available Pages

- **Home** - Main page with hero section, about us, contacts, and FAQ
- **About** - Detailed information about the company
- **Services** - List of construction services
- **Portfolio** - Gallery of completed projects
- **Careers** - Job vacancies and employment opportunities
- **Outstaffing** - Outstaffing services
- **Contact** - Contact form and contact information

## 🚀 Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Connect your repository to Vercel
2. Configure environment variables (if needed)
3. Deployment will happen automatically

## 📝 Scripts

- `yarn dev` - Run development server with Turbopack
- `yarn build` - Build project for production
- `yarn start` - Run production server
- `yarn lint` - Run ESLint code checking

## 📄 License

This project is private.

---

**Global Technology Innovations** - Your reliable partner in construction and renovation
