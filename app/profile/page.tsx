import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile/profile-form"
import { UserBadges } from "@/components/profile/user-badges"

export default async function ProfilePage() {
  const supabase = createServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: badges } = await supabase
    .from("user_badges")
    .select("*")
    .eq("user_id", user.id)
    .order("earned_at", { ascending: false })

  const { data: roadmaps } = await supabase.from("user_roadmaps").select("*").eq("user_id", user.id)

  const stats = {
    totalRoadmaps: roadmaps?.length || 0,
    completedRoadmaps: roadmaps?.filter((r) => r.status === "completed").length || 0,
    currentStreak: Math.max(...(roadmaps?.map((r) => r.current_streak || 0) || [0])),
    totalBadges: badges?.length || 0,
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your profile information and track your achievements</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileForm user={user} profile={profile} />
          </div>
          <div>
            <UserBadges badges={badges || []} stats={stats} />
          </div>
        </div>
      </div>
    </div>
  )
}
