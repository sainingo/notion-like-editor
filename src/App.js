import BlockPage from "./components/BlockPage";

function App() {
  return (
    <div className=" w-[60%] mx-auto p-8">
          <h1 className="text-4xl font-bold border-b-2 my-8 ">Front-end developer test project</h1>
          <p>My goal is to make a page that has the ability to create H1 text simply by typing / then 1, then typing text and hitting enter</p>
      <BlockPage />
    </div>
  );
}

export default App;
