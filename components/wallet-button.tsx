"use client";

import dynamic from "next/dynamic";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const WalletMultiButtonDynamic = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function ClientWalletMultiButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button asChild>
      <WalletMultiButtonDynamic />
    </Button>
  );
}
