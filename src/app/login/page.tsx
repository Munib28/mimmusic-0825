import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center w-full bg-hover">
      <div className="bg-background flex flex-col items-center px-6 py-6 lg:px-12 rounded-md max-w-[400px] w-[90%]">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={500}
          height={500}
          className="h-11 w-11"
        />
        <h2 className="text-2xl font-bold text-white my-2 mb-8 text-center">
          Login In
        </h2>
        <form>
          <input
            type="text"
            placeholder="Your Email"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <input
            type="text"
            placeholder="Your Password"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <button className="bg-third-text py-3 rounded-full w-full font-bold cursor-pointer hover:opacity-80 transition">
            Continue
          </button>
          <div className="text-secondary-text text-center my-6">
            <span>Don't have an account?</span>
            <Link
              href="signup"
              className="ml-2 text-white underline hover:text-third-text"
            >
              Sign Up now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
