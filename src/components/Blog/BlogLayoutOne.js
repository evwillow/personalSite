import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogLayoutOne = ({ blog }) => {
  return (
    <div className="group relative w-full h-full aspect-[4/3] rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10" />
      <Image
        src={blog.image.src}
        placeholder="blur"
        blurDataURL={blog.image.blurDataURL}
        alt={blog.title}
        fill={true}
        className="object-cover object-center rounded-xl group-hover:scale-105 transition-all ease duration-300"
        sizes="(max-width: 1180px) 100vw, 50vw"
        priority={true}
      />
      <div className="absolute bottom-0 p-6 z-20 w-full">
        <Link href={blog.url} className="w-full">
          <h2 className="font-bold text-xl md:text-2xl text-light">
            <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutOne;