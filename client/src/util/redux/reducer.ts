const initialState = {
  isAuthenticated: false,
  email: null,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        isAuthenticated: true,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default reducer;
