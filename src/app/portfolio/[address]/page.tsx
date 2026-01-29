import Content from "./_components/content";
import { TokensDataProvider } from "./_components/context";

export default async function portfolioPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  return (
    <TokensDataProvider address={address}>
      <Content />
    </TokensDataProvider>
  );
}
