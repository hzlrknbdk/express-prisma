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
