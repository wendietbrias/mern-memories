import { useSelector, useDispatch } from "react-redux";

const Alert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);

  return (
    <div
      className={`w-full mt-5 ${alert.variant} flex justify-between items-center py-3 px-4 rounded-md`}
    >
      <h5 className={`${alert.textVariant} font-semibold text-md`}>
        {alert?.msg}
      </h5>
      <button
        onClick={() => dispatch({ type: "CLOSE_ALERT" })}
        className={`text-md font-bold ${alert.textVariant}`}
      >
        x
      </button>
    </div>
  );
};

export default Alert;
