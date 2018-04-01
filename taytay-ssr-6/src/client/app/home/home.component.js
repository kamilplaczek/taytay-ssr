import React, {Component} from 'react';
import './home.component.css';
import {fetchPics} from '../redux/taytay/taytay.actions';

export class Home extends Component {
  static loadData = store => {
    return store.dispatch(fetchPics());
  };

  componentDidMount() {
    if (!this.props.pics) {
      this.props.fetchPics();
    }
  }

  render() {
    const pics = this.props.pics
      ? this.props.pics.map(pic => (
          <li className="picture" key={pic.id}>
            <img src={pic.url} />
          </li>
        ))
      : null;

    return (
      <div>
        <p>
          Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter. One of the most popular
          contemporary female recording artists, she is known for narrative songs about her personal life, which has
          received much media attention. Born and raised in Pennsylvania, Swift moved to Nashville, Tennessee at age 14
          to pursue a career in country music. She signed with the independent label Big Machine Records and became the
          youngest artist ever signed by the Sony/ATV Music publishing house. Her eponymous debut album in 2006 peaked
          at number five on Billboard 200 and spent the most weeks on the chart in the 2000s. The album's third single,
          "Our Song", made her the youngest person to single-handedly write and perform a number-one song on the Hot
          Country Songs chart. Swift's second album, Fearless, was released in 2008. Buoyed by the pop crossover success
          of the singles "Love Story" and "You Belong with Me", Fearless became the best-selling album of 2009 in the
          United States. The album won four Grammy Awards, with Swift becoming the youngest Album of the Year winner.
        </p>
        <ul>{pics}</ul>
      </div>
    );
  }
}
