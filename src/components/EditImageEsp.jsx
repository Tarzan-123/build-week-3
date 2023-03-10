//Esempio di file upload usando FormData e Typescript

//Component.jsx

import { useEffect, useState } from "react"; //ChangeEvent e FormEvent sono i tipi degli eventi onChange e onSubmit

import { useSelector } from "react-redux";

export const EditImageEsp = (props) => {
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    console.log(props.userid, profile._id);
  });
  const [fd, setFd] = useState(new FormData()); //FormData e' una classe usata per raccogliere dati non stringa dai form
  //E' formata da coppie chiave/valore => ["post", File], ["exp", File]
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let res = await fetch(
      "https://striveschool-api.herokuapp.com/api/profile/" + props.userid + "/experiences/" + props.id + "/picture",
      {
        //qui l'id andra' sostituito con un id DINAMICO!!!!!
        method: "POST",
        body: fd, //non serve JSON.stringify
        headers: {
          //NON serve ContentType 🙂
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ZlMjc4ODU3OWM2MzAwMTM3Y2Y4YzMiLCJpYXQiOjE2Nzc2MDA2NDksImV4cCI6MTY3ODgxMDI0OX0.EHJrg1AvvFDXzLcMgar_TjwQaMNKVN_tbGsUktYNUHQ",
        },
      }
    );
  };
  const handleFile = (ev) => {
    setFd((prev) => {
      //per cambiare i formData, bisogna "appendere" una nuova coppia chiave/valore, usando il metodo .append()
      prev.delete("post"); //ricordatevi di svuotare il FormData prima 🙂
      prev.append("experience", ev.target.files[0]); //L'API richiede un "nome" diverso per ogni rotta, per caricare un'immagine ad un post, nel form data andra' inserito un valore con nome "post"
      return prev;
    });
  };
  return (
    <>
      {props.userid === profile._id ? (
        <form onSubmit={handleSubmit}>
          <input className="mt-3" type="file" onChange={handleFile} />
          <button className="btn btn-primary">Cambia immagine dell'esperienza</button>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

export default EditImageEsp;
