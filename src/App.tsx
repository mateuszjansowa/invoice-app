import { ConfigProvider } from "antd";
import { theme } from "./config/antTheme";

import { Auth } from "./components/Auth";
import { List } from "./components/List";
import { Generator } from "./components/Generator";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./config/firebase";
import { ref, uploadBytes } from "firebase/storage";

export type Invoice = {
  date: string;
  isCancelled: boolean;
  isComplete: boolean;
  isPending: boolean;
  name: string;
  recipient: string;
  value: number;
  id: string;
};

function App() {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const moviesCollectionRef = collection(db, "invoices");

  const getInvoiceList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (filteredData.length) {
        // @ts-ignore
        setInvoiceList(filteredData);
        console.log(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoiceList();
  }, []);

  const handleOnSubmit = () => getInvoiceList();

  const handleOnDelete = () => getInvoiceList();

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    const invoicesFolderRef = ref(storage, `invoices/${file.name}`);
    try {
      await uploadBytes(invoicesFolderRef, file);
    } catch (error) {
      console.error("Issue uploading file: ", error);
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="app">
        <Auth />
        <Generator onSubmit={handleOnSubmit} />
        <List invoiceList={invoiceList} onDelete={handleOnDelete} />
      </div>

      <div>
        <h2>Send Image</h2>
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </ConfigProvider>
  );
}

export default App;
