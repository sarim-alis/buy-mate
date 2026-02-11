# Troubleshooting Guide

## "Failed to fetch" Error

If you're seeing a "Failed to fetch" error when loading the application, try these solutions:

### 1. Check Browser Console
Open Developer Tools (F12) → Console tab to see detailed error messages.

### 2. Disable Ad Blockers
Some ad blockers may block API requests. Try:
- Disabling uBlock Origin, AdBlock, or similar extensions
- Adding `dummyjson.com` to your allowlist

### 3. Check Network Tab
Open Developer Tools (F12) → Network tab:
- Look for requests to `dummyjson.com`
- Check if they're blocked or failing
- Look at the status code and error message

### 4. Try a Different Browser
Test in Chrome, Firefox, or Safari to rule out browser-specific issues.

### 5. Check Internet Connection
Ensure you have a stable internet connection and can access:
- https://dummyjson.com/products

### 6. Clear Browser Cache
Sometimes cached data can cause issues:
- Clear browser cache and cookies
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### 7. Check Firewall/Antivirus
Some security software may block API requests:
- Temporarily disable firewall/antivirus
- Add exception for localhost and dummyjson.com

### 8. Verify the API is Working
Test the API directly in your browser:
```
https://dummyjson.com/products?limit=10
```

If you see JSON data, the API is working fine.

## Common Solutions

### Solution 1: Restart Dev Server
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Solution 2: Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Solution 3: Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Still Having Issues?

If none of the above solutions work, the issue might be:
- Network firewall blocking external API calls
- ISP blocking the domain
- Regional restrictions

Try using a VPN or contact your network administrator.
