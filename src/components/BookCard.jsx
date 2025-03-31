import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography color="text.secondary">by {book.author}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/books/${book.id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};
