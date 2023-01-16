import React from 'react';
import { Notif } from '../components/notification';
import { NotifProps } from '../components/notification/Notif';

export const NotifPage = () => {
    const notifProp: NotifProps ={
        Title: 'Company',
        Day: '1w',
        Picture: 'https://kottke.org/plus/misc/images/ai-faces-01.jpg'
    }

    return (
        <div>
            <Notif Title={notifProp.Title} Day ={notifProp.Day} Picture = {notifProp.Picture}></Notif>
        </div>
    );
  };