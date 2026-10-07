function Footer() {
  return (
    <footer className="bg-black py-10 text-white">
      <div
        className="
          mx-auto max-w-7xl
          px-4 sm:px-6 lg:px-10
        "
      >
        <div
          className="
            flex flex-col
            items-center
            gap-6
            text-center
            sm:flex-row
            sm:justify-between
            sm:text-left
          "
        >
          <h1 className="text-2xl font-bold">
            CollabConnect
          </h1>

          <div
            className="
              flex flex-wrap
              justify-center
              gap-5
              text-sm
              text-gray-300
              sm:gap-6
              sm:text-base
            "
          >
            <a
              href="/"
              className="transition hover:text-white"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <a
              href="/"
              className="transition hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>

        <div
          className="
            mt-8
            border-t
            border-gray-800
            pt-6
            text-center
            text-sm
            text-gray-400
          "
        >
          © 2026 CollabConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;