import Form from "@/components/Form";
import { FaDog } from "react-icons/fa6";
import { FaCat } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { useRef, useState } from "react";
import DogBreed from "@/api/mock";
import { createPet } from "@/api/axios";

interface DogBreedItem {
    id : string;
    value : string;
}

export default function BasicInformation() {

    const [species, setSpecies] = useState<string>('')
    const [sex, setSex] = useState<string>('')
    const [isDropdownView, setIsDropdownView] = useState<boolean>(false)
    const [breed,setBreed] = useState<string>(`품종을 선택해주세요 ${isDropdownView ?  '▲' : '▼'}`)
    const dateRef = useRef<HTMLInputElement>(null);
    const neuteredRef = useRef<HTMLInputElement>(null);

    function handleSumbit(data :any){
        const date = dateRef.current!.value.split('-')
        const birthDate = `${date[0]}-${date[1]}`
        const neutered = neuteredRef.current!.checked
        const feedCalories = parseInt(data['급여 사료 열량(100g당)'])
        const name = data['이름']
        createPet(sex,name,species,breed,birthDate,neutered,feedCalories)
    }

    function handleDropdown(breed : string){
        setBreed(breed)
        setIsDropdownView(false)
    }
    return (
        <div className="flex flex-col items-center justify-center mt-20 mx-8 font-bold text-lg">
            <p className="text-xl font-bold tracking-tighter mb-10">반려동물의 기본정보를 입력해주세요</p>
            <Form onSubmit={handleSumbit} className="flex flex-col items-center justify-center">
                {/* 이름 */}
                <div className="w-full">
                    <Form.Input name="이름"/>
                </div>

                {/* 나이 */}
                <div className="flex my-5 w-full">
                    <div className="w-full mr-10">
                        <label>나이</label>
                        <br />
                        <input type="date" ref={dateRef} className="border-2 w-5/6 h-12"/>
                    </div>
                </div>
                
                {/* 종류 */}
                <div className="w-full">
                        <label>종류</label>
                        <div className="flex mt-4">
                            <Form.SelectButton label="강아지" state={species==='DOG' ? true : false} icon={<FaDog className="w-7 h-7 mr-2"/>} handleClick={()=>setSpecies('DOG')}/>
                            <Form.SelectButton label="고양이" state={species==='CAT' ? true : false} icon={<FaCat className="w-7 h-7 mr-2"/>} handleClick={()=>setSpecies('CAT')}/>
                        </div>
                    </div>

                {/* 성별 */}
                <div className="my-5 w-full">
                    <label>성별</label>
                    <div className="flex mt-2 w-full">
                        <Form.SelectButton label="수컷" state={sex==='MALE' ? true : false} icon={<IoMdMale className="w-6 h-6 mr-2 text-blue-600"/>} handleClick={()=>setSex('MALE')}/>
                        <Form.SelectButton label="암컷" state={sex==='FEMALE' ? true : false} icon={<IoMdFemale className="w-6 h-6 mr-2 text-red-600"/>} handleClick={()=>setSex('FEMALE')}/>
                        <p className="flex items-center w-1/2">중성화여부<input ref={neuteredRef} className="w-5 h-5 ml-3" type="checkbox"/></p>
                    </div>
                </div>

                {/* 품종 (품종 데이터 받아와야하나?)*/}
                <div className="mb-5 relative w-full">
                    <label>품종</label>
                    <button type="button" className="border-2 w-5/6 h-12 flex items-center justify-center mt-3" onClick={()=>setIsDropdownView(!isDropdownView)}>
                        {breed}
                    </button>
                    {isDropdownView ?
                    <ul className="border-2 w-5/6 absolute top-20 z-10" onBlur={()=>console.log('hello')}>
                        {DogBreed.map((item : DogBreedItem) =>{
                            return <li onClick={()=>handleDropdown(item.value)} className="border-b-2 h-10 flex justify-center items-center hover:cursor-pointer hover:bg-gray-200 bg-white">{item.value}</li>
                        })}
                    </ul>
                    :''}
                </div>

                {/* 급여 사료 열량 */}
                <div className="flex mb-10 w-full">
                    <Form.Input name="급여 사료 열량(100g당)" type="number"/>
                    <p className="mt-12 ml-5">kcal</p>
                </div>

                <Form.Button name="다음" type="submit"/>
            </Form>
        </div>
    );
}

