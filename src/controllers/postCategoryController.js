import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPostCategory = async (req, res) => {
  const { postId, categoryId } = req.body;

  try {
    const newPostCategory = await prisma.postCategory.create({
      data: {
        postId,
        categoryId,
      },
    });
    res.json(newPostCategory);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deletePostCategory = async (req, res) => {
  const { postId, categoryId } = req.params;

  try {
    await prisma.postCategory.delete({
      where: {
        postId_categoryId: {
          postId: Number(postId),
          categoryId: Number(categoryId),
        },
      },
    });
    res.json({ message: "Post category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
