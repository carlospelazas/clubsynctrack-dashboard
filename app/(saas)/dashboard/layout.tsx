export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <header>navigation</header>
      {children}
    </main>
  );
}
