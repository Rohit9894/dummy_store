import Login from "@/components/Login";
import SignUp from "@/components/SignUp";



import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Auth() {
  return (
    <div className="flex items-center justify-center bg-[url('./images/Auth_background.jpg')] bg-cover bg-bottom  h-screen">
      <Tabs defaultValue="login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">SignUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
