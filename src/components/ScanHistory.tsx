import { useState, useEffect } from "react";
import { Trash2, ExternalLink, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface HistoryItem {
  brand: string;
  itemType: string;
  origin: string;
  image: string;
  timestamp: string;
  confidence: number;
}

const ScanHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const stored = localStorage.getItem("scanHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };

  const clearHistory = () => {
    localStorage.removeItem("scanHistory");
    setHistory([]);
    toast.success("History cleared");
  };

  const deleteItem = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index);
    localStorage.setItem("scanHistory", JSON.stringify(newHistory));
    setHistory(newHistory);
    toast.success("Item removed from history");
  };

  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-12 text-center border-border/50">
          <div className="inline-flex p-4 bg-muted rounded-full mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Scan History</h3>
          <p className="text-muted-foreground">
            Your scanned items will appear here. Start by scanning your first clothing item!
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Scan History</h2>
          <p className="text-sm text-muted-foreground">{history.length} items scanned</p>
        </div>
        <Button variant="outline" size="sm" onClick={clearHistory} className="gap-2">
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid gap-4">
        {history.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-lg transition-all border-border/50 group"
          >
            <div className="flex gap-4 p-4">
              {/* Thumbnail */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.itemType}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg truncate">{item.brand}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.itemType}</p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {item.confidence}%
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-3 w-3" />
                  <span className="truncate">{item.origin}</span>
                </div>

                <p className="text-xs text-muted-foreground">
                  {new Date(item.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteItem(index)}
                    className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScanHistory;
