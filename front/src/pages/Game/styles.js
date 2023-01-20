import styled from "styled-components";
import img from "../../assets/Logo-03.png";

export const Title = styled.h2``;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: white;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: #1e90ff;
  max-width: 500px;
  padding: 20px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 24x;
  font-weight: 600;
  color: black;
`;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: black;
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: black;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
`;

export const Image = () => {
  return <ImageContainer />;
};
