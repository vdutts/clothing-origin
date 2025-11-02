import { useState, useRef } from "react";
import { Camera, Upload, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import ScanResults from "./ScanResults";

interface ScanResult {
  brand: string;
  itemType: string;
  origin: string;
  manufacturer: string;
  retailLinks: { name: string; url: string }[];
  confidence: number;
}

const CameraCapture = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeCLothing(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      toast.error("Camera access denied. Please allow camera permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setSelectedImage(imageData);
        stopCamera();
        analyzeCLothing(imageData);
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const analyzeCLothing = async (imageData: string) => {
    setIsAnalyzing(true);
    setScanResult(null);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result
    const mockResult: ScanResult = {
      brand: "Nike",
      itemType: "Running Shoes",
      origin: "Vietnam",
      manufacturer: "Nike Manufacturing Thailand",
      retailLinks: [
        { name: "Nike Official", url: "https://nike.com" },
        { name: "Amazon", url: "https://amazon.com" },
        { name: "Foot Locker", url: "https://footlocker.com" }
      ],
      confidence: 94
    };
    
    setScanResult(mockResult);
    setIsAnalyzing(false);
    
    // Save to history
    const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
    history.unshift({
      ...mockResult,
      image: imageData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("scanHistory", JSON.stringify(history.slice(0, 20)));
    
    toast.success("Clothing analyzed successfully!");
  };

  const resetScan = () => {
    setSelectedImage(null);
    setScanResult(null);
    setIsAnalyzing(false);
    stopCamera();
  };

  if (scanResult && selectedImage) {
    return <ScanResults result={scanResult} image={selectedImage} onReset={resetScan} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 sm:p-8 border-border/50 shadow-lg">
        {!selectedImage && !isCameraActive ? (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Scan Your Clothing</h2>
              <p className="text-muted-foreground">
                Take a photo or upload an image to discover its origin
              </p>
            </div>

            <div className="grid gap-4">
              <Button
                size="lg"
                onClick={startCamera}
                className="w-full gap-2 h-14"
              >
                <Camera className="h-5 w-5" />
                Open Camera
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                size="lg"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full gap-2 h-14"
              >
                <Upload className="h-5 w-5" />
                Upload Photo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        ) : isCameraActive ? (
          <div className="space-y-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="flex gap-2">
              <Button onClick={capturePhoto} className="flex-1 gap-2">
                <Camera className="h-5 w-5" />
                Capture
              </Button>
              <Button onClick={stopCamera} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={selectedImage || ""}
                alt="Selected clothing"
                className="w-full h-auto"
              />
            </div>

            {isAnalyzing && (
              <div className="flex flex-col items-center gap-4 py-8">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <div className="text-center space-y-2">
                  <p className="font-medium flex items-center gap-2 justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Analyzing clothing...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    AI is identifying brand and origin
                  </p>
                </div>
              </div>
            )}

            {!isAnalyzing && (
              <div className="flex gap-2">
                <Button onClick={resetScan} variant="outline" className="flex-1">
                  Try Another
                </Button>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CameraCapture;
