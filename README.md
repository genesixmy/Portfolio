# Security-Hardened Portfolio Website

A modern, secure portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## 🔐 Security Features

- **Protected API Credentials**: Web3Forms API key stored server-side, never exposed to client
- **Backend API Endpoint**: Secure `/api/contact` endpoint with validation and sanitization
- **Input Validation & Sanitization**: Prevents XSS and injection attacks
- **Rate Limiting**: 5 form submissions per IP per hour
- **Security Headers**: 7 protective HTTP headers configured
  - HSTS (Strict-Transport-Security)
  - CSP (Content-Security-Policy)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
  - X-Permitted-Cross-Domain-Policies

## 🎨 Features

- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Three.js 3D scene integration
- Custom React hooks for reusable logic
- TypeScript for type safety
- Performance optimizations
- Clean code architecture

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-github-url>
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your Web3Forms API key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📋 Environment Variables

Create `.env.local` in the root directory:

```
# Web3Forms API Key (Get from https://web3forms.com)
WEB3FORMS_API_KEY=your_api_key_here

# Optional: Restrict CORS to your domain
NEXT_PUBLIC_APP_URL=https://yourwebsite.com
```

⚠️ **Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

## 🌐 Netlify Deployment

### Step 1: Connect Your Repository

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your portfolio repository
5. Click "Deploy"

### Step 2: Configure Build Settings

In Netlify Dashboard:

1. Go to **Site Settings → Build & Deploy**
2. Set Build command: `npm run build`
3. Set Publish directory: `.next`

### Step 3: Add Environment Variables

In Netlify Dashboard:

1. Go to **Site Settings → Environment**
2. Click "Edit variables"
3. Add your environment variables:
   - `WEB3FORMS_API_KEY`: Your actual Web3Forms API key
   - `NEXT_PUBLIC_APP_URL`: Your Netlify domain or custom domain

### Step 4: Deploy

Netlify will automatically deploy when you push to the main branch.

## 📚 Project Structure

```
src/
├── app/                 # Next.js 14 App Router
│   ├── api/            # API routes
│   ├── page.tsx        # Home page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── sections/       # Page sections
│   ├── ui/            # UI components
│   ├── about/         # About section components
│   └── three/         # Three.js components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── constants/         # Static data
└── types/             # TypeScript types
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run e2e tests
npm run test:e2e

# Run linter
npm run lint
```

## 📖 Documentation

- [Security Implementation](./SECURITY.md) - Detailed security guide
- [Security Setup Guide](./SETUP_SECURITY.md) - Quick setup instructions
- [Implementation Summary](./SECURITY_IMPLEMENTATION_SUMMARY.md) - Overview of changes

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Support

For security-related questions or issues, please check the [SECURITY.md](./SECURITY.md) documentation.

---

**Built with security in mind** 🔒
