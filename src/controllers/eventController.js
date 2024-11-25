import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEvent = async (req, res) => {
  const {
    eventInfo: {
      eventName,
      eventType,
      dateTime: { startDate, endDate },
      city,
      address,
      description,
      organizerInfo: { name, email, phone },
    },
    participantInfo: {
      maxParticipants,
      participationFee: { isPaid, feeAmount, paymentDetails },
    },
    eventDetails: { programSchedule, speakersOrTrainers },
  } = req.body;

  try {
    const newEvent = await prisma.event.create({
      data: {
        eventName,
        eventType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        city,
        address,
        description,
        organizerName: name,
        organizerEmail: email,
        organizerPhone: phone,
        maxParticipants,
        isPaid,
        feeAmount,
        paymentDetails,
        programSchedule: {
          create: programSchedule.map(({ session, startTime, endTime }) => ({
            session,
            startTime,
            endTime,
          })),
        },
        speakers: {
          create: speakersOrTrainers.map(({ name, bio }) => ({
            name,
            bio,
          })),
        },
      },
    });
    res.json(newEvent);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: {
        speakers: true,
        programSchedule: true,
        participants: true,
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const eventId = Number(id);

    await prisma.programSchedule.deleteMany({
      where: { eventId },
    });

    await prisma.participant.deleteMany({
      where: { eventId },
    });

    await prisma.speaker.deleteMany({
      where: { eventId },
    });

    const event = await prisma.event.delete({
      where: { id: eventId },
    });

    res.json({
      message: "Event and related records deleted successfully",
      event,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", message: error.message });
  }
};
