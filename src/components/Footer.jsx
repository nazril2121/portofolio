import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscAccount size={18} />, label: "About Me", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscArchive size={18} />, label: "Project", onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <div className="mt-32 pb-8 flex flex-col items-center relative z-10">
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6">
        
        {/* Judul */}
        <h1 className="text-2xl font-bold order-1 md:order-none">
          My social media
        </h1>

        {/* Ikon Sosmed */}
        <div className="flex gap-3 order-2 md:order-none">
          <a href="https://www.behance.net/nazrilabizar1">
            <i className="ri-behance-fill ri-2x"></i>
          </a>
          <a href="https://www.instagram.com/abizarsocrates/">
            <i className="ri-instagram-fill ri-2x"></i>
          </a>
          <a href="https://www.tiktok.com/@nazrilabz">
            <i className="ri-tiktok-fill ri-2x"></i>
          </a>
        </div>

        {/* Dock */}
        <div className="order-3 md:order-none mt-15 md:mt-0 md:mb-0">
          <Dock 
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={100}
          />
        </div>

      </div>
    </div>
  );
};

export default Footer;
