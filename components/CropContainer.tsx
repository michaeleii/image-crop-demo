"use client";

import React, { useState, useRef } from "react";
import {
  CropperRef,
  CropperPreviewRef,
  Cropper,
  CropperPreview,
  Coordinates,
  CircleStencil,
  RectangleStencil,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  BoxSelect,
  CircleDashed,
  FlipHorizontal,
  FlipVertical,
  RotateCcw,
  RotateCw,
  SaveIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const CropContainer = () => {
  const previewRef = useRef<CropperPreviewRef>(null);
  const cropperRef = React.useRef<CropperRef>(null);
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  );
  const [src, setSrc] = useState(image);

  const [isCircle, setIsCircle] = useState(false);

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
          .getCanvas({
            maxWidth: 500,
            maxHeight: 500,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
          })
          ?.toDataURL()}"/>`;
      }
    }
  };

  const onUpdate = () => {
    previewRef.current?.refresh();
  };

  return (
    <div className="space-y-5">
      <div>
        <form className="mb-5 space-y-2" onSubmit={handleSubmit}>
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
        <div className="h-[600px] overflow-hidden relative">
          <Cropper
            src={image}
            ref={cropperRef}
            stencilComponent={isCircle ? CircleStencil : RectangleStencil}
            className={"cropper"}
            stencilProps={{ grid: true, aspectRatio: 1 / 1 }}
            onUpdate={onUpdate}
          />
          {/* <div className="absolute left-[10px] top-1/2 -translate-y-1/2 flex flex-col gap-2">
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
          </div> */}
        </div>
        <div className="mt-3 flex justify-center flex-wrap gap-5">
          <Button onClick={() => setIsCircle(false)}>
            <BoxSelect />
          </Button>
          <Button onClick={() => setIsCircle(true)}>
            <CircleDashed />
          </Button>
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
      <div>
        <h2 className="text-xl mb-3">Preview</h2>
        <div className="border">
          <CropperPreview
            ref={previewRef}
            cropper={cropperRef}
            className={cn("max-w-sm mx-auto", {
              "rounded-full": isCircle,
            })}
          />
        </div>
      </div>
    </div>
  );
};
