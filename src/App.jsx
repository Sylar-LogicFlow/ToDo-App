import AppContent from "./AppContent";
import Providers from "./TodoComponents/context/context";

function App() {
  return (
    <>
      <Providers>
        <AppContent />
      </Providers>
    </>
  );
}

export default App;
