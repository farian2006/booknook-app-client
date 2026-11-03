"use client";
import { cn } from "cn";
import { authClient } from "../../lib/auth-client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });

    if (data) {
      toast.success("Account Created Successfully!!");
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className={cn("flex flex-col gap-4")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl flex justify-center items-center gap-0.5">
              Welcome To
              <Image
                src="/assests/logo.png"
                alt="BookNook Logo"
                width={150}
                height={100}
              />
            </CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSignUp}>
              <FieldGroup>
                <Field className="flex justify-center gap-4">
                  <Button variant="outline" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card flex justify-center ">
                  Or continue with
                </FieldSeparator>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">ImageURL </FieldLabel>
                  <Input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    required
                  />
                </Field>
                <Field className="flex flex-col items-center gap-2">
                  <Button type="submit" className="w-2xs p-5" variant="default">
                    Register
                  </Button>
                  <FieldDescription className="text-center">
                    Have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                      Log In
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
