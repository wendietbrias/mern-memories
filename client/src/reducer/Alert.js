const init = {
  isOpen: false,
  msg: "",
  variant: "",
  textVariant: "",
};

const AlertReducer = (state = init, { type, payload }) => {
  if (type === "OPEN_ALERT") {
    return {
      ...state,
      isOpen: true,
      msg: payload.msg,
      variant: payload.variant,
      textVariant: payload.textVariant,
    };
  } else if (type === "CLOSE_ALERT") {
    return {
      ...state,
      isOpen: false,
    };
  }
  return state;
};

export default AlertReducer;
