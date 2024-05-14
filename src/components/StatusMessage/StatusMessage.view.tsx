import { ReactElement, ReactNode, FunctionComponent } from 'react';
import { Icon } from '../Icon';
import * as Styled from './StatusMessage.styles';

type StatusMessageProps = {
  type?: string;
  isHidden: boolean;
  children: ReactNode;
};

const icons: { [key: string]: ReactElement } = {
  error: <Icon.Caution />,
  success: <Icon.TickCircle />,
};

export const StatusMessageView: FunctionComponent<StatusMessageProps> = ({
  children,
  type = 'error',
  isHidden = false,
  ...props
}) => (
  <Styled.Message type={type}>
    {!isHidden && (
      <>
        {icons[type] && <span>{icons[type]}</span>}
        <span  {...props}>{children}</span>
      </>
    )}
  </Styled.Message>
);
