import Head from 'next/head'
import NavBar from '../components/NavBar'
import Seo from '../components/Seo';
import styles from "../styles/serverui.module.css";

const css = `

.row {
    margin-left:30px;
    float: center;
}

.column {
    align-items: center;
}

.server-menu-items {
    justify-content: space-between;
    max-width: 50%;
    
}

.show-menu-items {
    float:right; 
    display: flex;
    align-items: center;
    border: black;
    position: absolute;
    left:800px;
    top: 250px;
}

.text-area {
    width: 500px;
    height: 500px;
}

.text-area-menu-price {
    width: 500px;
    height: 35px;
}

`
const data = ['Burrito_chilli_rubbed_chicken', 'Burrito_marinated_Steak', 'Burrito_Grilled_Veggie_Medley', 'Burrito_Grilled_Vegetable_Medley', 'Bowl_Seasoned_Beef', '2_Tacos_chilli_rubbed_chicken', '2_tacos_chilli_rubbed_chicken', '2_tacos_marinated_steak', 'chips_and_guac' ,'chips_and_salsa', 'fountain_drink', 'new_menu']

export default function serverui() {
    return (

        <div class ="row"> <style>{css}</style>
        <div class="column">
          
          <Seo title="Server" />
          <h3>Server View</h3>

          <p></p>
          <p>Menu Items</p>

          
          <div class = "server-menu-items">
            
              <a className="btn btn-outline-secondary" href="#">{data[0]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[1]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[2]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[3]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[4]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[5]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[6]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[7]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[8]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[9]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[10]}</a>
              <a className="btn btn-outline-secondary" href="#">{data[11]}</a>
          </div>

          <p></p>
          <p>Add Ons</p>

          <div class = "server-menu-items">
              <a className="btn btn-outline-secondary" href="#">Add White Rice</a>
              <a className="btn btn-outline-secondary" href="#">Add Brown Rice</a>
              <a className="btn btn-outline-secondary" href="#">Add Black Beans</a>
              <a className="btn btn-outline-secondary" href="#">Add Cheese</a>
              <a className="btn btn-outline-secondary" href="#">Add Sour Cream</a>
              <a className="btn btn-outline-secondary" href="#">Add Pinto Beans</a>
              <a className="btn btn-outline-secondary" href="#">Add Veggies</a>
          </div>

          <p></p>
          <p>Extras</p>

          <div class = "server-menu-items">
              <a className="btn btn-outline-secondary" href="#">Extra Chicken</a>
              <a className="btn btn-outline-secondary" href="#">Extra Steak</a>
              <a className="btn btn-outline-secondary" href="#">Extra Beef</a>
              <a className="btn btn-outline-secondary" href="#">Extra White rice</a>
              <a className="btn btn-outline-secondary" href="#">Extra Black Beans</a>
              <a className="btn btn-outline-secondary" href="#">Extra Pinto Beans</a>
              <a className="btn btn-outline-secondary" href="#">Extra Veggies</a>
              <a className="btn btn-outline-secondary" href="#">Extra Cheese</a>
              <a className="btn btn-outline-secondary" href="#">Extra Sour Cream</a>
          </div>


        </div>
        
        <div class ="show-menu-items">
            
            <form>
                <h3>Server Orders</h3>
                <textarea class = "text-area"></textarea>
                <p>Total Price:</p>
                <textarea class = "text-area-menu-price">$</textarea>
                
            </form>
        </div>

      </div>
    
  )
}

/*

HOW TO OUPUT TO A TEXT BOX: https://www.tutorialspoint.com/how-to-output-javascript-into-a-textbox 
*/