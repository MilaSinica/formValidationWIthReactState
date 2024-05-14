import { FormEvent, useState } from 'react';
import { validateEmail, validatePassword, validateConfirmPassword } from '../../definitions/utils'
import { TEST_IDS } from '../../definitions/constants';
import StatusMessage from '../../components/StatusMessage';
import Button from '../../components/Button';
import * as Styled from './SignUpPage.styles';

type FormErrors = {
    passwordE: string | null;
    emailE: string | null;
    confirmPasswordE: string | null;
}

export const SignUpPageView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState<FormErrors>({ passwordE: null, emailE: null, confirmPasswordE: null });
    const [isSuccessed, setSuccess] = useState(false);

    const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailE = validateEmail(email);
        const passwordE = validatePassword(password);
        const confirmPasswordE = validateConfirmPassword(confirmPassword, password);

        setFormErrors({ emailE, passwordE, confirmPasswordE });
        setSuccess(!Boolean(passwordE || emailE || confirmPasswordE));
    }

    const handleLogOut = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSuccess(false)
    }

    return <Styled.Container>
        {isSuccessed ? (
            <>
                <h2>Welcome{` `}{email}!</h2>
                <Button onClick={handleLogOut}>Sign out</Button>
            </>
        ) : (
            <>
                <h1>Sign up</h1>
                <form onSubmit={handleSignUp}>
                    <Styled.FormBlock>
                        <label id="username">Username</label>
                        <Styled.Input value={email} aria-labelledby="username" onChange={(e) => setEmail(e.target.value)} />
                        <StatusMessage data-testid={TEST_IDS.usernameInputError} isHidden={!Boolean(formErrors.emailE || isSuccessed)}>{formErrors.emailE}</StatusMessage>
                    </Styled.FormBlock>

                    <Styled.FormBlock>
                        <label id="password">Password</label>
                        <Styled.Input type="password" aria-labelledby="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <StatusMessage data-testid={TEST_IDS.passwordInputError} isHidden={!Boolean(formErrors.passwordE || isSuccessed)}>{formErrors.passwordE}</StatusMessage>
                    </Styled.FormBlock>
                    <Styled.FormBlock>
                        <label id="confirm-password">Confirm password</label>
                        <Styled.Input type="password" aria-labelledby="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <StatusMessage data-testid={TEST_IDS.confirmPasswordInputError} isHidden={!Boolean(formErrors.confirmPasswordE || isSuccessed)}>{formErrors.confirmPasswordE}</StatusMessage>
                    </Styled.FormBlock>
                    <Button type="submit">Sign up</Button>
                </form>
            </>
        )}
    </Styled.Container>
}
