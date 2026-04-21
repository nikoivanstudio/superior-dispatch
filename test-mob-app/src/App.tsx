import {useEffect, useState} from 'react'
import './App.css'

type AuthMode = 'signin' | 'signup'
type Screen = AuthMode | 'profile'

type DriverToken = {
    accessToken: string
    refreshToken: string
    expiredAt: number
}

type DriverProfile = {
    id: number
    name: string
    phone: string
    email: string
    truckCapacity?: number | null
    status: string
}

const STORAGE_KEY = 'driver-auth'

function getScreenFromHash(): AuthMode {
    return window.location.hash === '#/registration' ? 'signup' : 'signin'
}

function setHashForScreen(screen: AuthMode) {
    window.location.hash = screen === 'signup' ? '/registration' : '/login'
}

function parseJwtPayload(token: string): { email?: string } | null {
    try {
        const encodedPayload = token.split('.')[1]

        if (!encodedPayload) {
            return null
        }

        const normalized = encodedPayload.replace(/-/g, '+').replace(/_/g, '/')
        const padded = normalized.padEnd(
            normalized.length + ((4 - (normalized.length % 4)) % 4),
            '=',
        )

        return JSON.parse(window.atob(padded)) as { email?: string }
    } catch {
        return null
    }
}

function readStoredSession(): DriverToken | null {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)

    if (!rawValue) {
        return null
    }

    try {
        const session = JSON.parse(rawValue) as DriverToken

        if (!session.accessToken || !session.refreshToken || !session.expiredAt) {
            return null
        }

        return session
    } catch {
        return null
    }
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(path, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
        },
    })

    if (!response.ok) {
        let message = 'Request failed'

        try {
            const error = (await response.json()) as { message?: string | string[] }

            if (Array.isArray(error.message)) {
                message = error.message.join(', ')
            } else if (error.message) {
                message = error.message
            }
        } catch {
            message = `${response.status} ${response.statusText}`
        }

        throw new Error(message)
    }

    return (await response.json()) as T
}

function ArrowLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M15 5 8 12l7 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
            />
        </svg>
    )
}

function ChevronRightIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="m9 5 7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.25"
            />
        </svg>
    )
}

function LoadsIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M4.5 13.5h2.25l1.5-4.5h7.5l1.5 4.5h2.25"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
            />
            <path
                d="M7.5 13.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm9 0a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
            />
        </svg>
    )
}

function ProfileIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M12 12a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Zm-6 7.5a6 6 0 0 1 12 0"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.9"
            />
        </svg>
    )
}

type AuthScreenProps = {
    mode: AuthMode
    email: string
    password: string
    submitting: boolean
    error: string
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onSubmit: () => void
    onNavigate: (screen: AuthMode) => void
}

function AuthScreen({
                        mode,
                        email,
                        password,
                        submitting,
                        error,
                        onEmailChange,
                        onPasswordChange,
                        onSubmit,
                        onNavigate,
                    }: AuthScreenProps) {
    const isLogin = mode === 'signin'

    return (
        <main className="app-shell">
            <section className="phone-frame">
                <header className="top-bar">
                    <button
                        className="icon-button"
                        type="button"
                        aria-label="Go back"
                        onClick={() => onNavigate(isLogin ? 'signup' : 'signin')}
                    >
                        <ArrowLeftIcon/>
                    </button>
                    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                </header>

                <section className="auth-card">
                    <div className="auth-card__header">
                        <h2>{isLogin ? 'Hello' : 'Create Account'}</h2>
                        <p>
                            {isLogin
                                ? 'Sign into your account'
                                : 'Register your driver account'}
                        </p>
                    </div>

                    <form
                        className="auth-form"
                        onSubmit={(event) => {
                            event.preventDefault()
                            onSubmit()
                        }}
                    >
                        <label className="sr-only" htmlFor={`${mode}-email`}>
                            Email
                        </label>
                        <input
                            id={`${mode}-email`}
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => onEmailChange(event.target.value)}
                        />

                        <label className="sr-only" htmlFor={`${mode}-password`}>
                            Password
                        </label>
                        <input
                            id={`${mode}-password`}
                            type="password"
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            placeholder="Password"
                            value={password}
                            onChange={(event) => onPasswordChange(event.target.value)}
                        />

                        {error ? <p className="form-error">{error}</p> : null}

                        {!isLogin ? (
                            <p className="form-note">
                                Registration calls `signup`, then opens your profile the same way as login.
                            </p>
                        ) : null}

                        <button className="primary-button" type="submit" disabled={submitting}>
                            {submitting
                                ? isLogin
                                    ? 'Logging In...'
                                    : 'Creating...'
                                : isLogin
                                    ? 'Log In'
                                    : 'Sign Up'}
                        </button>
                    </form>
                </section>

                <button className="text-link top-link" type="button">
                    {isLogin ? 'Forgot password?' : 'Already have an account?'}
                </button>

                <button
                    className="text-link bottom-link"
                    type="button"
                    onClick={() => onNavigate(isLogin ? 'signup' : 'signin')}
                >
                    {isLogin ? 'Need help?' : 'Back to login'}
                </button>
            </section>
        </main>
    )
}

type ProfileScreenProps = {
    profile: DriverProfile
    loading: boolean
    error: string
    onRetry: () => void
    onLogout: () => void
}

