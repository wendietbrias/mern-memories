import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="col-span-12 flex flex-col items-center">
      <ReactLoading type="spin" color="#0077bb" width={150} height={150} />
      <h2 className="text-3xl mt-7 font-semibold">Loading...</h2>
    </div>
  );
};

export default Loading;
