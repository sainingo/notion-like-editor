import BlockPage from "./components/BlockPage";

function App() {
  return (
    <div className=" w-[60%] mx-auto p-8">
          <h1 className="text-4xl font-bold border-b-2 my-8 ">Front-end developer test project</h1>
          <p>Type / for blocks, @ to link docs or people</p>
      <BlockPage />
    </div>
  );
}

export default App;
