"use client";
import { SearchIcon } from "lucide-react";
import { Cropper, CropperPreviewRef, CropperRef } from "react-advanced-cropper";
import { Button } from "./ui/button";
import { useState } from "react";
import ImageForm from "./ImageForm";
import { Classification } from "./CropContainer";

type InputPanelProps = {
  previewRef: React.RefObject<CropperPreviewRef>;
  cropperRef: React.RefObject<CropperRef>;
  setClassification: React.Dispatch<React.SetStateAction<Classification[]>>;
  setSound: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function InputPanel({
  previewRef,
  cropperRef,
  setClassification,
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
      const canvas = cropperRef.current.getCanvas({
        maxHeight: 1000,
        maxWidth: 1000,
      });
      // const form = new FormData();
      // canvas?.toBlob(async (blob) => {
      //   if (blob) {
      //     const url = URL.createObjectURL(blob);
      //     console.log(url);
      //     form.append("image", blob);
      //   }
      // }, "image/png");
      const res = await fetch(
        `${location.origin}/api/generate/classification`,
        {
          method: "POST",
          body: JSON.stringify({ image }),
        }
      );
      const data = await res.json();
      const classifications = data.categories;
      setClassification(classifications);

      const res2 = await fetch(`${location.origin}/api/generate/sound`, {
        method: "POST",
        body: JSON.stringify({ classification: classifications[0].name }),
      });
      const { output } = await res2.json();

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
