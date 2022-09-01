import { Create, Filter, PostCard } from "../components";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPosts } from "../action/Posts";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { auth, posts } = useSelector((state) => state);

  useEffect(() => {
    dispatch(GetAllPosts());
  }, []);

  return (
    <div className="mt-10 flex items-start justify-between">
      <div className="w-[70%] grid grid-cols-3 gap-4">
        {posts?.map((post, idx) => (
          <PostCard key={idx} data={post} />
        ))}
      </div>
      <div className="w-[27%]">
        <Filter />
        {auth ? (
          <>
            <Create />
          </>
        ) : (
          <div className="mt-4 bg-white py-5 px-4 rounded-md">
            <p className="text-center text-md font-semibold">
              Please sign in first , so than you can create the memories and
              share it to your friends or family{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
