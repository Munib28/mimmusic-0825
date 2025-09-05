"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import signUpUser from "../../../lib/auth/signUpUser";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/SupabaseClient.ts";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Please fill in all fields!");
      return;
    }

    const result = await signUpUser(name, email, password);
    if (result?.error) {
      setMessage(result.error);
    } else {
      setMessage("Signup successful!");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  if (loading) return null;

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
          SignUp
        </h2>
        <form onSubmit={handleSignup} className="w-full">
          {message && (
            <p className="bg-primary font-semibold text-center mb-4 py-1">
              {message}
            </p>
          )}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your Name"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Your Email"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="text"
            placeholder="Your Password"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <button className="bg-third-text py-3 rounded-full w-full font-bold cursor-pointer hover:opacity-80 transition">
            Continue
          </button>
          <div className="text-secondary-text text-center my-6">
            <span>Already have an account?</span>
            <Link
              href="login"
              className="ml-2 text-white underline hover:text-third-text"
            >
              Sign In now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
