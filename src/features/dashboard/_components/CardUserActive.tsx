import { TypographyP } from "@/components/costum/Typhography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthUserContext } from "@/context/auth-provider";
import { VITE_APP_FILE_SERVER } from "@/data/env";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CardUserActive = () => {
  const admin = useAuthUserContext();

  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full border-2 border-primary">
        <CardHeader>
          <CardTitle>Hello, {admin?.data.name}</CardTitle>
          <CardDescription>Role : {admin?.data.role}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Zoom>
            <img
              src={
                admin?.data.fotoProfile
                  ? `${VITE_APP_FILE_SERVER}/admin/${admin?.data.id}/${admin?.data.fotoProfile}`
                  : `https://ui-avatars.com/api/?name=${admin?.data.name}`
              }
              className="h-auto w-full max-w-sm"
              alt={admin?.data.name}
            />
          </Zoom>
        </CardContent>
        <CardFooter className="flex flex-col items-start justify-center gap-2">
          <TypographyP>Nama : {admin?.data.name}</TypographyP>
          <TypographyP>Email : {admin?.data.email}</TypographyP>
          <TypographyP>Role : {admin?.data.role}</TypographyP>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardUserActive;
