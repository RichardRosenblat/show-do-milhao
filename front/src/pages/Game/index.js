import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonHome from "../../components/Button-Home";
import ButtonGame from "../../components/Button-Game";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import Card from "../../components/Cards";

const Game = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.ImageContainer></C.ImageContainer>

      <C.Container>
        <ButtonHome Text="Pergunta de nivel 1">Pergunta</ButtonHome>
      </C.Container>

      <C.Container>
        <ButtonGame
          Text="1 Resposta"
          onClick={() => [signout(), navigate("/signin")]}
        >
          Resposta-1
        </ButtonGame>
      </C.Container>
      <C.Container>
        <ButtonGame
          Text="2 Resposta"
          onClick={() => [signout(), navigate("/signin")]}
        >
          Resposta-2
        </ButtonGame>
      </C.Container>
      <C.Container>
        <ButtonGame
          Text="3 Resposta"
          onClick={() => [signout(), navigate("/signin")]}
        >
          Resposta-3
        </ButtonGame>
      </C.Container>
      <C.Container>
        <ButtonGame
          Text="4 Resposta"
          onClick={() => [signout(), navigate("/signin")]}
        >
          Resposta-4
        </ButtonGame>
      </C.Container>

      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <Card
          Text="Pular"
          onClick={() => [signout(), navigate("/home")]}
        ></Card>
        <Card
          Text="Cartas"
          onClick={() => [signout(), navigate("/home")]}
        ></Card>
        <Card Text="Sair" onClick={() => [signout(), navigate("/home")]}></Card>
      </div>

      <C.Container></C.Container>
    </C.Container>
  );
};

export default Game;
