import { Classification } from "./CropContainer";

type ClassificationListProps = {
  classification: Classification[];
};

export default function ClassificationList({
  classification,
}: ClassificationListProps) {
  return (
    <>
      <h2 className="text-xl text-center xl:text-left mt-5 xl:mt-0 mb-3 font-bold">
        Classification
      </h2>
      <ul className="text-center xl:text-left mb-3">
        {classification.map((c) => (
          <li key={c.name}>
            {c.name} - {c.confidence}%
          </li>
        ))}
      </ul>
    </>
  );
}
