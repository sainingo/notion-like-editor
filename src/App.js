import BlockPage from "./components/BlockPage";
import {MdOutlineWatchLater} from 'react-icons/md'
import {GiRabbitHead} from 'react-icons/gi'
import {FiArrowDownLeft} from 'react-icons/fi'
import {BsCheck2Circle} from 'react-icons/bs'
import {FiCloud} from 'react-icons/fi'
import {BsThreeDotsVertical} from 'react-icons/bs'

function App() {
  return (
    <div className=" w-[60%] mx-auto p-8">
      <div className="flex justify-between border-2 shadow-sm rounded p-2 gap-10 font-thin text-gray-400">
      <div className="flex gap-8">
        <p className="bg-green-200 w-[20px] px-[4px] rounded">P</p>
        <span className="flex items-center gap-1 pl-[8px] border-l-2 pr-[6px] border-r-2">< MdOutlineWatchLater size={24}/>0min</span>
         <div className="bg-red-400 rounded-full p-[4px] text-white text-2xl "><GiRabbitHead /></div>
         <div className="pl-[6px] border-l-2 flex items-center text-3xl gap-1">
          <FiArrowDownLeft />
          <span className="text-lg">0</span>
         </div>
      </div>
      <div className="flex gap-4 items-center font-bold cursor-pointer">
        <BsCheck2Circle />
        <FiCloud />
        <BsThreeDotsVertical />
      </div>
      </div>
          <h1 className="text-4xl font-bold border-b-2 my-8 ">Front-end developer test project</h1>
          <p>Type / for blocks, @ to link docs or people</p>
      <BlockPage />
    </div>
  );
}

export default App;
