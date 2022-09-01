const Filter = () => {
  return (
    <div className="bg-white py-5 px-4 rounded-md">
      <input
        type="text"
        placeholder="Search memories"
        name="tags"
        className="w-full  py-2 px-3 rounded-sm outline-none focus:ring-1 focus:ring-blue-400 border border-slate-300"
      />
      <input
        type="text"
        placeholder="Search tags"
        name="tags"
        className="w-full mt-2 py-2 px-3 rounded-sm outline-none focus:ring-1 focus:ring-blue-400 border border-slate-300"
      />
    </div>
  );
};

export default Filter;
