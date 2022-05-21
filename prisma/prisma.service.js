const PrismaClient = require("@prisma/client");

// Prisma client

exports.prisma = new PrismaClient({
  errorFormat: "pretty",
});
