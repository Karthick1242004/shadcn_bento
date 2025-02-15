import type React from "react"

interface VideoPopupProps {
  video: string
  onClose: () => void
}

const VideoPopup: React.FC<VideoPopupProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative z-10 w-full max-w-4xl aspect-video">
        <video src={video} controls autoPlay className="w-full h-full object-cover rounded-lg shadow-lg">
          Your browser does not support the video tag.
        </video>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default VideoPopup

