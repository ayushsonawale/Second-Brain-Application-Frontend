export function SideBarItem({ text, icon, onClick, isActive }: any) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center p-3 cursor-pointer rounded-lg ${
          isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
        }`}
      >
        <div className="pr-2">{icon}</div>
        {text}
      </div>
    );
  }
  