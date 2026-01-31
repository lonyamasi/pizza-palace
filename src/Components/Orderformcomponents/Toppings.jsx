import '../CSS/toppings.css';

const Toppings = ({ setToppings, toppings }) => { 

    const handleToppingChange = (e) => {
        const {value,checked} = e.target;

            setToppings((prevToppings) => {
                if (checked){
                    return[...prevToppings,value]; //add topping to toppings array
                } else {
                    return prevToppings.filter((topping) =>topping !== value )
                }
            });        
    };

   return (
    <div className="toppings">
      <form method="post">
        <fieldset className="basictoppings-input">
          <legend>Basic Toppings (required)</legend>
          <div>
            <label htmlFor="cheese">
              <input id="cheese" type="checkbox" value="Cheese" checked={toppings.includes("Cheese")} onChange={handleToppingChange} />
              Cheese
            </label>
          </div>
          <div>
            <label htmlFor="pepperoni">
              <input id="pepperoni" type="checkbox" value="Pepperoni" checked={toppings.includes("Pepperoni")} onChange={handleToppingChange} />
              Pepperoni
            </label>
          </div>
          <div>
            <label htmlFor="ham">
              <input id="ham" type="checkbox" value="Ham"  checked={toppings.includes("Ham")} onChange={handleToppingChange} />
              Ham
            </label>
          </div>
          <div>
            <label htmlFor="pineapple">
              <input id="pineapple" type="checkbox" value="Pineapple" checked={toppings.includes("Pineapple")} onChange={handleToppingChange} />
              Pineapple
            </label>
          </div>
        </fieldset>

        <fieldset className="deluxetoppings-input">
          <legend>Deluxe Toppings (optional)</legend>
          <div>
            <label htmlFor="sausage">
              <input id="sausage" type="checkbox" value="Sausage" checked={toppings.includes("Sausage")} onChange={handleToppingChange} />
              Sausage
            </label>
          </div>
          <div>
            <label htmlFor="feta-cheese">
              <input id="feta-cheese" type="checkbox" value="Feta-Cheese" checked={toppings.includes("Feta-Cheese")} onChange={handleToppingChange} />
              Feta Cheese
            </label>
          </div>
          <div>
            <label htmlFor="tomatoes">
              <input id="tomatoes" type="checkbox" value="Tomatoes" checked={toppings.includes("Tomatoes")} onChange={handleToppingChange} />
              Tomatoes
            </label>
          </div>
          <div>
            <label htmlFor="olives">
              <input id="olives" type="checkbox" value="Olives" checked={toppings.includes("Olives")} onChange={handleToppingChange} />
              Olives
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default Toppings;

