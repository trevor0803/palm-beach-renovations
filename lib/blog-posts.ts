// Palm Beach Renovations: new guides written by MAT Factory.
//
// How this file works: the factory's weekly blog writer adds one post at the
// top of the BLOG_POSTS array below. Each post is an object with these keys:
// slug (kebab-case), title, description, category, publishedAt, updatedAt,
// intro, sections (a list of heading and paragraphs). lib/guides.ts turns
// every post here into a guide page, so a new post is published on /guides,
// in the sitemap and in the Article schema with no other edit.
//
// Editorial rules (binding for every post):
// - Write like a knowledgeable local remodeler explaining things plainly to a
//   homeowner in Palm Beach County or Martin County. Kitchens and bathrooms.
// - Categories to reuse: Planning, Permits, Kitchens, Bathrooms, Materials.
// - Permit and code facts must come from the county building department or the
//   code itself, never from a blog or a directory. If a detail is unclear,
//   leave it out.
// - Never invent jobs, customers, reviews, statistics, prices, years in
//   business, awards, licences or guarantees. Hedge material behavior as ranges.
// - No phone numbers, no links, no ALL CAPS, no emoji, no exclamation marks.
// - Do not repeat a topic already covered on /guides.

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const BLOG_POSTS = [
];

export const blogPosts: BlogPost[] = BLOG_POSTS as BlogPost[];
