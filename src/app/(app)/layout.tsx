import { Layout } from "@/components/layout/layout";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NuqsAdapter>
    <Layout>
      {children}

    </Layout>
  </NuqsAdapter>




}