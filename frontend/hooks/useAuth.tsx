/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/lib/supabase";
import {
    SignupInput,
    SigninInput,
    signupSchema,
    signinSchema,
} from "@/lib/auth";
import { useError } from "@/contexts/ErrorContext";
import { useLoading } from "@/contexts/LoadingContext";
import { z, ZodError } from "zod";

export type OAuthProviders = "google" | "github" | "discord";

export const useAuth = () => {
    const { addError } = useError();
    const { setIsLoading } = useLoading();

    async function signup(data: SignupInput) {
        setIsLoading(true);

        try {
            const validatedData = signupSchema.safeParse(data);

            if (!validatedData.success) {
                throw new ZodError(validatedData.error.issues);
            }

            const { data: authData, error: authError } =
                await supabase.auth.signUp({
                    email: validatedData.data.email,
                    password: validatedData.data.password,
                });

            if (authError) throw authError;

            

            return authData;
        } catch (err) {
            if (err instanceof ZodError) {
                const flatErrFields = z.flattenError(err);

                Object.entries(flatErrFields.fieldErrors).forEach(
                    ([_, errors]) => {
                        if (errors instanceof Array) {
                            errors.forEach((err) => {
                                addError(err);
                            });
                        }
                    }
                );
            } else {
                addError(
                    err instanceof Error ? err.message : "An error occurred."
                );
            }

            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    async function signin(data: SigninInput) {
        setIsLoading(true);

        try {
            const validatedData = signinSchema.safeParse(data);

            if (!validatedData.success) {
                throw new ZodError(validatedData.error.issues);
            }

            const { data: authData, error: authError } =
                await supabase.auth.signInWithPassword({
                    email: data.email,
                    password: data.password,
                });

            if (authError) throw authError;

            return authData;
        } catch (err) {
            if (err instanceof ZodError) {
                const flatErrFields = z.flattenError(err);

                Object.entries(flatErrFields.fieldErrors).forEach(
                    ([_, errors]) => {
                        if (errors instanceof Array) {
                            errors.forEach((err) => {
                                addError(err);
                            });
                        }
                    }
                );
            } else {
                addError(
                    err instanceof Error ? err.message : "An error occurred."
                );
            }

            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    async function signinWithOAuth(provider: OAuthProviders) {
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            return data;
        } catch (err) {
            addError(
                err instanceof Error ? err.message : "OAuth sign-in failed."
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    // TODO: Add Zod validation for the following functions

    async function updateDisplayName(displayName: string) {
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    display_name: displayName,
                },
            });

            if (error) throw error;
        } catch (err) {
            addError(
                err instanceof Error
                    ? err.message
                    : "Failed to update display name."
            );
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    async function updatePhone(phone: string) {
        setIsLoading(true);
    }

    async function updateEmail(email: string) {
        setIsLoading(true);
    }

    async function updatePassword(password: string) {
        setIsLoading(true);
    }

    return {
        signup,
        signin,
        signinWithOAuth,
    };
};
