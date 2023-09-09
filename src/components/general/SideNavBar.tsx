import logo from "../../assets/logo-secondary.svg";
import profileIcon from "../../assets/profile-icon.png";
import { useTheme } from "../../context/ThemeContext";
import { DarkThemeIcon, LightThemeIcon } from "../icons";
import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="bg-[#373B53] h-screen rounded-tr-3xl rounded-br-3xl relative">
      <div className="logo flex justify-start items-center grow w-full">
        <div className="px-[22px] py-[26px] bg-gradient-to-b from-[#7C5DFA] to-[#9277FF] rounded-tr-3xl rounded-br-3xl">
          <img src={logo} alt="invoicify-logo" />
        </div>
      </div>

      <div className="absolute space-y-5 bottom-6">
        <div
          className="theme-toggle cursor-pointer px-8"
          onClick={(e) => toggle(e)}
        >
          {dark ? <LightThemeIcon /> : <DarkThemeIcon />}
        </div>

        <div className="divider w-[72px] h-[2px] bg-[#494E6E]"></div>

        <div className="profile_icon px-5">
          <div
            className="h-8 w-8 rounded-full cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <img src={profileIcon} alt="profile picture" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
