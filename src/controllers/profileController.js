import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProfile = async (req, res) => {
  const { bio, userId } = req.body;

  try {
    const newCreateProfile = await prisma.profile.create({
      data: { bio, userId },
    });
    res.json(newCreateProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  try {
    const updatedProfile = await prisma.profile.update({
      where: { id: Number(id) },
      data: { bio },
    });
    res.json(updatedProfile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.profile.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: { user: true },
    });
    res.json(profiles);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
