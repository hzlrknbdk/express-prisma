import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: true,
        author: true,
      },
    });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const createComment = async (req, res) => {
  const { content, postId, authorId } = req.body;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });
    res.json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content },
    });
    res.json(updatedComment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
      include: {
        post: true,
        author: true,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
