export const getPageUrl = (book, idx)=>{
    return `./images/${book}/${book}_${idx>9?'0'+idx:'00'+idx}.jpg`
}
export const getAllPages = (book) => {
    return Array.from({length:book.length}).map((_,idx)=>getPageUrl(book.key, idx+1))
}
