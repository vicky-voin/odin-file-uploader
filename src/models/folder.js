const { prisma } = require("../../lib/prisma");

exports.get = async (folderId) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderId,
    },
    include: {
      files: true,
    },
  });

  return folder;
};

exports.getAllForUser = async (userId) => {
  const folders = await prisma.folder.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      files: true,
    },
  });

  return folders;
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

exports.addFile = async (fileId, folderId) => {
  const result = await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      files: {
        connect: {
          id: fileId,
        },
      },
    },
  });
};

exports.delete = async (folderId, userId) => {
  const deleteFiles = prisma.file.deleteMany({
    where: {
      folderId: folderId,
    },
  });

  const deleteFolder = prisma.folder.delete({
    where: {
      id: folderId,
      ownerId: userId,
    },
  });

  const transaction = await prisma.$transaction([deleteFiles, deleteFolder]);
};
