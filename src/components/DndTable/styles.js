import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = (theme) => ({
    root: {
      // width: "100%",
      marginTop: theme.spacing(3),
    },
    tableWrapper: {
      overflowX: "auto",
    },
  });

  export const actionsStyles = theme => ({
    root: {
      flexShrink: 0,
      color: theme.palette.text.secondary,
      marginLeft: theme.spacing(2.5)
    }
  });

  export const toolbarStyles = (theme) => ({
    root: {
      paddingRight: theme.spacing(0),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: "1 1 100%",
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    actionsInner: {
      display: "flex",
      alignItems: "center"
    },
    title: {
      flex: "0 0 auto",
    },
  });