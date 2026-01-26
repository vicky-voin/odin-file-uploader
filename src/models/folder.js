const { prisma } = require("../../lib/prisma");

exports.get = async (folderId) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
  });

  return folder;
};

exports.create = async (folderName, userId) => {
  const newFolder = await prisma.folder.create({
    data: {
      name: folderName,
      ownerId: userId,
    },
  });
};

exports.rename = async (newName, folderId) => {
  const result = await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      name: newName,
    },
  });
};

exports.delete = async (folderId, userId) => {
  const result = await prisma.folder.delete({
    where: {
      id: folderId,
      ownerId: userId,
    },
  });
};
