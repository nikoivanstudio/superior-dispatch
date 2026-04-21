import type { FC } from 'react';
import { Link } from 'react-router';

export const NotFoundPage: FC = () => (
  <div>
    <h1>Not Found Page </h1>
    <Link to="/">Go back Home</Link>
  </div>
);
