import React, { useState } from "react";
import { postNewItem } from "../services/dataService";

type Props = {
  onTrue: any;
  onClose: any;
};

const ExpenseTracker = ({ onTrue, onClose }: Props) => {
  const showDefaultDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(
      -2
    )}-${("0" + (today.getDate() + 1)).slice(-2)}`;
  };
  const [payeeName, setPayeeName] = useState("");
  const [product, setProductName] = useState("");
  const [price, setPriceValue] = useState(0);
  const [setDate, setDateData] = useState(showDefaultDate());

  const setPayee = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPayeeName(event.target.value);
  };

  const setProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(event.target.value);
  };
  const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceValue(parseInt(event.target.value));
  };
  const setDateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateData(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const finalItem = { payeeName, product, price, setDate };
    const data = await postNewItem(finalItem);
    console.log(data)
      onTrue(data);
  };

  return (
    <>
      <section>
        <header>
          <h1>Add New Item</h1>
          <p>
            Read the below instructions before proceeding:
            <br />
            Make sure you fill all the details where * is marked
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <article>
            <span>Name: </span>
            <select
              name="name"
              id="name"
              required
              value={payeeName}
              onChange={setPayee}
            >
              <option value="" defaultChecked>
                Choose
              </option>
              <option value="Rahul">Rahul</option>
              <option value="Ramesh">Ramesh</option>
            </select>
          </article>

          <article>
            <span>Product Name: </span>
            <input
              type="text"
              name="product"
              id="product"
              required
              value={product}
              onChange={setProduct}
            />
          </article>

          <article>
            <span>Product Price: </span>
            <input
              type="number"
              name="price"
              id="price"
              required
              value={price}
              onChange={setPrice}
            />
          </article>

          <article>
            <span>Date: </span>
            <input
              type="date"
              required
              value={setDate}
              onChange={setDateValue}
            />
          </article>

          <button className="form-button" onClick={onClose}>
            Close
          </button>
          <button className="form-button">Submit</button>
        </form>
      </section>
    </>
  );
};

export default ExpenseTracker;
