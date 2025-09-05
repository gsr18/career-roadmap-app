import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FeaturedTemplates } from "@/components/dashboard/featured-templates"
import { TemplateCategories } from "@/components/dashboard/template-categories"
import { QuickStats } from "@/components/dashboard/quick-stats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [profileResult, templatesResult, userRoadmapsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("roadmap_templates").select("*").order("created_at", { ascending: false }),
    supabase.from("user_roadmaps").select("*").eq("user_id", data.user.id),
  ])

  const profile = profileResult.data
  const templates = templatesResult.data || []
  const userRoadmaps = userRoadmapsResult.data || []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <QuickStats userRoadmaps={userRoadmaps} />
        <FeaturedTemplates templates={templates.filter((t) => t.is_featured)} />
        <TemplateCategories templates={templates} />
      </main>
    </div>
  )
}
