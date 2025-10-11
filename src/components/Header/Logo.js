import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark dark:text-light">
      <span className="font-inter font-bold dark:font-semibold text-lg md:text-xl">
        Evan Willow Maus
      </span>
    </Link>
  );
};

export default Logo;
