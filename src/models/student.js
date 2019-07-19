export default {
  namespace: 'student',
  state: {
    list: [],
    page: 1,
    limit: 5,
    total: 1,
    searchValue: '',
  },
  effects: {
    *getList(action, { put, select }) {
      let page = yield select(state => state.student.page);
      let limit = yield select(state => state.student.limit);
      let searchValue = yield select(state => state.student.searchValue);
      page = action.page || page;
      limit = action.pageSize || limit;
      searchValue = action.searchValue || searchValue;
      let response = yield fetch(
        `http://localhost:3000/student?name_like=${searchValue}&_page=${page}&_limit=${limit}`,
      );
      let res = yield response.json();

      let total = parseInt(response.headers.get('X-Total-Count'));
      yield put({ type: 'setList', list: res, total, page, limit, searchValue });
    },
    *delItem(action, { put }) {
      let id = action.id;
      let response = yield fetch(`http://localhost:3000/student/${id}`, { method: 'DELETE' });
      let res = yield response.json();

      yield put({ type: 'getList', id });
    },
    *changItem(action, { put }) {
      let id = action.id;
      let response = yield fetch(`http://localhost:3000/student/${id}`, {
        method: 'PUT',
        body: JSON.stringify(action.item),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let res = yield response.json();
      yield put({ type: 'getList', id });
    },
  },
  reducers: {
    setList(state, action) {
      return {
        ...state,
        ...{
          list: action.list,
          total: action.total,
          page: action.page,
          limit: action.limit,
          searchValue: action.searchValue,
        },
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
    delListItem(state, { id }) {
      let index = state.list.findIndex(item => item.id === id);
      let newList = [...state.list];
      newList.splice(index, 1);
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
