import React from "react";
import emailjs from "emailjs-com";
import { useStateContext } from "../context/StateContext";
import Success from "../pages/success";

export default function ContactUs() {
  const { cartItems } = useStateContext();
  const produse = cartItems.map((el) => {
    return {
      name: el.name,
      quantity: el.quantity,
    };
  });
  // console.log(produse);

  function sendEmail(e) {
    // console.log(cartItems);
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    const nume11 = document.getElementById("nume1");
    const nume22 = document.getElementById("nume2");
    const nume33 = document.getElementById("nume3");
    if (!nume11.value || !nume22.value || !nume33.value) {
      return alert(
        "Va rugam completati campurile pentru Nume, Adresa, Nr de tel "
      );
    }
    emailjs
      .sendForm(
        "service_72g2qkj",
        "template_savogce",
        e.target,
        "YlotjLbnflFujBKnZ"
      )
      .then(
        (result) => {
          // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        },
        (error) => {
          console.log(error.text);
        }
      );
    setTimeout(() => {
      window.location.href = "http://www.gradinadinpadure.ro/success";
    }, 1000);
  }
  // console.log(produse);

  let str = [];

  function listaProduse(produse) {
    for (let i = 0; i < produse.length; i++) {
      str.push(produse[i].name + " nr de pachete " + produse[i].quantity);
    }
    // return JSON.stringify(str);
    return str.join("\r\n");
  }

  console.log(str);
  const listaFinal = listaProduse(produse);
  console.log(listaFinal);
  // const nume11 = document.getElementById("nume1");
  // const nume22 = document.getElementById("nume2");
  // const nume33 = document.getElementById("nume3");

  // let redirect = function () {
  //   const nume11 = document.getElementById("nume1");
  //   const nume22 = document.getElementById("nume2");
  //   const nume33 = document.getElementById("nume3");
  //   console.log(nume11.value, nume22.value, nume33);
  //   return;
  //   if (nume11.value && nume22.value && nume33.value) {
  //     console.log(nume11, nume22, nume33);
  //     return setTimeout(() => {
  //       window.location.href = "http://www.gradinadinpadure.ro/success";
  //     }, 1000);
  //   } else
  //     alert("Va rugam completati campurile pentru Nume, Adresa, Nr de tel ");
  //   return false;
  // };
  return (
    <form className="contact-form " onSubmit={sendEmail}>
      <input
        id="nume1"
        type="text"
        name="name"
        className="btn-message"
        required
        placeholder="Nume"
      />
      <input
        id="nume2"
        type="text"
        name="adresa"
        className="btn-message"
        required
        placeholder="Adresa"
      />
      <input
        id="nume3"
        type="text"
        name="phone_number"
        className="btn-message"
        required
        placeholder="Nr. de tel"
      />

      {/* <input type="submit" value="Trimite" className="btn-message" /> */}
      <button
        type="submit"
        onSubmit={sendEmail}
        className="btn-message"
        style={{ backgroundColor: "green" }}
      >
        Trimite
      </button>
      <textarea
        id="nume4"
        name="html_message"
        placeholder="Mesaj"
        className="btn-message"
      />
      <input type="hidden" name="message" value={listaFinal} />
    </form>
  );
}
