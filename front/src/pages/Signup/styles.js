import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: #dadada;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 3px 5px black;
  background-color: #1e90ff;
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
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
