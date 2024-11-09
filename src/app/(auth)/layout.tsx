import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}