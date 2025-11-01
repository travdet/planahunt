import "./globals.css";

export const metadata = { title: "Plan A Hunt (GA)", description: "Georgia Public Land Planner" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-parkGreen text-parkPaper">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-3">
            <img src="/logo.svg" alt="Plan A Hunt" className="h-8 w-auto"/>
            <nav className="ml-6 flex gap-4 text-parkPaper/90">
              <a href="/" className="hover:underline">Browse</a>
              <a href="/map" className="hover:underline">Map</a>
            </nav>
            <div className="ml-auto text-sm opacity-80">Georgia Public Land Planner</div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
