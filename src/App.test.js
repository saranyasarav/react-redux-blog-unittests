import {
    render,
    screen,
    renderHook,
    waitFor,
    fireEvent,
  } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
  import { BrowserRouter as Router } from "react-router-dom";
  import App from "./App";
  import { Provider } from "react-redux";
  import { expect } from '@jest/globals';
  
  import { thunk } from "redux-thunk";
  import axios from "axios";
  
  import { fetchPosts } from "./features/posts/postsSlice";
  import { act } from "react";
  import store from "./app/store";
  import { fetchUsers } from "./features/users/usersSlice";
  
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  describe("Home page heading, menus and posts list checking", () => {
    it("should render blog heading text", async () => {
      await act(async () => {
        render(
          <Router>
            <App />
          </Router>
        );
      });
      const heading = screen.getByRole("heading", { name: /Redux Blog/i });
      expect(heading).toBeInTheDocument();
    });
  
    it("should have home and post links", async () => {
      await act(async () => {
        render(
          <Router>
            <App />
          </Router>
        );
      });
      const links = screen.getAllByRole("link");
      expect(links[0].textContent).toBe("Home");
      expect(links[0].getAttribute("href")).toBe("/");
  
      expect(links[1].textContent).toBe("Post");
      expect(links[1].getAttribute("href")).toBe("/post");
    });
  
    it("should fetch posts from real api", async () => {
      await store.dispatch(fetchPosts());
  
      const state = store.getState();
      const { posts, status, error } = state.posts;
  
      if (status === "failed") {
        console.error(error);
      }
      expect(status).toBe("Succeeded");
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty("userId");
      expect(posts[0]).toHaveProperty("id");
      expect(posts[0]).toHaveProperty("title");
      expect(posts[0]).toHaveProperty("body");
  
      const { getByText } = render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
  
      await waitFor(() => {
        expect(getByText(posts[0].title)).toBeInTheDocument();
      });
    });
  
    it("should update page with AddPostForm while clicking Post Link", async () => {
      await act(async () => {
        render(
          <Router>
            <App />
          </Router>
        );
      });
      const postLink = screen.getByText("Post");
      await act(async () => {
        fireEvent.click(postLink);
      });
      expect(
        screen.getByRole("heading", { name: /Add a New Post/i })
      ).toBeInTheDocument();
    });
  
    it("should render Add Post form elements and initially disabled button", async () => {
      await act(async () => {
        render(
          <Router>
            <App />
          </Router>
        );
      });
      const titleInput = screen.getByTestId("postTitle");
      const authorSelect = screen.getByTestId("postAuthor");
      const contextTextarea = screen.getByTestId("postContent");
      const submitButton = screen.getByRole("button", { name: /Save Post/i });
  
      expect(titleInput).toBeInTheDocument();
      expect(authorSelect).toBeInTheDocument();
      expect(contextTextarea).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  
    it("should enable button if all fields are filled.", async () => {
      await store.dispatch(fetchUsers());
  
      await act(async () => {
        render(
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        );
      });
  
      const titleInput = screen.getByTestId("postTitle");
      const authorSelect = screen.getByTestId("postAuthor");
      const contextTextarea = screen.getByTestId("postContent");
      const submitButton = screen.getByRole("button", { name: /Save Post/i });
      await act(async () => {
        await userEvent.type(titleInput, "Test Post Title");
      });
      await waitFor(() => expect(authorSelect.options.length).toBeGreaterThan(1));
      await act(async () => {
        await userEvent.selectOptions(authorSelect, "1");
        await userEvent.type(contextTextarea, "Test Content");
      });
  
      expect(submitButton).toBeEnabled();
      await act(async () => {
        await userEvent.clear(titleInput);
      });
  
      expect(submitButton).toBeDisabled();
    });
    it("should Add new post, updated post in home page, View Post, Edit Post and Delete Post.", async () => {
      await store.dispatch(fetchUsers());
      await store.dispatch(fetchPosts());
  
      await act(async () => {
        render(
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        );
      });
      const titleInput = screen.getByTestId("postTitle");
      const authorSelect = screen.getByTestId("postAuthor");
      const contextTextarea = screen.getByTestId("postContent");
      const submitButton = screen.getByRole("button", { name: /Save Post/i });
  
      await act(async () => {
        await userEvent.type(titleInput, "New Post Title");
      });
      await waitFor(() => expect(authorSelect.options.length).toBeGreaterThan(1));
      await act(async () => {
        await userEvent.selectOptions(authorSelect, "1");
        await userEvent.type(contextTextarea, "New Post Content");
      });
      await expect(submitButton).toBeEnabled();
      await act(async () => {
        await userEvent.click(submitButton);
      });
      //screen.debug();
      await sleep(1000);
  
      await waitFor(() => {
        expect(screen.getByText("New Post Title")).toBeInTheDocument();
      });
  
      const linksHomePage = screen.getAllByRole("link");
      expect(linksHomePage[2].textContent).toBe("View Post");
      expect(linksHomePage[2].getAttribute("href")).toBe("/post/101");
      //View Post Link click
      await act(async () => {
        fireEvent.click(linksHomePage[2]);
      });
      const linksPostPage = screen.getAllByRole("link");
      expect(linksPostPage[2].textContent).toBe("Edit Post");
      expect(linksPostPage[2].getAttribute("href")).toBe("/post/edit/101");
      //Edit Post Link click
      await act(async () => {
        fireEvent.click(linksPostPage[2]);
      });
      expect(
        screen.getByRole("heading", { name: /Edit Post/i })
      ).toBeInTheDocument();
  
      const titleInputEditPage = screen.getByTestId("postTitle");
      const authorSelectEditPage = screen.getByTestId("postAuthor");
      const contextTextareaEditPage = screen.getByTestId("postContent");
      const submitButtonEditPage = screen.getByRole("button", {
        name: /Save Post/i,
      });
      const deleteButtonEditPage = screen.getByRole("button", {
        name: /Delete Post/i,
      });
  
      expect(titleInputEditPage).toHaveValue("New Post Title");
      await waitFor(() =>
        expect(authorSelectEditPage.options.length).toBeGreaterThan(1)
      );
      expect(authorSelectEditPage).toHaveValue("1");
      expect(contextTextareaEditPage).toHaveValue("New Post Content");
  
      await act(async () => {
        await userEvent.clear(titleInputEditPage);
        await userEvent.type(titleInputEditPage, "New Post Title -updated");
        await userEvent.clear(contextTextareaEditPage);
        await userEvent.type(
          contextTextareaEditPage,
          "New Post Content -updated"
        );
      });
      await waitFor(() =>
        expect(authorSelectEditPage.options.length).toBeGreaterThan(1)
      );
  
      await expect(submitButtonEditPage).toBeEnabled();
  
      await act(async () => {
        await userEvent.click(submitButtonEditPage);
      });
      //screen.debug();
      await sleep(10000);
  
      await waitFor(() => {
        expect(screen.getByText("New Post Title -updated")).toBeInTheDocument();
      });
  
      const linksPostPage2 = screen.getAllByRole("link");
      expect(linksPostPage2[2].textContent).toBe("Edit Post");
      expect(linksPostPage2[2].getAttribute("href")).toBe("/post/edit/101");
      await act(async () => {
        //Edit Post Link click
        fireEvent.click(linksPostPage2[2]);
      });
      const deleteButtonEditPage2 = screen.getByRole("button", {
        name: /Delete Post/i,
      });
      await act(async () => {
        await userEvent.click(deleteButtonEditPage2);
      });
      await sleep(3000);
      const linksHomePageAfterDelete = screen.getAllByRole("link");
      expect(linksHomePageAfterDelete[2].textContent).toBe("View Post");
      expect(linksHomePageAfterDelete[2].getAttribute("href")).toBe("/post/100");
    }, 20000);
  });
  