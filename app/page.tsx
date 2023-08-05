import GoToDashboardButton from "@/components/login/GoToDashboardButton";
import LoginForm from "@/components/login/LoginForm";
import { getAccessToken } from "@/lib/auth/getAccessToken";
import { getMeReq } from "@/lib/auth/getMe";

export default async function Home() {
  let usera;
  const token = await getAccessToken();
  if (!token) {
    console.log("No token found");
  } else {
    try {
      const { user } = await getMeReq(token.value);
      usera = user;
    } catch (err) {}
  }

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      {usera && (
        <div className="flex flex-col items-center">
          <p>Ya estas logueado con {usera.email}</p>
          <GoToDashboardButton />
        </div>
      )}
      {!usera && <LoginForm />}
    </main>
  );
}
