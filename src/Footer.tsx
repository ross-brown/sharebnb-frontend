import { CgWebsite } from "react-icons/cg";
import { FaLinkedin } from "react-icons/fa";
import { VscGithubInverted } from "react-icons/vsc";


function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl	px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:order-2 space-x-5">
          <a href="https://github.com/ross-brown" className="text-gray-500">
            <VscGithubInverted className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com/in/ross-brown-/" className="text-gray-500">
            <FaLinkedin className="h-6 w-6" />
          </a>
          <a href="https://rossbrowndev.com" className="text-gray-500">
            <CgWebsite className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-600">
            © {new Date().getFullYear()} ShareBnB. Built by Ross Brown and Chris Alley.
          </p>
        </div>
      </div>
    </footer>
  );
}


export default Footer;
