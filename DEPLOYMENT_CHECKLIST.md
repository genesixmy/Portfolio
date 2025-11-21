# Deployment Checklist - GitHub & Netlify

## ✅ Pre-Deployment

- [ ] All code committed to local git repository
- [ ] `.env.local` NOT committed (it's in .gitignore)
- [ ] `.env.local.example` available for reference
- [ ] README.md contains setup instructions
- [ ] Security documentation complete (SECURITY.md)

## 📤 GitHub Setup (5 minutes)

### Step 1: Create GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Name: `portfolio` (or your choice)
- [ ] **Do NOT** initialize with README
- [ ] Click "Create repository"

### Step 2: Push to GitHub
Run these commands in your project directory:

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

- [ ] Verify code appears on GitHub

## 🌐 Netlify Deployment (5-10 minutes)

### Step 1: Connect GitHub
- [ ] Go to https://app.netlify.com
- [ ] Click "New site from Git"
- [ ] Select "GitHub"
- [ ] Authorize Netlify
- [ ] Select your portfolio repository

### Step 2: Build Settings
Netlify auto-detects Next.js, verify:
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Node version: 18.x or higher

### Step 3: Environment Variables
In Netlify Site Settings → Environment:

```
WEB3FORMS_API_KEY = [Get from https://web3forms.com]
NEXT_PUBLIC_APP_URL = https://your-site.netlify.app
```

- [ ] Add `WEB3FORMS_API_KEY`
- [ ] Add `NEXT_PUBLIC_APP_URL` (after getting Netlify domain)

### Step 4: Deploy
- [ ] Click "Deploy site"
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Verify site is live

## 🧪 Post-Deployment Testing

### Basic Functionality
- [ ] Website loads at live URL
- [ ] All sections visible (Hero, About, Work, Contact)
- [ ] Animations working smoothly
- [ ] Navigation links work

### Contact Form
- [ ] Form displays correctly
- [ ] Can submit test message
- [ ] Success message appears
- [ ] Email is received in Web3Forms

### Security Headers
Test with: `curl -I https://your-site.netlify.app`
- [ ] Strict-Transport-Security present
- [ ] Content-Security-Policy present
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff

### Rate Limiting
- [ ] Submit form 5 times → success
- [ ] 6th submission → error "Too many requests"

## 🔐 Security Verification

- [ ] API key never visible in browser
- [ ] `.env.local` file not in repository
- [ ] Environment variables set in Netlify
- [ ] HTTPS working (automatic with Netlify)
- [ ] Security headers all present

## 🎯 Custom Domain (Optional)

If using a custom domain:
1. [ ] Register domain (Namecheap, GoDaddy, etc.)
2. [ ] Point DNS to Netlify nameservers
3. [ ] Add domain in Netlify settings
4. [ ] Enable automatic SSL (automatic)
5. [ ] Update `NEXT_PUBLIC_APP_URL` environment variable

## 📊 Monitoring & Maintenance

- [ ] Monitor Netlify deploy logs
- [ ] Watch for build failures
- [ ] Track form submissions
- [ ] Monitor security headers
- [ ] Keep dependencies updated
- [ ] Review rate limit metrics

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm run build` locally, review logs |
| Contact form errors | Verify `WEB3FORMS_API_KEY` is set in Netlify |
| CORS errors | Set `NEXT_PUBLIC_APP_URL` to your domain |
| Page returns 404 | Check Next.js version, reset cache |
| Security headers missing | Verify `next.config.mjs` is correct |

## 📝 Notes

- Netlify automatically rebuilds on git pushes
- Every commit to `main` triggers a new deployment
- Old deployments preserved in Netlify history
- Can rollback to previous versions anytime
- Free SSL certificate automatic with Netlify

---

**Expected Timeline:**
- GitHub setup: 5 minutes
- Netlify setup: 5-10 minutes
- First build: 2-3 minutes
- **Total: ~15-20 minutes**

✅ You're ready to deploy!
