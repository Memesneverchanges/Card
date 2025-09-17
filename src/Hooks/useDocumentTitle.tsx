import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageContent } from "../PageContent";
import { TLocalization } from "../Reducers/appReducer";

export function useDocumentTitle(localication:TLocalization) {
    const location = useLocation()

    useEffect(() => {
        let loc = location.pathname.slice(1)
        let part: keyof typeof pageContent

        
        for (part in pageContent) {
            if (pageContent[part].id===loc){
                document.title = `Parshintsev Igor - ${pageContent[part].title[localication]}`
                return
            }  
        }
           document.title = `Parshintsev Igor`
        
    }, [location,localication])
}