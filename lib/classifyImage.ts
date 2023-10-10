// import got from "got";

import { replicate } from "./replicate";

// export const classifyImage = async (imageUrl: string) => {
//   try {
//     const url =
//       "https://api.imagga.com/v2/categories/personal_photos?image_url=" +
//       encodeURIComponent(imageUrl);

//     const response = await got(url, {
//       username: process.env.IMAGGA_API_KEY,
//       password: process.env.IMAGGA_API_SECRET,
//     });

//     return JSON.parse(response.body);
//   } catch (error: any) {
//     console.log(error.response.body);
//   }
// };

const model =
  "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746";

export const classifyImage = async (image: string) =>
  await replicate.run(model, {
    input: { image },
  });
