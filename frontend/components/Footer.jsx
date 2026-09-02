import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--foreground)] opacity-80">
        <div className="mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} AgriHelp. Empowering small-scale farmers.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
