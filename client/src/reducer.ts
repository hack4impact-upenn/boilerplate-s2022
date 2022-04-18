const initialState = {
  isAuthenticated: true,
  user: null,
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        isAuthenticated: true,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default reducer;
