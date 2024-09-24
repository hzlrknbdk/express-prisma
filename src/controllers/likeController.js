import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLikes = async (req, res) => {
  try {
    const likes = await prisma.like.findMany({
      include: {
        post: true,
        user: true,
      },
    });
    res.json(likes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const createLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const newLike = await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    res.json(newLike);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deleteLike = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.like.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Like deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
export const getLikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const like = await prisma.like.findUnique({
      where: { id: Number(id) },
      include: {
        post: true,
        user: true,
      },
    });

    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }
    res.json(like);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
