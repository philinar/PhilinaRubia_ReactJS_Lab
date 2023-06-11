import { useEffect, useState } from "react";
import IProduct from "../model/IProduct";
import { getItmesFromServer } from "../services/dataService";
import ExpenseTracker from "./ExpenseTracker";

const ShowList = () => {
  const [items, setItems] = useState<IProduct[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [sum, setSum] = useState<number | null>();
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);

  function calculateShare(data: IProduct[]) {
    let tempRahulSpent = 0;
    let tempRameshSpent = 0;

    data.map((eachProduct: IProduct) =>
      eachProduct.payeeName === "Rahul"
        ? (tempRahulSpent = tempRahulSpent + eachProduct.price)
        : (tempRameshSpent = tempRameshSpent + eachProduct.price)
    );
    setRahulSpent(tempRahulSpent);
    setRameshSpent(tempRameshSpent);
  }

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getItmesFromServer();
        setItems(data);
        setSum(data.reduce((acc, each) => acc + each.price, 0));
        calculateShare(data);
      } catch (error: any) {
        console.error("Error Occured");
      }
    };
    fetchMenu();
  }, [showForm]);

  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showForm && (
        <div className="form">
          <ExpenseTracker onClose={cancel} onTrue={success}></ExpenseTracker>
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 120 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((eachItem, index) => (
          <div key={index}>
            <div className="use-inline date">{eachItem.setDate}</div>
            <div className="use-inline">{eachItem.product}</div>
            <div className="use-inline price ">{eachItem.price}</div>
            <div
              className={`use-inline
              ${eachItem.payeeName}`}
              style={{ width: 120 }}
            >
              {eachItem.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <span className="use-inline">Total: </span>
      <span className="use-inline total" style={{ width: 130 }}>
        {sum}
      </span>{" "}
      <br />
      <span className="use-inline">Rahul Paid: </span>
      <span className="use-inline total Rahul">{rahulSpent}</span>
      <br />
      <span className="use-inline">Ramesh Paid: </span>
      <span className="use-inline total Ramesh">{rameshSpent}</span> <br />
      <span className="use-inline payable">
        {rahulSpent > rameshSpent ? "Pay Rahul: " : "Pay Ramesh:"}
      </span>
      <span className="use-inline payable price" style={{ width: 130 }}>
        {Math.abs((rahulSpent - rameshSpent) / 2)}
      </span>{" "}
      <br />
    </>
  );
};

export default ShowList;
