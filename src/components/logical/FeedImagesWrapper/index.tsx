import { useEffect } from 'react';

import { useAppSelector , useAppDispatch } from '../../../store/hooks';
import { fetchNewsFeedPage } from '../../../store/sideEffects';

import SingleFeedImage from '../../presentation/SingleFeedImage';
import DataStateWrapper from '../LoadingWrapper';
import { FallbackErrorPage , FallbackLoadingPage , FallbackLoadingInline } from '../../ui/FallbackPageComponents';

import InfiniteScrollWrapper from '../InfiniteScrollWrapper';

import {ReactComponent as NewsFeed} from '../../../assets/newsFeed.svg';

import './feedImagesWrapper.css';

function FeedImagesWrapper() {

     const newsFeedImages = useAppSelector(state=>state.photosInNewsFeed);
     const newsFeedLoadingConfig = useAppSelector(state=>state.newsFeedLoadingConfig);
     const nextPageNumberToLoad = useAppSelector(state=>state.nextPageNumberForNewsFeed);
     const dispatch = useAppDispatch();

     const loadNextPage = ()=>{
          dispatch(fetchNewsFeedPage(nextPageNumberToLoad));
     }

     useEffect(()=>{
          dispatch(fetchNewsFeedPage(1))
     },[dispatch])


     return <ul className="feed-images-wrapper">
          <DataStateWrapper
               currentState={newsFeedLoadingConfig} 
               errorComponent={<FallbackErrorPage
                    fallbackText='News Feed could not be loaded.'
                    icon={<NewsFeed/>}
                    retryFunction={loadNextPage}
               />}
               loadingComponent={<FallbackLoadingPage
                    fallbackText='Loading Your Feed.'
                    icon={<NewsFeed/>}
               />}
               newPageLoadingComponent={<FallbackLoadingInline
                    fallbackText='Loading Next Page.'
               />}
          >
          <InfiniteScrollWrapper dataState={newsFeedLoadingConfig.state} callback={loadNextPage}>
               {newsFeedImages.map((image)=>{
                    return <SingleFeedImage {...image} key={image.id}/>
               })}
          </InfiniteScrollWrapper>
          </DataStateWrapper>
     </ul>
}

export default FeedImagesWrapper;

