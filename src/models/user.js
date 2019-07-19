export default {
  namespace: 'user',
  state: {
    username: '',
  },
  effects: {
    *login(action, { put }) {
      let response = yield fetch('http://localhost:3000/user', {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers: {
          'content-type': 'application/json',
        },
      });
      let res = yield response.json();
      yield put({ type: 'setUserName', name: res.username });
    },
  },
  reducers: {
    setUserName(state, action) {
      return { ...state, ...{ username: action.name } };
    },
  },
};
