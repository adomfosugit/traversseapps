import Image from "next/image";
import Landingpage from "../../components/Website/Landingpage";
import Chatwithsales from "@/components/Website/Chatwithsales";
import WhyTraverse from "@/components/WhyTraverse";
import WayYouBuild from "@/components/WayYouBuild";
import Testimonials from "@/components/Testimonials";
import WhereWeOperate from "@/components/WhereWeOperate";
import FAQ from "@/components/FAQ";
import WayYouBuild2 from "@/components/WayYouBuild2";
export default function Home() {
  return (
    <div>
      <Landingpage />
      <Chatwithsales />
      <WhyTraverse />
      
      <WayYouBuild />
      <WayYouBuild2 />
      <Testimonials />
      <WhereWeOperate />
      <FAQ />
    </div>
       );
}
