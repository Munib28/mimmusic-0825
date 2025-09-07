import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { supabase } from "../../lib/SupabaseClient.ts";
import { useQuery } from "@tanstack/react-query";
import { Song } from "../../types/songs.ts";

type UserSongsProps = {
  userId: string | undefined;
};

export default function UserSongs({ userId }: UserSongsProps) {
  const getUserSongs = async () => {
    const { error, data } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.log("fetchUserSongsError: ", error.message);
    }

    return data;
  };

  const {
    data: songs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryFn: getUserSongs,
    queryKey: ["UserSongs"],
  });

  if (isLoading)
    return <h2 className="text-center text-white text-2xl">Loading</h2>;

  if (isError)
    return <h2 className="text-center text-white text-2xl">{error.message}</h2>;

  return (
    <div>
      {songs?.map((song: Song, index) => {
        return (
          <div
            className="flex relative gap-2 items-center cursor-pointer mb-4 p-2 rounded-lg hover:bg-hover group"
            key={song.id}
          >
            <button className="text-secondary-text absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block">
              <FaTrash />
            </button>
            <Image
              src={song.cover_image_url}
              alt="cover-image"
              width={300}
              height={300}
              className="w-10 h-10 object-cover rounded-md"
            />
            <div>
              <p className="text-primary-text font-semibold">{song.title}</p>
              <p className="text-secondary-text text-sm">By {song.artist}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
