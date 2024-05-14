import { fireEvent, render, screen } from '@testing-library/react';
import { TEST_IDS, FORM_ERRORS } from '../../definitions/constants';
import SignUpPage from './index';

describe('SignUpPage', () => {
    const changeAndSubmitInput = (inputLabel: string, value: string) => {
        fireEvent.change(screen.getByLabelText(inputLabel, { selector: 'input' }), { target: { value } });
        fireEvent(
            screen.getByRole('button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
    };

    it('should render signup form', () => {
        render(<SignUpPage />);
        const usernameInput = screen.getByLabelText('Username', { selector: 'input' });
        const passwordInput = screen.getByLabelText('Password', { selector: 'input' })
        const confirmPasswordInput = screen.getByLabelText('Confirm password', { selector: 'input' })
        const signupBtn = screen.getByRole('button');
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();
        expect(signupBtn).toBeInTheDocument();
    });

    it('should not show errors if sign up button was not clicked', () => {
        render(<SignUpPage />);
        const usernameError = screen.queryByTestId(TEST_IDS.usernameInputError);
        const passwordError = screen.queryByTestId(TEST_IDS.passwordInputError);
        const confirmPasswordError = screen.queryByTestId(TEST_IDS.confirmPasswordInputError);
        expect(usernameError).not.toBeInTheDocument();
        expect(passwordError).not.toBeInTheDocument();
        expect(confirmPasswordError).not.toBeInTheDocument();
    });

    it('should show errors if fields are empty after form was submitted', () => {
        render(<SignUpPage />);
        fireEvent(
            screen.getByRole('button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        const usernameError = screen.getByTestId(TEST_IDS.usernameInputError);
        const passwordError = screen.getByTestId(TEST_IDS.passwordInputError);
        const confirmPasswordError = screen.getByTestId(TEST_IDS.confirmPasswordInputError);
        expect(usernameError).toHaveTextContent(FORM_ERRORS.emailE.empty);
        expect(passwordError).toHaveTextContent(FORM_ERRORS.passwordE.empty);
        expect(confirmPasswordError).toHaveTextContent(FORM_ERRORS.confirmPasswordE.empty);
    });

    it('should show an error if email is not valid', () => {
        render(<SignUpPage />);
        changeAndSubmitInput('Username', 'incorrectEmail.com');
        expect(screen.getByTestId(TEST_IDS.usernameInputError)).toHaveTextContent(FORM_ERRORS.emailE.format);

        changeAndSubmitInput('Username', 'incorrectEmail@');
        expect(screen.getByTestId(TEST_IDS.usernameInputError)).toHaveTextContent(FORM_ERRORS.emailE.format);

        changeAndSubmitInput('Username', '@.com');
        expect(screen.getByTestId(TEST_IDS.usernameInputError)).toHaveTextContent(FORM_ERRORS.emailE.format);

        changeAndSubmitInput('Username', 'test@test.com');
        expect(screen.queryByTestId(TEST_IDS.usernameInputError)).not.toBeInTheDocument();
    });

    it('should show an error if password is too short', () => {
        render(<SignUpPage />);
        changeAndSubmitInput('Password', '1L%');
        expect(screen.getByTestId(TEST_IDS.passwordInputError)).toHaveTextContent(FORM_ERRORS.passwordE.length);

        changeAndSubmitInput('Password', '1234L%');
        expect(screen.queryByTestId(TEST_IDS.passwordInputError)).not.toBeInTheDocument();
    });

    it('should show an error if password is not containing a special character', () => {
        render(<SignUpPage />);
        changeAndSubmitInput('Password', '12345L');
        expect(screen.getByTestId(TEST_IDS.passwordInputError)).toHaveTextContent(FORM_ERRORS.passwordE.format);

        changeAndSubmitInput('Password', '12345L%');
        expect(screen.queryByTestId(TEST_IDS.passwordInputError)).not.toBeInTheDocument();
    });

    it('should show an error if password is not containing a uppercase letter', () => {
        render(<SignUpPage />);
        changeAndSubmitInput('Password', '12345l%');
        expect(screen.getByTestId(TEST_IDS.passwordInputError)).toHaveTextContent(FORM_ERRORS.passwordE.format);

        changeAndSubmitInput('Password', '12345L%');
        expect(screen.queryByTestId(TEST_IDS.passwordInputError)).not.toBeInTheDocument();
    });

    it('should show an error if password is not containing a number', () => {
        render(<SignUpPage />);
        changeAndSubmitInput('Password', 'abcdeF%');
        expect(screen.getByTestId(TEST_IDS.passwordInputError)).toHaveTextContent(FORM_ERRORS.passwordE.format);

        changeAndSubmitInput('Password', 'abcdeF5%');
        expect(screen.queryByTestId(TEST_IDS.passwordInputError)).not.toBeInTheDocument();
    });

    it('should show an error if confirm password is not matching original password', () => {
        render(<SignUpPage />);
        fireEvent.change(screen.getByLabelText('Confirm password', { selector: 'input' }), { target: { value: '111111' } });
        changeAndSubmitInput('Password', '12345L%');

        expect(screen.getByTestId(TEST_IDS.confirmPasswordInputError)).toHaveTextContent(FORM_ERRORS.confirmPasswordE.match);

        changeAndSubmitInput('Confirm password', '12345L%');
        expect(screen.queryByTestId(TEST_IDS.passwordInputError)).not.toBeInTheDocument();
    });

    it('should submit the form if all fields are valid', () => {
        render(<SignUpPage />);
        fireEvent.change(screen.getByLabelText('Confirm password', { selector: 'input' }), { target: { value: '12345L%' } });
        fireEvent.change(screen.getByLabelText('Password', { selector: 'input' }), { target: { value: '12345L%' } });
        fireEvent.change(screen.getByLabelText('Username', { selector: 'input' }), { target: { value: 'test@test.com' } });

        fireEvent(
            screen.getByRole('button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        expect(screen.getByText(`Welcome test@test.com!`)).toBeInTheDocument();
    });

    it('should reset form on signout button click', () => {
        render(<SignUpPage />);
        fireEvent.change(screen.getByLabelText('Confirm password', { selector: 'input' }), { target: { value: '12345L%' } });
        fireEvent.change(screen.getByLabelText('Password', { selector: 'input' }), { target: { value: '12345L%' } });
        fireEvent.change(screen.getByLabelText('Username', { selector: 'input' }), { target: { value: 'test@test.com' } });

        fireEvent(
            screen.getByRole('button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        fireEvent(
            screen.getByRole('button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        expect(screen.getByLabelText('Confirm password', { selector: 'input' })).toHaveTextContent('');
        expect(screen.getByLabelText('Password', { selector: 'input' })).toHaveTextContent('');
        expect(screen.getByLabelText('Username', { selector: 'input' })).toHaveTextContent('');
    });
});
