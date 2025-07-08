/* src/components/Sidebar/Sidebar.jsx */
import {
  ChevronFirst,
  ChevronLast,
  Home,
  ListChecks,
  FileText,
  Code,
  Briefcase,
  User,
  Mail,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  const section1 = [
    { icon: <ListChecks size={24} />, text: "Arithmetic Aptitude", to: "/arithmetic" },
    { icon: <FileText size={24} />, text: "Data Interpretation", to: "/data-interpretation" },
    { icon: <Code size={24} />, text: "Verbal Ability", to: "/verbal-ability" },
    { icon: <Briefcase size={24} />, text: "Logical Reasoning", to: "/logical-reasoning" },
    { icon: <User size={24} />, text: "Verbal Reasoning", to: "/verbal-reasoning" },
    { icon: <Mail size={24} />, text: "Nonverbal Reasoning", to: "/nonverbal-reasoning" },
  ];

  const section2 = [
    { icon: <Code size={24} />, text: "DSA Sheets", to: "/dsa-sheets" },
    { icon: <FileText size={24} />, text: "DSA Practice", to: "/dsa-tracker" },
  ];

  const section3 = [
    { icon: <Briefcase size={24} />, text: "Jobs", to: "/jobs" },
    { icon: <User size={24} />, text: "Profile", to: "/profile" },
    { icon: <Mail size={24} />, text: "Contact Us", to: "/contact-us" },
  ];

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside className={`h-screen bg-gray-50 transition-all duration-300 flex flex-col shadow-xl rounded-r-xl overflow-hidden ${expanded ? "w-64" : "w-20"}`}>
        {/* Top Section: Logo above name, toggle on right */}
        <div className="flex items-start p-4 relative">
          <div className="flex flex-col items-center">
            <img src={logo} alt="Corporate" className="w-23 h-23 object-contain mb-2" />
            {expanded && (
              <span className="text-4xl font-bold text-gray-800 px-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                  C
                </span>
                orporate
              </span>
            )}
          </div>
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 text-gray-600"
          >
            {expanded ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        {/* Dashboard */}
        <ul className="px-2">
          <SidebarItem icon={<Home size={24} />} text="Dashboard" to="/dashboard" />
        </ul>

        {/* Sections */}
        <div className="flex-1 overflow-y-auto px-1">
          {[
            { title: "Aptitude", items: section1 },
            { title: "Coding & Interviews", items: section2 },
            { title: "More", items: section3 },
          ].map((sec, idx) => (
            <div key={idx} className="mt-6">
              {expanded && (
                <h3 className="px-4 mb-2 text-sm font-semibold text-gray-500 uppercase">
                  {sec.title}
                </h3>
              )}
              <ul className="space-y-1">
                {sec.items.map(item => (
                  <SidebarItem key={item.text} icon={item.icon} text={item.text} to={item.to} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center ${
          expanded ? 'gap-3 justify-start px-4 py-3' : 'justify-center py-4'
        } rounded-lg transition-all duration-200 cursor-pointer group relative text-gray-700 hover:bg-blue-100`}
      >
        <div className="text-gray-600 group-hover:text-blue-600">{icon}</div>
        <span
          className={`font-medium text-lg overflow-hidden transition-all duration-200 ${
            expanded ? 'opacity-100' : 'opacity-0 w-0'
          }`}
        >
          {text}
        </span>
        {!expanded && (
          <div
            className="absolute left-full ml-2 px-2 py-1 bg-white text-gray-800 text-sm rounded shadow opacity-0 group-hover:opacity-100 transition z-10 whitespace-nowrap"
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}
