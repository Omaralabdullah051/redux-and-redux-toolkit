//* Import packages
const fetch = require("node-fetch");
const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk");

//* Initial State
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

//* Action Types
const POSTREQUESTED = "posts/requested";
const POSTSUCCEEDED = "posts/succeeded";
const POSTFAILED = "posts/failed";

//* Action Creators
const fetchPostsRequested = () => {
  return {
    type: POSTREQUESTED,
  };
};

const fetchPostsSucceeded = (posts) => {
  return {
    type: POSTSUCCEEDED,
    payload: posts,
  };
};

const fetchPostsFailed = (err) => {
  return {
    type: POSTFAILED,
    payload: err,
  };
};

//* Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTREQUESTED:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case POSTSUCCEEDED:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };

    case POSTFAILED:
      return {
        ...state,
        loading: false,
        posts: [],
        error: action.payload.message,
      };

    default:
      return state;
  }
};

//* Thunk function
const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequested());

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=4"
      );
      const posts = await response.json();

      dispatch(fetchPostsSucceeded(posts));
    } catch (err) {
      dispatch(fetchPostsFailed(err));
    }
  };
};

//* Create Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware.default));

//* Subscribe to state changes
store.subscribe(() => {
  console.log(store.getState());
});

//* Dispatch action
store.dispatch(fetchPosts());
