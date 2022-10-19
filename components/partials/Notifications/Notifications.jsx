import React, { useEffect } from 'react';
import IconNoNotifications from '../../Icons/IconNoNotifications';

const Notifications = (props) => {
    const {
        notifications
    } = props;

    useEffect(() => {
        if (props.notifications) {
            
        }
    }, [props.notifications])

    const OrderRecievedNotification = (notification) => {
        return (
            <div className="notifications-list flex">
                <div className="cart-icon flex align-center justify-content-center">
                    <img src="/static/images/order-receive.svg" alt="bought" />
                </div>
                <div className="cart-description">
                    <div className="text"> Order received product added by you is accepted by Admin.</div>
                    <span className='time flex align-center'> <img src="/static/images/time.svg" alt="bought" />Just now</span>
                </div>
            </div>
        )
    }

    const GreetingNotification = (notification) => {
        return (
            <div className="notifications-list flex active">
                <div className="cart-icon flex align-center justify-content-center">
                    <img src="/static/images/bought.svg" alt="bought" />
                </div>
                <div className="cart-description">
                    <div className="text"> Congratulation, you won the pokenmon cards auction and bought #52 pokemon card.</div>
                    <span className='time flex align-center'> <img src="/static/images/time.svg" alt="bought" />2 hours ago</span>
                </div>
            </div>
        )
    }

    const OrderConfirmation = (notification) => {
        return (
            <div className="notifications-list flex">
                <div className="cart-icon flex align-center justify-content-center">
                    <img src="/static/images/successfully.svg" alt="bought" />
                </div>
                <div className="cart-description">
                    <div className="text">Your order ID no. TL129303020 have been placed successfully.</div>
                    <span className='time flex align-center'> <img src="/static/images/time.svg" alt="bought" />2 hours ago</span>
                </div>
            </div>
        )
    }

    const FollowingNotification = (notification) => {
        return (
            <div className="notifications-list flex">
                <div className="cart-icon flex align-center justify-content-center">
                    <img src="/static/images/bronco.svg" alt="bought" />
                </div>
                <div className="cart-description">
                    <div className="text"><strong>@felix.bronco</strong> started following you. </div>
                    <span className='time flex align-center'> <img src="/static/images/time.svg" alt="bought" />2 hours ago</span>
                </div>
            </div>
        )
    }

    const renderNotifications = () => {
        if(notifications && notifications.length > 0) {
            return(
                <>
                    {OrderRecievedNotification()}
                    {GreetingNotification()}
                    {OrderConfirmation()}
                    {FollowingNotification()}
                </>
            );
        } else {
            return(
                <div className='noNotifications flex justify-center flex-center text-center column'>
                    <idv className="image mb26"><IconNoNotifications/></idv>
                    <h3>No Notification</h3>
                </div>
            )
        }
    }

    return (
        <>
            {renderNotifications()}
        </>
    );
}

export default Notifications;