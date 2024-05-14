import styled from 'styled-components';

type MessageProps = {
  type: string;
};

export const Message = styled.div<MessageProps>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  min-height: 2.5rem;
  text-align: left;
  font-size: 0.75rem;
  color: ${props => props.type === 'error' ? 'red' : 'green'};
  gap: 0.5rem;
  svg {
    width: 1rem;
    height: auto;
    align-self: center;
    fill: ${props => props.type === 'error' ? 'red' : 'green'};
  }
`;
