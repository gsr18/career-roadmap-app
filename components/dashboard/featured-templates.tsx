import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

interface FeaturedTemplatesProps {
  templates: any[]
}

export function FeaturedTemplates({ templates }: FeaturedTemplatesProps) {
  if (templates.length === 0) {
    return null
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Featured Roadmaps</h2>
          <p className="text-muted-foreground">Curated career paths to accelerate your growth</p>
        </div>
        <Button variant="outline" asChild className="w-fit bg-transparent">
          <Link href="/templates">
            View All Templates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {templates.slice(0, 6).map((template) => (
          <Card
            key={template.id}
            className="group hover:shadow-lg transition-all duration-200 bg-card/50 border-border/50 hover:border-primary/20 hover:scale-[1.02]"
          >
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1 min-w-0">
                  <CardTitle className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {template.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(template.difficulty_level)}`}>
                      {template.difficulty_level}
                    </Badge>
                  </div>
                </div>
                <Star className="h-5 w-5 text-primary fill-primary flex-shrink-0" />
              </div>
              <CardDescription className="text-sm line-clamp-3">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">{template.estimated_duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">{template.milestones?.length || 0} milestones</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Key Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {(template.skills || []).slice(0, 3).map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {(template.skills || []).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(template.skills || []).length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button className="w-full group-hover:bg-primary/90 transition-colors" asChild>
                <Link href={`/templates/${template.id}`}>
                  Start This Roadmap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
