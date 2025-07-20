import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
// import Footer from "@/components/Footer";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div>
          <div className="border-t border-b border-stone-200">
            <div className="max-w-[1000px] w-full mx-auto"></div>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
