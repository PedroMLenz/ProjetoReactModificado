import React from 'react';
import { Hero, Overlay, HeroContent, HomeH1, HeroP, ButtonContainerLogin } from './home.styled';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/button';

const Home = () => {
  console.log('Home component rendered'); // Add this line to check if the component is rendering
  return (
    <Hero>
      <Overlay />
      <HeroContent>
        <HomeH1>Bem-vindo ao OrganizeJá</HomeH1>
        <HeroP>Gerencie seus times e torneios de forma fácil e eficiente.</HeroP>
        <ButtonContainerLogin>
        <Link to="/login">
          <Button text="Login" />
        </Link>
        <Link to="/register">
          <Button text="Cadastrar" />
          </Link>
        </ButtonContainerLogin>
      </HeroContent>
    </Hero>
  );
};

export default Home;