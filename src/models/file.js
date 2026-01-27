const { prisma } = require("../../lib/prisma");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv").config();
const supabase = createClient(process.env.STORAGE_URL, process.env.STORAGE_KEY);
const BUCKET_NAME = "images";

exports.create = async (fileName, fileSize, fileURL, folderId) => {
  const result = await prisma.file.create({
    data: {
      name: fileName,
      size: fileSize,
      folderId: +folderId,
      uploadTime: new Date(),
      url: fileURL,
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

exports.deleteInFolder = async (folderId) => {
  const files = await prisma.file.findMany({
    where: {
      folderId: folderId,
    },
    include: {
      folder: true,
    },
  });

  if (files.length > 0) {
    const deleteFiles = await prisma.file.deleteMany({
      where: {
        folderId: folderId,
      },
    });

    const fileNames = files.map(
      (file) => file.folder.ownerId + "/" + file.name,
    );

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(fileNames);

    if (error) {
      throw new Error(error.message);
    }
  }
};
