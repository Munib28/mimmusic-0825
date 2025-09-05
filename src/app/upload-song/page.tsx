"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/SupabaseClient.ts";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/");
      } else {
        setPageLoading(false);
      }
    });
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim() || !artist.trim() || !audioFile || !imageFile) {
      setMessage("Al fields are required!");
      setLoading(false);
      return;
    }

    try {
      // Upload a Song
    } catch (err) {
      console.log("Catched error", err);
    }
  };

  if (pageLoading) return null;

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
          Upload Song
        </h2>
        <form onSubmit={handleUpload}>
          {message && (
            <p className="bg-primary font-semibold text-center mb-4 py-1">
              {message}
            </p>
          )}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            type="text"
            placeholder="Artist"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
          />
          <label htmlFor="audio" className="block py-2 text-secondary-text">
            Audio
          </label>
          <input
            accept="audio/*"
            id="audio"
            type="file"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              const file = files[0];
              setAudioFile(file);
            }}
          />
          <label htmlFor="cover" className="block py-2 text-secondary-text">
            Cover Image
          </label>
          <input
            accept="images/*"
            id="cover"
            type="file"
            className="outline-none border-1 border-neutral-600 p-2 w-full rounded-md text-primary-text placeholder-neutral-600 mb-6 focus:text-secondary-text"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              const file = files[0];
              setImageFile(file);
            }}
          />

          <button className="bg-third-text py-3 rounded-full w-full font-bold cursor-pointer hover:opacity-80 transition">
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
}
