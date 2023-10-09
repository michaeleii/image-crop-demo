"use client";
import { Label } from "@radix-ui/react-label";
import { SaveIcon } from "lucide-react";
import { Cropper, CropperPreviewRef, CropperRef } from "react-advanced-cropper";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import ImageForm from "./ImageForm";

type InputPanelProps = {
  previewRef: React.RefObject<CropperPreviewRef>;
  cropperRef: React.RefObject<CropperRef>;
};

export default function InputPanel({
  previewRef,
  cropperRef,
}: InputPanelProps) {
  const onUpdate = () => {
    previewRef.current?.refresh();
  };
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  );

  const onChange = (cropper: CropperRef) => {
    console.log(cropper.getCoordinates());
  };

  const download = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${cropperRef.current
          .getCanvas({
            maxHeight: 1000,
            maxWidth: 1000,
          })
          ?.toDataURL()}"/>`;
      }
    }
  };
  return (
    <div className="max-w-xl xl:border-r xl:pr-10">
      <h2 className="text-xl mb-3">Input</h2>

      <div className="xl:h-[600px] overflow-hidden relative">
        <Cropper
          src={image}
          ref={cropperRef}
          className={"cropper"}
          onChange={onChange}
          onUpdate={onUpdate}
        />
      </div>
      <div className="mt-3 flex justify-center flex-wrap gap-5">
        <Button onClick={() => download()}>
          <SaveIcon />
        </Button>
      </div>
      <ImageForm image={image} setImage={setImage} />
    </div>
  );
}
