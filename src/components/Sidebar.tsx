"use client";

import Link from "next/link";
import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { MdOutlineLibraryMusic } from "react-icons/md";
import useUserSession from "../../custom-hooks/useUserSession";
import UserSongs from "./UserSongs.tsx";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { loading, session } = useUserSession();
  const user_id = session?.user.id;

  if (loading)
    return (
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

        {[...Array(10)].map((i, index) => (
          <div key={index} className="flex gap-2 animate-pulse mb-4">
            <div className="w-10 h-10 rounded-md bg-hover"></div>
            <div className="h-5 w-[80%] rounded-md bg-hover"></div>
          </div>
        ))}
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

            <UserSongs userId={user_id} />
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
              <Link
                href="/login"
                className="bg-white px-6 py-2 rounded-full font-semibold hover:bg-secondary"
              >
                Login
              </Link>
              <p className="mt-4 text-white">
                LogIn to dive into your favorites
              </p>
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
