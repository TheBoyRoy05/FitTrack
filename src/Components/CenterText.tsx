const CenterText = ({ text, className }: { text: string; className?: string }) => {
  if (!text) return null;
  
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <h1 className={`flex-1 text-[7vw] z-50 text-center sporting-outline ${className}`}>{text}</h1>
    </div>
  );
};

export default CenterText;
