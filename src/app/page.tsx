import Allsongs from "@/components/Allsongs";
import FrontendLayout from "../../layout/FrontendLayout";

export default function Home() {
  return (
    <FrontendLayout>
      <div className="min-h-screen">
        <Allsongs />
      </div>
    </FrontendLayout>
  );
}
