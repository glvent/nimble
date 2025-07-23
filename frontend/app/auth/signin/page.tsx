"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
    FaArrowRight,
    FaDiscord,
    FaEye,
    FaEyeSlash,
    FaGithub,
    FaGoogle,
} from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { signin, signinWithOAuth } = useAuth();

    return (
        <div>
            <Card className="w-full max-w-md mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="mr-auto">Welcome back.</CardTitle>
                        <Link
                            href="/auth/signup"
                            className="text-xs text-muted-foreground hover:text-primary hover:underline flex items-center gap-1 group"
                        >
                            <span>Sign up</span>
                            <FaArrowRight className="h-max w-max group-hover:animate-[bounceLR_1.0s_ease-in-out_infinite] transition-transform" />
                        </Link>
                    </div>
                    <CardDescription>
                        Sign in to your account to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            signin({ email, password });
                        }}
                    >
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="example@nimble.com"
                                autoComplete="new-email"
                                required
                                className="placeholder:text-xs"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={
                                        showPassword
                                            ? "Example123!"
                                            : "********"
                                    }
                                    autoComplete="new-password"
                                    required
                                    className="placeholder:text-xs"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                            Having trouble?{" "}
                            <Link
                                href="/auth/reset-password"
                                className="text-primary hover:underline"
                            >
                                Reset password
                            </Link>{" "}
                            or{" "}
                            <Link
                                href="/contact"
                                className="text-primary hover:underline"
                            >
                                Contact support
                            </Link>
                            {"."}
                        </span>
                        <Button className="w-full" type="submit">
                            Sign in
                        </Button>
                    </form>
                    <div className="mt-8 flex items-center justify-center">
                        <hr className="w-full" />
                        <p className="flex text-xs text-muted-foreground absolute bg-card px-2 rounded-full">
                            Or continue with:
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => signinWithOAuth("google")}
                            type="button"
                        >
                            <FaGoogle className="text-[#DB4437]" />
                            <span className="text-sm">Google</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signinWithOAuth("github")}
                            type="button"
                        >
                            <FaGithub className="text-[#181717]" />
                            <span className="text-sm">GitHub</span>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signinWithOAuth("discord")}
                            type="button"
                        >
                            <FaDiscord className="text-[#5865F2]" />
                            <span className="text-sm">Discord</span>
                        </Button>
                    </div>
                    <span className="text-xs text-muted-foreground mt-4">
                        By continuing, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="text-primary hover:underline"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="text-primary hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}
