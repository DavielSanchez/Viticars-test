import '../../public/style/Footer.css'
function Footer() {
  return (
    <div className="box-container-footer" id='contact'>

        <div className="box-footer">
            <h3>Horarios</h3>
            <a>LUN - VIER  9:00am - 6:00pm</a>
            <a>SABADOS    9:00am - 1:00pm</a>

        </div>

        <div className="box-footer">
            <h3>Ubicación</h3>
            <a id='ubication' href="https://goo.gl/maps/6zMndQc9QtPne5qg7" className="href">Calle El Sol, #123, <br/> Santo Domingo Este, Rep. Dom.</a>

        </div>

        <div className="box-footer">
            <h3>Contáctanos</h3>
            <a href="#" className="href">+1 123 456 7890</a>
            <a href="mailto:Davielalexsanchez@gmail.com" className="href">info@viticars.com.do</a>
            <a href="mailto:Davielsanchez14@gmail.com" className="href">ventas.viticars@gmail.com</a>
        </div>
    </div>
  )
}

export default Footer