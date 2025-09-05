import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function App(){
const loc = useLocation();
return (
<div>
<Navbar/>
<main className="container">
<Outlet/>
</main>
</div>
);
}
