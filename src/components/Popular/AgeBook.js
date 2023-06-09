import React, { useEffect, useState, useCallback } from "react";
import AgeSide from "./AgeSide";
import NaruBookList from "../BookList/NaruBookList";

const AgeBook = ({ category }) => {
  const [data, setData] = useState([]);
  const [AgeData, setAgeDate] = useState("infant");
  const onAgeSelect = useCallback((AgeData) => setAgeDate(AgeData), []);

  useEffect(() => {
    getData();
  }, [category, AgeData]);

  const getData = async () => {
    const res = await fetch(
      "https://api.look-book.site/recommendation/popularity/" + AgeData
    ).then((res) => res.json());
    const initData = res.response.docs.map((it) => {
      return {
        bookname: it.doc.bookname,
        bookImageURL: it.doc.bookImageURL,
        authors: it.doc.authors,
        publisher: it.doc.publisher,
        publication_year: it.doc.publication_year,
        isbn: it.doc.isbn13,
      };
    });
    setData(() => initData);
  };

  return (
    <div>
      <AgeSide
        AgeData={AgeData}
        onAgeSelect={onAgeSelect}
        style={{
          width: "10px",
        }}
      />
      {data &&
        data.map((item) => {
          return <NaruBookList {...item} />;
        })}
    </div>
  );
};
export default AgeBook;
