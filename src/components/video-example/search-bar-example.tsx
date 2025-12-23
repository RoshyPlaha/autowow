import Image from "next/image";

const SearchBarExample = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/assets/searchbar.gif"
          alt="Search bar example animation"
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
          unoptimized
        />
      </div>
    </div>
  );
};

export default SearchBarExample;
