import { FaLock } from "react-icons/fa";
interface MyComponentProps {
  payWithBani: (e: any) => void;
}

const Status: React.FC<MyComponentProps> = ({ payWithBani }) => {
  return (
    <>
      <div className="status_container">
        <FaLock />
        <span>
          Your account is not verified yet!{" "}
          <a href="" type="button" onClick={payWithBani}>
            click here
          </a>
        </span>
      </div>
    </>
  );
};

export default Status;
