const VideoExample = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-lg">
      <div className="relative w-full aspect-video overflow-hidden">
        <video
          className="w-full h-full object-cover scale-101"
          autoPlay
          loop
          muted
          playsInline
          controls
        >
          <source
            src="https://uyxjzyhjh8n5b67n.public.blob.vercel-storage.com/defaultvideo.mov"
            type="video/quicktime"
          />
          <source
            src="https://uyxjzyhjh8n5b67n.public.blob.vercel-storage.com/defaultvideo.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoExample;
