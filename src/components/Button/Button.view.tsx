import { ReactNode, } from 'react';
import * as Styled from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
};


export const ButtonView = ({
  children,
  ...props
}: ButtonProps) => (
  <Styled.Button {...props}>
    {children}
  </Styled.Button>
);
