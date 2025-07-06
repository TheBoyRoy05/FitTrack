import { useState, useRef } from "react";
import { useStore } from "@/Hooks/useStore";
import { capitalize, saveData, savePhotos, sleep } from "@/Utils/functions";
import Webcam from "react-webcam";
import CenterText from "./CenterText";

const Photo = ({ type, setText }: { type: "front" | "back"; setText: (text: string) => void }) => {
  const { data, setData } = useStore();
  const camera = useRef<Webcam>(null!);

  const handleCapture = async () => {
    setData((prev) => ({ ...prev, photos: { ...prev.photos, [type]: "" } }));

    setText("Ready");
    await sleep(1000);
    setText("Set");
    await sleep(1000);
    setText("Snap!");
    await sleep(1000);
    setText("");

    const photo = camera.current.getScreenshot() || "";
    setData((prev) => ({
      ...prev,
      photos: { ...prev.photos, [type]: photo },
    }));
    console.log(photo);
  };

  return (
    <div className="flex-1 flex flex-col gap-10">
      <div className="min-w-0 aspect-[4/3] bg-base-300 shadow-lg rounded-lg p-4">
        <div className="relative w-full h-full">
          {data.photos?.[type] ? (
            <img src={data.photos[type]} className="w-full h-full object-cover rounded-md" />
          ) : (
            <Webcam ref={camera} className="w-full h-full object-cover rounded-md" />
          )}
        </div>
      </div>
      <button className="btn btn-lg btn-success" onClick={handleCapture}>
        {data.photos?.[type] ? "Retake" : "Take"} {capitalize(type)} Photo
      </button>
    </div>
  );
};

const Photos = () => {
  const { data } = useStore();
  const [text, setText] = useState<string>("");

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">Progress Photos</h1>

      <div className="flex gap-4 relative w-full">
        <Photo type="front" setText={setText} />
        <Photo type="back" setText={setText} />
      </div>

      <CenterText text={text} />
      <button
        className="btn btn-lg btn-primary"
        onClick={() => {
          saveData(data);
          savePhotos(data.photos);
        }}
      >
        Save Photos
      </button>
    </div>
  );
};

export default Photos;
