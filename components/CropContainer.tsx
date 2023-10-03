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
  Camera,
  CircleDashed,
  FilePlus,
  FlipHorizontal,
  FlipVertical,
  RotateCcw,
  RotateCw,
  SaveIcon,
  Trash2,
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
            maxHeight: 1000,
            maxWidth: 1000,
          })
          ?.toDataURL()}"/>`;
      }
    }
  };

  const onUpdate = () => {
    previewRef.current?.refresh();
  };

  return (
    <div className="md:flex flex-col xl:flex-row gap-10 items-start">
      <div className="max-w-xl xl:border-r xl:pr-10">
        <h2 className="text-xl mb-3">Input</h2>
        <div className="h-[600px] overflow-hidden relative">
          <Cropper
            src={image}
            ref={cropperRef}
            stencilComponent={isCircle ? CircleStencil : RectangleStencil}
            className={"cropper"}
            stencilProps={{ grid: true }}
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
        {/* Image Upload */}
        {/* <label htmlFor="image">
          <div
            role="presentation"
            className="my-5 p-4 border border-gray-300 border-dashed hover:border-gray-900 cursor-pointer group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:hover:border-gray-700 transition-colors"
          >
            <input type="file" id="image" hidden />
            <p className="text-sm text-gray-600 flex items-center gap-2 select-none">
              <FilePlus className="h-5 w-5" />
              Drop a file or click to upload
            </p>
            <div className="flex items-center mt-1 overflow-hidden">
              <div className="truncate min-w-0">
                <p className="text-sm text-gray-500 truncate">{image}</p>
              </div>
              <div className="flex-shrink-0 ml-2">
                <button
                  className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center"
                  type="button"
                >
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </label> */}
        {/* Webcam */}
        {/* <Button
          variant="outline"
          className="p-4 w-full h-full disabled:cursor-not-allowed"
        >
          <p className="text-sm text-gray-600 font-normal select-none flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Take a photo with your webcam
          </p>
        </Button> */}
      </div>
      <div className="">
        <h2 className="text-xl mb-3">Preview</h2>
        <div>
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
