function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-svh sm:h-svh sm:overflow-hidden">
      {children}
    </div>
  );
}

export default DashboardLayout;
