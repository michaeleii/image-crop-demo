"use client";

import React, { useRef } from "react";
import { CropperRef, CropperPreviewRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import InputPanel from "./InputPanel";
import PreviewPanel from "./PreviewPanel";

export const CropContainer = () => {
  const previewRef = useRef<CropperPreviewRef>(null);
  const cropperRef = React.useRef<CropperRef>(null);

  return (
    <div className="md:flex flex-col xl:flex-row gap-10 items-start">
      <InputPanel cropperRef={cropperRef} previewRef={previewRef} />
      <PreviewPanel previewRef={previewRef} cropperRef={cropperRef} />
    </div>
  );
};
