import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
        categories: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { authorId, title, content, categories } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        authorId,
        title,
        content,
        categories: {
          connect: categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });
    res.json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        comments: true,
        likes: true,
        categories: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, categories } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(categories && {
          categories: {
            set: categories.map((categoryId) => ({ id: categoryId })),
          },
        }),
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
