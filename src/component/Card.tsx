import { DeleteIcon } from "../icons/DeleteIcon";
import { NotebookIcon } from "../icons/NotebookIcon";
import { ShareIcon } from "../icons/ShareIcon";

interface cardProps {
    title: string,
    link: string,
    type: "Twitter" | "Youtube" | "Linkedin"
}
export function Card({ title, link, type }: cardProps) {
    return (
      <div className="w-72 h-[400px] overflow-y-auto -mb-8 "> 
        <div className="p-4  bg-white rounded-md shadow-md border border-slate-200  h-[350px] ">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="pr-2 text-gray-600">
                <NotebookIcon size="lg" />
              </div>
              {title}
            </div>
            <div className="flex">
              <div className="pr-2 text-gray-600">
                <a href={link} target="_blank">
                  <ShareIcon size="lg" />
                </a>
              </div>
              <div className="text-gray-600">
                <DeleteIcon size="lg" />
              </div>
            </div>
          </div>
          <div className="pt-4">
            {type === "Youtube" && (
              <iframe
                className="w-full h-60"
                src={link.replace("watch", "embed")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {type === "Twitter" && (
              <blockquote className="twitter-tweet">
                <a href={link}></a>
              </blockquote>
            )}
            {type === "Linkedin" && (
              <iframe
                src={link}
                className="w-full h-60"
                frameBorder="0"
                allowFullScreen
                title="Embedded post"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    );
  }
  