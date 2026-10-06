import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ChecklistProps } from '../types/types.ts';

export default function Checklist({ items, setItems }: ChecklistProps) {
  const [input, setInput] = useState('');

  const addItem = () => {
    const text = input.trim();
    if (!text) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        done: false,
      },
    ]);
    setInput('');
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              done: !el.done,
            }
          : el,
      ),
    );
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Packing Checklist
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Add item"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
        />

        <Button variant="contained" onClick={addItem} disabled={!input.trim()}>
          Add
        </Button>
      </Box>

      {items.length === 0 && <Typography color="text.secondary">Nothing to pack yet</Typography>}

      <List>
        {items.map((el) => (
          <ListItem
            key={el.id}
            sx={{ background: '#f8fafc', mb: 1, borderRadius: 2, px: 2 }}
            secondaryAction={
              <IconButton
                edge="end"
                size="small"
                aria-label={`Delete ${el.text}`}
                onClick={() => deleteItem(el.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <Checkbox
                edge="start"
                checked={el.done}
                onChange={() => toggleItem(el.id)}
                slotProps={{ input: { 'aria-label': el.text } }}
              />
            </ListItemIcon>

            <ListItemText
              primary={el.text}
              sx={{ minWidth: 0 }}
              slotProps={{
                primary: {
                  sx: {
                    wordBreak: 'break-word',
                    textDecoration: el.done ? 'line-through' : 'none',
                    color: el.done ? 'text.disabled' : 'text.primary',
                  },
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
