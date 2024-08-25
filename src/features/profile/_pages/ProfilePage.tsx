import { useCheckRole } from "@/context/auth-provider";
import { useEffect } from "react";
import CardProfile from "../_components/CardProfile";
import CardUpdatePassword from "../_components/CardUpdatePassword";

const ProfilePage = () => {
  const { checkRole } = useCheckRole();
  useEffect(() => {
    checkRole([]);
  }, []);
  return (
    <div className="container grid grid-cols-1 items-start justify-center gap-4 lg:grid-cols-2">
      <div className="flex h-full w-full items-start justify-center">
        <CardProfile />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <CardUpdatePassword />
      </div>
    </div>
  );
};

export default ProfilePage;
