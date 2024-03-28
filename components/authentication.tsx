"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";

interface AuthenticationProps {
  signin?: boolean;
}

const Authentication: React.FC<AuthenticationProps> = ({ signin }) => {
  const router = useRouter();

  const authenticationText = signin ? "Sign in" : "Sign up";

  return (
    <>
      <div className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center justify-between gap-10 px-8 py-4 mt-1">
          <div>
            <Link href="/" className="text-2xl">
              Unfind
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-6">
        <div className="border rounded-md w-[80%] md:w-[50%] lg:w-[40%]">
          <div className="flex flex-col px-6 py-10">
            <div className="pb-6">
              <Heading title="Welcome Back" />
              <p>Join the world{"'"}s largest community of freelancers</p>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email..."
                className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1"
              />
              <Input
                type="password"
                placeholder="Password..."
                className="focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1"
              />
              <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember-me" />
                  <label
                    htmlFor="remember-me"
                    className="font-bold cursor-pointer text-sm"
                  >
                    Remember for 30 days
                  </label>
                </div>
                {signin && (
                  <p className="font-bold cursor-pointer text-sm underline">
                    Forgot Password?
                  </p>
                )}
              </div>
              <Button>{authenticationText}</Button>
            </div>

            <div className="text-center py-6 text-sm font-bold flex items-center gap-2">
              <div className="h-[1px] w-full bg-gray-200"></div>
              <div>Or</div>
              <div className="h-[1px] w-full bg-gray-200"></div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() => signIn("google")}
                className="flex w-full gap-2"
              >
                <Icon icon={FcGoogle} />
                {authenticationText} with Google
              </Button>
              <Button
                variant="outline"
                onClick={() => signIn("github")}
                className="flex w-full gap-2"
              >
                <Icon icon={AiFillGithub} />
                {authenticationText} with Github
              </Button>
            </div>
            <div className="flex justify-center items-center gap-2 rounded-full px-4 py-2 mt-6">
              {signin ? (
                <>
                  <div>Don{"'"}t Have an account?</div>{" "}
                  <div
                    className="font-bold cursor-pointer text-sm"
                    onClick={() => router.push("/users/sign-up")}
                  >
                    Sign Up
                  </div>
                </>
              ) : (
                <>
                  <div>Already Have an account?</div>{" "}
                  <div
                    className="font-bold cursor-pointer text-sm"
                    onClick={() => router.push("/users/sign-in")}
                  >
                    Sign In
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;
