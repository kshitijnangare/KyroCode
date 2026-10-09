"use client"

import * as React from "react"
import { Lookout } from "../ui/lookout"
import { useNavigate } from 'react-router-dom';

// Module-level settings + a default export that takes them as props = live controls on 21st.dev.
// Signature knobs first, then the character, then copy.
const settings = {
    lookAwayForPasswords: true,
    followPointer: true,
    startLookingAway: true,
    idleAfter: 8,
    blink: true,
    squareHead: false,
    size: 176,
    useIrisColor: true,
    irisColor: "#6366f1",
    headline: "Welcome back",
}

export default function LoginForm(props) {
    const navigate = useNavigate();

    const s = { ...settings, ...props }
    const formRef = React.useRef(null)
    const [reveal, setReveal] = React.useState(false)
    const [mood, setMood] = React.useState(s.startLookingAway ? "secret" : "auto")
    const [note, setNote] = React.useState(null)
    const live = () => setMood((m) => (m === "secret" ? "auto" : m))

    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const ok = String(data.get("email")).includes("@") && String(data.get("password")).length >= 8
        setMood(ok ? "happy" : "sad")
        setNote(ok ? "Signed in. Redirecting…" : "Use a valid email and at least 8 characters.")
        window.setTimeout(() => {
            setMood("auto")
            setNote(null)
        }, 1800)
    }

    const handleSignupClick = () => {
        navigate('/register')
    }

    const field = "bg-[#0A0A0A] border-[#262626] text-white placeholder:text-zinc-500 focus-visible:ring-zinc-700 h-11 rounded-lg border px-3 text-base font-normal outline-none focus-visible:ring-1 md:text-sm"
    return (
        <div className="bg-background flex min-h-[max(560px,100svh)] w-full items-center justify-center px-6 py-12">
            <div
                onPointerDownCapture={live}
                onFocusCapture={live}
                className="bg-[#171717] text-white border-[#262626] grid w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
            >
                <div className="bg-[#1C1C1C] flex flex-col items-center justify-center gap-6 px-8 py-12">
                    <Lookout
                        shape={s.squareHead ? "square" : "orb"}
                        size={s.size}
                        scope={formRef}
                        follow={s.followPointer ? "both" : "form"}
                        blink={s.blink}
                        lookAwayForPasswords={s.lookAwayForPasswords}
                        idleAfter={s.idleAfter}
                        mood={mood}
                        restGaze={[0.45, 0.1]}
                        irisColor={s.useIrisColor ? s.irisColor : undefined}
                    />
                    {/* <p className="text-muted-foreground max-w-[22ch] text-center text-sm text-pretty">
                        I read along as you type. I won't look at your password.
                    </p> */}
                </div>

                <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col justify-center gap-5 px-8 py-10">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">{s.headline}</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Sign in to continue to Meridian.</p>
                    </div>

                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                        Email/Username
                        <input name="email" type="text" inputMode="email" autoComplete="email" defaultValue="" placeholder="kshitijnangare@kyrocode.com" className={field} />
                    </label>

                    <label className="flex flex-col gap-1.5 text-sm font-medium">
                        Password
                        <span className="relative flex">
                            <input
                                name="password"
                                type={reveal ? "text" : "password"}
                                autoComplete="current-password"
                                defaultValue=""
                                placeholder="password"
                                className={`${field} w-full pr-11`}
                            />
                            <button
                                type="button"
                                id="show-password"
                                data-slot="cta-primary"
                                data-lookout="reveal"
                                aria-label={reveal ? "Hide password" : "Show password"}
                                aria-pressed={reveal}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setReveal((v) => !v)}
                                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 inline-flex w-11 cursor-pointer items-center justify-center rounded-r-md outline-none focus-visible:ring-[3px]"
                            >
                                {reveal ? <EyeOff /> : <Eye />}
                            </button>
                        </span>
                    </label>

                    <div className="flex items-center justify-between text-sm">
                        <label className="text-muted-foreground inline-flex items-center gap-2">
                            <input type="checkbox" name="remember" className="accent-primary size-4" /> Remember me
                        </label>
                        <a href="#reset" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#E5E5E5] text-[#0A0A0A] hover:bg-white focus-visible:ring-zinc-500 inline-flex h-11 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-2 active:scale-[0.99]"
                    >
                        Sign in
                    </button>

                    {/* Footer link */}
                    <p className="text-center text-xs text-zinc-400">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="font-semibold text-white hover:underline cursor-pointer"
                            onClick={handleSignupClick}
                        >
                            Sign Up
                        </button>
                    </p>

                    <p aria-live="polite" className="text-muted-foreground min-h-5 text-sm">
                        {note}
                    </p>
                </form>
            </div>
        </div>
    )
}

function Eye() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function EyeOff() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3l18 18" />
            <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1" />
            <path d="M6.6 6.6A17.9 17.9 0 0 0 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4.3-.9" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </svg>
    )
}