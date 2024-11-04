import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProfile = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    birthDate,
    gender,
    bio,
    profilePicture,
  } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const newCreateProfile = await prisma.profile.create({
      data: {
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDate: birthDate ? new Date(birthDate) : null,
        gender,
        bio,
        profilePicture,
      },
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
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    birthDate,
    gender,
    bio,
    profilePicture,
  } = req.body;

  try {
    const existingProfile = await prisma.profile.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    const updatedProfile = await prisma.profile.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        birthDate: birthDate ? new Date(birthDate) : null,
        gender,
        bio,
        profilePicture,
      },
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
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: Number(id) },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Bir hata oluştu.", message: error.message });
  }
};
