
//dark light mode toggle
const body = document.querySelector('body');
const icon = document.querySelector('i');
const f = function(){
    this.classList.toggle('bi-moon');
    document.body.classList.toggle('dark');
}

//Generate a random quote
const quoteGen = function(){
    const quote = document.querySelector('.quote');
    const inspiringQuotes = [
        "Believe you can achieve greatness.",
        "Dream big, work hard.",
        "Embrace the journey, find joy.",
        "Chase your passions fearlessly.",
        "Never stop learning, growing."
      ];
    let x = Math.floor((Math.random()*5));
    quote.innerText = inspiringQuotes[x];
}
export {f,quoteGen};