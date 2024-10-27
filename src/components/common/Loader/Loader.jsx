import './loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="lds-ring ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div> 
  );
}
