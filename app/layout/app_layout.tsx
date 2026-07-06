"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./sidebar";
import Header from "./header";
import { useState, useEffect } from "react";
import AuthView from "../auth/page";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTiktokAuthenticated, setIsTiktokAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("tk_access_token");
      return !!accessToken;
    }
    return false;
  });

  interface TikTokUser {
    username: string;
    display_name: string;
    avatar_url: string;
  }

  const [tiktokUser, setTiktokUser] = useState<TikTokUser | null>(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem("tk_user_username");
      const display_name = localStorage.getItem("tk_user_display_name");
      const avatar_url = localStorage.getItem("tk_user_avatar_url");
      if (username) {
        return { username, display_name: display_name || "", avatar_url: avatar_url || "" };
      }
    }
    return null;
  });

  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [authView, setAuthView] = useState<'landing' | 'login' | 'signup'>('landing');

  async function fetchUserInfo() {
    try {
      const res = await fetch("/api/tiktok/user-info");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          localStorage.setItem("tk_user_username", data.username || "");
          localStorage.setItem("tk_user_display_name", data.display_name || "");
          localStorage.setItem("tk_user_avatar_url", data.avatar_url || "");
          setTiktokUser({
            username: data.username || "",
            display_name: data.display_name || "",
            avatar_url: data.avatar_url || "",
          });
        }
      }
    } catch (err) {
      console.error("Failed fetching detailed user info:", err);
    }
  }

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/tiktok/check-auth");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            localStorage.setItem("tk_access_token", "true");
            setIsTiktokAuthenticated(true);
            if (data.user) {
              localStorage.setItem("tk_user_username", data.user.username || "");
              localStorage.setItem("tk_user_display_name", data.user.display_name || "");
              localStorage.setItem("tk_user_avatar_url", data.user.avatar_url || "");
              setTiktokUser({
                username: data.user.username || "",
                display_name: data.user.display_name || "",
                avatar_url: data.user.avatar_url || "",
              });
            } else {
              fetchUserInfo();
            }
          } else {
            localStorage.removeItem("tk_access_token");
            localStorage.removeItem("potongin_user_name");
            localStorage.removeItem("tk_user_username");
            localStorage.removeItem("tk_user_display_name");
            localStorage.removeItem("tk_user_avatar_url");
            setTiktokUser(null);
            setIsTiktokAuthenticated(false);
          }
        } else {
          localStorage.removeItem("tk_access_token");
          localStorage.removeItem("potongin_user_name");
          localStorage.removeItem("tk_user_username");
          localStorage.removeItem("tk_user_display_name");
          localStorage.removeItem("tk_user_avatar_url");
          setTiktokUser(null);
          setIsTiktokAuthenticated(false);
        }
      } catch (err) {
        console.error("Failed to check auth status:", err);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        localStorage.setItem("tk_access_token", "true");
        setIsTiktokAuthenticated(true);
        setAuthView('landing');
        fetchUserInfo();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const activePage =
    pathname === "/" ? "/dashboard" : pathname;

  function handlePageChange(page: string) {
    router.push(page);
  }

  const handleLogout = () => {
    localStorage.removeItem("tk_access_token");
    localStorage.removeItem("potongin_user_name");
    localStorage.removeItem("tk_user_username");
    localStorage.removeItem("tk_user_display_name");
    localStorage.removeItem("tk_user_avatar_url");
    setTiktokUser(null);
    
    // Clear cookies as well
    fetch("/api/tiktok/check-auth?logout=true").then(() => {
      // Just to call a trigger or we can ignore
    }).catch(() => null);

    setIsTiktokAuthenticated(false);
    router.push("/");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen text-white font-sans antialiased flex flex-col justify-center items-center bg-[#020617]">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#06b6d4]/10 blur-[120px]" />
        </div>
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#8b5cf6]/20 border-t-[#8b5cf6] rounded-full animate-spin mb-4" />
          <p className="text-[#cbc3d7] text-sm font-medium tracking-wide">Memverifikasi login TikTok...</p>
        </div>
      </div>
    );
  }

  if (!isTiktokAuthenticated) {
    return (
      <AuthView
        initialMode={authView === 'login' ? 'login' : 'signup'}
        onSuccess={() => {
          setIsTiktokAuthenticated(true);
          setAuthView('landing');
        }}
        onBackToLanding={() => setAuthView('landing')}
      />
    )
  }

  return (
    <div className="min-h-screen text-white font-sans antialiased flex bg-background-dark">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#06b6d4]/10 blur-[120px]" />
      </div>

      <Sidebar
        activePage={activePage}
        onPageChange={handlePageChange}
        plan="Free"
        onNewProject={() => { }}
        onLogout={handleLogout}
        tiktokUser={tiktokUser}
      />

      <div className="flex-grow pl-[280px] flex flex-col min-h-screen">
        <Header
          activePage={activePage}
          onPageChange={handlePageChange}
          onExportClick={() => handlePageChange("/export")}
        />

        {children}
      </div>
    </div>
  );
}