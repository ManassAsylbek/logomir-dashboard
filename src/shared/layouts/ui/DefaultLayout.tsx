import Sidebar from "@/widgets/Sidebar/ui/Sidebar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-full h-full bg-green-50">
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
