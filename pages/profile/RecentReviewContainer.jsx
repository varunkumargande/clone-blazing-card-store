import React, { useState, useEffect } from "react";
import RatingCard, { RatingCardSkeleton } from "../../components/RatingCard/RatingCard";
import { useInfiniteQuery, useQueryClient  } from "react-query";
import ProfileMethods from "../../api/profile/ProfileMethods";
import { useDispatch } from "react-redux";
import { show } from "../../store/toast/action";
import { getErrorMessage } from "../../utilities/common-helpers";
import Styles from "./RecentReview.module.scss";

 const RecentReviewContainer = ({userId}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [reviewOffset, setReviewOffset] = useState(0);
  const reviewLimit = 10;
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(["getReviews"],
    ({ pageParam = { vendorId: userId, limit: reviewLimit, offset: reviewOffset } }) => ProfileMethods.GetVendorReviews(pageParam), {
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages[0]?.data?.data?.count && reviewOffset < allPages[0]?.data?.data?.count ) {
        return { vendorId: userId, limit: reviewLimit, offset: reviewOffset };
      } else {
        return undefined;
      }
    },
    onSuccess: (data) => {
      if (data?.pages[data.pages.length - 1].data?.status === 1) {
        setReviewOffset(reviewLimit + reviewOffset);
      }
      if (!Array.isArray(data?.pages) || data?.pages[data.pages.length - 1].data?.status !== 1) {
        const errorMessage = getErrorMessage(data?.pages[data.pages.length - 1]);
        dispatch(show({ message: errorMessage, type: "error" }));
      }
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      dispatch(show({ message: errorMessage, type: "error" }));
    },
    cancelRefetch: true
  }
  );

  useEffect(() => {
    return () => {
      queryClient.resetQueries();
    }
  }, []);

  /**
   * @method: getMoreReviews
   * @description: handles the Load More button to get more reviews.
   */
  const getMoreReviews = () => {
    fetchNextPage();
  }

  /**
   * @method: getRatingTypesData
   * @description: getRatingTypesData
   */
  const getRatingTypesData = ((ratingData) => {
    console.log('how mnay times does this get called');
    return [
      {
        name: 'Shipping',
        rating: ratingData?.shippingRating
      },
      {
        name: 'Packaging',
        rating: ratingData?.packagingRating
      },
      {
        name: 'Accuracy',
        rating: ratingData?.accuracyRating
      }
    ];
  })

  return (
    <>
      {
        data?.pages &&
        data?.pages.map(pagesData => {
          return (
            pagesData?.data?.data?.list &&
            pagesData?.data?.data?.list.map(ratingData => {
              return (
                <RatingCard
                  key={ratingData?.ratingId}
                  fullName={`${ratingData?.firstName} ${ratingData?.lastName}`}
                  review={ratingData?.review}
                  rating={ratingData?.rating}
                  ratingTypes={getRatingTypesData(ratingData)}
                  date={ratingData?.createdDate}
                  imageUrl={ratingData?.avatar_path && ratingData?.avatar ? `${ratingData?.avatar_path}/${ratingData?.avatar}` : null}
                />
              )
            })
          )
        })}
      {(!isLoading && (!data?.pages || !Array.isArray(data?.pages[0]?.data?.data?.list) || !data?.pages[0]?.data?.data?.list?.length)) &&
        <div className="no-record flex justify-center">No Data found</div>
      }
      {!isLoading && !isFetchingNextPage && hasNextPage && <div className={`${Styles.load_more} flex justify-center bg-white`} onClick={(event) => {event.preventDefault();getMoreReviews()}}>Load More</div>}
      {(isLoading || isFetchingNextPage) && <RatingCardSkeleton />}
    </>
  );
};

export default RecentReviewContainer;