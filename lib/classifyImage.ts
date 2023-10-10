import got from "got";

export const classifyImage = async (imageUrl: string) => {
  try {
    const url =
      "https://api.imagga.com/v2/categories/personal_photos?image_url=" +
      encodeURIComponent(imageUrl);

    const response = await got(url, {
      username: process.env.IMAGGA_API_KEY,
      password: process.env.IMAGGA_API_SECRET,
    });

    return JSON.parse(response.body);
  } catch (error: any) {
    console.log(error.response.body);
  }
};
