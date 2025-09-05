"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { MdOutlineLibraryMusic } from "react-icons/md";
import useUserSession from "../../custom-hooks/useUserSession";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { loading, session } = useUserSession();

  if (loading)
    return (
      <aside
        className={`fixed left-2 top-14 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto -translate-x-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transitin-transform duration-500 lg:translate-x-0`}
      >
        <h2 className="text'2xl text-white text-center">Loading</h2>
      </aside>
    );

  return (
    <> 
    {session ? (
      <div>
      <aside
        className={`fixed left-2 top-14 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto -translate-x-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transitin-transform duration-500 lg:translate-x-0`}
      >
        <div className="flex justify-between text-primary-text items-center p-2 mb-4">
          <h2 className="font-bold">Your Library</h2>
          <Link href="upload-song">
            <LuPlus size={20} />
          </Link>
        </div>
        <div>
          <div className="flex relative gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover group">
            <button className="text-secondary-text absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block">
              <FaTrash />
            </button>
            <Image
              src="/images/cover-1.jpeg"
              alt="cover-image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div>
              <p className="text-primary-text font-semibold">Midnight Echoes</p>
              <p className="text-secondary-text text-sm">By Neon Skyline</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover">
            <Image
              src="/images/cover-1.jpeg"
              alt="cover-image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div>
              <p className="text-primary-text font-semibold">Midnight Echoes</p>
              <p className="text-secondary-text text-sm">By Neon Skyline</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover">
            <Image
              src="/images/cover-1.jpeg"
              alt="cover-image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div>
              <p className="text-primary-text font-semibold">Midnight Echoes</p>
              <p className="text-secondary-text text-sm">By Neon Skyline</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover">
            <Image
              src="/images/cover-1.jpeg"
              alt="cover-image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div>
              <p className="text-primary-text font-semibold">Midnight Echoes</p>
              <p className="text-secondary-text text-sm">By Neon Skyline</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover">
            <Image
              src="/images/cover-1.jpeg"
              alt="cover-image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div>
              <p className="text-primary-text font-semibold">Midnight Echoes</p>
              <p className="text-secondary-text text-sm">By Neon Skyline</p>
            </div>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-5 left-5 bg-background w-12 h-12 lg:hidden grid place-items-center text-white rounded-full z-50 cursor-pointer"
      >
        <MdOutlineLibraryMusic />
      </button>
    </div>
    ) : (
      <div>

      <aside
        className={`fixed left-2 top-14 bg-background w-75 rounded-lg h-[90vh] p-2 overflow-y-auto -translate-x-full ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transitin-transform duration-500 lg:translate-x-0`}
      >
        <div className="py-8 text-center">
          <Link href="/login" className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-secondary">Login</Link>
          <p className="mt-4 text-white">LogIn to dive into your favorites</p>
        </div>
      </aside>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-5 left-5 bg-background w-12 h-12 lg:hidden grid place-items-center text-white rounded-full z-50 cursor-pointer"
      >
        <MdOutlineLibraryMusic />
      </button>
    </div>
    )}
    </>
  );
}
