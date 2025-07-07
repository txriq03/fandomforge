import InsideBanner from "@/Components/profile/InsideBanner";
import { getProfile } from "@/lib/supabase/client-actions";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: PageProps) => {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="w-full bg-slate-900 h-[250px] flex items-end">
      <InsideBanner />
    </div>
  );
};

export default ProfilePage;
