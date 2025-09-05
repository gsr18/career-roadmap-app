"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Smartphone, Palette, Server, BarChart3, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface TemplateCategoriesProps {
  templates: any[]
}

const categoryIcons: Record<string, any> = {
  "Web Development": Code,
  "Data Science": BarChart3,
  "Mobile Development": Smartphone,
  Design: Palette,
  DevOps: Server,
  Database: Database,
}

export function TemplateCategories({ templates }: TemplateCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Group templates by category
  const categorizedTemplates = templates.reduce(
    (acc, template) => {
      const category = template.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(template)
      return acc
    },
    {} as Record<string, any[]>,
  )

  const categories = Object.keys(categorizedTemplates)
  const filteredTemplates = selectedCategory ? categorizedTemplates[selectedCategory] || [] : templates

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
          <p className="text-muted-foreground">Explore roadmaps tailored to your career interests</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="h-8"
        >
          <Filter className="h-3 w-3 mr-2" />
          All Categories
        </Button>
        {categories.map((category) => {
          const Icon = categoryIcons[category] || Code
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="h-8"
            >
              <Icon className="h-3 w-3 mr-2" />
              {category}
              <Badge variant="secondary" className="ml-2 text-xs">
                {categorizedTemplates[category]?.length || 0}
              </Badge>
            </Button>
          )
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const Icon = categoryIcons[template.category] || Code
          return (
            <Card
              key={template.id}
              className="group hover:shadow-md transition-all duration-200 bg-card/30 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-md">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                        {template.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {template.difficulty_level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{template.estimated_duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm line-clamp-2 mt-2">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{template.milestones?.length || 0} milestones</span>
                  <Button size="sm" variant="ghost" asChild className="h-8 px-2">
                    <Link href={`/templates/${template.id}`}>
                      View
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No templates found in this category.</p>
        </div>
      )}
    </section>
  )
}
