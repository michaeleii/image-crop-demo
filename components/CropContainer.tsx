"use client";

import "react-advanced-cropper/dist/style.css";
import React, { useRef, useState } from "react";
import { CropperRef, CropperPreviewRef } from "react-advanced-cropper";
import InputPanel from "./InputPanel";
import PreviewPanel from "./PreviewPanel";
import ClassificationList from "./ClassificationList";
import Loading from "./Loading";

export type Classification = {
  name: string;
  confidence: number;
};

export const CropContainer = () => {
  const previewRef = useRef<CropperPreviewRef>(null);
  const cropperRef = React.useRef<CropperRef>(null);
  const [classification, setClassification] = React.useState<Classification[]>(
    []
  );
  const [sound, setSound] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="md:flex flex-col xl:flex-row gap-10 items-start">
      <InputPanel
        cropperRef={cropperRef}
        previewRef={previewRef}
        setClassification={setClassification}
        setSound={setSound}
        setIsLoading={setIsLoading}
      />
      <PreviewPanel previewRef={previewRef} cropperRef={cropperRef} />
      <div>
        {classification.length > 0 && (
          <ClassificationList classification={classification} />
        )}
        {isLoading && <Loading />}
        {!isLoading && sound.length > 0 && (
          <audio controls className="w-[300px] mt-5 mx-auto">
            <source src={sound} />
          </audio>
        )}
      </div>
    </div>
  );
};
