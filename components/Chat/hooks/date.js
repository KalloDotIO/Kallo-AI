export default function getDate(datetime = null) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = datetime ? new Date(datetime) : new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}



export function categorizeDate(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    
    // Reset times for comparison
    now.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const diffDays = Math.floor((now - inputDate) / oneDay);
    
    if (diffDays === 0) {
        return 'today';
    } else if (diffDays === 1) {
        return 'yesterday';
    } else if (diffDays > 1 && diffDays <= 7) {
        return 'previous 7 days';
    } else if (diffDays > 7 && diffDays <= 30) {
        return 'previous 30 days';
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return `${inputDate.getDate()} ${inputDate.toLocaleString('default', { month: 'long' })}`;
    } else {
        return `${inputDate.getDate()} ${inputDate.toLocaleString('default', { month: 'long' })} ${inputDate.getFullYear()}`;
    }
}

