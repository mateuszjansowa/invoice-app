import { Checkbox, Input } from "antd";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

const invoiceColletionRef = collection(db, "invoices");

export const Generator = ({ onSubmit }: { onSubmit: () => void }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const submitInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(invoiceColletionRef, {
        name,
        value,
        recipient,
        isComplete,
        userId: auth.currentUser?.uid,
      });
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitInvoice}>
      <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <Input
        placeholder="value"
        type="number"
        onChange={(e) => setValue(e.target.value)}
      />
      <Input
        placeholder="recipient"
        onChange={(e) => setRecipient(e.target.value)}
      />
      <label>
        is Complete?
        <Checkbox
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
        />
      </label>
      <Input type="submit" value="Add invoice" />
    </form>
  );
};
