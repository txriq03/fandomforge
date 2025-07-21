import InsideBanner from "@/Components/profile/InsideBanner";
import ProfileTabs from "@/Components/profile/ProfileTabs";
import { getProfileByUsername } from "@/lib/supabase/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

const ProfilePage = async ({ params }: PageProps) => {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  return (
    <>
      <div className="w-full bg-slate-900 h-[250px] flex items-end">
        <InsideBanner profile={profile} />
      </div>
      <ProfileTabs />
    </>
  );
};

export default ProfilePage;
