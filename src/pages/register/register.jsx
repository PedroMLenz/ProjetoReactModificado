import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axios-client";
import Button from "../../components/Button/button.jsx";
import Input from "../../components/Input/input.jsx";

const Register = () => {
  const [disableButton, setDisableButton] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const inputPassword = useRef(null);
  const confirmPassword = useRef(null);
  const navigate = useNavigate();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleName = (event) => {
    handleEnableButton();
    setName(event.target.value);
  };

  const handleSurname = (event) => {
    handleEnableButton();
    setSurname(event.target.value);
  };

  const handleEmail = (event) => {
    handleEnableButton();
    setEmail(event.target.value);
    setEmailInvalid(!emailPattern.test(event.target.value));
  };

  const handlePassword = (event) => {
    handleEnableButton();
    setPassword(event.target.value);
  };

  const handleEnableButton = () => {
    const passwordsMatch = confirmPassword.current.value === inputPassword.current.value;
    setPasswordMismatch(!passwordsMatch);
    if (name !== "" && surname !== "" && email !== "" && password !== "" && passwordsMatch) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log({ name, email, password });
      const payload = {
        name: name,
        surname: surname,
        email: email,
        password: password,
      };
      console.log({ payload });
      const response = await axiosClient.post("/users", payload);
      if (response?.status !== 201) throw new Error(response.data);
      console.log(response);
      const { data } = response;
      console.log({ data });
      alert("Usuário criado");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form action="" method="get" onSubmit={onSubmit}>
      <h1 className="title">Novo Usuário</h1>
      <Input
        type="text"
        placeholder="Nome de Login"
        name="name"
        onChange={handleName}
      />
      <Input
        type="text"
        placeholder="Sobrenome"
        name="surname"
        onChange={handleSurname}
      />
      <Input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleEmail}
      />
      {emailInvalid && <pre>{`Campo Email é inválido!!!`}</pre>}
      <Input
        type="password"
        placeholder="Senha"
        onChange={handlePassword}
        ref={inputPassword}
        name="password"
      />
      <Input
        type="password"
        placeholder="Confirmar a senha"
        name="password_confirm"
        ref={confirmPassword}
        onChange={handleEnableButton}
      />
      {passwordMismatch && <pre>{`As senhas não coincidem!`}</pre>}
      <Button text="Cadastrar" disabled={disableButton}>
        Cadastrar
      </Button>
    </form>
  );
};

export default Register;
