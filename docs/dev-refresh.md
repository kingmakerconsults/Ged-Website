# Dev Refresh Procedure

To make sure testers always see the newest frontend build, ask them to perform a "Dev Refresh" whenever a deployment goes out:

1. Open the app in Chrome (or another Chromium-based browser).
2. Press `F12` (or right-click and choose **Inspect**) to open DevTools.
3. Go to the **Application** tab and expand **Service Workers** in the left sidebar.
4. Click **Unregister** next to the service worker for this site.
5. With DevTools still open, hold **Shift** and click the browser's **Reload** button to perform a hard reload.
6. Close DevTools and continue testing.

This sequence clears any cached service worker assets and guarantees the refreshed UI (like the Vocabulary Highlights panel) is loaded from the latest deployment.
