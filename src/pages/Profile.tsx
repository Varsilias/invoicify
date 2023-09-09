import MainLayout from "../components/layouts/MainLayout";
import ProfilePage from "../components/modules/User/ProfilePage";
import TopBar from "../components/general/TopBar";

const Profile = () => {
  return (
    <MainLayout>
      <div className="my-8">
        <TopBar isMainPage={false} />
      </div>
      <div>
        <ProfilePage />
      </div>
    </MainLayout>
  );
};

export default Profile;
