import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Home.css';
import Navbar from './Navbar';

export default function Home() {
    return (
        <>
        
        <div className='homeContainer'>
            <div className='topHome'>
                <Navbar />
            </div>
            <div className='bodyHome' >
                <h1 style ={{textAlign:'center'}}>Welcome to AppointMed!</h1>
            </div>
        </div>
                
    
        </>
    );
}
