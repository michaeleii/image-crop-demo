"use client";

import React, { useState } from "react";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  FlipHorizontal,
  FlipVertical,
  RotateCcw,
  RotateCw,
  SaveIcon,
} from "lucide-react";

export const CropContainer = () => {
  const cropperRef = React.useRef<CropperRef>(null);
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  );
  const [src, setSrc] = useState(image);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (src) setImage(src);
  };

  const flip = (horizontal: boolean, vertical: boolean) => {
    if (cropperRef.current) {
      cropperRef.current.flipImage(horizontal, vertical);
    }
  };
  const rotate = (angle: number) => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(angle);
    }
  };

  const download = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${cropperRef.current
          .getCanvas()
          ?.toDataURL()}"/>`;
      }
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <form className="mb-5 space-y-2" onSubmit={handleSubmit}>
          <Label htmlFor="imgUrl">Choose an image</Label>
          <div className="grid xl:grid-cols-2 gap-2">
            <Input
              id="imgUrl"
              type="url"
              placeholder="Enter image url"
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
            <Button className="xl:w-[150px]">Use Image</Button>
          </div>
        </form>
        <div className="h-[600px] overflow-hidden relative">
          <Cropper src={image} ref={cropperRef} className={"cropper"} />
          <div className="absolute left-[10px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <Button onClick={() => flip(true, false)}>
              <FlipHorizontal />
            </Button>
            <Button onClick={() => flip(false, true)}>
              <FlipVertical />
            </Button>
            <Button onClick={() => rotate(90)}>
              <RotateCw />
            </Button>
            <Button onClick={() => rotate(-90)}>
              <RotateCcw />
            </Button>
            <Button onClick={() => download()}>
              <SaveIcon />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-3">Preview</h2>
        {}
      </div>
    </div>
  );
};
