import { compareDesc, parseISO } from "date-fns";

export const cx = (...classNames) => classNames.filter(Boolean).join(" ");

export const sortBlogs = (blogs) => {
  if (!blogs || !Array.isArray(blogs)) {
    console.error("Invalid blogs data passed to sortBlogs:", blogs);
    return [];
  }

  return blogs
    .filter((blog) => blog.publishedAt) // Exclude blogs without publishedAt
    .slice()
    .sort((a, b) => {
      try {
        const dateA = parseISO(a.publishedAt);
        const dateB = parseISO(b.publishedAt);
        return compareDesc(dateA, dateB);
      } catch (error) {
        console.error("Error parsing publishedAt date:", error, {
          a: a.publishedAt,
          b: b.publishedAt,
        });
        return 0; // Default to no change in order
      }
    });
};
