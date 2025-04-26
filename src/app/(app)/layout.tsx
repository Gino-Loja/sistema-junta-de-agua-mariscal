import { Layout } from "@/components/layout/layout";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import NextTopLoader from 'nextjs-toploader';
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <NextTopLoader />
    <Layout>
      <NuqsAdapter >
        {children}
      </NuqsAdapter>

    </Layout>
  </>
}