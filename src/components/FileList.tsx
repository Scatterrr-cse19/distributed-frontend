'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const dummyFiles = [
  { name: 'File 1', size: '10MB' },
  { name: 'File 2', size: '20MB' },
  { name: 'File 3', size: '30MB' },
  { name: 'File 4'},
];

export default function FileList() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Files
          </Typography>
            <List>
              {dummyFiles.map((file) => (
                <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" color="inherit">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.name}
                  secondary={file.size}
                  secondaryTypographyProps={{ color: 'white'}}
                />
              </ListItem>
              ))}
            </List>
        </Grid>
    </Box>
  );
}
