const TOKEN_KEY = 'jwt';

export const privateLogin = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const privateLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}