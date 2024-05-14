import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    margin: 5rem auto;
    height: 25rem;
    justify-content: space-between;
`;

export const FormBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
`;

export const Input = styled.input`
  width: 100%;
  display: flex;
  box-sizing: border-box;
`;