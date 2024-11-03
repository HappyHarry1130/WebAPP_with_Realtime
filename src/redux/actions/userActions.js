

const Logout = (payload) => {
    return {
        type: 'LOGOUT',
        payload,
    };
};

const Login = (payload) => {
    return {
        type: 'LOGIN',
        payload,
    };
};

export { Login, Logout };