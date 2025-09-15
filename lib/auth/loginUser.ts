import { supabase } from "../SupabaseClient";

const loginUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Error Login:", error.message);
      return { error: error.message };
    }

    // Get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && !user.email_confirmed_at) {
      return { error: "Email not verified. Check your inbox and click on the confirmation link." };
    }

    return { success: true };
  } catch (err) {
    console.log("Unexpected error:", err);
    return { error: "Something went wrong!" };
  }
};


export default loginUser;
