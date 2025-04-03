import '../CSS/size.css'



const Size = ({setSize, size}) => {
  const handleSizeChange =(e)=>{
    setSize(e.target.value);
  };


  return (
    <div className="size-input">
      <form method="post">
        <fieldset>
          <label htmlFor="size">Select Pizza Size
            <select id="size" name="size" value ={size} onChange={handleSizeChange}>
              <option value="">(select one)</option>
              <option value="Small">Small </option>
              <option value="Medium">Medium </option>
              <option value="Large">Large </option>
            </select>
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default Size;

