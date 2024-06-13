import { render, screen, renderHook, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchPosts } from "./features/posts/postsSlice";
import { act } from "react";
import store from "./app/store";
import { expect } from '@jest/globals';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetch Posts from mock data", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("should fetch posts from mock data", async () => {
    const mockedData = [
      {
        userId: 1,
        id: 1,
        title: "mock title",
        body: "mock body",
      },
    ];

    mock
      .onGet("https://jsonplaceholder.typicode.com/posts")
      .reply(200, mockedData);

    const initialState = { posts: { posts: [], status: "idle", error: null } };
    const mStore = mockStore(initialState);

    await mStore.dispatch(fetchPosts());

    const actions = mStore.getActions();
    expect(actions[0].type).toBe("posts/fetchPosts/pending");
    expect(actions[1].type).toBe("posts/fetchPosts/fulfilled");
    expect(actions[1].payload).toEqual(mockedData);
  });
});
