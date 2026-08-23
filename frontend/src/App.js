import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer} from "./components"
import './App.css';
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <div className="App">
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;
