import { FaAppStoreIos } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { LuChartNoAxesCombined } from "react-icons/lu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import Image from "next/image"

interface MyProject {
  title: string
  icon: React.ReactNode
  description: string
  link: string
  image: string
}

const projects: MyProject[] = [
  {
    title: "ByePhotos",
    icon: <FaAppStoreIos />,
    description:
      "An iOS app that helps you to free up space on your iPhone and iCloud.",
    link: "https://apps.apple.com/us/app/byephotos-storage-cleanup/id6737446757",
    image: "/myprojects/ByePhotos.jpg",
  },
  {
    title: "500MRR",
    icon: <LuChartNoAxesCombined />,
    description:
      "500 MRR analyzes hundreds of projects from Hacker News that reached $500 MRR, with AI-powered summaries",
    link: "https://500mrr.com",
    image: "/myprojects/500MRR.png",
  },
  {
    title: "IOPaint",
    icon: <FaGithub />,
    description:
      "A free, open-source and fully self-hostable inpainting/outpainting tool powered by state-of-the-art AI models.",
    link: "https://iopaint.com",
    image: "/myprojects/iopaint.png",
  },
  {
    title: "OptiClean",
    icon: <FaAppStoreIos />,
    description:
      "An iOS/macOS app that removes unwanted objects from photos using AI, run model fully on device.",
    link: "https://apps.apple.com/ca/app/opticlean-ai-object-remover/id6452387177",
    image: "/myprojects/opticlean.png",
  },
]

export default function MyProjects() {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="flex flex-row gap-4">
        {projects.map((project) => (
          <HoverCard key={project.title} openDelay={100} closeDelay={100}>
            <HoverCardTrigger>
              <div
                className="flex flex-row gap-2 items-center cursor-pointer"
                onClick={() => {
                  window.open(project.link, "_blank")
                }}
              >
                {project.icon}
                <div className="text-sm">{project.title}</div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="p-[10px] rounded-[18px]" side="top">
              <div className="flex flex-col gap-2">
                <div className="relative h-[100px] flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-[8px]"
                  />
                </div>
                <p className="text-sm text-foreground/70">
                  {project.description}
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  )
}
