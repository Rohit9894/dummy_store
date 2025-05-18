import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/auth.slice";


function Login() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.auth.loading);
  async function formSubmit(data) {
    dispatch(loginUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/", { replace: true }); // ✅ here
      }
    });
  }

  return (
    <Card className="bg-white/30 backdrop-blur-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Log in for seamless access to your orders, wishlist, and tailored
          recommendations.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(formSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Eamil</Label>
            <Input
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
              })}
              id="email"
            />
            <span className="text-destructive text-sm">
              {errors.email?.message}
            </span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be more than 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
              })}
              id="password"
            />
            <span className="text-destructive text-sm">
              {errors.password?.message}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} className="w-full">
            Create Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default Login;
