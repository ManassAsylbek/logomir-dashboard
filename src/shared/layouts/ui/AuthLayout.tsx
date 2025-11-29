const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 flex px-4 py-12">
        <section className="w-full max-w-[556px] m-auto bg-white rounded-2xl p-8 shadow">
          {children}
        </section>
      </main>
    </div>
  );
};
export default AuthLayout;
