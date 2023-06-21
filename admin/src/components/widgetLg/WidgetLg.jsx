import React from "react";
import "./WidgetLg.css";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (err) {}
    };
    getOrders();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const array = [];
        for (let i = 0; i < orders.length; i++) {
          const res = await userRequest.get(`users/find/${orders[i].userId}`);
          array.push(res.data);
        }
        setUsers(array);
      } catch (err) {}
    };
    orders && getUsers();
  }, [orders]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order, index) => (
              <tr className="widgetLgTr" key={order._id}>
                <td className="widgetLgUser">
                  <img
                    src={
                      users[index]?.img ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    }
                    alt=""
                    className="widgetLgImg"
                  />
                  <span className="widgetLgName">
                    {users[index]?.fname} {users[index]?.lname}
                  </span>
                </td>
                <td className="widgetLgDate">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="widgetLgAmount">$ {order.amount}</td>
                <td className="widgetLgStatus">
                  <Button type={order.status} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
