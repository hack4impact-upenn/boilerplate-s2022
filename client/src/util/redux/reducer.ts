import { AnyAction } from 'redux';

const initialState = {
  isAuthenticated: false,
  email: null,
};

const reducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: AnyAction,
) => {
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
