import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Typography, Chip, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    minHeight: '7vh',
  },
}));

export default function ChipsHandler({ setChips }) {
  const classes = useStyles();

  const [userChips, setUserChips] = useState([]);

  // Potential to connect to admin dashboard?
  const [defaultChips, setDefaultChips] = useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Full Stack' },
    { key: 5, label: 'Front End' },
    { key: 6, label: 'Back End' },
    { key: 7, label: 'Python' },
    { key: 8, label: 'Express' },
    { key: 9, label: 'Vue' },
    { key: 10, label: 'Ruby' },
    { key: 11, label: 'Swift' },
    { key: 12, label: 'Java' },
    { key: 13, label: 'AppleScript' },
    { key: 14, label: 'Javascript' },
    { key: 15, label: 'C#' },
    { key: 16, label: 'C' },
    { key: 17, label: 'C++' },
    { key: 18, label: 'PHP' },
    { key: 19, label: 'HTML' },
    { key: 20, label: 'CSS' },
    { key: 21, label: 'Go' },
    { key: 22, label: 'Perl' },
    { key: 23, label: 'Visual Basic' },
    { key: 24, label: 'Assembly' },
    { key: 25, label: 'Groovy' },
    { key: 26, label: 'Objective-C' },
    { key: 27, label: 'SQL' },
    { key: 28, label: 'NoSQL' },
  ]);

  const handleAdd = (chipToAdd) => {
    // Add the clicked chip to the user array
    setUserChips([...userChips, chipToAdd]);

    // Remove the clicked chip from the defulat chips array
    setDefaultChips(() =>
      defaultChips.filter((chip) => chip.key !== chipToAdd.key)
    );
  };

  const handleDelete = (chipToDelete) => () => {
    // Add the deleted user chip back to default array
    setDefaultChips([...defaultChips, chipToDelete]);

    // Remove deleted chip from user chip array
    setUserChips(() =>
      userChips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  // Lift up userChip array to form (parent component) whenever userChips is updated
  useEffect(() => {
    setChips(userChips);
  }, [setChips, userChips]);

  return (
    <>
      <Typography variant="body1">All topics:</Typography>
      <Paper component="ul" className={classes.root}>
        {defaultChips.map((data) => {
          let icon;

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                variant="outlined"
                style={{ margin: '2px' }}
                onClick={() => handleAdd(data)}
              />
            </li>
          );
        })}
      </Paper>
      <br />
      <Typography variant="body1">Your topics:</Typography>
      <Paper component="ul" className={classes.root}>
        {userChips.map((data) => {
          let icon;

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}
                style={{ margin: '2px' }}
              />
            </li>
          );
        })}
      </Paper>
    </>
  );
}

ChipsHandler.propTypes = {
  setChips: PropTypes.func,
};
