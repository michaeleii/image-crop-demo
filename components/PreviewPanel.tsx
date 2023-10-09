import {
  CropperPreview,
  CropperPreviewRef,
  CropperRef,
} from "react-advanced-cropper";

type PreviewPanelProps = {
  previewRef: React.RefObject<CropperPreviewRef>;
  cropperRef: React.RefObject<CropperRef>;
};

export default function PreviewPanel({
  previewRef,
  cropperRef,
}: PreviewPanelProps) {
  return (
    <div>
      <h2 className="text-xl mb-3">Preview</h2>
      <div>
        <CropperPreview
          ref={previewRef}
          cropper={cropperRef}
          className="max-w-sm mx-auto"
        />
      </div>
    </div>
  );
}
