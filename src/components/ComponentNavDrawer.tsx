import React from "react"
import componentSamples from "src/components/MuiComponentSamples/Samples"
import {
  Drawer,
  List,
  makeStyles,
  ListSubheader,
  ListItem,
  ListItemText,
  Toolbar,
  Link,
  useTheme,
  useMediaQuery,
} from "@material-ui/core"
import { useDispatch } from "react-redux"
import { setActiveTab } from "src/state/actions"

const drawerWidth: React.CSSProperties["width"] = 200

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  list: {
    // gives background to the sticky header
    backgroundColor: theme.palette.background.paper,
  },
  listItemText: {
    paddingLeft: theme.spacing(2),
  },
}))

export const componentNavDrawerId = "component-nav-drawer"

const ComponentNavDrawer = () => {
  const classes = useStyles()
  const theme = useTheme()
  const permanent = useMediaQuery(theme.breakpoints.up("md"))

  const dispatch = useDispatch()
  const openComponentsTab = React.useCallback(
    () => dispatch(setActiveTab("components")),
    [dispatch]
  )

  const NavLink = React.forwardRef((linkProps, ref) => (
    <Link ref={ref} {...linkProps} color="textPrimary" />
  ))

  return (
    <Drawer
      id={componentNavDrawerId}
      className={classes.drawer}
      variant={permanent ? "permanent" : "temporary"}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List dense className={classes.list}>
        <ListSubheader>Components</ListSubheader>
        {componentSamples.map(({ id, title }) => (
          <ListItem
            key={id}
            button
            component={NavLink}
            href={`#${id}`}
            onClick={openComponentsTab}
          >
            <ListItemText
              primary={title}
              className={classes.listItemText}
              primaryTypographyProps={{
                variant: "body2",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default ComponentNavDrawer
