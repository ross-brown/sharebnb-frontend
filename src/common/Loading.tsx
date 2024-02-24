import { Spinner } from "./Spinner";

function Loading() {
  return (
    <div className="Loading min-h-screen flex flex-col justify-center items-center space-y-5">
      <h1 className="text-center font-bold text-5xl">Loading ShareBnB...</h1>
      <Spinner />
    </div>
  );
}

export default Loading;
