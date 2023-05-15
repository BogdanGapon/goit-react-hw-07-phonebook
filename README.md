Отмена запроса на Бекенд при использовании `createAsyntThunk()`

```js
export const fetchAll = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/contacts`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
```

```js
createAsyntThunk;
useEffect(() => {
  const promise = dispatch(fetchAll());
  return () => {
    promise.abort();
  };
}, [dispatch]);
```

В свою очередь `fetchAll()` и есть вызовом асинхронного генератора экшенов

# Dispatch нужно передавать в useEffect()

`dispatch` как переменную хука `useDispatch` нужно передавать в массив
зависимостей `useEffect` так как если не передать вызов будет цикличный и не
прерываемый, диспатч не меняется при рендере, тем самым обеспечивает нормальную
работу запроса на бек.

При использованни внешних экшенов, необходимо использовать `extraReducers`, и он
не как не мешает испольлзованию `reducers`.
