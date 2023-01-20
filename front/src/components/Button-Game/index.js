import React from "react";
import * as C from "./styles";

const ButtonGame = ({ Text, onClick, Type = "button" }) => {
  return (
    <C.ButtonGame type={Type} onClick={onClick}>
      {Text}
    </C.ButtonGame>
  );
};

export default ButtonGame;
