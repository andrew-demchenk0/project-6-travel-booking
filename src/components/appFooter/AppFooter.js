import heartSVG from "../../resources/images/heart.svg";

const AppFooter = () => {
  return (
    <footer className="footer">
      <span className="footer__text">
        from
        <a className="footer__link" href="https://binary-studio.com">
          binary studio
        </a>
        with
        <img src={heartSVG} className="footer__icon" alt="heart"/>
      </span>
    </footer>
  );
}

export default AppFooter;