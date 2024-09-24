export const userController = {
  getUsers,
  patchUser,
  deleteUser,
  createUser,
  updateUser,
  getUserById,
  createManyUser,
  updateManyUser,
  getUserFindMany,
  getUserFindFirst,
};

export const profileController = {
  createProfile,
  updateProfile,
  deleteProfile,
  getProfiles,
  getProfileById,
};

export const postController = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
};

export const commentController = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentById,
};

export const likeControllers = {
  getLikes,
  createLike,
  deleteLike,
  getLikeById,
};

export const categoryController = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

export const postCategoryController = {
  createPostCategory,
  deletePostCategory,
};
