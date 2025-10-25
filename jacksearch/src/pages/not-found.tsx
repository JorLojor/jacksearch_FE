import { Link } from "react-router-dom";
import  TrueFocus  from "@/components/TrueFocus"; // pastikan named import

export default function NotFoundPage() {
  return (
    <div className="relative grid place-items-center min-h-[60vh] overflow-hidden">
      <div className="relative text-center space-y-6">
        <TrueFocus
          sentence="404 Not Found"
          manualMode={false}
          blurAmount={5}
          borderColor="blue"
          animationDuration={2}
          pauseBetweenAnimations={1}
          
        />
        <Link
          to="/"
          className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-black transition"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}
