import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import SideBar from '../common/SideBar';



const Board: React.FC = () => {
 const navigate = useNavigate();
 const [isAcademicOpen, setIsAcademicOpen] = useState(false);

 const departments: { [key: string]: string } = {
   humanities: '인문사회',
   sciences: '자연과학',
   engineering: '공학',
   arts: '예체능',
   medicine: '의학'
 };

 return (
   <div className="center-content flex flex-col bg-white">
     <header className="flex justify-between items-center p-4">
       <h1 className="text-xl font-semibold">게시판</h1>
       <div className="flex space-x-4">
         <FiSearch size={24} />
         <FiBell size={24} />
       </div>
     </header>

     <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
       <div className="w-20 h-20 bg-white" />
     </div>

     <div className="flex flex-col">
       <div 
         className="p-4 border-b cursor-pointer flex justify-between items-center"
         onClick={() => navigate('/board/free')}
       >
         <span>자유 게시판</span>
         <FiChevronRight />
       </div>

       <div 
         className="p-4 border-b cursor-pointer flex justify-between items-center"
         onClick={() => setIsAcademicOpen(!isAcademicOpen)}
       >
         <span>학과 게시판</span>
         {isAcademicOpen ? <FiChevronDown /> : <FiChevronRight />}
       </div>

       {isAcademicOpen && (
         <div className="bg-gray-50">
           {Object.entries(departments).map(([key, value]) => (
             <div 
               key={key}
               className="pl-8 py-3 cursor-pointer hover:bg-gray-100"
               onClick={() => navigate(`/board/${key}`)}
             >
               {value}
             </div>
           ))}
         </div>
       )}

       <div 
         className="p-4 border-b cursor-pointer flex justify-between items-center"
         onClick={() => navigate('/board/job')}
       >
         <span>정터 게시판</span>
         <FiChevronRight />
       </div>

       <div 
         className="p-4 border-b cursor-pointer flex justify-between items-center"
         onClick={() => navigate('/board/info')}
       >
         <span>정보 게시판</span>
         <FiChevronRight />
       </div>

       <div 
         className="p-4 border-b cursor-pointer flex justify-between items-center"
         onClick={() => navigate('/board/employment')}
       >
         <span>똑 생각해보자.. 게시판</span>
         <FiChevronRight />
       </div>
     </div>

     <footer className="mt-auto border-t">
       <div className="flex justify-center">
         <SideBar />
       </div>
     </footer>
   </div>
 );
};

export default Board;