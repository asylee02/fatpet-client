
import { Link } from "react-router-dom";
import { FaGear, FaDog, FaStethoscope } from "react-icons/fa6";
import { FaCat, FaClipboardList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { deletePet, getPetList } from "@/api/axios";
import { useEffect, useState } from "react";
import transBreed from "@/utils/transBreed";
import { PetProps } from "@/types/types";




export default function DashBoard() {
    const [pet,setPet]=useState<PetProps>()

    useEffect(()=>{
        getPetList()
        .then((data)=>setPet(data.data.body[0]))
    },[])


    function handleDelete(){
        deletePet(pet.id)
    }
    
    return (
        <div className="flex flex-col items-center mx-8 mt-12 font-bold tracking-tighter ">
            <div className="flex justify-between w-full items-center">
                <p className="text-lg">이상연님<br/> 안녕하세요</p>
                <Link to='./editMember'><FaGear className="text-2xl"/></Link>  
            </div>

            <div className="w-full mt-12 flex flex-col items-center">
                <p className="text-sm mb-3 mr-56">현재 선택 중인 펫</p>
                <div className="w-5/6 h-40 bg-blue-400 rounded-xl px-5 text-white">
                    <div className="h-2/3 flex items-center pl-3 justify-between">
                        <FaDog className="text-6xl"/>
                        <div className="mr-5">
                            <p>이름 : 마루</p>
                            <div className="flex mb-1">
                                <p className="text-xs">품종 : {transBreed(pet?.breeds.name)}</p>
                                <p className="text-xs ml-3">성별 : {pet?.breeds.sex==='MALE' ? '수컷' : '암컷'}</p>
                            </div>
                            <p className="text-xs">생일 : {`${pet?.birthDate[0]}년 ${pet?.birthDate[1]}월`}</p>
                        </div>
                        <Link to='./petList'><IoIosArrowForward className="text-4xl"/></Link>
                    </div>
                    <div className="h-1/3 border-t flex items-center text-center text-white">
                        <Link to="./editPet" className="w-1/2">펫 정보 수정</Link>
                        <button className="border-l w-1/2" onClick={handleDelete}>펫 정보 삭제</button>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-around mt-10">
                <button className="w-1/3 h-12 border-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <FaStethoscope className="w-5 h-5 mr-2"/>BCS 검사하기
                </button>
                <button className="w-1/3 h-12 border-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                    <FaClipboardList className="w-5 h-5 mr-2"/>검사 기록보기
                </button>
            </div>
        </div>
    );
}

