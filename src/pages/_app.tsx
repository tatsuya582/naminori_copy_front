import DefaultLayout from "@/layouts/DefaultLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
      <Toaster richColors position="top-right" />
    </DefaultLayout>
  );
}
