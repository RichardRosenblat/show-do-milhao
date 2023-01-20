import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonHome from "../../components/Button-Game";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.ImageContainer></C.ImageContainer>

      <ButtonHome Text="Jogar" onClick={() => [signout(), navigate("/signin")]}>
        Jogar
      </ButtonHome>
    </C.Container>
  );
};

export default Home;
