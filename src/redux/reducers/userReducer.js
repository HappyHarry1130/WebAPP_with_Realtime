const initialState = {
    userName: '',
    userEmail: '',
    planType: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                userName: action.payload?.userName || '',
                userEmail: action.payload?.userEmail || '',
                planType: action.payload?.planType || ''
            };
        case 'LOGOUT':
            return {
                ...state,
                userName: '',
                userEmail: '',
                planType: ''
            };
        default:
            return state;
    }
};

export default userReducer;