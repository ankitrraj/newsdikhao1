-- Firebase Firestore Collections Structure
-- This is a reference for the collections you need to create in Firebase

-- Collection: categories
-- Document structure:
{
  "id": "string (auto-generated)",
  "name": "string (e.g., 'Politics', 'Sports', 'Technology')",
  "slug": "string (e.g., 'politics', 'sports', 'technology')",
  "description": "string (optional)"
}

-- Collection: news
-- Document structure:
{
  "id": "string (auto-generated)",
  "title": "string",
  "content": "string (full article content)",
  "summary": "string (brief summary)",
  "imageUrl": "string (image URL)",
  "category": "string (category slug)",
  "author": "string",
  "publishedAt": "timestamp",
  "viewCount": "number (default: 0)",
  "tags": "array of strings"
}

-- Sample data for categories collection:
-- Document 1:
{
  "name": "राजनीति",
  "slug": "politics",
  "description": "राजनीतिक समाचार और अपडेट"
}

-- Document 2:
{
  "name": "खेल",
  "slug": "sports", 
  "description": "खेल जगत की ताजा खबरें"
}

-- Document 3:
{
  "name": "तकनीक",
  "slug": "technology",
  "description": "तकनीकी समाचार और नवाचार"
}

-- Document 4:
{
  "name": "मनोरंजन",
  "slug": "entertainment",
  "description": "बॉलीवुड और मनोरंजन की दुनिया"
}

-- Document 5:
{
  "name": "व्यापार",
  "slug": "business",
  "description": "व्यापार और अर्थव्यवस्था की खबरें"
}
