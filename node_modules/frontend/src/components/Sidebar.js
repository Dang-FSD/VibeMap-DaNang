import React from 'react';
import { LayoutDashboard, Heart, Settings, HelpCircle, Map as MapIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#0a0f16] border-r border-gray-800 h-screen flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <MapIcon className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-white">VibeMap</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
        <NavItem icon={<Heart size={20}/>} label="Saved Trips" />
        <NavItem icon={<Settings size={20}/>} label="Settings" />
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <NavItem icon={<HelpCircle size={20}/>} label="Help Center" />
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-600/10 text-blue-500' : 'text-gray-400 hover:bg-gray-800/50'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default Sidebar;