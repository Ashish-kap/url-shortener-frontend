// import { useEffect, useState } from "react";
// import { useApi } from "@/hooks/use-api";
// import { UrlForm } from "@/components/url-form";
// import { UrlHistory } from "@/components/url-history";
// import { toast } from "sonner";
// import type { PaginatedUrls } from "./types/url";

// const ITEMS_PER_PAGE = 10;

// const App = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [historyData, setHistoryData] = useState<PaginatedUrls>();
//   const { apiState, fetchUrls, createShortUrl } = useApi();
//   const [reload,setReload] = useState(false)

//   const loadHistory = async (page: number) => {
//     const data = await fetchUrls(page, ITEMS_PER_PAGE);
//     if (data) setHistoryData(data);
//   };

//   useEffect(() => {
//     loadHistory(currentPage);
//   }, [currentPage,reload]);

//   const handleSubmit = async (values: { url: string }) => {
//     const result = await createShortUrl(values.url);
//     if (result) {
//       toast("URL shortened!", {
//         description: "Your short URL has been created successfully",
//       });
//       setCurrentPage(1);
//       setReload((prev) => !prev);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-8">
//       <div className="space-y-8">
//         <h1 className="text-3xl font-bold text-center">URL Shortener</h1>
//         <UrlForm onSubmit={handleSubmit} isSubmitting={apiState.loading} />
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">History</h2>
//           <UrlHistory
//             data={historyData}
//             currentPage={currentPage}
//             itemsPerPage={ITEMS_PER_PAGE}
//             isLoading={apiState.loading}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import { UrlForm } from "@/components/url-form";
import { UrlHistory } from "@/components/url-history";
import { toast } from "sonner";
import type { PaginatedUrls } from "./types/url";

const ITEMS_PER_PAGE = 10;

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<PaginatedUrls>();
  const { apiState, fetchUrls, createShortUrl } = useApi();
  const [reload, setReload] = useState(false);

  const loadHistory = async (page: number) => {
    const data = await fetchUrls(page, ITEMS_PER_PAGE);
    if (data) setHistoryData(data);
  };

  useEffect(() => {
    loadHistory(currentPage);
  }, [currentPage, reload]);

  const handleSubmit = async (values: { url: string }) => {
    const result = await createShortUrl(values.url);
    if (result) {
      toast("✨ URL shortened!", {
        description: "Your short URL has been created successfully",
      });
      setCurrentPage(1);
      setReload((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -top-40 -right-20 w-96 h-96 bg-gradient-to-r from-rose-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative max-w-4xl mx-auto p-4 md:p-8 min-h-screen flex flex-col justify-center">
        <div className="glass-container bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 p-8 md:p-12">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
            URL Shortener
          </h1>

          <div className="space-y-12">
            <div className="glowing-card bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-white/10 shadow-xl">
              <UrlForm
                onSubmit={handleSubmit}
                isSubmitting={apiState.loading}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text relative pb-4">
                History
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
              </h2>

              <UrlHistory
                data={historyData}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                isLoading={apiState.loading}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;