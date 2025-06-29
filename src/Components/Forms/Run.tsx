import Input from "./Input";
import Notes from "./Notes";

const Run = () => { 
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl text-center font-bold hero-text-shadow">Run</h1>
      <form className="flex flex-col gap-4 pb-6">
        <Input category="run" name="value" title="Distance (mi)" />
        <Input category="run" name="time" title="Time (seconds)" />
        <Notes workout="run" />
      </form>
    </div>
  );
};

export default Run;
