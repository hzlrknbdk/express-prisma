import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const createManyUser = async (req, res) => {
  try {
    const users = await prisma.user.createMany({
      data: [...req.body],
      skipDuplicates: true,
    });

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password,
      },
    });
    res.json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getUserFindFirst = async (req, res) => {
  try {
    const oldestUserBelowTwenty = await prisma.user.findFirst({
      orderBy: {
        age: "desc",
      },
      where: {
        age: {
          lt: 20,
        },
      },
    });

    if (!oldestUserBelowTwenty) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(oldestUserBelowTwenty);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getUserFindMany = async (req, res) => {
  try {
    const usersOverTwenty = await prisma.user.findMany({
      select: {
        id: true,
      },
      orderBy: {
        lastName: "asc",
      },
      where: {
        age: {
          gt: 20,
        },
      },
    });

    res.json(usersOverTwenty);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        profile: true,
        comments: true,
        likes: true,
        posts: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        name,
        role,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const updateManyUser = async (req, res) => {
  const { lastName } = req.params;
  const { email } = req.body;

  try {
    const results = await prisma.user.updateMany({
      where: {
        lastName: {
          in: lastName,
        },
      },
      data: {
        email,
      },
    });
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const patchUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        ...(email && { email }),
        ...(name && { name }),
        ...(role && { role }),
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
