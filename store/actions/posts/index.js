import { POSTS_UPDATE_LIST, POSTS_GET_LIST } from "../";

export const postsUpdateList = (posts) => {
  return {
    type: POSTS_UPDATE_LIST,
    payload: posts,
  };
};
