import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { CreatePost } from "../action/Posts";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";

const Create = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    message: "",
    image: "",
  });
  const { auth } = useSelector((state) => state);

  const decoded = auth ? decode(auth) : {};

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreatePost({ ...formData, creator: decoded?.name }));
  };

  return (
    <div className="my-3 bg-white py-3 px-4">
      <h3 className="font-semibold text-center mb-3 text-xl">
        Creating Memories
      </h3>
      <form onSubmit={handleSubmit} className="form mt-4">
        <input
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          type="text"
          placeholder="Title"
          name="title"
          className="w-full py-2 px-3 rounded-sm outline-none focus:ring-1 focus:ring-blue-400 border border-slate-300"
        />
        <input
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value.split(","),
            })
          }
          type="text"
          placeholder="Tags"
          name="tags"
          className="w-full my-2 py-2 px-3 rounded-sm outline-none focus:ring-1 focus:ring-blue-400 border border-slate-300"
        />
        <textarea
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="message"
          className="outline-none border border-slate-300 focus:ring-1 focus:ring-blue-400 w-full h-[140px] resize-none px-3 py-2"
        ></textarea>
        <FileBase64
          onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
          className="mt-3"
          type="file"
        />
        <button className="bg-blue-500 text-white py-2 w-full text-center font-semibold text-md rounded-sm mt-4">
          Create Memories
        </button>
      </form>
    </div>
  );
};

export default Create;
