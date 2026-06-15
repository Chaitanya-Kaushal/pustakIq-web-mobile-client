"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpenCheck, BookOpen, GraduationCap, Store, ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { GoogleIcon } from "@/components/icons/google";
import { useAuth } from "@/components/auth-provider";

const chips = [
  { icon: BookOpen, label: "Books", className: "bg-primary-soft text-primary" },
  { icon: GraduationCap, label: "Tutors", className: "bg-secondary-soft text-secondary" },
  { icon: Store, label: "Stores", className: "bg-accent-soft text-accent" },
];

export default function LoginPage() {
  const router = useRouter();
  const { user, ready, requestOtp, verifyOtp, signInWithGoogle } = useAuth();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState<"otp" | "verify" | "google" | null>(null);
  // Where to land after login — honours ?next=… (e.g. when gated from "Sell a Book").
  const [next, setNext] = useState("/account");

  useEffect(() => {
    const target = new URLSearchParams(window.location.search).get("next");
    if (target && target.startsWith("/")) setNext(target);
  }, []);

  // Already signed in → skip the form
  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, router, next]);

  const phoneValid = mobile.length === 10;
  const codeValid = code.length === 6;

  const onContinue = async () => {
    if (!phoneValid) return;
    setLoading("otp");
    await requestOtp(`+91${mobile}`);
    setLoading(null);
    setStep("otp");
  };

  const onVerify = async () => {
    if (!codeValid) return;
    setLoading("verify");
    await verifyOtp(`+91${mobile}`, code);
    router.replace(next);
  };

  const onGoogle = async () => {
    setLoading("google");
    await signInWithGoogle();
    router.replace(next);
  };

  return (
    <Container>
      <div className="mx-auto max-w-md py-16">
        <div className="rounded-card border border-line bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
              <BookOpenCheck className="size-7" />
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink">
              {step === "phone" ? "Welcome back 👋" : "Verify your number"}
            </h1>
            <p className="mt-1 text-ink-soft">
              {step === "phone"
                ? "India's education community platform"
                : `Enter the 6-digit code sent to +91 ${mobile}`}
            </p>
          </div>

          {step === "phone" ? (
            <div className="mt-8 flex flex-col gap-4">
              <Field label="Mobile Number" htmlFor="mobile">
                <div className="flex items-stretch gap-2">
                  <span className="inline-flex items-center rounded-btn border border-line bg-surface-soft px-3 text-sm font-semibold text-ink-soft">
                    +91
                  </span>
                  <Input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) =>
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                  />
                </div>
              </Field>

              <Button size="lg" disabled={!phoneValid || loading === "otp"} onClick={onContinue}>
                {loading === "otp" ? "Sending OTP…" : "Continue with Mobile Number"}
              </Button>

              <div className="flex items-center gap-3 py-1">
                <span className="h-px flex-1 bg-line" />
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
                  or
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <Button
                variant="secondary"
                size="lg"
                onClick={onGoogle}
                disabled={loading === "google"}
              >
                <GoogleIcon className="size-5" />
                {loading === "google" ? "Signing in…" : "Continue with Google"}
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              <Field label="6-digit code" htmlFor="otp" hint="Demo: enter any 6 digits.">
                <Input
                  id="otp"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  placeholder="••••••"
                  className="text-center text-lg tracking-[0.5em]"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                />
              </Field>

              <Button size="lg" disabled={!codeValid || loading === "verify"} onClick={onVerify}>
                {loading === "verify" ? "Verifying…" : "Verify & Continue"}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                }}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-primary"
              >
                <ArrowLeft className="size-4" /> Change number
              </button>
            </div>
          )}

          {step === "phone" && (
            <div className="mt-8 grid grid-cols-3 gap-3">
              {chips.map(({ icon: Icon, label, className }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-card border border-line bg-surface-muted px-2 py-3 text-center"
                >
                  <span
                    className={`inline-flex size-9 items-center justify-center rounded-full ${className}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">{label}</span>
                </div>
              ))}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-ink-faint">
            By continuing you agree to our{" "}
            <span className="font-semibold text-ink-soft">Terms</span> and{" "}
            <span className="font-semibold text-ink-soft">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </Container>
  );
}
