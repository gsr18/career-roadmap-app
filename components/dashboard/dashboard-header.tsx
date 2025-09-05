"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Brain, Settings, LogOut, User, MessageSquare, BarChart3, Menu } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
  profile: any
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.[0]?.toUpperCase() || "U"

  const NavigationLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        href="/dashboard"
        className={`${mobile ? "block px-3 py-2 text-base" : ""} text-sm font-medium text-foreground hover:text-primary transition-colors`}
      >
        Dashboard
      </Link>
      <Link
        href="/roadmaps"
        className={`${mobile ? "block px-3 py-2 text-base" : ""} text-sm font-medium text-muted-foreground hover:text-primary transition-colors`}
      >
        My Roadmaps
      </Link>
      <Link
        href="/mentor"
        className={`${mobile ? "block px-3 py-2 text-base" : ""} text-sm font-medium text-muted-foreground hover:text-primary transition-colors`}
      >
        AI Mentor
      </Link>
      <Link
        href="/analytics"
        className={`${mobile ? "block px-3 py-2 text-base" : ""} text-sm font-medium text-muted-foreground hover:text-primary transition-colors`}
      >
        Analytics
      </Link>
      <Link
        href="/feedback"
        className={`${mobile ? "block px-3 py-2 text-base" : ""} text-sm font-medium text-muted-foreground hover:text-primary transition-colors`}
      >
        Feedback
      </Link>
    </>
  )

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">AI Career Roadmap</h1>
              <p className="text-sm text-muted-foreground">Your personalized learning journey</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <NavigationLinks />
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex bg-transparent">
              <Link href="/mentor">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask AI Mentor
              </Link>
            </Button>

            <Button variant="outline" size="sm" asChild className="sm:hidden bg-transparent">
              <Link href="/mentor">
                <MessageSquare className="h-4 w-4" />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavigationLinks mobile />
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={profile?.avatar_url || "/placeholder.svg"}
                          alt={profile?.full_name || user.email}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{profile?.full_name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        Profile
                      </Link>
                      <Link href="/settings" className="block px-3 py-2 text-sm hover:bg-muted rounded-md">
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hidden md:flex">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={profile?.avatar_url || "/placeholder.svg"}
                      alt={profile?.full_name || user.email}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.full_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
