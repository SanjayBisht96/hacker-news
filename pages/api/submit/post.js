import { PrismaClient } from "@prisma/client";
import { decryptData } from "api-utils/auth";

async function handleTags(formData, postID) {
  const prisma = new PrismaClient();
  const tagList = formData["tags"].match(/[a-zA-Z]+/g);
  tagList.forEach(async (tagName) => {
    let tag = await prisma.tag.findUnique({
      where: {
        name: tagName,
      },
    });
    if (!tag) {
      tag = await prisma.tag.create({
        data: {
          name: tagName,
        },
      });
    }
    await prisma.linkPostTags.create({
      data: {
        postID: postID,
        tagID: tag.id,
      },
    });
  });
}

export default async function postSubmit(req, res) {
  const prisma = new PrismaClient();
  const { formData } = req.body;

  const userId = decryptData(formData["userID"]);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(500).json({ message: "failed to save post" });
  }

  formData["userID"] = user.id;
  const CreatePost = await prisma.linkPost.create({ data: formData });
  if (formData["tags"]) {
    await handleTags(formData, CreatePost.id);
  }
  if (CreatePost) {
    return res.status(200).json({ message: "sucessfully saved a post" });
  } else {
    return res.status(500).json({ message: "failed to save post" });
  }
}
