import { Link } from "react-router-dom";

import { useAppSelector } from "../../../store/hooks";
import FeedImagesWrapper from "../../logical/FeedImagesWrapper";
import DataStateWrapper from "../../logical/LoadingWrapper";
import AsideSectionWithHeading from "../../ui/AsideSectionHeading";
import { FallbackLoadingPage , FallbackErrorPage } from "../../ui/FallbackPageComponents";
import ProgressiveImage from "../../logical/ProgressiveImage";
import SingleUserItem from "../../presentation/SingleUserItem";

import './newsfeedPage.css';

import {ReactComponent as FollowerIcon} from '../../../assets/followers.svg';

import { findNUniquePhotographers } from "../../../utils/functions/miscUtils";

function NewsFeedPage(){
  const TopUsernames = useAppSelector(state => findNUniquePhotographers(state.photosInNewsFeed , 5));
  const currentFeedLoadingState = useAppSelector(state => state.newsFeedLoadingConfig);
  const nextNewsFeedPage = useAppSelector(state=>state.nextPageNumberForNewsFeed);

  return <div className="news-feed-page">
    <FeedImagesWrapper/>
      <div className="news-feed-page__aside">

        <AsideSectionWithHeading heading="Recently Active" subHeading="Check Them Out">
          <div className="news-feed-page__aside__recently-active-user-list">
            <DataStateWrapper
              loadingComponent={
                <FallbackLoadingPage size="small" fallbackText="" icon={<FollowerIcon/>}/>
              }
              errorComponent={
                nextNewsFeedPage === 1 ? <FallbackErrorPage size="small" fallbackText="Unable To Load" icon={<FollowerIcon/>}/> : undefined
              }
              currentState={currentFeedLoadingState} 
            >
                {TopUsernames.map((user)=>{
                  return <Link to={`/profile/${user.username}`} key={user.username}>
                    <ProgressiveImage
                    title={user.username}
                    imageArray={
                      [
                        {blur : false , url : user.avatar.thumb}
                      ]
                    }
                    alt={user.username}
                    className="news-feed-page__aside__recently-active-user"
                  />
                  </Link>
                })}  
            </DataStateWrapper>
          </div>
        </AsideSectionWithHeading>

        <AsideSectionWithHeading
          heading="Suggestions For You"
          subHeading="Based on your interests"
        >
          <DataStateWrapper
            loadingComponent={
              <FallbackLoadingPage fallbackText="Loading Suggestions" icon={<FollowerIcon/>}/>
            }
            errorComponent={
              nextNewsFeedPage === 1 ? <FallbackErrorPage fallbackText="Unable To Load" icon={<FollowerIcon/>}/> : undefined
            }
            currentState={currentFeedLoadingState} 
          >
            {TopUsernames.map((user)=>{
              return <SingleUserItem
                key={user.id}
                username={user.username}
                avatar={user.avatar.thumb}
              />
            })}
          </DataStateWrapper>
        </AsideSectionWithHeading>

      </div>
    </div>
}

export default NewsFeedPage;
