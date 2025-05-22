'use client';

import Image from 'next/image';

const menuItems = [
  {
    label: 'Dashboard',
  },
  {
    label: 'Users',
  },
  {
    label: 'Settings',
  },
];

function Siderbar() {
  return (
    <aside className="w-[220px]">
      <div className="p-4">
        <Image height={22} width={77} src="/logo.svg" alt="Sidebar Logo" />
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label} className="p-2 hover:bg-gray-700">
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Siderbar;
