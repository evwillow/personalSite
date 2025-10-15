# Environment Variables Setup

To fix the "Contentful credentials not configured" warning, you need to create a `.env.local` file in your project root with the following variables:

## Required Environment Variables

Create a `.env.local` file with:

```bash
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Supabase Configuration (if using)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## How to get Contentful credentials:

1. Go to [Contentful](https://www.contentful.com/) and sign in
2. Create a new space or select an existing one
3. Go to Settings → API keys
4. Copy the Space ID and Content Delivery API access token
5. Add them to your `.env.local` file

## Note:
- The `.env.local` file should be in your project root (same level as package.json)
- Never commit this file to version control
- Restart your development server after adding environment variables
