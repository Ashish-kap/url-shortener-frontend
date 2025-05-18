import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { UrlItem } from "@/types/url";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export const UrlListItem = ({ data }: { data: UrlItem }) => {
  const [copied, setCopied] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${API_URL}/${data.short_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <a
              href={`${API_URL}/${data.short_code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              {API_URL}/{data.short_code}
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{data.original_url}</p>
          <div className="flex gap-4 text-sm">
            <span>Clicks: {data.clicks}</span>
            <span>
              Created: {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
