import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type ImageFormProps = {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
};
export default function ImageForm({ image, setImage }: ImageFormProps) {
  const [src, setSrc] = useState(image);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (src) setImage(src);
  };

  return (
    <form className="my-5 space-y-2" onSubmit={handleSubmit}>
      <Label htmlFor="imgUrl">Choose an image</Label>
      <div className="grid xl:grid-cols-[1fr_150px] gap-2">
        <Input
          className="text-base"
          id="imgUrl"
          type="url"
          placeholder="Enter image url"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <Button className="xl:w-[150px]">Use Image</Button>
      </div>
    </form>
  );
}
