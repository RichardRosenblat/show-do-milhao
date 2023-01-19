import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Title>SHOW DO MILHAO LEVEL UP</C.Title>
      <C.Container>
        <div className="bg-[#fff01f80] my-[35px] h-px w-full" />
        <div className="subtitle semiBold flex flex-row gap-[20px] items-center mb-[20px]" />
      </C.Container>

      <Button Text="Sair" onClick={() => [signout(), navigate("/signin")]}>
        Sair
      </Button>

      <C.Container>
        <div className="bg-[#fff01f80] my-[35px] h-px w-full" />
        <div className="subtitle semiBold flex flex-row gap-[20px] items-center mb-[20px]" />
      </C.Container>
    </C.Container>
  );
};

export default Home;
