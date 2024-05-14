export const FORM_ERRORS = {
    passwordE: {
        empty: 'Password field can not be empty',
        length: 'Password must be at least 5 symbols long',
        format: 'Password must contain at least 1 special character, 1 number and 1 capital letter',
    },
    emailE: {
        empty: 'Username field can not be empty',
        format: 'Username must be a valid email address',
    },
    confirmPasswordE: {
        empty: 'Please confirm your password',
        match: 'Confirmed password must match the password above',
    },
};

export const TEST_IDS = {
    usernameInputError: `username-input-error`,
    passwordInputError: `password-input-error`,
    confirmPasswordInputError: `confirm-password-input-error`,
};

export const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const PASSWORD_REGEX = /(?=.*\d)(?=.*[A-Z])(?=.*[@#$%^&+=]).*/;
