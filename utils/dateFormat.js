

//  make the date available to be saved with thoughts posted

function dateFormat(date) {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

module.exports = dateFormat;