export default {
  async getPosts(subreddit, after = null) {
    const url = `https://www.reddit.com/r/${subreddit}.json?after=${after}`;
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      const error = new Error(data.message || "failed to get data");
      error.response = data;
      throw error;
    }
  },
  // https://www.reddit.com/search.json?q=java&type=sr
  async getSubreddits(params) {
    const urlParams = new URLSearchParams(params);
    const url = `https://www.reddit.com/search.json?${urlParams}`;
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      const error = new Error(data.message || "failed to get data");
      error.response = data;
      throw error;
    }
  },

  async getSubredditHeader(subreddit) {
    if (subreddit === "all") return;
    const url = `https://www.reddit.com/r/${subreddit}/about.json`;
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      const error = new Error(data.message || "failed to get data");
      error.response = data;
      // throw error;
    }
  },
};
