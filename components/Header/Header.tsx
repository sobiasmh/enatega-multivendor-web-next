import Image from "next/image";
import CartIcon from "../../public/Icons/CartIcon";
import Buttons from "../Button/Button";

const Header = () => {
  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full logo-container">
            <Image
              src="/logo.svg"
              alt="Enatega Logo"
              width={100}
              height={24}
              priority
            />
          </div>{" "}
          {/* Logo */}
          <div className="ml-4 font-bold text-2xl">ENATEGA</div>{" "}
          {/* Brand Name */}
        </div>

        {/* Middle */}
        <div>Navigation Text</div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <a className="text-white hover:text-gray-300">
          <Buttons
            bgcolor="white"
            color="black"
            border="1px solid black"
            text="Login"
            height="44px"
            width="102px"
            radius="30px"
          />
          </a>
          <a className="text-white hover:text-gray-300">
          <Buttons
            bgcolor="#5bc32c"
            color="black"
            text="Sign Up"
            height="44px"
            width="102px"
            radius="30px"
          />
          </a>
          
          <div className="relative">
            <CartIcon />{" "}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
