"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submittedEmail = String(formData.get("email") ?? "").trim();
    const submittedPassword = String(formData.get("password") ?? "");
    const nextErrors: typeof errors = {};

    if (!submittedEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@gmail\.com$/i.test(submittedEmail)) {
      nextErrors.email = "Use a valid Gmail address ending in @gmail.com.";
    }

    if (submittedPassword.length <= 6) {
      nextErrors.password = "Your password must be more than 6 characters.";
    }

    setEmail(submittedEmail);
    setPassword(submittedPassword);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      router.push("/notes");
    }
  }

  return (
    <main className="login-page">
      <div className="login-art" aria-hidden="true">
        <div className="art-topline">
          <span className="brand-mark">m</span>
          <span>MORROW</span>
        </div>
        <div className="art-copy">
          <span className="eyebrow">A LITTLE SPACE FOR YOU</span>
          <h1>
            Make room
            <br />
            for your thoughts.
          </h1>
          <p>
            Collect the little things, untangle the big ones, and find your
            way back to what matters.
          </p>
        </div>
        <div className="art-note">
          <span className="note-sparkle">✳</span>
          <p>“The secret of getting ahead is getting started.”</p>
          <span className="note-author">MARK TWAIN</span>
        </div>
        <span className="art-decoration decoration-one" />
        <span className="art-decoration decoration-two" />
      </div>

      <section className="login-panel">
        <div className="mobile-brand">
          <span className="brand-mark">m</span>
          <span>MORROW</span>
        </div>
        <div className="login-content">
          <span className="eyebrow login-eyebrow">WELCOME BACK</span>
          <h2>Pick up where<br className="desktop-break" /> you left off.</h2>
          <p className="login-intro">
            Sign in to your own little corner of calm.
          </p>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="field-error" id="email-error" role="alert">
                {errors.email}
              </p>
            )}

            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <span>More than 6 characters</span>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p className="field-error" id="password-error" role="alert">
                {errors.password}
              </p>
            )}

            <button className="submit-button" type="submit">
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="form-footnote">
            New here? <span>Your notes are waiting to be written.</span>
          </p>
        </div>
        <p className="panel-footer">A softer place to land, every day.</p>
      </section>
    </main>
  );
}