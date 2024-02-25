import { Spinner } from "./Spinner";

function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-5">
      <h1 className="text-center font-bold text-5xl">Loading ShareBnB...</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Hang tight as the server wakes up. This may take a moment.
      </p>
      <Spinner size="lg" />
    </div>
  );
}

export default Loading;
