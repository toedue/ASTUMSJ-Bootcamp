import featuredImage from "../assets/image.jpg";

const FeaturedPost = () => {
  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative mt-4 rounded-xl overflow-hidden h-96">
          <img
            src={featuredImage}
            className="w-full h-full object-cover rounded-2xl "
          />

          <div className="absolute inset-0 bg-opacity-30 flex items-center p-8">
            <div className="text-white">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Featured
              </span>
              <h1 className="text-3xl md:text-4xl font-bold my-5">
                Breaking into Product Design
              </h1>
              <p className="text-3xl md:text-4xl font-bold my-5">
                Advice from Untitled Founder, Frankie
              </p>
              <p className="text-base md:text-lg">
                Let's get one thing out of the way: you don't need a fancy
                <br />
                Bachelor's Degree to get into Product Design. We sat down
                <br />
                with Frankie Sullivan to talk about gatekeeping in product
                <br />
                design and how anyone can get into this growing industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;

<img src={featuredImage} className="w-full h-full object-cover rounded-2xl " />;
