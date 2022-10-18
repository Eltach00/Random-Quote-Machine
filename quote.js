const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
];

class Quote {
  element;
  data;

  constructor() {
    this.render();
    this.eventBtn();
  }

  async render() {
    if (!this.data) {
      await this.getQuotes();
    }
    this.randomQuote = this.getRandomInteger(0, this.data.length - 1);
    const div = document.createElement('div');

    div.innerHTML = `
        <div id='text' >  <i id='font' class="fa fa-quote-left"> </i><span id='sp'>${
          this.data[this.randomQuote].quote
        }</span>
        <div id='author' class='author'>-${this.data[this.randomQuote].author}</div>

        </div>
        
        `;

    this.element = div.firstElementChild;
    this.element.classList.add('text');
    document.getElementById('box').append(this.element);
    this.changeColor();
  }

  changeColor() {
    const randomColor = this.getRandomInteger(0, colors.length - 1);
    const container = document.getElementById('container');

    container.style.cssText = `    background-color: ${colors[randomColor]};
                                         transition: background-color 1000ms linear;`;

    const text = document.getElementById('text')
    setTimeout(() => {
        text.classList.add('change')
    }, 300); 


    const btn = document.getElementById('btn');
    btn.style.cssText = `    background-color: ${colors[randomColor]};
                                transition: background-color 1000ms linear;`;
  }

  async getQuotes() {
    const response = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );
    const json = await response.json();
    this.data = json.quotes;
  }

  eventBtn() {
    this.makeNewQuote = (event) => {
      if (event.target.dataset.type === 'btn') {
        const text = document.getElementById('text')

        text.classList.remove('change')
    

        setTimeout(() => {
            this.element.remove();
        this.render();

        }, 1000); 
        

      }
    };
    document.addEventListener('click', this.makeNewQuote);
  }

  getRandomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}

window.quotes = new Quote()
