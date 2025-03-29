import { LinkedinIcon } from "../icons/LinkedinIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";
import { BrainIcon } from "../icons/BrainIcon";
import { useNavigate, useLocation, Link } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { text: "Twitter", icon: <TwitterIcon />, path: "/dashboard/twitter" },
    { text: "Youtube", icon: <YoutubeIcon />, path: "/dashboard/youtube" },
    { text: "Linkedin", icon: <LinkedinIcon />, path: "/dashboard/linkedin" }
  ];

  return (
    <div className="h-screen bg-white border-r w-72 rounded fixed left-0 top-0 p-4">
      <Link to="/dashboard" className="flex text-2xl items-center cursor-pointer">
        <div className="pr-2 text-purple-600">
          <BrainIcon size="lg" />
        </div>
        Second Brain
      </Link>

      <div className="pt-4">
        {items.map(({ text, icon, path }) => (
          <SideBarItem
            key={text}
            text={text}
            icon={icon}
            onClick={() => navigate(path)}
            isActive={location.pathname === path}
          />
        ))}
      </div>
    </div>
  );
}
