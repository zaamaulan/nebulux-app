import { nanoid } from "nanoid";

export const generateSlugWithShortUUID = async (title: string) => {
  let slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  const shortUUID = nanoid(8);
  slug = `${slug}-${shortUUID}`;

  return slug;
};
