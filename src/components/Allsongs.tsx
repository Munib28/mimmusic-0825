import Image from "next/image";
import { IoMdPlay } from "react-icons/io";

export default function Allsongs() {
  return (
    <div className="min-h-[90vh] bg-background my-15 p-4 lg:ml-80 rounded-lg mx-4">
      <h2 className="text-2xl text-white mb-3 font-semibold">New Songs</h2>
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="bg-background relative p-3 cursor-pointer rounded-md hover:bg-hover group">
          <button className="bg-third-text w-12 h-12 rounded-full grid place-items-center absolute bottom-8 opacity-0 right-5 group-hover:opacity-70 group-hover:bottom-18 transition-all duration-300 ease-in-out cursor-pointer">
            <IoMdPlay />
          </button>
          <Image
            src="/images/cover-1.jpeg"
            alt="cover-image"
            width={500}
            height={500}
            className="w-full h-50 object-cover rounded-md"
          />
          <div className="mt-2 ">
            <p className="text-primary-text font-semibold ">
              Rain on Marble Streets
            </p>
            <p className="text-secondary-text text-sm">By The Lanterns</p>
          </div>
        </div>

        <div className="bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <Image
            src="/images/cover-1.jpeg"
            alt="cover-image"
            width={500}
            height={500}
            className="w-full h-50 object-cover rounded-md"
          />
          <div className="mt-2 ">
            <p className="text-primary-text font-semibold ">
              Rain on Marble Streets
            </p>
            <p className="text-secondary-text text-sm">By The Lanterns</p>
          </div>
        </div>

        <div className="bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <Image
            src="/images/cover-1.jpeg"
            alt="cover-image"
            width={500}
            height={500}
            className="w-full h-50 object-cover rounded-md"
          />
          <div className="mt-2 ">
            <p className="text-primary-text font-semibold ">
              Rain on Marble Streets
            </p>
            <p className="text-secondary-text text-sm">By The Lanterns</p>
          </div>
        </div>

        <div className="bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <Image
            src="/images/cover-1.jpeg"
            alt="cover-image"
            width={500}
            height={500}
            className="w-full h-50 object-cover rounded-md"
          />
          <div className="mt-2 ">
            <p className="text-primary-text font-semibold ">
              Rain on Marble Streets
            </p>
            <p className="text-secondary-text text-sm">By The Lanterns</p>
          </div>
        </div>

        <div className="bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <Image
            src="/images/cover-1.jpeg"
            alt="cover-image"
            width={500}
            height={500}
            className="w-full h-50 object-cover rounded-md"
          />
          <div className="mt-2 ">
            <p className="text-primary-text font-semibold ">
              Rain on Marble Streets
            </p>
            <p className="text-secondary-text text-sm">By The Lanterns</p>
          </div>
        </div>

        <div className="bg-background p-3 cursor-pointer rounded-md hover:bg-hover">
          <Image
            src="/images/cover-1.jpeg"
            alt="cover-image"
            width={500}
            height={500}
            className="w-full h-50 object-cover rounded-md"
          />
          <div className="mt-2 ">
            <p className="text-primary-text font-semibold ">
              Rain on Marble Streets
            </p>
            <p className="text-secondary-text text-sm">By The Lanterns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
