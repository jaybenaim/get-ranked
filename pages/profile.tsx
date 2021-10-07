import { Container, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, CardContent, Box, Grid } from "@mui/material";
import { auth } from "firebase/clientApp";
import { IProfile } from "lib/types/Profile";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CardDefault from "components/CardDefault"
import { getUserAttendingEvents, getUserCreatedEvents } from "lib/events";
import ImageIcon from '@mui/icons-material/Image';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Profile = () => {
  const [ user, loading, error ] = useAuthState(auth);
  const [ profile, setProfile ] = useState({} as IProfile)
  const [ events, setEvents ] = useState({} as { created: any, attending: any})

  useEffect(() => {

    if (user) {
      setProfile({
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.photoURL
      })

      fetchEvents()
    }

    // eslint-disable-next-line
  }, [user])

  const fetchEvents = async () => {
    setEvents({
      attending: await getUserAttendingEvents(user.uid),
      created: await getUserCreatedEvents(user.uid)
    })

  }

  const userEvents = () => {
    return (
      <Grid className="profile__events--dropdown-content" container>
        <Grid
          item
          xs={6}
        >
          <Typography variant="h5" component="p">Attending:</Typography>
          <List>
            {events.attending?.docs && events.attending.docs.map((doc) => {
              const { title, location } = doc.data()

              return (
                <ListItem key={doc.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={title} secondary={location}/>
                </ListItem>
              )
            })}
          </List>
        </Grid>


        <Grid
          item
          xs={6}
        >
          <Typography variant="h5" component="p">Created:</Typography>
          <List>
            {events.created?.docs && events.created.docs.map((doc) => {
              const { title, location } = doc.data()

              return (
                <ListItem key={doc.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText primary={title} secondary={location}/>
                </ListItem>
              )
            })}
          </List>
          </Grid>
      </Grid>
    )
  }

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container className="profile">
      <CardDefault
        title={profile.displayName}
        subheader={profile.email}
        avatar={profile.avatarUrl}
        toggleOptions={['Edit', 'Delete Profile']}
        hideDropdown
        hideImage
        hideIcons
      >
        {profile.displayName}
      </CardDefault>


      <Box p={4} className="profile__events">
        <Typography variant="h2">Events</Typography>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {userEvents()}
          </CardContent>
        </Collapse>
      </Box>
    </Container>
  );
}

export default Profile;