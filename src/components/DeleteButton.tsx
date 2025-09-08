import { FaTrash } from "react-icons/fa";
import { supabase } from "../../lib/SupabaseClient.ts";
import { useQueryClient } from "@tanstack/react-query";

type DeleteButtonProp = {
  songId: number;
  imagePath: string;
  audioPath: string;
};

export default function DeleteButton({
  songId,
  imagePath,
  audioPath,
}: DeleteButtonProp) {
  const queryClient = useQueryClient();

  const deleteSong = async () => {
    // Delete the Image
    const { error: imgError } = await supabase.storage
      .from("cover-images")
      .remove([imagePath]);

    if (imgError) {
      console.log("ImageDeleteError:", imgError.message);
      return;
    }

    // Delete Audio file
    const { error: audioError } = await supabase.storage
      .from("songs")
      .remove([audioPath]);

    if (audioError) {
      console.log("AudioDeleteError:", audioError.message);
      return;
    }

    // Delete a song from the songs table
    const { error: deleteError } = await supabase
      .from("songs")
      .delete()
      .eq("id", songId);

    if (deleteError) {
      console.log("TableDeleteError:", deleteError.message);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["allSongs"] });
    queryClient.invalidateQueries({ queryKey: ["UserSongs"] });
  };

  return (
    <button
      onClick={deleteSong}
      className="text-secondary-text absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hidden group-hover:block"
    >
      <FaTrash />
    </button>
  );
}
