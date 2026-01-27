const { prisma } = require("../../lib/prisma");

exports.create = async (fileName, fileSize, folderId) => {
  const result = await prisma.file.create({
    data: {
      name: fileName,
      size: fileSize,
      folderId: +folderId,
      uploadTime: new Date(),
    },
  });
};

exports.get = async (fileId) => {
  const result = await prisma.file.findUnique({
    where: {
      id: +fileId,
    },
  });

  return result;
};
