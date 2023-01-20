import React from "react";
import * as C from "./styles";

const ButtonHome = ({ Text, onClick, Type = "button" }) => {
  return (
    <C.ButtonHome type={Type} onClick={onClick}>
      {Text}
    </C.ButtonHome>
  );
};

export default ButtonHome;
