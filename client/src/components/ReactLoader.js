import Loader from "react-loader-spinner";

export default function ReactLoader() {
  return (
    <Loader
      type="TailSpin"
      color="#00000059"
      height={40}
      width={40}
      className="flex justify-center mt-24"
    />
  );
}
