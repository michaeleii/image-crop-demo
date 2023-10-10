import { replicate } from "./replicate";

const model =
  "sepal/audiogen:154b3e5141493cb1b8cec976d9aa90f2b691137e39ad906d2421b74c2a8c52b8";

export const generateSound = async (prompt: string, duration = 5) =>
  await replicate.run(model, {
    input: { prompt, duration },
  });
