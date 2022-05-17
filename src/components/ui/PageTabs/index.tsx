import { TabsType } from "./types";

import './pagetabs.css';
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { combineClassNames } from "../../../utils/functions/domUtils";

function isDefaultLink( compareWith : number , defaultValue=0 ){
  if(compareWith === defaultValue) return true;
  return false;
}

function PageTabs({
  pageTabs , defaultLabel
} : {pageTabs : TabsType , defaultLabel ?: number}) {

  const navigate = useNavigate();
  const [search] = useSearchParams();
  const tabValue = search.get('tab');

  return <div className="page-tabs">

    {pageTabs.map((tab , index)=>{

      return <button title={"Move To " + tab.endpoint} className={
        combineClassNames(
          "page-tab",
          tabValue === null ? isDefaultLink(index , defaultLabel) ? "page-tab--active" : ""  : "",
          tabValue === tab.endpoint ? "page-tab--active" : ""
        )} 
        onClick={()=>{
        navigate('?tab=' + tab.endpoint , {
          replace : false 
        })
      }} key={index}>{tab.label}</button>

    })}

  </div>;
}

export default PageTabs;
