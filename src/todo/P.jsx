import React from "react";

const P = () => {
  class Car {
    constructor(id, name, model) {
      this.id = id;
      this.name = name;
      this.model = model;
    }

    Renew() {}
  }
  const Maruthi = new Car("1KJK4K400", "Maruthi", "Fort 50");
  console.log(Maruthi);

  return <div></div>;
};

export default P;
