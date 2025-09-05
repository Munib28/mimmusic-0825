import { supabase } from "../SupabaseClient";

const signUpUser = async (name: string, email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      console.log("Error signing up:", error.message);
      return { error: error.message };
    }
  } catch (err) {
    console.log("Unexpected error:", err);
    return { error: "Something went wrong!" };
  }
};

export default signUpUser;
