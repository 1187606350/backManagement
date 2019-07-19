export default {
  namespace: 'student',
  state: {
    list: [],
    page: 1,
    limit: 5,
    total: 1,
    visible: false,
  },
  effects: {
    *getList(action, { put }) {
      let page = action.page;
      let limit = action.pageSize;
      let value = action.value;
      let response = yield fetch(
        `http://localhost:3000/student?name_like=${value}&_page=${page}&_limit=${limit}`,
      );
      let res = yield response.json();

      let total = parseInt(response.headers.get('X-Total-Count'));
      yield put({ type: 'setList', list: res, total, page, limit });
    },
    // *getSerachList(action, { put, select }) {
    //   let page = yield select(({ student }) => student.page);
    //   let limit = yield select(({ student }) => student.limit);
    //   let value = action.value;
    //   let response = yield fetch(
    //     `http://localhost:3000/student?name_like=${value}&_page=${page}&_limit=${limit}`,
    //   );
    //   let res = yield response.json();
    //   let total = parseInt(response.headers.get('X-Total-Count'));

    //   yield put({ type: 'setSearchList', list: res, total, page, limit });
    // },
    *changItem(action, { put }) {
      let id = action.item.id;
      let response = yield fetch(`http://localhost:3000/student/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: action.item.name,
          age: action.item.age,
          sex: parseInt(action.item.sex),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let res = yield response.json();
      console.log(res);
      yield put({ type: 'setItem', list: res, id });
    },
  },
  reducers: {
    setList(state, action) {
      return {
        ...state,
        ...{ list: action.list, total: action.total, page: action.page, limit: action.limit },
      };
    },
    setItem(state, { id, list }) {
      let index = state.list.findIndex(item => item.id === id);
      let newList = [...state.list];
      newList.splice(index, 1, list);
      return Object.assign({}, state, {
        list: newList,
      });
    },
    // setSearchList(state, action) {
    //   return {
    //     ...state,
    //     ...{ list: action.list, total: action.total, page: action.page, limit: action.limit },
    //   };
    // },
  },
};
