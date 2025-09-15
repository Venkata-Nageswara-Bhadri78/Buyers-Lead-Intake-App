import * as React from "react";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function TagAutoComplete({ tags, setTags }) {
  return (
    <Stack spacing={2}>
      <Autocomplete
        multiple
        freeSolo 
        size="small"
        options={[]} 
        value={tags} 
        onChange={(event, newValue) => setTags(newValue)} 
        filterSelectedOptions
        renderTags={(selected, getTagProps) =>
          selected.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              key={option}
              label={option}
              size="small"
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add Tag"
            placeholder="Type a tag and press Enter"
          />
        )}
      />
    </Stack>
  );
}
