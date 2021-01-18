export default {
  async getPosts(subreddit) {
    const url = `https://www.reddit.com/r/${subreddit}.json`;
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
};
