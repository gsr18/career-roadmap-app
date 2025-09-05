import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bug, Lightbulb, MessageSquare, Clock, CheckCircle, AlertCircle, Pause } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface FeedbackHistoryProps {
  feedback: any[]
}

export function FeedbackHistory({ feedback }: FeedbackHistoryProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bug_report":
        return Bug
      case "feature_request":
        return Lightbulb
      default:
        return MessageSquare
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return Clock
      case "in_progress":
        return Pause
      case "resolved":
        return CheckCircle
      case "closed":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "default"
      case "in_progress":
        return "secondary"
      case "resolved":
        return "default"
      case "closed":
        return "outline"
      default:
        return "outline"
    }
  }

  if (feedback.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Feedback History</CardTitle>
          <CardDescription>Track the status of your submitted feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback submitted yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your feedback helps us improve the platform for everyone
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Feedback History</CardTitle>
        <CardDescription>Track the status of your submitted feedback</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedback.map((item) => {
          const TypeIcon = getTypeIcon(item.type)
          const StatusIcon = getStatusIcon(item.status)

          return (
            <div key={item.id} className="p-4 border border-border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <TypeIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <StatusIcon className="h-4 w-4 text-muted-foreground" />
                  <Badge variant={getStatusColor(item.status) as any} className="text-xs">
                    {item.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="capitalize">{item.type.replace("_", " ")}</span>
                  <span>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</span>
                </div>
                {item.updated_at !== item.created_at && (
                  <span>Updated {formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}</span>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
