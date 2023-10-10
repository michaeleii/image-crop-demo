"use client";
import { SearchIcon } from "lucide-react";
import { Cropper, CropperPreviewRef, CropperRef } from "react-advanced-cropper";
import { Button } from "./ui/button";
import { useState } from "react";
import ImageForm from "./ImageForm";

type InputPanelProps = {
  previewRef: React.RefObject<CropperPreviewRef>;
  cropperRef: React.RefObject<CropperRef>;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  setSound: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InputPanel({
  previewRef,
  cropperRef,
  setCaption,
  setSound,
  setIsLoading,
}: InputPanelProps) {
  const onUpdate = () => {
    previewRef.current?.refresh();
  };
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  );

  const download = async () => {
    setIsLoading(true);
    if (cropperRef.current) {
      let res = await fetch("/api/generate/classification", {
        method: "POST",
        body: JSON.stringify({ image }),
      });
      const data = await res.json();
      const caption = data.output;
      setCaption(caption);

      res = await fetch("/api/generate/sound", {
        method: "POST",
        body: JSON.stringify({ caption }),
      });
      const { output } = await res.json();

      setSound(output);
      setIsLoading(false);

      const audio = new Audio(output);
      await audio.play();
    }
  };
  return (
    <div className="max-w-xl xl:border-r xl:pr-10">
      <h2 className="text-xl mb-3">Input</h2>

      <div className="overflow-hidden relative">
        <Cropper
          src={image}
          ref={cropperRef}
          className={"cropper"}
          onUpdate={onUpdate}
        />
      </div>
      <div className="mt-3 flex justify-center flex-wrap gap-5">
        <Button onClick={() => download()}>
          <SearchIcon className="w-4 h-4 mr-1" />
          Classify
        </Button>
      </div>
      <ImageForm image={image} setImage={setImage} />
    </div>
  );
}