function ProfileScreen({
                           profile,
                           loading,
                           error,
                           onRetry,
                           onLogout,
                       }: ProfileScreenProps) {
    return (
        <main className="app-shell">
            <section className="phone-frame profile-screen">
                <section className="info-card identity-card">
                    <h2>{profile.name}</h2>

                    <dl className="driver-info">
                        <div>
                            <dt>Email</dt>
                            <dd>{profile.email}</dd>
                        </div>
                        <div>
                            <dt>Phone</dt>
                            <dd>{profile.phone || 'Not Available'}</dd>
                        </div>
                        <div>
                            <dt>Driver&apos;s License Number</dt>
                            <dd className="muted">Not Available</dd>
                        </div>
                    </dl>
                </section>

                <button className="info-card action-card" type="button">
                    <span>Company</span>
                    <ChevronRightIcon/>
                </button>

                <section className="info-card menu-card">
                    <button className="menu-item" type="button">
                        <span>Signature</span>
                        <ChevronRightIcon/>
                    </button>
                    <button className="menu-item" type="button">
                        <span>Settings</span>
                        <ChevronRightIcon/>
                    </button>
                    <button className="menu-item" type="button">
                        <span>Support</span>
                        <ChevronRightIcon/>
                    </button>
                    <button className="menu-item menu-item--danger" type="button" onClick={onLogout}>
                        <span>Log Out</span>
                    </button>
                </section>

                <section className="status-panel">
                    {loading ? <p>Refreshing profile...</p> : null}
                    {!loading && error ? (
                        <div className="status-panel__error">
                            <p>{error}</p>
                            <button className="text-link" type="button" onClick={onRetry}>
                                Retry
                            </button>
                        </div>
                    ) : null}
                    {!loading && !error ? <p>Status: {profile.status}</p> : null}
                </section>

                <nav className="bottom-nav" aria-label="Primary">
                    <button className="nav-item" type="button">
                        <LoadsIcon/>
                        <span>Loads</span>
                    </button>
                    <button className="nav-item nav-item--active" type="button">
                        <ProfileIcon/>
                        <span>Profile</span>
                    </button>
                </nav>
            </section>
        </main>
    )
}

const emptyProfile: DriverProfile = {
    id: 0,
    name: 'Driver profile',
    phone: '',
    email: '',
    truckCapacity: null,
    status: '',
}

function App() {
    const [screen, setScreen] = useState<Screen>(() => getScreenFromHash())
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [session, setSession] = useState<DriverToken | null>(null)
    const [profile, setProfile] = useState<DriverProfile>(emptyProfile)
    const [submitting, setSubmitting] = useState(false)
    const [loadingProfile, setLoadingProfile] = useState(false)
    const [error, setError] = useState('')
    const [profileError, setProfileError] = useState('')
    const authScreen: AuthMode = screen === 'profile' ? 'signin' : screen

    async function loadProfile(nextSession: DriverToken) {
        const authPayload = parseJwtPayload(nextSession.accessToken)
        const profileEmail = authPayload?.email

        if (!profileEmail) {
            throw new Error('Unable to read email from access token')
        }

        setLoadingProfile(true)
        setProfileError('')

        try {
            const nextProfile = await requestJson<DriverProfile>(
                `/drivers/${encodeURIComponent(profileEmail)}`,
                {
                    headers: {
                        Authorization: `Bearer ${nextSession.accessToken}`,
                    },
                },
            )

            setProfile(nextProfile)
            setScreen('profile')
        } catch (loadError) {
            const message =
                loadError instanceof Error ? loadError.message : 'Failed to load profile'
            setProfileError(message)
            throw loadError
        } finally {
            setLoadingProfile(false)
        }
    }

    function persistSession(nextSession: DriverToken) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
        setSession(nextSession)
    }

    function clearSession() {
        window.localStorage.removeItem(STORAGE_KEY)
        setSession(null)
        setProfile(emptyProfile)
        setProfileError('')
        setPassword('')
        setHashForScreen('signin')
        setScreen('signin')
    }

    async function handleAuth(mode: AuthMode) {
        if (!email.trim() || !password.trim()) {
            setError('Enter email and password')
            return
        }

        setSubmitting(true)
        setError('')

        try {
            const nextSession = await requestJson<DriverToken>(`/drivers/${mode}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            })

            persistSession(nextSession)
            await loadProfile(nextSession)
            setPassword('')
        } catch (requestError) {
            const message =
                requestError instanceof Error ? requestError.message : 'Authorization failed'
            setError(message)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        if (!window.location.hash) {
            setHashForScreen('signin')
        }

        function handleHashChange() {
            const nextScreen = getScreenFromHash()
            setError('')
            setScreen((currentScreen) =>
                currentScreen === 'profile' && session ? currentScreen : nextScreen,
            )
        }

        window.addEventListener('hashchange', handleHashChange)

        return () => {
            window.removeEventListener('hashchange', handleHashChange)
        }
    }, [session])

    useEffect(() => {
        const storedSession = readStoredSession()

        if (!storedSession) {
            return
        }

        setSession(storedSession)
        void loadProfile(storedSession).catch(() => {
            clearSession()
        })
    }, [])

    return screen === 'profile' && session ? (
        <ProfileScreen
            profile={profile}
            loading={loadingProfile}
            error={profileError}
            onRetry={() => {
                void loadProfile(session).catch(() => {
                    clearSession()
                })
            }}
            onLogout={clearSession}
        />
    ) : (
        <AuthScreen
            mode={authScreen}
            email={email}
            password={password}
            submitting={submitting}
            error={error}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={() => {
                void handleAuth(authScreen)
            }}
            onNavigate={(nextScreen) => {
                setError('')
                setHashForScreen(nextScreen)
                setScreen(nextScreen)
            }}
        />
    )
}

export default App
