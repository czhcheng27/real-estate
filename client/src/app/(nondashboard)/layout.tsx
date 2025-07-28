"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuthUserQuery } from "@/state/api";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname === "/")
      ) {
        router.push("/managers/properties", { scroll: false });
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;

  return (
    <div>
      <Navbar />
      <main className={`h-full flex w-full flex-col pt-[${NAVBAR_HEIGHT}px]`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
