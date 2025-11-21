import { AlertCircle } from "lucide-react";

const UpdateBanner = () => {
  return (
    <div className="w-full bg-accent text-accent-foreground py-3 px-6 text-center">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <p className="text-sm font-medium">
          Website is under update
        </p>
      </div>
    </div>
  );
};

export default UpdateBanner;
