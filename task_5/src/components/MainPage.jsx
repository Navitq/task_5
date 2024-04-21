import {Region} from './Region'
import {Settings} from './Settings'
import {UserTable} from './UserTable'
import { useTranslation } from "react-i18next";

import i18n, { changeLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export default function MainPage() {
    const { t, i18n } = useTranslation();

    function changeLanguage(newLanguage){
        console.log(newLanguage)
        i18n.changeLanguage(newLanguage);
    }

    return (
        <>
            <h1 className="h1 text-center my-5 mt-3">{t("main.header")}</h1>
            <Region changeLanguage={changeLanguage} t={t}></Region>
            <Settings t={t}></Settings>
            <UserTable t={t}></UserTable>
        </>
    )
}
