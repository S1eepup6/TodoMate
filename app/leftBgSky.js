var hr = (new Date()).getHours(); 
if (hr > 6 && hr < 18) {
    var $left = document.getElementsByClassName('content-left')[0];
    $left.setAttribute('class', 'content-left-day');
}