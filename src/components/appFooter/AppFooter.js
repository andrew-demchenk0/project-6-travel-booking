import heartSVG from '../../resources/images/heart.svg';
import './appFooter.scss';

const AppFooter = () => {
  return (
    <footer className="footer">
      <span className="footer__text">
        your footer
        <img src={heartSVG}
             className="footer__icon"
             alt="heart"/>
      </span>
    </footer>
  );
}

export default AppFooter;
