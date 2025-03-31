import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {book.coverimage && (
        <CardMedia
          component="img"
          height="200"
          image={book.coverimage}
          alt={book.title}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div">{book.title}</Typography>
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
    title: PropTypes.string,
    author: PropTypes.string,
    coverimage: PropTypes.string,
  }),
};
