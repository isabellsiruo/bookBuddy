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
        <Button size="small" component={Link} to={`/singlebook/${book.id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}

