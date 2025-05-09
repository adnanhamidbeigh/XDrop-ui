import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-md border-b border-gray-200">
      {/* Left side - XDrop Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
          XDrop
        </Link>
      </div>

      {/* Center - GitHub Icon */}
      <div className="flex items-center">
        <Link 
          href="https://github.com/adnanhamidbeigh" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-700"
        >
          <FaGithub className="h-6 w-6" />
        </Link>
      </div>

      {/* Right side - Connect Button */}
      <div className="flex items-center">
        <ConnectButton 
          accountStatus="address"
          chainStatus="icon"
          showBalance={false}
        />
      </div>
    </nav>
  );
}