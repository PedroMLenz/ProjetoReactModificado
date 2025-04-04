import styled from 'styled-components';

export const Hero = styled.main`
  position: relative;
  background-image: url('https://img.freepik.com/free-photo/green-fake-grass-background_53876-16313.jpg?t=st=1736435207~exp=1736438807~hmac=4029924d6f161099a688ead85c5f00d368136554481daf45d8616e72b6ac946f&w=1380');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-align: center;
  filter: grayscale(100%); // Apply grayscale filter
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8); // Increased opacity to make the background darker
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 50rem;
`;

export const HomeH1 = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 900;
  color: #323232;
`;

export const HeroP = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #fff;
`;

export const ButtonContainerLogin = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonHome = styled.a`
  padding: 1rem;
  background: #242424;
  color: #fff;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
  transition: 0.5s;
  border-radius: 1rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  font-style: normal;
  margin: 1rem;
`;

