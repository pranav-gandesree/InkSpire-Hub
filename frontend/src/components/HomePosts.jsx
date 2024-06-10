
const HomePosts = ({ post }) => {
  // Destructure properties from post with default values to avoid undefined errors
  const { title = "", username = "", updatedAt = "", description = "" } = post || {};

  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={ post.photo} alt="" className="h-full w-full object-cover"/>
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{updatedAt ? new Date(updatedAt).toString().slice(0, 15) : ""}</p>
            <p>{updatedAt ? new Date(updatedAt).toString().slice(16, 24) : ""}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {/* {description ? description.slice(0, 20) + " ...Read more" : ""} */}
          {description }
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
