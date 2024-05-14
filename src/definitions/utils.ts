import { FORM_ERRORS, EMAIL_REGEX, PASSWORD_REGEX } from './constants';

export const validateEmail = (value: string) => {
    if (!value) {
        return FORM_ERRORS.emailE.empty;
    } else if (!EMAIL_REGEX.test(value)) {
        return FORM_ERRORS.emailE.format;
    }
    return null;
};

export const validatePassword = (value: string) => {
    if (!value) {
        return FORM_ERRORS.passwordE.empty;
    } else if (!PASSWORD_REGEX.test(value)) {
        return FORM_ERRORS.passwordE.format;
    } else if (value.length < 6) {
        return FORM_ERRORS.passwordE.length;
    }
    return null;
}

export const validateConfirmPassword = (value: string, password: string) => {
    if (!value) {
        return FORM_ERRORS.confirmPasswordE.empty;
    } else if (value !== password) {
        return FORM_ERRORS.confirmPasswordE.match;
    }
    return null;
}