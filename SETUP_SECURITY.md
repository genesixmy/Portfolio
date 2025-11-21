# 🔐 Security Setup - Quick Start

**Time Required:** 5 minutes

---

## Step 1: Get Your Web3Forms API Key

1. Go to https://web3forms.com
2. Sign up or log in
3. Copy your API Access Key
4. Keep it safe! (It's sensitive)

---

## Step 2: Add API Key to .env.local

Open `.env.local` in your project:

```
# Web3Forms API Key (SECURE - NOT PUBLIC)
WEB3FORMS_API_KEY=your_api_key_here_paste_your_actual_key
```

Replace `your_api_key_here_paste_your_actual_key` with your actual API key from Web3Forms.

---

## Step 3: Test It Works

### Option A: Test via Form UI
1. Run: `npm run dev`
2. Go to http://localhost:3000
3. Scroll to Contact section
4. Fill in the form and submit
5. You should get a success message ✅

### Option B: Test via Terminal
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your.email@example.com",
    "subject": "New Project",
    "message": "This is a test message with at least 10 characters"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

---

## Step 4: Deploy to Production

When deploying to Vercel, Netlify, or your hosting provider:

1. **Add environment variable:**
   - Key: `WEB3FORMS_API_KEY`
   - Value: Your actual API key (same as in .env.local)

2. **Verify HTTPS is enabled**
   - Most platforms enable it by default
   - It's required for security headers to work

3. **(Optional) Set CORS origin:**
   - Add `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
   - This restricts API access to your domain only

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Contact form submits successfully
- [ ] Success message appears
- [ ] Email is received
- [ ] No console errors
- [ ] Rate limiting works (try 6 submissions in quick succession)
- [ ] Security headers are present (check with curl)

---

## 🧪 Test Rate Limiting

Submit 5-6 form submissions quickly. On the 6th, you should get:

```
❌ Error: "Too many requests. Please try again later."
```

This is normal and shows rate limiting is working! ✅

Wait 1 hour and try again (or test with different IP address).

---

## 🚀 You're Ready!

Your website is now secure and ready to deploy!

### What's Protected:
✅ API credentials not exposed
✅ Form spam prevented
✅ XSS attacks blocked
✅ Injection attacks prevented
✅ Rate limiting active
✅ Security headers enabled

### What's Preserved:
✅ All features working
✅ User experience unchanged
✅ No additional complexity
✅ No breaking changes

---

## ❓ Help

### Contact form not working?
→ Check that `WEB3FORMS_API_KEY` is set correctly

### Getting rate limit errors?
→ This is normal. Wait 1 hour or test from different IP

### Need more info?
→ Read `SECURITY.md` for comprehensive documentation

---

**Questions? Everything is documented in `SECURITY.md` 📖**
