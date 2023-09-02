import React from 'react';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';

const useMessageTimestamp = () => {

    const timeStamp = (timestamp) => {
        // const now = new Date();
        const messageDate = new Date(timestamp);

        // Calculate the time difference in words (e.g., "2 minutes ago")
        // const timeDifference = formatDistanceToNow(messageDate);

        if (isToday(messageDate)) {
            // If the message was sent today, display the time (e.g., "18:52")
            return format(messageDate, 'HH:mm')
        } else if (isYesterday(messageDate)) {
            // If the message was sent yesterday, display "Yesterday"
            return 'Yesterday'
        } else {
            // For messages older than yesterday, display the date (e.g., "14 Aug 2023")
            return format(messageDate, 'dd MMM yyyy')
        }
    }

    return timeStamp
}

export default useMessageTimestamp
