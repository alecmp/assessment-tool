const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === 'persistent'
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick('Home')}
          >
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Grid"
            onClick={onItemClick('Page 2')}
          >
            <ListItemText>Page 2</ListItemText>
          </ListItem>
          <ListItem button onClick={onItemClick('Page 3')}>
            <ListItemText>Page 3</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={Home} />
        <Route path="/grid" component={Grid} />
      </main>
    </Router>
  )
);
