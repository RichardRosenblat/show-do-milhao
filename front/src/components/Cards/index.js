import React from "react";
import * as C from "./styles";

const Card = ({ Text, onClick, Type = "button" }) => {
  return (
    <C.Card type={Type} onClick={onClick}>
      {Text}
    </C.Card>
  );
};

export default Card;
