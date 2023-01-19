import styled from 'styled-components';

export const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  background-color: #00008b;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
  transition: all 400ms ease;
  ::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0px;
    height: 4px;
    background-color: blue;
    border-radius: 10px;
    transition: all 2s ease;
  }
  :hover::before {
    width: 100%;
  }
`;
