
import Head from 'next/head'
import NavBar from '../components/NavBar'
import Seo from '../components/Seo'
import styles from "../styles/index.module.css";


export default function Home() {
  const imageContainerTextClass = "display-4 fw-normal " + styles.centerText;
  return (
    <div className="container">

      <Seo title="Home" />
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className={styles.imageOverlay}>
          <img src='homeBg.webp'/>
          <h1 className={imageContainerTextClass}>Tacos & Seafood</h1>
        </div>
      <h2 className="lead fw-normal">Cause we make the best mexican food in town, that's why!</h2>
      <p className="lead fw-normal">Because we make the best mexicanfood, seafood and drinks in town, that's why.</p>
      <p className="lead fw-normal">Cabo Grill uses the highest quality ingridients to achieve an authentic mexican taste.  We really appreciate your preference, you are part of our family. Serving you is our pleasure! Just Cabo.</p>
      <a className="btn btn-outline-secondary" href="#">Coming soon</a>
      </div>

      <style jsx>{`
                h1 {
                  color: white;
                }
                img {
                  width: 60vw;
                  
                }
                h2 {
                  color: red;
                  margin: 4vh 0;
                  font-size: 3vh;
                }
            `}
            </style>
    </div>

    
  )

}
