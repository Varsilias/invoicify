import MainLayout from "../components/layouts/MainLayout";
import ProfilePage from "../components/modules/User/ProfilePage";
import TopBar from "../components/general/TopBar";
import PrimaryButton from "../components/general/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Toast } from "../components/general/toast/Toast";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("invoicify_token");
    setTimeout(() => {
      toast(<Toast type="success">{`Logout successful`}</Toast>);
      setLoading(false);
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="my-8 flex justify-between">
        <div>
          <TopBar isMainPage={false} />
        </div>
        <div>
          <PrimaryButton
            className="whitespace-nowrap rounded-3xl cursor-pointer px-6 py-4 text-white bg-invoicify-01"
            onClick={handleLogout}
            isLoading={loading}
          >
            Logout
          </PrimaryButton>
        </div>
      </div>
      <div>
        <ProfilePage />
      </div>
    </MainLayout>
  );
};

export default Profile;
