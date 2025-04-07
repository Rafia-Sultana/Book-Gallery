import BookList from '../components/BookList';
import { motion } from "framer-motion"

const Home = () => {
    
 return (
        <div className='container mx-auto px-4 py-8'>
         <BookList />
        </div>
    );
};

export default Home;