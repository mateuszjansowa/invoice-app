import { Button } from "antd";
import { Invoice } from "../../App";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export const List = ({
  invoiceList,
  onDelete,
}: {
  invoiceList: Invoice[];
  onDelete: () => void;
}) => {
  const deleteInvoice = async (id: string) => {
    const invoiceDoc = doc(db, "invoices", id);

    try {
      await deleteDoc(invoiceDoc);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {invoiceList.map((invoice) => (
        <li key={invoice.id}>
          <p>id: {invoice.id}</p>
          <p>date: {invoice.date}</p>
          <p>name: {invoice.name}</p>
          <p>recipient: {invoice.recipient}</p>
          <p>value: {invoice.value}</p>
          <p>status: isComplete? {invoice.isComplete.toString()}</p>
          <Button
            type="primary"
            danger
            onClick={() => deleteInvoice(invoice.id)}
          >
            Delete invoice
          </Button>
        </li>
      ))}
    </ul>
  );
};
