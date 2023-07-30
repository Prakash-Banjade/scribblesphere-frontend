import { useContext } from "react";
import CurentArticleContext from "../context/CurrentArticleProvider";

const useCurrentArticle = () => {
    return useContext(CurentArticleContext);
}

export default useCurrentArticle;