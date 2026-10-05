import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface JourneyCardProps {
  image: string;
  title: string;
  description: string;
}

export default function JourneyCard({ image, title, description }: JourneyCardProps) {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'inherit',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover', height: 200 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
