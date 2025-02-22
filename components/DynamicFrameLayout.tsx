"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import ProjectPopup from "./VideoPopup"

const GRID_SIZE = 12
const CELL_SIZE = 60 // pixels per grid cell

interface Frame {
  id: number
  image: string
  content: string
  demoLink?: string
  githubLink?: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner: string
  edgeHorizontal: string
  edgeVertical: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  isHovered: boolean
}

const initialFrames: Frame[] = [
  {
    id: 1,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffolio.312f0ad8.png&w=2048&q=75",
    content: "Folio Lynkr is a platform that allows you to create a portfolio website in minutes. As a user you can select a template which suits you the best and then fill out the form which asks for the details you want to add in your portfolio then pay and host your portfolio website on our platform itself",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 2,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcalibervercel.efea96e4.png&w=2048&q=75",
    content: "Caliber Tech is a web based startup which provides web pages for small shops and vendors in affordable price with unaffordable quality. Here the user can also buy source codes for the websites which are already developed and hosted on Folio Lynkr",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_vert_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/2_hori_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 3,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmac-os.8db8b292.png&w=2048&q=75",
    content: "This is a portfolio template which is completley developed based on macOS used in macbook, a dynamic website which consist of main macos features like login,shutdown, terminal, browser, VS-Code, Notes App, Safari,Control Center etc, this even has its app listed as projects done. This project challenged the CSS skills of mine and knowledge.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/3d36d1e0dba2476c/3_Vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 4,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnetflix.4be6be86.png&w=2048&q=75",
    content: "This Netflix website clone was developed as a comprehensive project aimed at honing skills in API fetching, posting data, rendering components across various pages, and implementing backend APIs for handling email and password data using MongoDB with Node and Express. It gave valuable insights into managing states and utilizing hooks effectively.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/4_vert_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 5,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgemini.6436c8af.png&w=2048&q=75",
    content: "We developed a REACT website that utilizes GEMINI AI to provide details about the latest disease outbreaks worldwide. Since GEMINI AI doesn't provide real-time data, we integrated updated news from the W.H.O. website to fetch disease details. It gave valuable insights into using API and utilizing AI in real-world problems effectively.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_corner_update.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_hori_update.png",
    edgeVertical: "https://static.cdn-luma.com/files/9e67e05f37e52522/5_verti_update.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 6,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcog.c3fd26a9.png&w=2048&q=75",
    content: "As a part of Web-App event conducted by 'EHORYZON2024' we developed a Vehicle Management System for our college vehicles with a feature of notifying the drivers and VMS admin about next service date via SMS. This application utilizes a public API called Twilio to send messages to the mentioned drivers via our website. We got 3rd prize.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/1199340587e8da1d/6_corner-1.png",
    edgeVertical: "https://static.cdn-luma.com/files/1199340587e8da1d/6_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 7,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frobooo.0ad53c0c.png&w=2048&q=75",
    content: "This is a prototype showcasing my first integration of a 3D model in NextJS. Utilizing Blender, Spline, and Three.js, I successfully brought a 3D immersive robot into the web platform. This project provided valuable hands-on experience with Blender and Spline, while Three.js enhanced my understanding of orbit control and scene management.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/b80b5aa00ccc33bd/7_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 8,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fportfolio.46875801.png&w=2048&q=75",
    content: "This is a prototype showcasing my first integration of a 3D model in ReactJS. Utilizing Blender, Spline, and Three.js, I successfully brought a 3D immersive game world to the web platform. This project provided valuable hands-on experience with Blender and Spline, while Three.js enhanced my understanding of orbit control and scene management.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/8_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/8_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/8_verticle.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
  {
    id: 9,
    image: "https://karthickrajans.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finsta.aa8bee74.png&w=2048&q=75",
    content: "This is an Instagram clone created using the NEXT JS framework. This is my first project in NEXT JS. It is just a complete frontend clone of Instagram. It gave a brief knowledge about the NEXT JS project structure, routing, and rendering components across pages. It was a great experience in frontend development.",
    demoLink: "https://demo.example.com",
    githubLink: "https://github.com/yourusername/project",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    corner: "https://static.cdn-luma.com/files/981e483f71aa764b/9_corner.png",
    edgeHorizontal: "https://static.cdn-luma.com/files/981e483f71aa764b/9_hori.png",
    edgeVertical: "https://static.cdn-luma.com/files/981e483f71aa764b/9_vert.png",
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
    isHovered: false,
  },
]

export default function DynamicFrameLayout() {
  const [frames, setFrames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(6)
  const [gapSize, setGapSize] = useState(4)
  const [showControls, setShowControls] = useState(false)
  const [cleanInterface, setCleanInterface] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Frame | null>(null)

  const getRowSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "4fr 4fr 4fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  const updateFrameProperty = (id: number, property: keyof Frame, value: number) => {
    setFrames(frames.map((frame) => (frame.id === id ? { ...frame, [property]: value } : frame)))
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleCleanInterface = () => {
    setCleanInterface(!cleanInterface)
    if (!cleanInterface) {
      setShowControls(false)
    }
  }

  const updateCodebase = () => {
    console.log("Updating codebase with current values:")
    console.log("Hover Size:", hoverSize)
    console.log("Gap Size:", gapSize)
    console.log("Frames:", frames)
    // Here you would typically make an API call to update the codebase
    // For now, we'll just log the values
  }

  const handleProjectClick = (frame: Frame) => {
    setSelectedProject(frame)
  }

  const closePopup = () => {
    setSelectedProject(null)
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl">My Works <span className="text-sm text-slate-500 font-bold">( Click to see in detail )</span></h1>
      <div className="flex justify-between items-center mb-4"></div>
      {!cleanInterface && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Dynamic Frame Layout</h2>
          <div className="space-x-2">
            <Button onClick={toggleControls}>{showControls ? "Hide Controls" : "Show Controls"}</Button>
            <Button onClick={updateCodebase}>Update Codebase</Button>
            <Button onClick={toggleCleanInterface}>{cleanInterface ? "Show UI" : "Hide UI"}</Button>
          </div>
        </div>
      )}
      {!cleanInterface && showControls && (
        <>
          <div className="space-y-2">
            <label htmlFor="hover-size" className="block text-sm font-medium text-gray-200">
              Hover Size: {hoverSize}
            </label>
            <Slider
              id="hover-size"
              min={4}
              max={8}
              step={0.1}
              value={[hoverSize]}
              onValueChange={(value) => setHoverSize(value[0])}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="gap-size" className="block text-sm font-medium text-gray-200">
              Gap Size: {gapSize}px
            </label>
            <Slider
              id="gap-size"
              min={0}
              max={20}
              step={1}
              value={[gapSize]}
              onValueChange={(value) => setGapSize(value[0])}
            />
          </div>
        </>
      )}
      <div
        className="relative w-full h-full"
        style={{
          display: "grid",
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {frames.map((frame) => {
          const row = Math.floor(frame.defaultPos.y / 4)
          const col = Math.floor(frame.defaultPos.x / 4)
          const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)

          return (
            <motion.div
              key={frame.id}
              className="relative"
              style={{
                transformOrigin,
                transition: "transform 0.4s ease",
              }}
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
            >
              <FrameComponent
                image={frame.image}
                content={frame.content}
                demoLink={frame.demoLink}
                githubLink={frame.githubLink}
                width="100%"
                height="100%"
                className="absolute inset-0 cursor-pointer"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) => updateFrameProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameProperty(frame.id, "borderSize", value)}
                showControls={false}
                label={`Frame ${frame.id}`}
                showFrame={false}
                isHovered={
                  hovered?.row === Math.floor(frame.defaultPos.y / 4) &&
                  hovered?.col === Math.floor(frame.defaultPos.x / 4)
                }
                onClick={() => handleProjectClick(frame)}
              />
            </motion.div>
          )
        })}
      </div>
      {selectedProject && (
        <ProjectPopup
          image={selectedProject.image}
          content={selectedProject.content}
          demoLink={selectedProject.demoLink}
          githubLink={selectedProject.githubLink}
          onClose={closePopup}
        />
      )}
    </div>
  )
}

