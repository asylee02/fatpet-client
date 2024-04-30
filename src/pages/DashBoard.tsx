
import { Link, useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import { deletePet, getPetList } from "@/api/axios";
import { useEffect, useState } from "react";
import { PetProps } from "@/types/types";
import PetStatus from "@/features/DashBoard/PetStatus";
import PetNotStatus from "@/features/DashBoard/PetNotStatus";
import Diagnose from "@/features/DashBoard/Diagnose";
import Line from "@/features/Chart/Line";




export default function DashBoard() {
    const [pet,setPet]=useState<PetProps | null>(null)
    const LSData : string | null =localStorage.getItem('petData')
    const petData = LSData ? JSON.parse(LSData) : ''
    const navigate = useNavigate();

    useEffect(()=>{
        petData
        ?setPet(petData)
        :getPetList()
        .then((data)=>setPet(data.data.body[0]))
    },[])

    function handleDelete(){
        deletePet(pet!.id)
        .then(()=>{
            localStorage.removeItem('petData')
            getPetList()
            .then((data)=>{
                data.data.body
                ? setPet(data.data.body[0])
                
                : setPet(null)
            })
            navigate('/dashboard')
        })
    }

    return (
        <div className="flex flex-col items-center font-bold tracking-tighter h-full ">
            <header className="flex justify-between w-full items-center">
                <p className="text-lg">대시보드</p>
                <Link to='./editMember'><FaGear className="text-2xl"/></Link>  
            </header>

            <div className="w-full h-1/3 mt-10">
            {pet 
            ? <PetStatus pet={pet as PetProps} handleDelete={handleDelete}/>
            : <PetNotStatus/>}
            </div>

            <div className="w-full h-1/7">
                {pet && <Diagnose/>}
            </div>

            <div className="w-full h-1/3 mt-16   ">
                <span>펫 변화 추이</span>    
                <span className="text-sm text-gray-400">(최근 3회)</span>    
                <Line/>
                <p className="text-sm text-gray-500">*BCS(Body Condition Score) <br/> 펫의 비만도를 1~9만큼 측정한 값</p>
            </div>
            

        </div>
    );
}

