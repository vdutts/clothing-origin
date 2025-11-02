import { useState } from "react";
import { Camera, History, Sparkles, ShoppingBag, MapPin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CameraCapture from "@/components/CameraCapture";
import ScanHistory from "@/components/ScanHistory";

const Index = () => {
  const [activeView, setActiveView] = useState<"scan" | "history">("scan");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Recognition</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Discover Your Clothing's{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Origin Story
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Scan any clothing item with your camera and instantly discover its brand, origin, and where to buy it
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Card className="p-4 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
              <Camera className="h-8 w-8 text-primary mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Instant Scan</h3>
              <p className="text-sm text-muted-foreground">Take a photo to identify</p>
            </Card>
            <Card className="p-4 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
              <MapPin className="h-8 w-8 text-primary mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Learn Origin</h3>
              <p className="text-sm text-muted-foreground">Discover brand & source</p>
            </Card>
            <Card className="p-4 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg">
              <ShoppingBag className="h-8 w-8 text-primary mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Shop Smart</h3>
              <p className="text-sm text-muted-foreground">Find where to buy</p>
            </Card>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={activeView === "scan" ? "default" : "outline"}
            onClick={() => setActiveView("scan")}
            className="gap-2 min-w-[140px]"
          >
            <Camera className="h-4 w-4" />
            Scan
          </Button>
          <Button
            variant={activeView === "history" ? "default" : "outline"}
            onClick={() => setActiveView("history")}
            className="gap-2 min-w-[140px]"
          >
            <History className="h-4 w-4" />
            History
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        {activeView === "scan" ? <CameraCapture /> : <ScanHistory />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 mt-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all active:scale-95"
                onClick={() => window.open('https://github.com/vdutts7', '_blank')}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </button>
              <button
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all active:scale-95"
                onClick={() => window.open('https://x.com/vdutts7', '_blank')}
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ using AI-powered recognition
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
