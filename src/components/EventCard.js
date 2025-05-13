import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Event from '../classes/Event';

export default function EventCard(props) {
  const theme = useTheme();

  const event = new Event(props.event)

  return (
    <Card sx={{ display: 'flex', borderRadius: 0,p: 2, width: '100%', }}>
       <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh5.googleusercontent.com%2Fproxy%2F2p8jyQzsyPF1C53C3QSn54KA-OUo9l4ZPWJvHaZu1sZn4V9SgQTOaZDj3x3zZPcCQAAKDHqmrPbz0CGj0ehr4ivgF7HnECCQgXSek4SZwp1W%3Ds0-d&f=1&nofb=1&ipt=7804ba2986dda170e5dabdfb2fc8d6d2960a1266e1cc096b7312906b328347dd&ipo=images"
        alt="Event Cover Pic"
        height="100"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {event.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {event?.formattedDate()}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
