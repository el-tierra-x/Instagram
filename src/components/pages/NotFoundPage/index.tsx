import { Link } from 'react-router-dom';

import { NotFoundFallback } from '../../ui/FallbackPageComponents';

import './notfoundpage.css';

function NotFoundPage() {
  return <div className="not-found-page-wrapper">
       <NotFoundFallback/>
       <Link to="/" className="go-to-home">Home</Link>
  </div>;
}

export default NotFoundPage;
