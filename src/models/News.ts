export default class News {
  newsOutlet: string;
  date: string;
  title: string;
  url: string;
  image: string;

  constructor(
    newsOutlet: string,
    date: string,
    title: string,
    url: string,
    image: string
  ) {
    this.newsOutlet = newsOutlet;
    this.date = date;
    this.title = title;
    this.url = url;
    this.image = image;
  }
}
