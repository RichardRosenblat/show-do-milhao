import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { createUser } from "../../services/user/signup";
import * as C from "./styles";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!name | !email | !emailConf | !password) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = createUser(name, email, password);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/signin");
  };

  return (
    <C.Container>
      <div className='subtitle semiBold flex flex-row gap-[20px] items-center mb-[20px]' />
      <C.Content>
        <C.Label>Crie sua conta</C.Label>
        <Input
          type="Nome"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => [setPassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Registrar" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/signin">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
