import LogosGallery from "@/components/logos_gallery";
import Notification from "@/components/notification";
import ProgressBar from "@/components/progressBar";
import SimpleSlider from "@/components/simpleSlider";
import StickyButton from "@/components/sticky_button";
import StickyFAQs from "@/components/sticky_faqs";

export default function Home() {
  return (
    <main>
      <section className="w-full py-24">
        <div className="container max-w-7xl mx-auto px-7">
          <h1 className="text-4xl font-bold">Playgound</h1>
          <div className="w-full pt-20 min-h-[300vh] relative @container/teste">
            <ProgressBar className="bg-red-500" />
            <div className=" p-7 bg-yellow-500 my-5 w-full  @lg/teste:w-[50cqw]"></div>
            <SimpleSlider />
            <Notification />
          </div>
        </div>
      </section>
      <section className="w-full py-24 ">
        <div className="container max-w-7xl mx-auto px-7">
          <StickyFAQs />
        </div>
      </section>
      <LogosGallery />
      <section className="w-full h-screen relative py-24 bg-gray-600">
        <StickyButton>
          <button className="bg-yellow-500 rounded-full px-7 py-3 text-black font-bold text-lg">
            Button
          </button>
        </StickyButton>
      </section>
      <section className="w-full h-screen bg-blue-500 relative py-24">
        <StickyButton>
          <button className="bg-black rounded-full px-7 py-3 text-yellow-500 font-bold text-lg">
            Button
          </button>
        </StickyButton>
      </section>
      <section className="w-full h-screen relative py-24" />
    </main>
  );
}
