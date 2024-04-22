import {Region} from './Region'
import Settings from './Settings'
import {UserTable} from './UserTable'
import { useTranslation } from "react-i18next";

import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-bootstrap';
import CsvDownloader from 'react-csv-downloader';

export default function MainPage() {
    const { t, i18n } = useTranslation();
    const [newData,setNewData] = useState([])
    



    function changeLanguage(newLanguage){
        i18n.changeLanguage(newLanguage);
    }

    function newTableData(additionalData,page){
        if(additionalData.length<1){
            return;
        }

        let newLines = additionalData.map((el)=>{
            return  <tr key={uuidv4()}>
                        <td>{el[0]}</td>
                        <td>{el[1]}</td>
                        <td>{el[2]}</td>
                        <td>{el[3]}</td>
                        <td>{el[4]}</td>
                    </tr>
        })
        if(page > 1){
            setNewData((prev)=>{
                return [...prev,...newLines]
            })
            return
        }
        setNewData((prev)=>{
            return [...newLines]
        })

    }




    return (
        <>
            <h1 className="h1 text-center my-5 mt-3">{t("main.header")}</h1>

            <Region changeLanguage={changeLanguage} t={t} ></Region>
            <Settings newTableData={newTableData}  t={t}></Settings>
            <UserTable  newData={newData} t={t}></UserTable>
        </>
    )
}
