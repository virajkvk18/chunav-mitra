/**
 * Vercel Serverless Function — /api/config
 * Returns the Gemini API key from a server-side environment variable.
 * The key is NEVER exposed in the frontend source code or GitHub repo.
 *
 * Setup:
 *   1. In Vercel Dashboard → Your Project → Settings → Environment Variables
 *   2. Add:  GEMINI_API_KEY = AIza... (your actual key)
 *   3. Redeploy. Done.
 *
 * For local dev, create a .env.local file (already in .gitignore):
 *   GEMINI_API_KEY=AIza...
 */
module.exports = function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.GEMINI_API_KEY || '';

  if (!key) {
    // Key not configured on server — client will fall back to asking user
    return res.status(404).json({ configured: false });
  }

  // Return the key — this endpoint is server-side only, not in your JS bundle
  return res.status(200).json({ configured: true, key });
}
