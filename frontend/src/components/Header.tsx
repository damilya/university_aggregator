import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: '#1a2b4a' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-white font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
        >
          UniAggregator
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Rankings
          </Link>
          <span
            className="text-white text-sm font-medium cursor-default opacity-80"
          >
            About
          </span>
        </nav>
      </div>
    </header>
  );
}
