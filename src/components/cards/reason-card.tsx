interface ReasonCardProps {
  title: string;
  bulletPoints: string[];
  videoUrl?: string;
}

export const ReasonCard = ({ title, bulletPoints, videoUrl }: ReasonCardProps) => {
  const handleVideoEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setTimeout(() => {
      video.play();
    }, 5000); // 5 second pause
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 md:p-8 mx-auto max-w-[450px] font-merriweather">
      {/* Top section - Image/Video and Title */}
      <div className="flex items-center gap-4 mb-6">
        {/* Media container - smaller size */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <video 
            autoPlay 
            muted 
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
        
        <h2 className="text-xl md:text-2xl">{title}</h2>
      </div>

      {/* Bottom section - Bullet points */}
      <div className="w-full">
        <ul className="space-y-4">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 text-sm">•</span>
              <span className="text-s md:text-xl leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
