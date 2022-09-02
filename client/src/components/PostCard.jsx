import moment from "moment";
import { HiOutlineThumbUp, HiThumbUp, HiOutlineTrash } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import decode from "jwt-decode";
import { DeletePost, LikePost } from "../action/Posts";
import { useState } from "react";
import { useEffect } from "react";

const PostCard = ({ data, setId }) => {
  const dispatch = useDispatch();
  const { auth, posts } = useSelector((state) => state);
  const decoded = auth ? decode(auth) : {};
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLike = data?.likes?.find((userId) => userId === decoded?._id);

    if (checkLike) {
      return setLiked(true);
    }

    setLiked(false);
  }, [data]);

  if (!data) return;

  return (
    <div className="w-full rounded-md bg-white shadow-md overflow-hidden">
      <div className="h-[250px] relative">
        <div
          className="py-5 px-7 w-full text-white absolute top-0 h-full flex justify-between items-start"
          style={{ backgroundColor: "rgba(5,5,5,0.5)" }}
        >
          <div className="flex-1">
            <h4 className="font-bold text-xl">
              {decoded?._id === data?.userId ? "You" : data?.creator}
            </h4>
            <p className="text-sm font-medium mt-1">
              {data?.createdAt
                ? moment(data?.createdAt).fromNow()
                : new Date().toDateString()}
            </p>
          </div>
          {decoded?._id === data?.userId && (
            <BsThreeDots
              onClick={() => setId(data?._id)}
              className="text-md cursor-pointer"
            />
          )}
        </div>
        <img src={data?.image} alt={data?.title} className="w-full h-full" />
      </div>
      <div className="py-4 px-5">
        <div className="text-gray-400 font-normal text-sm">
          {data?.tags?.map((tag, idx) => (
            <span key={idx}>#{tag} </span>
          ))}
        </div>
        <h2 className="text-2xl mt-3 font-semibold">{data?.title}</h2>
        <p className="text-gray-400 font-normal leading-5 text-sm mt-2">
          {data?.message?.length > 100
            ? data?.message?.substring(0, 110)
            : data?.message}
          ..
        </p>
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => dispatch(LikePost(data?._id, decoded?._id))}
            className="flex items-center text-blue-500 font-medium"
          >
            {liked ? (
              <HiThumbUp className="mr-2" />
            ) : (
              <HiOutlineThumbUp className="mr-2" />
            )}
            {data?.likes?.length} Likes
          </button>
          {decoded?._id === data?.userId && (
            <button
              onClick={() => dispatch(DeletePost(data?._id))}
              className="flex items-center font-medium text-blue-500"
            >
              <HiOutlineTrash className="mr-2" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
