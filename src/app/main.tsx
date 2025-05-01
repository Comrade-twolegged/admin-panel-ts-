import "../assets/global/global.scss"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import App from './App.tsx'
import { Provider } from "react-redux"
import { store } from "./store/store.ts";
import { CookiesProvider } from 'react-cookie'
import { ThemeProviderRedux } from "../components/providers/ThemeProviderRedux.tsx"

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <Provider store={store}>
      <ThemeProviderRedux>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProviderRedux>
    </Provider>
  </CookiesProvider>
)
