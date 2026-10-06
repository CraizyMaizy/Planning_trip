import { Box, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';

type TripHeaderProps = {
  title: string;
  setTitle: (value: string) => void;
  startDate: Dayjs | null;
  setStartDate: (value: Dayjs | null) => void;
  endDate: Dayjs | null;
  setEndDate: (value: Dayjs | null) => void;
};

export default function TripHeader({
  title,
  setTitle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: TripHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Заголовок */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Trip Info
      </Typography>

      {/* Название */}
      <TextField
        fullWidth
        required
        label="Trip title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Даты */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <DatePicker
          label="Start date"
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate ?? undefined}
          slotProps={{ textField: { required: true } }}
          sx={{ flex: 1, minWidth: 0 }}
        />

        <DatePicker
          label="End date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate ?? undefined}
          slotProps={{ textField: { required: true } }}
          sx={{ flex: 1, minWidth: 0 }}
        />
      </Box>
    </Box>
  );
}
