import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface JourneyCardProps {
  image: string;
  title: string;
  description: string;
}

export default function JourneyCard({ image, title, description }: JourneyCardProps) {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover', height: 200 }}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1,
            color: 'textPrimary',
          }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
