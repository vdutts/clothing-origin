import { ExternalLink, MapPin, Factory, ShoppingBag, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ScanResultsProps {
  result: {
    brand: string;
    itemType: string;
    origin: string;
    manufacturer: string;
    retailLinks: { name: string; url: string }[];
    confidence: number;
  };
  image: string;
  onReset: () => void;
}

const ScanResults = ({ result, image, onReset }: ScanResultsProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${result.brand} ${result.itemType}`,
          text: `Found on Clothing Origin: ${result.brand} - Made in ${result.origin}`,
          url: window.location.href,
        });
      } catch (error) {
        toast.error("Sharing failed");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onReset} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          New Scan
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>

      {/* Main Results Card */}
      <Card className="overflow-hidden border-border/50 shadow-xl">
        {/* Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden bg-muted">
          <img
            src={image}
            alt="Scanned clothing"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary/90 backdrop-blur-sm">
              {result.confidence}% Match
            </Badge>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Brand & Type */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{result.brand}</h2>
            <p className="text-xl text-muted-foreground">{result.itemType}</p>
          </div>

          {/* Origin Info */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium mb-1">Origin</p>
                <p className="text-sm text-muted-foreground">{result.origin}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
              <Factory className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium mb-1">Manufacturer</p>
                <p className="text-sm text-muted-foreground">{result.manufacturer}</p>
              </div>
            </div>
          </div>

          {/* Retail Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Where to Buy
            </div>
            <div className="grid gap-2">
              {result.retailLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-between h-auto py-3"
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <span>{link.name}</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <p className="text-sm text-center text-muted-foreground">
          Results are AI-generated and may not be 100% accurate. Always verify with official sources.
        </p>
      </Card>
    </div>
  );
};

export default ScanResults;
