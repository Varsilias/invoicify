import logo from "../../assets/logo-secondary.svg";
import profileIcon from "../../assets/profile-icon.png";
import { useTheme } from "../../context/ThemeContext";
import { DarkThemeIcon, LightThemeIcon } from "../icons";

const Navbar = () => {
  const { dark, toggle } = useTheme();

  return (
    <div className="bg-[#373B53] flex items-center w-full lg:hidden">
      <div className="logo flex justify-start items-center grow">
        <div className="px-[22px] py-[23px] bg-gradient-to-b from-[#7C5DFA] to-[#9277FF] rounded-tr-3xl rounded-br-3xl">
          <img src={logo} alt="invoicify-logo" />
        </div>
      </div>

      <div
        className="theme-toggle cursor-pointer px-6"
        onClick={(e) => toggle(e)}
      >
        {dark ? <LightThemeIcon /> : <DarkThemeIcon />}
      </div>

      <div className="divider w-[2px] h-[72px] bg-[#494E6E]"></div>

      <div className="profile_icon px-6">
        <div className="h-8 w-8 rounded-full cursor-pointer">
          <img src={profileIcon} alt="profile picture" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
