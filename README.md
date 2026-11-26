# React Tutorial Explore

A React + Vite learning project. It contains a product list that uses the DummyJSON API (with debounced search and a favorites filter) and a simple counter built with Redux Toolkit, `useSelector` and `useDispatch`.

![Screenshot](Dummy-Product.png)

## Features

### Product List

- Lists the first 10 products from the API as cards (image, title, description, price, brand).
- Search by product name. The request is sent 500 ms after the user stops typing.
- Add or remove a product from favorites with the heart button on each card.
- **All / Favorites** toggle to show either the full list or only the favorited products.
- "No favorites yet" message when the Favorites view is empty.
- Loading and error messages for API requests.
- Responsive card grid.

Favorites are kept in component state only, so they reset when the page is refreshed.

### Redux Toolkit Counter

- Shows a counter value stored in the Redux store.
- **Arttır** (increment) and **Azalt** (decrement) buttons change the value by dispatching actions.

## Redux Toolkit Usage

The Redux code lives in [`src/redux/`](src/redux/).

**1. Create a slice** ([`counterSlice.jsx`](src/redux/counterSlice.jsx)). `createSlice` generates the reducer and the action creators together:

```jsx
export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value = state.value + 1 },
    decrement: (state) => { state.value = state.value - 1 },
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer
```

**2. Create the store** ([`store.jsx`](src/redux/store.jsx)). Pass the slice's **reducer** (the default export), not the slice object:

```jsx
import counterReducer from "./counterSlice"

export const store = configureStore({
  reducer: { counter: counterReducer },
})
```

Passing the slice object instead (`counter: counterSlice`) causes the error *"Store does not have a valid reducer"*.

**3. Provide the store** ([`main.jsx`](src/main.jsx)). Wrap the app with `Provider` so every component can reach the store:

```jsx
<Provider store={store}>
  <App />
</Provider>
```

**4. Read and update state in a component** ([`App.jsx`](src/App.jsx)):

```jsx
const dispatch = useDispatch()
const { value } = useSelector((store) => store.counter)

<button onClick={() => dispatch(increment())}>Arttır</button>
<button onClick={() => dispatch(decrement())}>Azalt</button>
```

- `useSelector` reads a piece of the store state. The component re-renders when that piece changes.
- `useDispatch` returns the `dispatch` function, which sends an action such as `increment()` to the store.

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8 with `@vitejs/plugin-react`
- [Redux Toolkit](https://redux-toolkit.js.org/) and [React Redux](https://react-redux.js.org/) for global state
- [Axios](https://axios-http.com/) for HTTP requests
- [React Icons](https://react-icons.github.io/react-icons/) (Font Awesome set)
- Plain CSS (one file per feature)
- ESLint with the React Hooks and React Refresh plugins

## Data Source

Product data comes from the free [DummyJSON](https://dummyjson.com) API:

- `GET /products?limit=10`
- `GET /products/search?q=<term>`

## Getting Started

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd react-tutorial-explore

# 2. Install dependencies
npm install

# 3. Create a .env file in the project root
#    VITE_DUMMY_URL=https://dummyjson.com

# 4. Start the dev server
npm run dev
```

Restart the dev server after changing `.env`, because Vite only reads it on startup.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

`App.jsx` currently renders the Redux counter. To see the product list, render `<ProductList />` from `src/components/DummyProductProject/ProductList.jsx` in `App.jsx`. The currency converter and todo components are earlier practice projects kept in the repo.

## What I Learned

- Fetching data with Axios inside `async` functions and `useEffect`.
- Managing `loading` and `error` state around requests.
- Debouncing a search input with `setTimeout` and the `useEffect` cleanup function.
- Lifting state up: the `favorites` array lives in `ProductList` and reaches each card through props and a callback.
- Deriving a filtered list during render instead of storing it in state.
- Updating arrays immutably (`filter` and spread) instead of mutating them.
- Reading environment variables in Vite with `import.meta.env`.
- Creating a slice with `createSlice`, which generates the reducer and the action creators.
- Setting up a store with `configureStore` and providing it to the app with `Provider`.
- Reading state with `useSelector` and sending actions with `useDispatch`.
- The store needs the slice's `reducer`, not the slice object.
- Reducers in Redux Toolkit can write `state.value = ...` directly, because Immer turns those changes into a new immutable state.