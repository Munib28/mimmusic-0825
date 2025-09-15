import Image from "next/image";
import Link from "next/link";
import { GoSearch } from "react-icons/go";
import { MdHomeFilled } from "react-icons/md";
import useUserSession from "../../custom-hooks/useUserSession.ts";
import LogoutUser from "../../lib/auth/logoutUser.ts";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const { session, loading } = useUserSession();

  const hendleLogout = async () => {
    const result = await LogoutUser();

    if (!result?.error) {
      router.push("/");
    }
  };

  return (
    <nav className="h-15 flex justify-between items-center px-6 fixed top-0 left-0 w-full bg-black z-100">
      <div className="flex gap-6 items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-9 h-9"
          />
        </Link>
        <Link
          href="/"
          className="bg-background w-11 h-11 grid place-items-center text-white text-3xl rounded-full"
        >
          <MdHomeFilled className="hover:opacity-70" />
        </Link>
        <div className="bg-background hidden lg:flex items-center h-11 w-90 px-3 gap-3 text-primary-text">
          <GoSearch className="text-primary-text shrink-0 size={22}" />
          <input
            className="h-full w-full outline-none placeholder:"
            type="text"
            placeholder="What do you want to play?"
          />
        </div>
      </div>

      <div className="flex gap-8 items-center">
        <div className="lg:flex hidden gap-2 text-third-text font-bold border-r-2 border-primary-text pr-6"></div>
        <div>
          {!loading && (
            <>
              {session ? (
                <button
                  onClick={hendleLogout}
                  className="cursor-pointer h-11 bg-white text-gray-700 rounded-full font-bold hover:bg-secondary grid px-8 place-items-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="h-11 bg-white text-gray-700 rounded-full font-bold hover:bg-secondary grid px-8 place-items-center"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
