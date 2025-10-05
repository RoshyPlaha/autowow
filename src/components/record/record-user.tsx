"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SubmitForm from "@/components/record/submit-form"
import { toast } from "sonner"
import { sendGTMEvent } from "@next/third-parties/google";

interface RecordUserProps {
  onClose: () => void;
  setSubmitted: (status: boolean) => void;
  isNewUser: boolean;
}

export default function RecordUser({
  onClose,
  setSubmitted,
  isNewUser,
}: RecordUserProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const activeStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        // Store the stream reference
        activeStreamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const mimeType = 'video/mp4'
        
        console.log(`Using recording format: ${mimeType}`);

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: mimeType
        });
        mediaRecorderRef.current = mediaRecorder;
        chunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
        setTimeLeft(30); // Reset timer to 30 seconds
        sendGTMEvent({event: "button_click", value: "user_recording_started"});

        // Start the countdown timer
        timerRef.current = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              // Timer expired, stop recording
              stopRecording();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);

      } catch (err) {
        console.error("Error:", err);
        setIsRecording(false);
      }
    };

    startRecording();

    return () => {
      if (activeStreamRef.current) {
        activeStreamRef.current.getTracks().forEach(track => track.stop());
        activeStreamRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const stopRecording = async () => {
    // Clear the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      // 1. Store reference to the stream before stopping
      const stream = mediaRecorderRef.current.stream;
      
      // 2. Stop the MediaRecorder first
      mediaRecorderRef.current.stop();
      
      // 3. Handle everything else in the onstop callback
      mediaRecorderRef.current.onstop = () => {
        // Determine the correct MIME type for the blob
        const mimeType = mediaRecorderRef.current?.mimeType || 'video/mp4';
        
        // Create the blob with the correct MIME type
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setRecordedBlob(blob);

        // Stop all tracks
        stream.getTracks().forEach(track => {
          track.stop();
        });

        // Reset everything
        mediaRecorderRef.current = null;
        chunksRef.current = [];
        setIsRecording(false);
        setShowSubmitForm(true);

        // Use the toast
        toast("Recording stopped successfully!", 
          {
            description: "The camera light might remain on - this is a known browser behavior and will turn off when you close the tab.",
          action: {
            label: "x",
            onClick: () => console.log("Undo"),
          }}
        );

        setIsRecording(false);
        setShowSubmitForm(true);
      };
    }
  };

  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {showSubmitForm ? (
        <SubmitForm 
          videoBlob={recordedBlob} 
          onClose={onClose} 
          setSubmitted={setSubmitted} 
          isNewUser={isNewUser} // not sure this is needed? may be important for initial users? and we can be assumptive they are new - but this can change once they provide credentials.
        />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full rounded-lg object-cover"
          />
          
          {/* Timer Display */}
          {isRecording && (
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg font-mono text-lg">
              {formatTime(timeLeft)}
            </div>
          )}
          
          <div className="absolute top-4 right-4 flex gap-4">
            {isRecording && (
              <Button variant="destructive" onClick={stopRecording}>
                Stop Recording
              </Button>
            )}
            <Button 
              onClick={() => {
                if (activeStreamRef.current) {
                  activeStreamRef.current.getTracks().forEach(track => track.stop());
                  activeStreamRef.current = null;
                }
                if (timerRef.current) {
                  clearInterval(timerRef.current);
                }
                onClose();
              }}
              variant="outline"
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
