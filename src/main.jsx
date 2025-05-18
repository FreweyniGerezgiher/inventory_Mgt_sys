import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import App from "./App";
import "./index.css";
import "./assets/font-awesome/css/font-awesome.min.css";

import { store } from "./store/store";
import { Provider } from "react-redux";
import httpInit from "./services/http/httpInit";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

httpInit();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer newestOnTop />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
