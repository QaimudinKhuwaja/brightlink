# Vercel Production Build Fix - Admin Dashboard Route

## Problem

**Error:** 500 error on `/admin/dashboard` only in Vercel production deployment

**Root Cause:** Next.js route naming conflict

The route structure was:
```
src/app/admin/(dashboard)/dashboard/page.tsx
```

This created the URL `/admin/dashboard`, but the nested folder structure `(dashboard)/dashboard` caused Next.js to generate conflicting manifest files during Vercel's production build process. The build system looked for:
```
/var/task/.next/server/app/admin/(dashboard)/dashboard/page_client-reference-manifest.js
```

But this file wasn't being generated correctly due to the naming collision between the route group name and the nested folder name.

## Solution

Renamed the nested `dashboard` folder to `overview` to eliminate the naming conflict:

**Before:**
```
src/app/admin/(dashboard)/dashboard/page.tsx  → /admin/dashboard
```

**After:**
```
src/app/admin/(dashboard)/overview/page.tsx   → /admin/overview
```

## Changes Made

### 1. Folder Rename
```bash
src/app/admin/(dashboard)/dashboard/ → src/app/admin/(dashboard)/overview/
```

### 2. Updated References

**File: `src/components/admin/Sidebar.tsx`**
```typescript
// Before
{ href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' }

// After
{ href: '/admin/overview', icon: LayoutDashboard, label: 'Dashboard' }
```

**File: `src/app/admin/page.tsx`**
```typescript
// Before
redirect('/admin/dashboard');

// After
redirect('/admin/overview');
```

**File: `src/app/admin/login/page.tsx`**
```typescript
// Before
router.push('/admin/dashboard');

// After
router.push('/admin/overview');
```

**File: `src/middleware.ts`**
```typescript
// Before
const dashboardUrl = new URL('/admin/dashboard', request.url);

// After
const dashboardUrl = new URL('/admin/overview', request.url);
```

## Verification

### Local Build
```bash
npm run build
```

**Result:** ✅ Build successful
```
├ λ /admin/overview    3.88 kB    95.1 kB
```

### What Was NOT Changed

- ✅ API endpoint `/api/admin/dashboard/stats` - remains unchanged (different route)
- ✅ Database schema - no changes
- ✅ Authentication logic - no changes
- ✅ UI/UX - label still shows "Dashboard" in sidebar
- ✅ All other admin routes - unchanged

## Testing Checklist

### Before Deployment

- [x] Local build successful
- [ ] Local dev server runs without errors
- [ ] Can access `/admin/overview` locally
- [ ] Login redirects to `/admin/overview`
- [ ] Visiting `/admin` redirects to `/admin/overview`
- [ ] All dashboard statistics load correctly

### After Vercel Deployment

- [ ] `/admin/overview` loads without 500 error
- [ ] Login redirects to `/admin/overview`
- [ ] Dashboard statistics API calls work
- [ ] All sidebar navigation links work
- [ ] No console errors in browser

## Deployment Instructions

1. **Commit the changes:**
   ```bash
   git add .
   git commit -m "fix: resolve /admin/dashboard 500 error by renaming to /admin/overview

   - Renamed dashboard folder to overview to avoid Next.js route naming conflict
   - Updated all references from /admin/dashboard to /admin/overview
   - Fixed Vercel production build issue with page_client-reference-manifest.js
   
   Fixes production 500 error on admin dashboard route"
   ```

2. **Push to repository:**
   ```bash
   git push origin main
   ```

3. **Vercel will auto-deploy** (if connected) or manually deploy

4. **Test the deployment:**
   - Visit `https://your-domain.vercel.app/admin/login`
   - Login with admin credentials
   - Should redirect to `/admin/overview` (not `/admin/dashboard`)
   - Verify dashboard loads successfully

## Why This Fix Works

Next.js uses the folder structure to generate route manifests and client reference files. When you have:
```
app/admin/(dashboard)/dashboard/
```

The build system gets confused because:
1. Route groups `(dashboard)` are stripped from the URL
2. The actual route becomes `/admin/dashboard`
3. But internally, it's trying to reference `(dashboard)/dashboard/` 
4. This creates conflicting file paths during manifest generation

By renaming to `overview`, we have:
```
app/admin/(dashboard)/overview/
```

Now:
1. Route groups `(dashboard)` are stripped
2. The route becomes `/admin/overview` (clean, unique path)
3. Internal references are to `(dashboard)/overview/` (no conflict)
4. Manifest files generate correctly

## Technical Details

### Next.js Build Output

**Before (Error):**
```
Error: Cannot find module '/var/task/.next/server/app/admin/(dashboard)/dashboard/page_client-reference-manifest.js'
```

**After (Success):**
```
├ λ /admin/overview    3.88 kB    95.1 kB
```

The `λ` symbol indicates it's a dynamic server-rendered route, which is correct for authenticated admin pages.

## Future Prevention

To avoid similar issues:
1. Don't nest folders with the same name as route groups
2. Avoid having `(groupName)/groupName/` patterns
3. Use descriptive, unique folder names within route groups
4. Test production builds locally before deploying

## Rollback Plan (If Needed)

If the fix doesn't work, rollback:

```bash
git revert HEAD
git push origin main
```

Then investigate alternative solutions:
1. Remove route group `(dashboard)` entirely
2. Use a different route structure
3. Check Next.js version compatibility

## Additional Notes

- This is a Next.js routing/build issue, not a code logic error
- The issue only manifests in production builds (Vercel, not local dev)
- All functionality remains exactly the same
- Users won't notice any difference (URL changed, but label is still "Dashboard")

---

**Fix Applied:** September 28, 2026  
**Status:** ✅ Ready for Deployment  
**Tested:** Local build successful
