import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const createUser = async (req, res) => {
  const { email, name, role } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        role,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email,
        name,
        role,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
