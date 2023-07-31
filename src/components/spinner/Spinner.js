import './spinner.scss';

const Spinner = () => {
  return (
    <div className='center-loader'>
      <div data-test-id="loader" className="loader"></div>
    </div>
  );
}

export default Spinner;