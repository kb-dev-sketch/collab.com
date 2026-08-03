function Footer() {
  return (
    <footer className="bg-black py-10 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-10">

        <h1 className="text-2xl font-bold">
          CollabConnect
        </h1>

        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="/">Contact</a>
        </div>

      </div>

      <p className="mt-6 text-center text-gray-400">
        © 2026 CollabConnect. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;