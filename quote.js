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
]

class Quote {
  element
  data

  constructor() {
    this.render()
    this.eventBtn()

    this.url = new URL(`https://twitter.com/intent/tweet`)
    this.url.searchParams.set('hashtags', 'quotes')
    this.url.searchParams.set('related', 'freecodecamp')
  }

  async render() {
    if (!this.data) {
      await this.getQuotes()
    }
    this.randomQuote = this.getRandomInteger(0, this.data.length - 1)
    const div = document.createElement('div')

    div.innerHTML = `
      <div id='text' >  <i id='font' class="fa fa-quote-left"> </i><span id='sp'>${
        this.data[this.randomQuote].quote
      }</span>
      <div id='author' class='author'>-${
        this.data[this.randomQuote].author
      }</div>
      <a
      id='twit'
      type="button"
      class='twit'
      href=''
      title="Tweet this quote!"
    >
      <i class="fa fa-twitter"></i>
    </a>
      <button id="btn" class="btn" data-type="btn">New Quote</button>
      </div>
      `

    this.element = div.firstElementChild
    this.element.classList.add('text')
    document.getElementById('box').append(this.element)
    this.changeColor()
  }

  changeColor() {
    const randomColor = this.getRandomInteger(0, colors.length - 1)
    this.styleText = `background-color: ${colors[randomColor]};
    transition: background-color 1000ms linear;`
    const container = document.getElementById('container')

    container.style.cssText = this.styleText

    const text = document.getElementById('text')
    setTimeout(() => {
      text.classList.add('change')
    }, 300)

    const anchor = document.getElementById('twit')
    this.url.searchParams.set(
      'text',
      `'${this.data[this.randomQuote].quote}' ${
        this.data[this.randomQuote].author
      }`
    )
    anchor.href = this.url
    anchor.style.cssText = this.styleText

    const btn = document.getElementById('btn')
    btn.style.cssText = this.styleText
  }

  async getQuotes() {
    const response = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    )
    const json = await response.json()
    this.data = json.quotes
  }

  eventBtn() {
    document.addEventListener('click', this.makeNewQuote)
  }

  makeNewQuote = (event) => {
    if (event.target.dataset.type === 'btn') {
      const text = document.getElementById('text')

      text.classList.remove('change')
      setTimeout(() => {
        this.element.remove()
        this.render()
      }, 1000)
    }
  }
  getRandomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }
}

new Quote()
