import { prisma } from "../prisma/client.js";

export async function getTopicsBySection(sectionId, page, limit) {
  const existingSection = await prisma.section.findUnique({
    where: { id: sectionId },
  });

  if (!existingSection) {
    return null; 
  }

  const total = await prisma.topic.count({
    where: { sectionId },
  });

  const topics = await prisma.topic.findMany({
    where: { sectionId },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
    include: {
      author: { select: { id: true, username: true } },
      _count: { select: { messages: true } },
    },
  });

  const normalizedTopics = topics.map((topic) => ({
    id: topic.id,
    title: topic.title,
    createdAt: topic.createdAt,
    lastMessageAt: topic.lastMessageAt,
    author: topic.author,
    messagesCount: topic._count.messages,
  }));

  return { topics: normalizedTopics, total };
}
